import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

import ModalContainer from '../ModalContainer';
import { StandardBtn } from '../Buttons/StandardBtn';
import { checkIfUsernameExists, readCurrentUser, setProfilePic } from '../../helpers/firebaseHelpers';
import InputField from '../FormComponents/InputField';
import FileInput from '../FormComponents/FileInput';
import { ErrorMessage } from '../ErrorMessage';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [updated, setUpdated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const closeWindow = () => {
        console.log('cliked')
        let item = document.querySelector('.editProfileWindow')
        item.classList.remove('visible');
    };

    const handleName = (e) => {
        setName(e.target.value)
        setError('');
        setUpdated(false)
    };

    const handleUsername = (e) => {
        setUsername(e.target.value)
        setError('');
        setUpdated(false)
    };


    const onSubmit = async (data) => {
        let userNameAlreadyExists = await checkIfUsernameExists(data.username);
        
        if(!userNameAlreadyExists) {
            let user = await readCurrentUser(currentUser.uid)
            if(data.username) {
                user.update({
                    username: data.username
                })
            }
            if (data.name) {
                user.update({
                    displayName: data.name
                })
                currentUser.updateProfile({
                    displayName: data.name
                })
            }
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <StyledForm onSubmit={handleSubmit(onSubmit)}>                
                <InputField 
                    inputType='text' 
                    inputName='username' 
                    labelText='Username' 
                    handleChange={e => handleUsername(e)} 
                    register={register}
                    placeholder='username'
                    minLength='5'
                />
                <InputField 
                    inputType='name' 
                    inputName='name' 
                    labelText='Name' 
                    handleChange={e => handleName(e)} 
                    register={register}
                    placeholder='name'
                    minLength='4'
                />
                <FileInput 
                    labelText='Profile picture'
                    inputName='pic'
                    handleChange={e => setPicture(e.target.value)} 
                    register={register}
                />
                <StandardBtn type='submit'>Submit changes</StandardBtn>
            </StyledForm>
            {updated && <ProfileUpdated />}
        </ModalContainer>
    )
}

export default EditProfileScreen;