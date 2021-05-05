import React from 'react';

import styled from 'styled-components';

const StyledBtn = styled.button`
    background-color: transparent;
    border: none;
`;

const Icon = styled.img`
    width: 30px;
    height: auto;
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