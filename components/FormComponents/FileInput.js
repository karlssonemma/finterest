import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    margin-bottom: ${props => props.theme.space[2]};
    color: gray;

    &::file-selector-button {
        padding: ${props => props.theme.space[1]};
        font-family: 'Manrope', sans-serif;
        border: 1px solid black;
        cursor: pointer;
        color: black;
        background-color: transparent;
        margin-right: ${props => props.theme.space[2]};
    }

    &:hover::file-selector-button {
        background-color: black;
        color: white;
    }
`;


const StyledLabel = styled.label`
    width: 100%;
    padding-bottom: ${props => props.theme.space[0]};

    display: flex;
    flex-direction: column;

    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes.xs};
    letter-spacing: ${props => props.theme.space[0]};
    color: rgba(0, 0, 0, 0.5);
    color: black;

    & span {
        margin-bottom: ${props => props.theme.space[0]};
    }
`;


const FileInput = ({ labelText, handleChange, inputName, register }) => {

    return(
        <StyledLabel><span>{labelText}</span>
            <StyledInput 
                type='file'
                name={inputName}
                onChange={e => handleChange(e.target.value)} 
                {...register(inputName)} 
            />
        </StyledLabel>
    )
};

export default FileInput;