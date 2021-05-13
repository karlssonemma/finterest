import React from 'react';
import styled from 'styled-components';

import IconBtn from './Buttons/CloseBtn';


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

const ButtonField = styled.div`
    width: 100%;
    height: max-content;
    padding: ${props => props.theme.space[2]};

    position: absolute;
    bottom: 0;

    background-color: rgba(255,255,255, 0.8);
    visibility: hidden;

    &:hover {
        visibility: visible;
    }
`;

const Close = styled.button`
    background-color: transparent;
    border: none;

    //float tillfälligt
    float: right;
`;

const Icon = styled.img`
    width: 20px;
`;

const ImageInCollection = ({ item, handleClick }) => {

    return(
        <Container>
            <Photo src={item.url} />
            <ButtonField className='buttonField'>
                <Close onClick={(item) => handleClick(item)}><Icon src={'/cancel.png'} /></Close>
                <button>info</button>
            </ButtonField>
        </Container>
    )
}

export default ImageInCollection;