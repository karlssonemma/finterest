import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
    border: none;
    border-bottom: 1px solid black;
`;

const SearchField = () => {
    return(
        <StyledInput 
            placeholder='search'
        />
    )
}

export default SearchField;