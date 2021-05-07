import React from 'react';
import styled from 'styled-components';

import IconBtn from './Buttons/CloseBtn';


const Container = styled.li`

    animation: slideIn 1s;
    list-style: none;
    
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
    height: calc(100% - 80px);
    object-fit: cover;
`;

const ButtonField = styled.div`
    width: 100%;
    height: 80px;
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
            <ButtonField>
                <Close onClick={(item) => handleClick(item)}><Icon src={'/cancel.png'} /></Close>
            </ButtonField>
        </Container>
    )
}

export default ImageInCollection;