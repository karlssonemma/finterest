import React from 'react';

import styled from 'styled-components';
import SelectCollection from './SelectCollection';

const Container = styled.li`
    
`;

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

const ImageComp = ({ photoSrc }) => {

    return(
        <Container>
            <Photo src={photoSrc} />
            <ButtonField>
                <SelectCollection />
            </ButtonField>
        </Container>
    )
}

export default ImageComp;