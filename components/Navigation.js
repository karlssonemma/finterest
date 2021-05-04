import styled from 'styled-components';
import React from 'react';
import theme from '../utils/theme';

import SearchField from './SearchField';
import Menu from './Menu';

const StyledNav = styled.nav`
    width: 100vw;
    height: 100px;
    padding: 0 ${props => props.theme.space[1]};

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: lightblue;
    position: absolute;
    top: 0;
`;

const StyledMenuBtn = styled.button`
    z-index: 100;
`;

const Navigation = ({ handleInput }) => {

    const handleMenu = () => {
        document.querySelector('#menu').classList.toggle('open');
    }

    return(
        <StyledNav>
            <p>L</p>
            <SearchField handleInput={(e) => handleInput(e)} />
            <Menu />
            <StyledMenuBtn onClick={handleMenu}>V</StyledMenuBtn>
        </StyledNav>
    )
}

export default Navigation;