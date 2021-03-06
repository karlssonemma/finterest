import React from 'react';
import theme from '../../utils/theme';
import styled from 'styled-components';


const StyledInput = styled.input`
    padding: ${props => props.theme.space[1]} 0;
    margin-bottom: ${props => props.theme.space[1]};
    border: none;
    border-bottom: 1px solid black;
    color: darkgray;

    &::placeholder {
        color: darkgray;
        font-weight: 100;
    }
`;

const StyledLabel = styled.label`
    width: 100%;
    padding-bottom: ${props => props.theme.space[1]};

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

const InputField = (props) => {
    
    let { inputType, inputName, labelText, register, handleChange, ...other } = props;


    return(

            <StyledLabel><span>{labelText}</span>
            {
                register 
                ?
                    <StyledInput 
                        {...other}
                        type={inputType}
                        name={inputName}
                        {...register(inputName)}
                        onChange={handleChange ? (e) => handleChange(e) : null}
                    />
                : 
                    <StyledInput 
                        {...other}
                        type='text'
                        name={inputName}
                        onChange={handleChange ? (e) => handleChange(e) : null}
                    />
            }
            </StyledLabel>
    )
}

export default InputField;