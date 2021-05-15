import React, { useState } from 'react';

import styled from 'styled-components';

import Overlay from '../Overlay';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import firebaseInstance from '../../config/firebase';
import { useRouter } from 'next/router';
import { readCollectionFromUser } from '../../helpers/firebaseHelpers';

import { InputWithBorderBottom } from '../FormComponents/InputWithBorderBottom';


const EditCollNameScreen = ({ collId }) => {

    const { currentUser } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('');

    const closeWindow = () => {
        let item = document.querySelector('.editCollNameScreen')
        item.classList.toggle('visible');
    };

    const handleText = (e) => {
        setName(e.target.value)
    };

    const changeName = async () => {
        let ref = await readCollectionFromUser(currentUser.uid, collId);
        ref.update({
            name: name
        })
    };

    
    return(
        <Overlay className='editCollNameScreen'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            <InputWithBorderBottom 
                placeholder='New name' 
                type='text' 
                onChange={e => handleText(e)} 
            />
            <StandardBtn onClick={changeName}>Change name</StandardBtn>
        </Overlay>
    )
}

export default EditCollNameScreen;