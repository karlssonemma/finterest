import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers, readCurrentUsersCollections, readCurrentUserDoc, readCollections, addPhoto, addCollection, readCollectionByName, checkIfCollectionExistsByName } from '../../helpers/firebaseHelpers';
import Overlay from '../Overlay';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import firebaseInstance from '../../config/firebase';
import { InputWithBorderBottom } from '../FormComponents/InputWithBorderBottom';


const StyledInput = styled.input`
    border: none;
    border-bottom: 2px solid black;

    text-align: center;
    padding: ${props => props.theme.space[2]};
    margin-bottom: ${props => props.theme.space[2]};
`;

const AddPhotoToNewCollScreen = ({ item }) => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);


    useEffect(async () => {
        let foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text)
        setNameAlreadyInUse(foundCollWithSameName)
    }, [text])

    const closeWindow = () => {
        let item2 = document.querySelector(`.addPhotoToNewColl_${item.id}`)
        item2.classList.toggle('visible');
    };

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        addCollection(currentUser.uid, {
                name: text,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser.uid
            })
        let ref = await readCollectionByName(currentUser.uid, text)
        ref.get()
        .then(query => {
            query.forEach(doc => {
                addPhoto(currentUser.uid, doc.id, item.id, {
                    url: item.url,
                    id: item.id
                })
            })
        })
        closeWindow();
        setText('');
    };
    
    return(
        <Overlay className={`addPhotoToNewColl_${item.id}`}>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <InputWithBorderBottom type='text' placeholder='name of collection' onChange={e => handleText(e)} />
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create collection</StandardBtn>
            
        </Overlay>
    )
}

export default AddPhotoToNewCollScreen;