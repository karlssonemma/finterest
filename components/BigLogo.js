import React from 'react';
import styled from 'styled-components';

const Logo = styled.h1`
    font-size: ${props => props.theme.fontSizes.xl};
    font-family: ${props => props.theme.fonts.cardo};
`;

const BigLogo = () => {
    
    return(
        <Logo>Finterest</Logo>
    )
}

export default BigLogo;