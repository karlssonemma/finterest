import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';
import theme from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { readPhotosFromCollection } from '../helpers/firebaseHelpers';


const StyledListItem = styled.li`
    width: auto;
    //må ändras
    height: 400px;
    margin-bottom: ${props => props.theme.space[4]};
    border-radius: 10px;
    
    box-shadow: 0 0 10px lightgray;
    list-style: none;

    position: relative;
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100%;

    grid-template-rows: 3, 1fr;
    grid-template-columns: repeat(3, 1fr);

    overflow: hidden;
    background-color: green;
`;

const StyledLink = styled.a`
    width: 100%;
    height: 100%;
    font-size: ${props => props.theme.fontSizes.lg};
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255, .7);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImg = styled.img`
    width: 100%;
    min-height: 100%;
    height: auto;
    object-fit: cover;

    &.backgroundImg:first-child {
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
    }
`;


const CollectionComp = ({ coll }) => {

    const { currentUser } = useAuth();
    const [photos, setPhotos] = useState(null);

    useEffect(async () => {
       let photoArr = [];
            let photosRef = await readPhotosFromCollection(currentUser.uid, coll.id);
            photosRef.onSnapshot(query => {
                query.forEach(doc => {
                    
                        photoArr.push(doc.data())
                    
                })
            })
            setPhotos(photoArr);
    }, [])


    return(
        <StyledListItem>
        <Container>
            {
                photos && photos.map((item, i) => 
                    console.log('hfnrjkfnkr')
                )
                    
                
            }
            <StyledImg src="https://images.unsplash.com/photo-1620503007227-b11daefacf0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjEzNDQwNjA&ixlib=rb-1.2.1&q=80&w=1080" className='backgroundImg' />
            <StyledImg src="https://images.unsplash.com/photo-1620503007227-b11daefacf0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjEzNDQwNjA&ixlib=rb-1.2.1&q=80&w=1080" className='backgroundImg' />
            <StyledImg src="https://images.unsplash.com/photo-1620503007227-b11daefacf0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjUyMjZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjEzNDQwNjA&ixlib=rb-1.2.1&q=80&w=1080" className='backgroundImg' />
        </Container>
            <Link href={`/profile/${coll.id}`}>
                <StyledLink><span>{coll.name}</span></StyledLink>
            </Link>
        </StyledListItem>
    )
}

export default CollectionComp;