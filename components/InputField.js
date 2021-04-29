import React from 'react';
import theme from '../utils/theme';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    padding: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};

    border: none;

    background-color: lightblue;
`;

const StyledLabel = styled.label`
    text-transform: uppercase;
`;

const InputField = (props) => {
    
    let { inputType, inputName, labelText, register } = props;

    return(
        <Container>
            <StyledLabel htmlFor={inputName}>{labelText}</StyledLabel>
            <StyledInput 
                type={inputType}
                name={inputName}
                {...register(inputName)}
            />
        </Container>
    )
}

export default InputField;