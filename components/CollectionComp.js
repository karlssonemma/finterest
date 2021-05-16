import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';
import theme from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { readPhotosFromCollection } from '../helpers/firebaseHelpers';

const Container = styled.li`
    width: auto;
    //må ändras
    height: 400px;
    margin-bottom: ${props => props.theme.space[4]};
    border-radius: 10px;
    box-shadow: 0 0 10px lightgray;

    list-style: none;
    display: grid;
    /* align-items: center;
    justify-content: center; */
    grid-template-rows: 3, 1fr;
    grid-template-columns: repeat(3, 1fr);

    overflow: hidden;
    /* filter: brightness(200%); */

    
`;

const StyledLink = styled.a`
    font-size: ${props => props.theme.fontSizes.lg};
`;

const StyledImg = styled.img`
    width: 100%;
    min-height: 100%;
    height: auto;
    object-fit: cover;

    /* &.backgroundImg:first-child {
        grid-column: span 2;
        grid-row: 1 / 3;
    }
    &.backgroundImg:nth-child(2) {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
    }
    &.backgroundImg:nth-child(3) {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
    } */
`;


const CollectionComp = ({ coll }) => {

    const { currentUser } = useAuth();
    const [photos, setPhotos] = useState([]);

    useEffect(async () => {
        let photosRef = await readPhotosFromCollection(currentUser.uid, coll.id);
        photosRef.onSnapshot(query => {
            query.forEach(doc => {
                setPhotos(prevState => [...prevState, doc.data()])
            })
        })
    }, [])


    return(
        <Container>
            
            {
                photos.length && 
                <>
                    <StyledImg src={photos[0].url} className='backgroundImg' />
                    <StyledImg src={photos[1].url} className='backgroundImg' />
                    <StyledImg src={photos[2].url} className='backgroundImg' />
                </>
            }


            {/* <Link href={`/profile/${coll.id}`}>
                <StyledLink>{coll.name}</StyledLink>
            </Link> */}
        </Container>
    )
}

export default CollectionComp;