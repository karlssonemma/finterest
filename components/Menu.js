import React from 'react';

import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

import Link from 'next/link';

const StyledSection = styled.section`
    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    right: 0;

    background-color: white;

    display: none;

    &.open {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
            width: max-content;
            height: max-content;
            padding: 50px;

            top: 100px;

            border: 2px solid black;
        }
    }
`;


const StyledLink = styled.a`
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.lg};

    &:hover {
        text-decoration: underline;
    }
`;

const Menu = () => {

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await logout();
            console.log('successful logout')
            router.push('/login');
        } catch (e) {
            console.log('Failed to log out', e)
        }
    };

    return(
        <StyledSection id='menu'>
            <Link href='/home'>
                <StyledLink>Feed</StyledLink>
            </Link>
            <Link href='/profile'>
                <StyledLink>Profile</StyledLink>
            </Link>
            <StyledLink onClick={handleLogOut}>Log Out</StyledLink>
           
        </StyledSection>
    )
}

export default Menu;