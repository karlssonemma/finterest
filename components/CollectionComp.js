import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Link from 'next/link';
import theme from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { readPhotos } from '../helpers/firebaseHelpers';
import { fetchRandomPhotos } from '../helpers/apiHelpers';


// const StyledListItem = styled.li`
//     width: auto;
//     margin-bottom: ${props => props.theme.space[4]};
    
//     box-shadow: 0 0 10px lightgray;
//     background-color: white;
//     list-style: none;

//     position: relative;
// `;

const ThreePicContainer = styled.div`
    display: grid;
    /* width: 100%; */
    /* height: 80%; */

    grid-template-rows: 3, 1fr;
    grid-template-columns: repeat(3, 1fr);

    overflow: hidden;
    box-shadow: 0 0 10px lightgray;
`;

const OnePicContainer = styled.div`
    display: grid;
    /* width: 100%; */
    /* height: 80%; */
    overflow: hidden;
    box-shadow: 0 0 10px lightgray;
`;

const Shadow = styled.div`
    opacity: 1;
    width: 100%;
    height: 80%;

    position: absolute;
    transition: .2s;

    background-color: rgba(255,255,255, .3);
`;

const CollectionTitle = styled.p`
    height: max-content;
    margin-top: ${props => props.theme.space[0]};
    font-size: ${props => props.theme.fontSizes.lg};
    color: black;
    font-family: ${props => props.theme.fonts.cardo};
    
`;

const StyledLink = styled.a`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 80% 20%;

    transition: .2s;
    text-decoration: none;

    /* margin-bottom: ${props => props.theme.space[4]}; */
    
    background-color: white;
    list-style: none;

    position: relative;

    &:focus ${Shadow}, 
    :hover ${Shadow} {
        opacity: 0;
    }
    &:hover ${CollectionTitle} {
        text-decoration: underline;
    }
`;

const Pins = styled.span`
    font-size: ${props => props.theme.fontSizes.xs};
    display: block;
    color: black;
`;


const StyledImg = styled.img`
    width: 100%;
    min-height: 100%;
    height: auto;
    object-fit: cover;

    &:first-child {
        grid-column: span 2;
        grid-row: 1 / 3;
    }
    &:nth-child(2) {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
    }
    &:nth-child(3) {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
    }
`;


const CollectionComp = ({ coll }) => {

    const { currentUser } = useAuth();
    const [photos, setPhotos] = useState([]);
    const length = photos.length;


    useEffect(async () => {
        let photosRef = await readPhotos(currentUser.uid, coll.id);
        photosRef.limit(3).get()
        .then(query => {
            query.forEach(doc => {
                setPhotos(prevState => [...prevState, doc.data()])
            })
        })
    }, [])


    return(
        // <StyledListItem>
            <Link passHref={true} href={`/profile/${coll.id}`}>
                <StyledLink>
                    {
                        length < 3 
                        ? <OnePicContainer>
                            {
                                photos.map((item, i) => (i === 0) && 
                                    <StyledImg 
                                        alt=''
                                        src={item.url} 
                                        key={item.id} 
                                    />
                                )
                            }
                        <Shadow />
                        </OnePicContainer> 
                        : <ThreePicContainer>
                            {
                                photos.map((item, i) => (i < 3) && 
                                    <StyledImg 
                                        alt='' 
                                        src={item.url} 
                                        key={item.id} 
                                    />
                                )
                            }
                        <Shadow />
                        </ThreePicContainer> 
                    }
                    <div>
                        <CollectionTitle>{coll.name}</CollectionTitle>
                        <Pins>{length} Pin{length === 1 ? '' : 's'}</Pins>
                    </div>
                </StyledLink>
            </Link>
            
        // </StyledListItem>
    )
}

export default CollectionComp;