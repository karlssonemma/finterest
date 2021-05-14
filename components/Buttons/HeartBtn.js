import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 25px;
    height: auto;
    filter: invert(100%);
`;

const HeartBtn = ({ filled }) => {

    let photoSrc = filled ? '/filled-heart.png' : '/outlined-heart.png';

    return(
        <StyledBtn type='submit'>
            <Icon src={photoSrc} />
        </StyledBtn>
    )
}

export default HeartBtn;