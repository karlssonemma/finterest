import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import firebaseInstance, { auth } from '../../config/firebase';
import { useForm } from 'react-hook-form';
import { InputWithBorderBottom } from '../FormComponents/InputWithBorderBottom';
import { checkIfUsernameExists, readCurrentUser, setProfilePic } from '../../helpers/firebaseHelpers';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FileInput = styled.input`
    margin-bottom: ${props => props.theme.space[2]};
    color: gray;

    &::file-selector-button {
        padding: ${props => props.theme.space[1]};
        font-family: 'Manrope', sans-serif;
        border: 2px solid black;
        cursor: pointer;
        color: black;
        background-color: transparent;
        margin-right: ${props => props.theme.space[2]};
    }
    
    &:hover::file-selector-button {
        background-color: black;
        color: white;
    }
`;

const Check = styled.img`
    width: 20px;
    margin-left: ${props => props.theme.space[1]};
    transform: translateY(-2px);
`;

const ProfileUpdated = () => {

    return(
        <div style={{height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p>Profile successfully updated!</p>
            <Check alt='' src={'/check.png'} />
        </div>
    )
}

const EditProfileScreen = ({ item }) => {

    const { currentUser } = useAuth()
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [updated, setUpdated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const closeWindow = () => {
        let item = document.querySelector('.editProfileWindow')
        item.classList.toggle('visible');
    };

    const handleText = (e) => {
        setText(e.target.value)
    };


    const onSubmit = async (data) => {
        console.log(data)
        let userNameAlreadyExists = await checkIfUsernameExists(data.username);
        
        if(!userNameAlreadyExists) {
            let user = await readCurrentUser(currentUser.uid)
            user.update({
                username: data.username
            })
            currentUser.updateProfile({
                displayName: data.username
            })
            if (data.pic.length) {
                await setProfilePic(currentUser.uid, data.pic[0]);
            }
            setUpdated(true);
        } else {
            setError('username already exists')
        }
    }



    return (
        <ModalContainer name='editProfileWindow'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            {error && <p>{error}</p>}
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputWithBorderBottom
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={e => handleText(e)}
                    {...register('username')}
                />
                {/* <InputWithBorderBottom 
                    type='text' 
                    name='display-name' 
                    placeholder='Display name' 
                    {...register('display-name')} 
                /> */}
                
                <FileInput 
                    name='pic'
                    type='file' 
                    onChange={e => setPicture(e.target.value)} 
                    {...register('pic')} 
                />
                <StandardBtn type='submit'>Submit changes</StandardBtn>
            </StyledForm>
            {updated && <ProfileUpdated />}
        </ModalContainer>
    )
}

export default EditProfileScreen;