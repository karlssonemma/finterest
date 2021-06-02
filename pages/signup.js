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
    height: 100vh;

    display: grid;
    grid-template-columns: 100%;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        grid-template-columns: auto minmax(450px, 40%);
    }
`;

const Background = styled.div`
    display: none;
    padding: ${props => props.theme.space[3]};
    background: url("https://images.unsplash.com/photo-1621084355896-abf2ae1ae876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI2MjIyNTY&ixlib=rb-1.2.1&q=80&w=1080");
    background-size: cover;
    background-repeat: no-repeat;
    animation: 1s showImg;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    @keyframes showImg {
        0% {
            width: 0%;
        }
        100% {
            width: 100%
        }
    }
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

    useEffect(() => {
        let delay = 1;
        let formElements = document.querySelectorAll('.logInSignUpForm > *')

        for (const el of formElements) {
            el.style.animationDelay = `${delay}s`;
            delay += 0.10;
        }
    }, [])

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
        {/* <HeaderLanding /> */}
        <StyledMain>
            <Background />
            <StyledForm className='logInSignUpForm' onSubmit={handleSubmit(onSubmit)}>
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
                <StandardBtn style={{width: '100%'}} type='submit'>Sign up</StandardBtn>
            <LinkLogInSignUp href='/'>Already have an account? Log in</LinkLogInSignUp>
            </StyledForm>
        </StyledMain>
        </>
    )
}

export default SignUp;