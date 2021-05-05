import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useAuth } from '../contexts/AuthContext';
import { readCurrentUser, readCurrentUsersCollections, readUsers, readUsersCollections, readPhotoFromCollection, readPhotosFromCollection } from '../helpers/firebaseHelpers';
import HeartBtn from '../components/Buttons/HeartBtn';
import firebaseInstance from '../config/firebase';

const SelectCollection = ({ item }) => {

    const { id, url } = item;
    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);
    const [selectedCollId, setSelectedCollId] = useState('');
    const [filled, setFilled] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    //før att sætta selected collid
    useEffect(() => {
        if(collections.length) {
            setSelectedCollId(collections[0].id)
        };
    }, [collections])

    useEffect(async () => {
        
        if (selectedCollId.length > 0) {
            let coll = await readPhotosFromCollection(currentUser.uid, selectedCollId)
            coll.get()
            .then(sub => {
                //checkar om coll "photos" existerar
                if (sub.docs.length > 0) {
                    sub.forEach(doc => {
                        if(doc.data().id === id) {
                            setFilled(!filled)
                        }
                    })
                    
                } else {
                    console.log('doesnt exist')
                }
            })
        }
    }, [selectedCollId])

    useEffect(async () => {
        readUsers()
        if (collections.length < 1) {
            let coll = await readUsersCollections(currentUser.uid)
            coll.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setCollections(prevState => [...prevState, {...doc.data(), id: doc.id }])
                })
            })
        }
    }, [])

    const onSubmit = async (data) => {
        //endast pga tom string vid submit utan att select blivit touched
        let collId = data.collectionId ? data.collectionId : collections[0].id;

        let coll = await readUsersCollections(currentUser.uid)
        coll.doc(collId).collection('photos').doc(id).set({
            url: url,
            id: id
        });
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} onChange={e => console.log(e.target.value)}>
            <select {...register('collectionId')}>
                {
                    collections && collections.map((coll, i) => {
                        return <option key={coll.id} value={coll.id}>{coll.name}</option> 
                    }
                )}
            </select>
            <HeartBtn filled={filled} />
        </form>
    )
}

export default SelectCollection;