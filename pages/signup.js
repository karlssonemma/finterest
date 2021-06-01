import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/FormComponents/InputField';
import { StyledForm } from '../components/FormComponents/StyledForm';
import { checkIfUsernameExists, readUsers, setProfilePic } from '../helpers/firebaseHelpers';
import { Pagetitle } from '../components/Pagetitle';
import HeaderLanding from '../components/HeaderLanding';
import { StandardBtn } from '../components/Buttons/StandardBtn';
import FileInput from '../components/FormComponents/FileInput';
import { ErrorMessage } from '../components/ErrorMessage';
import LinkLogInSignUp from '../components/LinkLogInSignUp';

const StyledMain = styled.main`
    width: 100vw;
    min-height: calc(100vh - 100px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const SignUp = () => {

    const schema = object().shape({
        email: string().required(),
        password: string().min(6, 'Password must be at least 6 characters').max(15).required(),
        confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
        username: string().min(5).max(15)
    })

    const { signup, currentUser, isAuthenticated } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data) => {
        let userNameAlreadyExists = await checkIfUsernameExists(data.username);
        if (!userNameAlreadyExists) {
            try {
                setError('')
                setLoading(true)
                const user = await signup(data.email, data.password, data.username)
                console.log('SUCCESS!!', user)
                if(data.profilePic.length > 0) {
                    await setProfilePic(user.user.uid, data.profilePic[0]);
                }
                const users = await readUsers();
                users.doc(user.user.uid).set({
                    email: user.user.email,
                    id: user.user.uid,
                    username: user.user.displayName,
                    displayName: user.user.displayName,
                    signedUp: new Date().toLocaleDateString()
                })
                router.push('/profile')
            } catch (error) {
                setError('Failed to create account', error)
                console.log(error)
            }
            setLoading(false)
        } else {
            setError('username already exists')
        }
    }


    return(
        <>
        <HeaderLanding />
        <StyledMain>

            <StyledForm
                onSubmit={handleSubmit(onSubmit)}
                >
                <Pagetitle>Sign up</Pagetitle>
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message }</ErrorMessage>}
                {errors.password && <ErrorMessage>{errors.password.message }</ErrorMessage>}
                <ErrorMessage>{error}</ErrorMessage>
                <InputField 
                    inputName='username'
                    inputType='text'
                    labelText='Username *'
                    register={register}
                />
                <InputField 
                    inputName='email'
                    inputType='email'
                    labelText='Email *'
                    register={register}
                />
                <InputField 
                    inputName='password'
                    inputType='password'
                    labelText='Password *'
                    register={register}
                />
                <InputField 
                    inputName='confirmPassword'
                    inputType='password'
                    labelText='Confirm password *'
                    register={register}
                />
                <FileInput 
                    inputName='profilePic'
                    register={register}
                    labelText='Profile picture'
                />
                <StandardBtn type='submit'>Sign up</StandardBtn>
            </StyledForm>
            <LinkLogInSignUp href='/login'>Already have an account? Click here to log in</LinkLogInSignUp>
        </StyledMain>
        </>
    )
}

export default SignUp;