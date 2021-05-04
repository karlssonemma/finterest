import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled(Link)`
    width: auto;
    height: auto;
    border: 1px solid black;
    background-color: blue;
`;

const CollectionComp = ({ coll }) => {

    const handleClick = () => {
        console.log('hejejej')
    };

    return(
        <Container href={`/profile/${coll.id}`}>
            <p>{coll.name}</p>
        </Container>
    )
}

export default CollectionComp;