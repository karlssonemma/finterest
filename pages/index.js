import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import theme from '../utils/theme';
import HeaderLanding from '../components/HeaderLanding';
import { fetchOneRandomPhoto } from '../helpers/apiHelpers';



const StyledMain = styled.main`
  height: calc(100vh - 100px);
  width: 100vw;
  margin-top: 100px;
  padding: 0 ${props => props.theme.space[4]};

  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  
  display: flex;
  align-items: center;
`;

const Quote = styled.p`
  padding-bottom: ${props => props.theme.space[2]};

  font-size: ${props => props.theme.fontSizes.xl};
`;

const Container = styled.section`
  height: max-content;
  max-width: 600px;
  padding: ${props => props.theme.space[2]};

  border-radius: 10px;
  background-color: lightgreen;
`;

const StyledLink = styled.a`
  width: max-content;
  height: max-content;
  border: 2px solid black;
  padding: ${props => props.theme.space[1]} ${props => props.theme.space[5]};
  
  display: block;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.s};
  cursor: pointer;
`;


export default function Home() {

  const [photo, setPhoto] = useState({ url: 'https://images.unsplash.com/photo-1619857154353-eff1ffd9ffe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjA2MzU4MDE&ixlib=rb-1.2.1&q=80&w=1080' });

  // useEffect(async() => {
  //   try {
  //     let resp = await fetchOneRandomPhoto()
  //     console.log(resp)
  //     setPhoto({ id: resp.response[0].id, url: resp.response[0].urls.regular })

  //   } catch(e) {
  //     console.log('Couldnt fetch photo', e)
  //   }
  // }, [])

  return (
    <>
      <HeaderLanding />
      {
        photo && 
        <StyledMain>
          <Container>
            <Quote>
              "Cupim sausage salami, drumstick chicken ball tip jowl pork belly shoulder hamburger turducken."
            </Quote>
            <Link href='/signup'>
              <StyledLink>Sign up now</StyledLink>
            </Link>
          </Container>
        </StyledMain>
      }
    </>
    
  )
}
