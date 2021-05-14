import styled from 'styled-components';
import React from 'react';
import theme from '../utils/theme';

import SearchField from './SearchField';
import Menu from './Menu';
import { useRouter } from 'next/router';

const StyledNav = styled.header`
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
`;

const StyledMenuBtn = styled.button`
    padding: ${props => props.theme.space[1]};
    z-index: 100;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    border: 2px solid white;

    &:hover {
        border-color: black;
    }

    &.open_menu .menu-icon {
        transform: rotate(270deg);
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: ${props => props.theme.space[1]};
    pointer-events: none;
    transform: rotate(90deg);
`;

const Navigation = ({ handleInput }) => {

    const router = useRouter();
    let path = router.route;

 
    const handleMenu = (e) => {
        document.querySelector('#menu').classList.toggle('open');
        e.target.classList.toggle('open_menu');
        console.log(e.target)
    }

    return(
        <StyledNav>
            <p>Finterest</p>
            <SearchField handleInput={(e) => handleInput(e)} /> 
            
            <Menu />
            <StyledMenuBtn onClick={(e) => handleMenu(e)}>Menu<Icon className='menu-icon' aria-hidden='true' src={'/next.png'} /></StyledMenuBtn>
        </StyledNav>
    )
}

export default Navigation;