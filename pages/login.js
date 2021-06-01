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
import LinkLogInSignUp from '../components/LinkLogInSignUp';


const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        {/* <HeaderLanding /> */}
        <StyledMain>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Pagetitle>Welcome back</Pagetitle>
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
                <StandardBtn style={{width: '100%'}} type='submit'>Log in</StandardBtn>
            <LinkLogInSignUp href='/signup'>Don't have an account? Sign up</LinkLogInSignUp>
            </StyledForm>
        </StyledMain>
        </>

    )
}

export default LogIn;