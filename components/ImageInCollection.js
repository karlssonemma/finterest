import React from 'react';
import styled from 'styled-components';
import { ButtonFieldForImages } from './ButtonFieldForImages';

import IconBtn from './Buttons/IconBtn';


const Container = styled.li`

    animation: slideIn 1s;
    list-style: none;
    position: relative;
    
    @keyframes slideIn {
        0% {
            opacity: 0%;
            transform: translateX(-20deg)
        } 100% {
            opacity: 100%;
            transform: translateX(0)
        }
    }
`;
//kopia av comp i ImageComp, borde gøras till egen comp
const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover + .buttonField {
        visibility: visible;
    }
`;


const ImageInCollection = ({ item, handleClick }) => {
    console.log(item)

    return(
        <Container>
            <Photo src={item.url} />
            <ButtonFieldForImages className='buttonField'>
                <IconBtn 
                    icon='/info.png' 
                    white={true} 
                    label='Info about the photo.' 
                />
                <IconBtn 
                    icon='/cancel.png' 
                    btnFunction={item => handleClick(item)} 
                    white={true}
                    label='Delete photo from collection.'
                />
            </ButtonFieldForImages>
        </Container>
    )
}

export default ImageInCollection;