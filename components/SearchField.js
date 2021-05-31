import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';

const StyledInput = styled.input`
    width: 120px;   
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[3]};

    border: none;
    border-bottom: 1px solid black;
    
    font-weight: 100;
    font-family: ${props => props.theme.fonts.cardo};
    text-align: center;
    
    background-color: transparent;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: auto;
    }
`;

const SearchField = ({ handleInput }) => {

    const router = useRouter();
    const placeHolder = router.asPath === '/home' ? 'search for images' : 'search collections'; 

    return(
        <StyledInput 
            placeholder={placeHolder}
            onChange={(e) => handleInput(e)}
            aria-label={placeHolder}
        />
    )
}

export default SearchField;