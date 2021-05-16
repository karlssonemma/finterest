import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { addPhoto, addCollection, readCollectionByName, checkIfCollectionExistsByName } from '../../helpers/firebaseHelpers';
import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import InputField from '../FormComponents/InputField';


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
        <ModalContainer name={`addPhotoToNewColl_${item.id}`}>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <InputField 
                inputType='text' 
                labelText='name of collection' 
                handleChange={e => handleText(e)} 
            />
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create collection</StandardBtn>
            
        </ModalContainer>
    )
}

export default AddPhotoToNewCollScreen;