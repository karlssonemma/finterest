import React from 'react';

import styled from 'styled-components';
import SelectCollection from './SelectCollection';

const Container = styled.li`

    animation: slideIn 1s;
    list-style: none;
    height: 500px;
    width: 100%;
    position: relative;
    //??
    z-index: 0;

    @keyframes slideIn {
        0% {
            opacity: 0%;
            transform: translateX(-20deg)
        } 100% {
            opacity: 1;
            transform: translateX(0)
        }
    }
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover + .buttonField {
        visibility: visible;
    }
`;

const ButtonField = styled.div`
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    padding: ${props => props.theme.space[2]};
    background-color: rgba(255,255,255, 0.8);
    visibility: hidden;

    &:hover {
        visibility: visible;
    }
    
`;

const ImageComp = ({ item }) => {
    const { id, url, alt_description } = item;
    // console.log(item)

    return(
        <Container>
            <Photo src={url} alt={alt_description} />
            <ButtonField className='buttonField'>
                <SelectCollection item={item} />
            </ButtonField>
        </Container>
    )
}

export default ImageComp;