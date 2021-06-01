import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import theme from '../utils/theme';


const StyledLink = styled.a`
    margin-top: ${props => props.theme.space[1]};
    font-family: ${props => props.theme.fonts.cardo};
    color: black;

    &:hover {
        color: blue;
    }
`;

const LinkLogInSignUp = ({ href, children }) => {

    return(
        <Link passHref={true} href={href}>
            <StyledLink>{children}</StyledLink>
        </Link>
    )
}

export default LinkLogInSignUp;