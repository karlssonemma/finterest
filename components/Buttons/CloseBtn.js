import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    border: none;
    background-color: transparent;
    padding: ${props => props.theme.space[4]};

    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 20px;
    height: auto;
`;

const CloseBtn = ({ btnFunction, icon }) => {

    return(
        <StyledBtn onClick={() => btnFunction()} aria-label='Close window.'>
            <Icon src={icon} />
        </StyledBtn>
    )
}

export default CloseBtn;