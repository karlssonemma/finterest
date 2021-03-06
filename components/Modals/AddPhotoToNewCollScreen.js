import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { addPhoto, addCollection, getCollectionByName, checkIfCollectionExistsByName } from '../../helpers/firebaseHelpers';
import ModalContainer from '../ModalContainer';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import InputField from '../FormComponents/InputField';


const AddPhotoToNewCollScreen = ({ item }) => {

    const { id, url, alt_description, user } = item;
    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);


    useEffect(async () => {
        let foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text)
        setNameAlreadyInUse(foundCollWithSameName)
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        await addCollection(currentUser.uid, {
            name: text,
            createdAt: new Date().toLocaleDateString(),
            user: currentUser.uid,
            numberOfPins: 0
        })
        await getCollectionByName(currentUser.uid, text)
        .then(query => {
            query.forEach(doc => {
                addPhoto(currentUser.uid, doc.id, id, {
                    url: url,
                    id: id,
                    alt_description: alt_description,
                    user: user
                })
            })
        })
        closeWindow();
        setText('');
    };

    const closeWindow = (e) => {
        let modal = document.querySelector(`.addPhotoToNewColl_${item.id}`)
        modal.classList.remove('visible');
        console.log(e)
    };
    
    return(
        <ModalContainer name={`addPhotoToNewColl_${item.id}`}>
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <InputField 
                inputType='text' 
                labelText='name of collection' 
                handleChange={e => handleText(e)}
                value={text}
            />
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create collection</StandardBtn>
            
        </ModalContainer>
    )
}

export default AddPhotoToNewCollScreen;