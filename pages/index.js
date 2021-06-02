import React, { useState, useEffect } from 'react';

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
import { ErrorMessage } from '../components/ErrorMessage';
import LinkLogInSignUp from '../components/LinkLogInSignUp';
import { fetchRandomPhotos } from '../helpers/apiHelpers';


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

// const Shadow = styled.div`
//     opacity: 1;
//     width: 60%;
//     height: 100%;

//     position: absolute;
//     transition: .2s;

//     background-color: rgba(0,0,0, .3);
// `;



const LogIn = () => {

    const { login, currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState(null);
    let delay = 0.25;

    // useEffect(async () => {
    //     let photoArr = [];
    //     let resp = await fetchRandomPhotos(4);

    //     resp.response.map(item => {
    //         photoArr.push(item.urls.regular)
    //     })
    //     setPhotos(photoArr)
    // }, [])


    useEffect(() => {
        let delay = 1;
        let formElements = document.querySelectorAll('.logInSignUpForm > *')

        for (const el of formElements) {
            el.style.animationDelay = `${delay}s`;
            delay += 0.10;
        }
    }, [])

    const onSubmit = async (data) => {
        console.log(data)
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

        <StyledMain>
            <Background className='bubbleGrid'>
                {/* <Shadow /> */}
            </Background>
            <StyledForm className='logInSignUpForm' onSubmit={handleSubmit(onSubmit)}>
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