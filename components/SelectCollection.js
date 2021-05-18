import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useAuth } from '../contexts/AuthContext';
import { readUsers, readUsersCollections, readPhotoFromCollection, readPhotosFromCollection, deletePhotoFromCollection, addPhoto } from '../helpers/firebaseHelpers';
import HeartBtn from '../components/Buttons/HeartBtn';
import AddPhotoToNewCollScreen from '../components/Modals/AddPhotoToNewCollScreen';


const StyledForm = styled.form`
    width: max-content;
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledSelect = styled.select`
    margin-right: ${props => props.theme.space[2]};
    background-color: transparent;
    border: none;
    
    color: white;
    font-weight: 100;
`;

const SelectCollection = ({ item }) => {

    const { id, url, user } = item;
    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);
    const [selectedCollId, setSelectedCollId] = useState('');
    const [filled, setFilled] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    //før att sætta selected collid
    useEffect(() => {
        if(collections.length) {
            setSelectedCollId(collections[0].id)
        };
    }, [collections])

    //uppdaterar heart icon då select ändras
    useEffect(async () => {
        let photoFoundInColl;

        if(selectedCollId === 'new') {
            photoFoundInColl = false;
        } else if (selectedCollId.length > 0) {
            let ref = await readPhotosFromCollection(currentUser.uid, selectedCollId)
            ref.get()
            .then(sub => {
                //checkar om coll "photos" existerar
                if (sub.docs.length > 0) {
                    photoFoundInColl = false;
                    sub.forEach(doc => {
                        if(doc.data().id === id) {
                            photoFoundInColl = true;
                        }
                    })
                } else {
                    photoFoundInColl = false;
                }
            })
        }
        setFilled(photoFoundInColl);
    }, [selectedCollId])

    useEffect(async () => {
        readUsers();
        if (collections.length < 1) {
            let coll = await readUsersCollections(currentUser.uid);
            coll.onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    setCollections(prevState => [...prevState, {...doc.data(), id: doc.id }])
                })
            })
        }
    }, [])

    const onSubmit = async (data) => {
        if(data.collectionId === 'new') {
            document.querySelector(`.addPhotoToNewColl_${id}`).classList.toggle('visible')
        } else {
             //endast pga tom string vid submit utan att select blivit touched
            let collId = data.collectionId ? data.collectionId : collections[0].id;

            let coll = await readPhotoFromCollection(currentUser.uid, collId, id)
            coll.get()
            .then(doc => {
                if(doc.exists) {
                    deletePhotoFromCollection(currentUser.uid, collId, doc.id)
                    console.log('exists', doc.id)
                } else {
                    addPhoto(currentUser.uid, collId, id, {
                        url: url,
                        id: id,
                        user: user
                    });
                    console.log('doenst exist', doc.id)
                }
            }).then(() => setFilled(!filled))
        }
        
    };

    return(
        <>
        <AddPhotoToNewCollScreen item={item} />
            <StyledForm onSubmit={handleSubmit(onSubmit)} onChange={e => setSelectedCollId(e.target.value)}>
                {
                    collections && 
                        <StyledSelect {...register('collectionId')}>
                            <option value='new'>--- NEW ---</option>
                            {
                                collections && collections.map((coll, i) => {
                                    return <option key={coll.id + i} value={coll.id}>{coll.name}</option> 
                                }
                            )}
                            
                        </StyledSelect>
                }
                <HeartBtn filled={filled} />
            </StyledForm>
        </>
    )
}

export default SelectCollection;