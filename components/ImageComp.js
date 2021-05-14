import React from 'react';

import styled from 'styled-components';
import SelectCollection from './SelectCollection';
import { ButtonFieldForImages } from '../components/ButtonFieldForImages';
import IconBtn from './Buttons/IconBtn';

const Container = styled.li`

    animation: slideIn 1s;
    list-style: none;
    height: 500px;
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

const ImageComp = ({ item }) => {
    const { id, url, alt_description } = item;
    // console.log(item)

    return(
        <Container>
            <Photo src={url} alt={alt_description} />
            <ButtonFieldForImages className='buttonField'>
                    <IconBtn 
                        icon='/info.png'
                        white={true}
                        label='Info about the photo.'
                    />
                    <SelectCollection item={item} />
            </ButtonFieldForImages>
        </Container>
    )
}

export default ImageComp;