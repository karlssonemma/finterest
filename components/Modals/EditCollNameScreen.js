import React, { useState } from 'react';

import styled from 'styled-components';

import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { readCollectionFromUser } from '../../helpers/firebaseHelpers';

import InputField from '../FormComponents/InputField';


const EditCollNameScreen = ({ collId }) => {

    const { currentUser } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('');


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
        <ModalContainer name='editCollNameScreen'>
            <InputField 
                inputType='text' 
                inputName='newCollName' 
                labelText='New name' 
                handleChange={e => handleText(e)} 
            />
            <StandardBtn onClick={changeName}>Change name</StandardBtn>
        </ModalContainer>
    )
}

export default EditCollNameScreen;