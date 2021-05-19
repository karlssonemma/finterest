import React, { Children, useEffect } from 'react';

import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';


const StyledHeader = styled.header`
    width: 100vw;
    height: 100px;
    padding: 0 ${props => props.theme.space[4]};

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: transparent;

`;

const StyledLink = styled.a`
    margin-left: ${props => props.theme.space[1]};
    cursor: pointer;
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    &.active {
        text-decoration: underline;
    }
`;

const NavLink = ({ link, children }) => {

    const router = useRouter();

    return(
        <Link href={link} passHref={true}>
            <StyledLink className={router.asPath === link ? 'active' : ''}>{children}</StyledLink>
        </Link>
    )
}
 
const HeaderLanding = () => {

    return(
        <StyledHeader>
            <p>Finterest</p>
            <nav>
                <NavLink link='/signup'>Sign Up</NavLink>
                <NavLink link='/login'>Log In</NavLink>
            </nav>
        </StyledHeader>
    )
}

export default HeaderLanding;