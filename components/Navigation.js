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

    /* background-color: lightblue; */
    position: absolute;
    top: 0;
`;

const StyledMenuBtn = styled.button`
    z-index: 100;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &.open_menu {
        transform: rotate(180deg);
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
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
            <StyledMenuBtn onClick={(e) => handleMenu(e)}><Icon aria-hidden='true' src={'/next.png'} /></StyledMenuBtn>
        </StyledNav>
    )
}

export default Navigation;