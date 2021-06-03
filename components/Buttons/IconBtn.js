import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 18px;
    height: auto;

    &.white {
        filter: invert(100%);
    }
`;

const IconBtn = (props) => {

    const { btnFunction, icon, label, white } = props;

     return(
        <StyledBtn aria-label={label} onClick={() => btnFunction()}>
            <Icon src={icon} className={white ? 'white' : ''} alt='' />
        </StyledBtn>
    )
}

export default IconBtn;