import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';
import theme from '../utils/theme';

const Container = styled.li`
    width: auto;
    //må ändras
    height: 200px;
    border: 2px solid black;

    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    
    margin-bottom: ${props => props.theme.space[4]};
`;

const StyledLink = styled.a`
    font-size: ${props => props.theme.fontSizes.lg};
`;

const CollectionComp = ({ coll }) => {


    return(
        <Container>
            <Link href={`/profile/${coll.id}`}>
                <StyledLink>{coll.name}</StyledLink>
            </Link>
        </Container>
    )
}

export default CollectionComp;