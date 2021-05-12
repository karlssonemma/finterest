import React, { useEffect } from 'react';

import Link from 'next/link';
import styled from 'styled-components';


const StyledHeader = styled.header`
    width: 100vw;
    height: 100px;
    padding: 0 ${props => props.theme.space[4]};

    display: flex;
    align-items: center;
    justify-content: space-between;

    /* background-color: lightblue; */
    position: fixed;
    top: 0;
`;

const StyledLink = styled.a`
    margin-left: ${props => props.theme.space[1]};
`;

const HeaderLanding = () => {

    return(
        <StyledHeader>
            <p>Finterest</p>
            <nav>
                <Link href='/signup'>
                    <StyledLink>Sign Up</StyledLink>
                </Link>
                <Link href='/login'>
                    <StyledLink>Log In</StyledLink>
                </Link>
            </nav>
        </StyledHeader>
    )
}

export default HeaderLanding;