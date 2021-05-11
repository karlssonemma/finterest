import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers, readCurrentUsersCollections, readCurrentUserDoc, readCollections, addPhoto, addCollection, readCollectionByName, checkIfCollectionExistsByName } from '../helpers/firebaseHelpers';
import Overlay from '../components/Overlay';
import CloseBtn from './Buttons/CloseBtn';
import StandardBtn from './Buttons/StandardBtn';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';


const AddPhotoToNewCollScreen = ({ item }) => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);


    useEffect(async () => {
        let foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text)
        setNameAlreadyInUse(foundCollWithSameName)
    }, [text])

    const closeWindow = () => {
        let item = document.querySelector('.addPhotoToNewCollScreen')
        item.classList.toggle('visible');
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
        <Overlay className='addPhotoToNewCollScreen'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <input type='text' placeholder='name of coll' onChange={e => handleText(e)} />
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create coll</StandardBtn>
            
        </Overlay>
    )
}

export default AddPhotoToNewCollScreen;