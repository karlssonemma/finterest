import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 15px;
    height: auto;
    margin: ${props => props.theme.space[3]} ${props => props.theme.space[1]};
`;

const IconBtn = ({ btnFunction, icon, label }) => {

    return(
        <StyledBtn aria-label={label} onClick={() => btnFunction()}>
            <Icon src={icon} />
        </StyledBtn>
    )
}

export default IconBtn;