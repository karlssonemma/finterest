import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers, readCurrentUsersCollections, readCurrentUserDoc, readCollections, checkIfCollectionExistsByName, addCollection } from '../helpers/firebaseHelpers';
import Overlay from '../components/Overlay';
import CloseBtn from './Buttons/CloseBtn';
import StandardBtn from './Buttons/StandardBtn';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';

const StyledInput = styled.input`
    border: none;
    border-bottom: 2px solid black;

    padding: ${props => props.theme.space[2]};
    margin-bottom: ${props => props.theme.space[2]};
`;

const CreateCollScreen = () => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [nameAlreadyInUse, setNameAlreadyInUse] = useState(false);

    const closeWindow = () => {
        let item = document.querySelector('.createCollScreen')
        item.classList.toggle('visible');
    };

    useEffect(async () => {
        if(text.length > 1) {
            let foundCollWithSameName = await checkIfCollectionExistsByName(currentUser.uid, text)
            setNameAlreadyInUse(foundCollWithSameName)
        }
    }, [text])

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        addCollection(currentUser.uid, {
                name: text,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser.uid
            })
        closeWindow();
        setText('');
    };
    
    return(
        <Overlay className='createCollScreen'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {
                nameAlreadyInUse && <p>Name already in use</p>
            }
            <StyledInput type='text' placeholder='name of coll' onChange={e => handleText(e)} />
            
            <StandardBtn disabled={nameAlreadyInUse} onClick={createColl}>Create coll</StandardBtn>
        </Overlay>
    )
}

export default CreateCollScreen;