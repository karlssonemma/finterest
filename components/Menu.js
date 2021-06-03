import React from 'react';

import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

import Link from 'next/link';

const StyledSection = styled.nav`
    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0px;
    right: 0px;

    background-color: white;
    box-shadow: 0px 0px 15px 5px rgba(0,0,0, 0.2);

    display: none;

    &.open {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: max-content;
        height: max-content;
        padding: 50px;
        right: 10px;
        top: 90px;
    }
    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        right: 90px;
        top: 90px;
    }
`;

const LogOut = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.lg};
    font-family: ${props => props.theme.fonts.cardo};

    &:hover {
        text-decoration: underline;
    }
`;

const StyledLink = styled.a`
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.lg};
    color: black;
    text-decoration: none;
    font-family: ${props => props.theme.fonts.cardo};

    &:hover {
        text-decoration: underline;
    }
`;

const MenuLink = ({ children, href }) => {
    return(
        <Link passHref={true} href={href}>
            <StyledLink>
                { children }
            </StyledLink>
        </Link>
    )
}

const Menu = () => {

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await logout();
            console.log('successful logout')
            router.push('/');
        } catch (e) {
            console.log('Failed to log out', e)
        }
    };

    return(
        <StyledSection id='menu' tabIndex={0}>
            <MenuLink href='/home'>Feed</MenuLink>
            <MenuLink href='/profile'>Profile</MenuLink>
            <LogOut onClick={() => handleLogOut()}>Log Out</LogOut>
        </StyledSection>
    )
}

export default Menu;