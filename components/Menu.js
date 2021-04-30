import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: green;
    display: none;

    &.open {
        display: block;
    }
`;

const Menu = () => {

    return(
        <StyledSection id='menu'>
            hej
        </StyledSection>
    )
}

export default Menu;