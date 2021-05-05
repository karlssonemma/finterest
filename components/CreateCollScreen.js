import React, { useState } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers, readCurrentUsersCollections, readCurrentUserDoc, readCollections } from '../helpers/firebaseHelpers';
import Overlay from '../components/Overlay';
import IconBtn from './Buttons/IconBtn';
import StandardBtn from './Buttons/StandardBtn';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';


const CreateCollScreen = () => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');

    const closeWindow = () => {
        let item = document.querySelector('.createCollScreen')
        item.classList.toggle('visible');
    };

    const handleText = (e) => {
        setText(e.target.value)
    };

    const createColl = async () => {
        let user = await readCurrentUser(currentUser.uid);
        user.collection('collections').doc().set({
                name: text,
                createdAt: new Date().toLocaleDateString(),
                user: currentUser.uid
            })
        closeWindow();
        setText('');
    };
    
    return(
        <Overlay className='createCollScreen'>
            <IconBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            <input type='text' placeholder='name of coll' onChange={e => handleText(e)} />
            <StandardBtn onClick={createColl}>Create coll</StandardBtn>
        </Overlay>
    )
}

export default CreateCollScreen;