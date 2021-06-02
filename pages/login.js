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
import HeaderLanding from '../components/HeaderLanding';
import { ErrorMessage } from '../components/ErrorMessage';
import LinkLogInSignUp from '../components/LinkLogInSignUp';
import { fetchRandomPhotos } from '../helpers/apiHelpers';



const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: green;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr); */
`;

const BubbleImg = styled.img`
  /* width: 200px;
  height: 200px; */
  object-fit: cover;
  border-radius: 50%;
  opacity: 0;
  animation: 1s show 1s forwards;
  position: absolute;

  &.bubble:first-child {
    animation-delay: 1.5s;
  }
  &.bubble:nth-child(2) {
    animation-delay: 2s;
    /* width: 100px;
    height: 100px; */
  }
  &.bubble:nth-child(3) {
    animation-delay: 1s;
    /* width: 150px;
    height: 150px; */
  }
  &.bubble:nth-child(4) {
    animation-delay: 1.25s;
    /* width: 500px;
    height: 500px; */
    grid-column: 1 / 4;
  }

  @keyframes show {
    0% {
      transform: translateY(20px)
    }
    100% {
      transform: translateY(-0px);
      opacity: 1;
    }
  }
`;


const LogIn = () => {

    const { login, currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState(null);

    // useEffect(async () => {
    //     let photoArr = [];
    //     let resp = await fetchRandomPhotos(4);

    //     resp.response.map(item => {
    //         photoArr.push(item.urls.regular)
    //     })
    //     setPhotos(photoArr)
    // }, [])

    useEffect(() => {
        setPhotos(["https://images.unsplash.com/photo-1621084355896-abf2ae1ae876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI2MjIyNTY&ixlib=rb-1.2.1&q=80&w=1080", "https://images.unsplash.com/photo-1621205951147-07c75c234094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI2MjIyNTY&ixlib=rb-1.2.1&q=80&w=1080", "https://images.unsplash.com/photo-1621844068572-ad43430dee4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI2MjIyNTY&ixlib=rb-1.2.1&q=80&w=1080", "https://images.unsplash.com/photo-1622221611544-ae67d32d67cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI2MjIyNTY&ixlib=rb-1.2.1&q=80&w=1080"])
    }, [])

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

    const getRandomArbitrary = (max, min) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const renderBubble = (item, i) => {

        let maxWidth = document.querySelector('.bubbleGrid').clientWidth;
        let maxHeight = document.querySelector('.bubbleGrid').clientHeight;
        let size = getRandomArbitrary(400, 50);

        const styles = {
            width: size + 'px',
            height: size + 'px',
            left: getRandomArbitrary((maxWidth - size), 0) + 'px',
            top: getRandomArbitrary((maxHeight - size), 0) + 'px',
        }

        return(
            <BubbleImg key={i} src={item} alt='' className='bubble' style={styles} />
        )
    }



    return(
        <>
        {/* <HeaderLanding /> */}

        <StyledMain>
            <Grid className='bubbleGrid'>
                {
                    photos && photos.map((item, i) => renderBubble(item, i))
                }
                {/* {
                photos && 
                <>
                    <BubbleImg src={photos[0]} className='bubble' alt='' />
                    <BubbleImg src={photos[1]} className='bubble' alt='' />
                    <BubbleImg src={photos[2]} className='bubble' alt='' />
                    <BubbleImg src={photos[3]} className='bubble' alt='' />
                </>
                } */}

            </Grid>
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