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

    border-bottom: 2px solid black;
`;

const StyledLabel = styled.label`
    padding-bottom: ${props => props.theme.space[0]};

    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes.xs};
    letter-spacing: ${props => props.theme.space[0]};
    color: rgba(0, 0, 0, 0.5);
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