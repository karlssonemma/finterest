import React from 'react';
import styled from 'styled-components';


const Container = styled.li`

    animation: slideIn 1s;
    
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
    background-color: blue;
`;

const ImageInCollection = ({ item, handleClick }) => {

    return(
        <Container>
            <Photo src={item.url} />
            <ButtonField>
                <button onClick={(item) => handleClick(item)}>X</button>
            </ButtonField>
        </Container>
    )
}

export default ImageInCollection;