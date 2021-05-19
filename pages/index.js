import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import theme from '../utils/theme';
import HeaderLanding from '../components/HeaderLanding';
import { fetchRandomPhotos } from '../helpers/apiHelpers';


const StyledMain = styled.main`
  height: max-content;
  width: 100vw;

  padding: 0 ${props => props.theme.space[4]};

  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
    height: calc(100vh - 100px);
    grid-template-columns: 40% 60%;
  }
`;

const Quote = styled.p`
  padding-bottom: ${props => props.theme.space[2]};

  font-size: ${props => props.theme.fontSizes.xl};
`;

const Container = styled.section`
  min-height: 100%;
  max-width: 600px;
  padding: ${props => props.theme.space[4]};

  border-radius: 10px;
  background-color:rgba(255,255,255, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;

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
  color: black;
  text-decoration: none;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const BubbleImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0;
  animation: 1s show 1s forwards;

  &.bubble:first-child {
    animation-delay: 1.5s;
  }
  &.bubble:nth-child(2) {
    animation-delay: 2s;
    width: 100px;
    height: 100px;
  }
  &.bubble:nth-child(3) {
    animation-delay: 1s;
    width: 150px;
    height: 150px;
  }
  &.bubble:nth-child(4) {
    animation-delay: 1.25s;
    width: 500px;
    height: 500px;
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


export default function Home() {

  const [photos, setPhotos] = useState(null);

  useEffect(async () => {
    let photoArr = [];
    let resp = await fetchRandomPhotos(4);

    resp.response.map(item => {
      photoArr.push(item.urls.regular)
    })
    setPhotos(photoArr)
  }, [])


  return (
    <>
      <HeaderLanding />
        <StyledMain>
          
          <Container>
            <Quote>
              "Cupim sausage salami, drumstick chicken ball tip jowl pork belly shoulder hamburger turducken."
            </Quote>
            <Link href='/signup' passHref={true}>
              <StyledLink>Sign up now</StyledLink>
            </Link>
          </Container>
          <Grid>
            {
              photos && 
              <>
                <BubbleImg src={photos[0]} className='bubble' alt='' />
                <BubbleImg src={photos[1]} className='bubble' alt='' />
                <BubbleImg src={photos[2]} className='bubble' alt='' />
                <BubbleImg src={photos[3]} className='bubble' alt='' />
              </>
            }

          </Grid>
        </StyledMain>
    </>
    
  )
}
