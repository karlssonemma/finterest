import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { checkIfUsernameExists, readCurrentUser, setProfilePic } from '../../helpers/firebaseHelpers';
import InputField from '../FormComponents/InputField';
import FileInput from '../FormComponents/FileInput';

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
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [updated, setUpdated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const closeWindow = () => {
        console.log('cliked')
        let item = document.querySelector('.editProfileWindow')
        item.classList.remove('visible');
    };

    const handleText = (e) => {
        setText(e.target.value)
        console.log('hbfjhnrjkflmr')
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
            {error && <p>{error}</p>}
            <StyledForm onSubmit={handleSubmit(onSubmit)}>                
                <InputField 
                    inputType='text' 
                    inputName='username' 
                    labelText='New username' 
                    handleChange={e => handleText(e)} 
                    register={register}
                />
                <FileInput 
                    labelText='New profile picture'
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