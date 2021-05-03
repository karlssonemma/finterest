import React, { useState } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers } from '../helpers/firebaseHelpers';
import Overlay from '../components/Overlay';
import CloseBtn from './Buttons/CloseBtn';
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
        let coll = await readUsersCollections();
        coll.add({
                name: text,
                photos: [],
                createdAt: new Date().toLocaleDateString(),
                id: text,
                user: currentUser.uid
            })
        closeWindow();
        setText('');
    };
    
    return(
        <Overlay className='createCollScreen'>
            <CloseBtn btnFunction={closeWindow} />
            <input type='text' placeholder='name of coll' onChange={e => handleText(e)} />
            <StandardBtn onClick={createColl}>Create coll</StandardBtn>
        </Overlay>
    )
}

export default CreateCollScreen;