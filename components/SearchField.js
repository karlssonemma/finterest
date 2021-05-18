import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';

const StyledInput = styled.input`
    width: 100px;   
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[3]};

    border: none;
    border: 1px solid black;

    background-color: transparent;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: auto;
    }
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