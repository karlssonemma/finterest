import React, { useState } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

import InputField from '../components/FormComponents/InputField';
import { StyledForm } from '../components/FormComponents/StyledForm';
import { StandardBtn } from '../components/Buttons/StandardBtn';
import BigLogo from '../components/BigLogo';
import { Pagetitle } from '../components/Pagetitle';
import HeaderLanding from '../components/HeaderLanding';
import { ErrorMessage } from '../components/ErrorMessage';

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


const LogIn = () => {

    const { login, currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setError('')
            setLoading(true)
            const user = await login(data.email, data.password)
            console.log(user)
            // console.log('SUCCESSful login!!', user.user.email)
            router.push('/home')
        } catch (error) {
            setError('Failed to log in', error)
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <>
        <HeaderLanding />
        <StyledMain>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Pagetitle>Log In</Pagetitle>
                {error && <ErrorMessage>{error}</ErrorMessage>}
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
                <StandardBtn type='submit'>Log in</StandardBtn>
            </StyledForm>
            <Link href='/signup'>
                <a>Dont have an account? Click here to create one</a>
            </Link>
        </StyledMain>
        </>

    )
}

export default LogIn;