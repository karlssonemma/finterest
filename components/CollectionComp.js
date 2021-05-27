import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';
import theme from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { readPhotosFromCollection } from '../helpers/firebaseHelpers';
import { fetchRandomPhotos } from '../helpers/apiHelpers';


const StyledListItem = styled.li`
    width: auto;
    //må ändras
    height: 400px;
    margin-bottom: ${props => props.theme.space[4]};
    /* border-radius: 10px; */
    
    box-shadow: 0 0 10px lightgray;
    list-style: none;

    position: relative;
    overflow: hidden;
`;

const ThreePicContainer = styled.div`
    display: grid;
    width: 100%;
    height: 100%;

    grid-template-rows: 3, 1fr;
    grid-template-columns: repeat(3, 1fr);

    overflow: hidden;
`;

const OnePicContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const StyledLink = styled.a`
    width: 100%;
    height: 100%;
    font-size: ${props => props.theme.fontSizes.lg};
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255, .7);
    color: black;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s;

    &:focus, :hover {
        background-color: transparent;
    }
`;

const StyledImg = styled.img.attrs(props => {
    alt: ''
})`
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
    const [photos, setPhotos] = useState([]);


    useEffect(async () => {
            let photosRef = await readPhotosFromCollection(currentUser.uid, coll.id);
            photosRef.get()
            .then(query => {
                query.forEach(doc => {
                    setPhotos(prevState => [...prevState, doc.data()])
                })
            })
    }, [])


    return(
        <StyledListItem>
            {
                photos.length < 3 
                ? <OnePicContainer>
                    {
                        photos.map((item, i) => {
                            if(i === 0) {
                                return(
                                    <StyledImg src={item.url} className='backgroundImg' key={item.id} />
                                )
                            }
                        })
                    }
                </OnePicContainer> 
                : <ThreePicContainer>
                {
                    photos.map((item, i) => {
                        if(i < 3) {
                            return(
                                <StyledImg alt={item.alt_description} src={item.url} className='backgroundImg' key={item.id} />
                            )
                        }
                    })
                }
            </ThreePicContainer> 
            }
            <Link passHref={true} href={`/profile/${coll.id}`}>
                <StyledLink>{coll.name}</StyledLink>
            </Link>
        </StyledListItem>
    )
}

export default CollectionComp;