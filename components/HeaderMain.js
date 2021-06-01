import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import theme from '../utils/theme';
import Link from 'next/link';

import SearchField from './SearchField';
import Menu from './Menu';
import { useRouter } from 'next/router';

const StyledHeader = styled.header`
    width: 100vw;
    height: 100px;
    padding: 0 ${props => props.theme.space[4]};

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: white;
    position: fixed;
    top: 0;
    z-index: 10;
    transition: .2s;

    &.border {
        box-shadow: 0px 8px 8px -8px rgba(0,0,0, 0.2);
        transition: .2s;
    }
`;

const Icon = styled.img`
    width: 18px;
    
    pointer-events: none;
    transform: rotate(90deg);
`;

const StyledMenuBtn = styled.button`
    padding: ${props => props.theme.space[1]};
    z-index: 100;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;

    border: 2px solid white;

    & span {
        margin-right: ${props => props.theme.space[1]};
        pointer-events: none;
    }

    &.open_menu ${Icon} {
        transform: rotate(270deg);
    }
`;

const LogoLink = styled.a`
    color: black;
    text-decoration: none;      
`;

const HeaderMain = ({ handleInput }) => {

    const router = useRouter();
    let path = router.route;
    const [scrolledToTop, setScrolledToTop] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 0 
                ? setScrolledToTop(false)
                : setScrolledToTop(true)
        })
    }, [])

    const handleMenu = (e) => {
        document.querySelector('#menu').classList.toggle('open');
        e.target.classList.toggle('open_menu');
    }

    return(
        <StyledHeader className={!scrolledToTop && 'border'}>
            
            <Link passHref={true} href='/home'>
                <LogoLink aria-label='Link to homepage'>Finterest</LogoLink>
            </Link>
            {
                router.asPath === '/profile' || router.asPath === '/home' ?  <SearchField handleInput={(e) => handleInput(e)} />  : ''
            }            
            <StyledMenuBtn 
                onClick={(e) => handleMenu(e)}
                
            >
                {
                    screen.width > 300 ? <span>Menu</span> : ''               
                }
                <Icon aria-hidden='true' src={'/next.png'} />
            </StyledMenuBtn>
            <Menu />
        </StyledHeader>
    )
}

export default HeaderMain;