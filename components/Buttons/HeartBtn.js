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

    return(
        <StyledBtn type='submit'>
            <Icon src={'/outlined-heart.png'} />
        </StyledBtn>
    )
}

export default HeartBtn;