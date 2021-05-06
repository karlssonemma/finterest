import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    outline: none;
    border: none;
    background-color: transparent;
`;

const Icon = styled.img`
    width: 20px;
    height: auto;
`;

const CloseBtn = ({ btnFunction, icon }) => {

    return(
        <StyledBtn onClick={() => btnFunction()}>
            <Icon src='/cancel.png' />
        </StyledBtn>
    )
}

export default CloseBtn;