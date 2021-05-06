import React from 'react';

import styled from 'styled-components';
import SelectCollection from './SelectCollection';

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

const Photo = styled.img`
    width: 100%;
    height: calc(100% - 80px);
    object-fit: cover;
`;

const ButtonField = styled.div`
    width: 100%;
    height: 80px;
    padding: 0 ${props => props.theme.space[2]};
    background-color: blue;
`;

const ImageComp = ({ item }) => {
    const { id, url } = item;
    // console.log(item)

    return(
        <Container>
            <Photo src={url} />
            <ButtonField>
                <SelectCollection item={item} />
            </ButtonField>
        </Container>
    )
}

export default ImageComp;