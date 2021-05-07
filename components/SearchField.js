import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[3]};
    border: none;
    border: 2px solid black;

    background-color: transparent;
`;

const SearchField = ({ handleInput }) => {
    return(
        <StyledInput 
            placeholder='search'
            onChange={(e) => handleInput(e)}
        />
    )
}

export default SearchField;