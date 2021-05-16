import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';

const StyledInput = styled.input`
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[3]};
    border: none;
    border: 2px solid black;

    background-color: transparent;
`;

const SearchField = ({ handleInput }) => {

    const router = useRouter();
    const placeHolder = router.asPath === '/home' ? 'search' : 'search collections'; 
    return(
        <StyledInput 
            placeholder={placeHolder}
            onChange={(e) => handleInput(e)}
        />
    )
}

export default SearchField;