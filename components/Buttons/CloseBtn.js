import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    outline: none;
    border: none;
    background-color: transparent;

    position: absolute;
    top: 20px;
    right: 20px;
`;

const Icon = styled.img`
    width: 20px;
    height: auto;
`;

const CloseBtn = ({ btnFunction }) => {

    return(
        <StyledBtn onClick={() => btnFunction()}>
            <Icon src ={'/cancel.png'} />
        </StyledBtn>
    )
}

export default CloseBtn;