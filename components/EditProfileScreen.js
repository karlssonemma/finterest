import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Overlay from '../components/Overlay';
import CloseBtn from './Buttons/CloseBtn';
import StandardBtn from './Buttons/StandardBtn';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { useForm } from 'react-hook-form';
import { InputWithBorderBottom } from '../components/InputWithBorderBottom';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const EditProfileScreen = ({ item }) => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();


    const closeWindow = () => {
        let item = document.querySelector('.editProfileWindow')
        item.classList.toggle('visible');
    };

    const handleText = (e) => {
        setText(e.target.value)
    };

    const updateProfile = () => {
        console.log('updated')
    }

    const onSubmit = async (data) => {
        console.log(data.pic[0])
        let ref = firebaseInstance.storage().ref('profilePictures')
        let sunsetRef = ref.child(currentUser.uid)
        sunsetRef.put(data.pic[0]).then(() => {
            console.log('did it!!')
        })
    }



    return (
        <Overlay className='editProfileWindow'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputWithBorderBottom
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={e => handleText(e)}
                    {...register('username')}
                />
                <InputWithBorderBottom 
                    type='text' 
                    name='display-name' 
                    placeholder='Display name' 
                    {...register('display-name')} 
                />
                <input 
                    name='pic'
                    type='file' 
                    onChange={e => setPicture(e.target.value)} 
                    {...register('pic')} 
                />
                <StandardBtn type='submit'>Create coll</StandardBtn>
            </StyledForm>
        </Overlay>
    )
}

export default EditProfileScreen;