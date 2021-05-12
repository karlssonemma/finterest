import styled from 'styled-components';

export const InputWithBorderBottom = styled.input`
    border: none;
    border-bottom: 2px solid black;

    text-align: center;
    padding: ${props => props.theme.space[2]};
    margin-bottom: ${props => props.theme.space[2]};
`;