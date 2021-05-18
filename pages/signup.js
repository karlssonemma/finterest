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
import BigLogo from '../components/BigLogo';
import { Pagetitle } from '../components/Pagetitle';
import HeaderLanding from '../components/HeaderLanding';
import { StandardBtn } from '../components/Buttons/StandardBtn';
import FileInput from '../components/FormComponents/FileInput';
import { fetchOneRandomPhoto, getPhotosByColor } from '../helpers/apiHelpers';


const StyledMain = styled.main`
    width: 100vw;
    min-height: 100vh;

    background: url("https://images.unsplash.com/photo-1620503007227-b11daefacf0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjEzNDQwNjA&ixlib=rb-1.2.1&q=80&w=1080");

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
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
                await setProfilePic(user.user.uid, data.profilePic[0]);
                const users = await readUsers();
                users.doc(user.user.uid).set({
                    email: user.user.email,
                    id: user.user.uid,
                    username: user.user.displayName,
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
            {errors.confirmPassword && <p>{errors.confirmPassword.message }</p>}
            {errors.password && <p>{errors.password.message }</p>}
            {error}
            <StyledForm
                onSubmit={handleSubmit(onSubmit)}
                >
                <Pagetitle>Sign up</Pagetitle>
                <InputField 
                    inputName='username'
                    inputType='username'
                    labelText='Username'
                    register={register}
                />
                <InputField 
                    inputName='email'
                    inputType='email'
                    labelText='Email'
                    register={register}
                />
                <InputField 
                    inputName='password'
                    inputType='password'
                    labelText='Password'
                    register={register}
                />
                <InputField 
                    inputName='confirmPassword'
                    inputType='password'
                    labelText='Confirm password'
                    register={register}
                />
                <FileInput 
                    inputName='profilePic'
                    register={register}
                    labelText='Profile picture'
                />
                <StandardBtn type='submit'>Sign up</StandardBtn>
            </StyledForm>
            <Link href='/login'>
                <a>Already have an account? Click here to log in</a>
            </Link>
        </StyledMain>
        </>
    )
}

export default SignUp;