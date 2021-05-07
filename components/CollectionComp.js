import React from 'react';

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.li`
    width: auto;
    //må ändras
    height: 200px;
    border: 2px solid black;

    list-style: none;
`;

const CollectionComp = ({ coll }) => {

    const handleClick = () => {
        console.log('hejejej')
    };

    return(
        <Container>
            <Link href={`/profile/${coll.id}`}>
                <a>
                    <p>{coll.name}</p>
                </a>
            </Link>
        </Container>
    )
}

export default CollectionComp;