import styled from 'styled-components';
import theme from '../../utils/theme';

export const StyledForm = styled.form`
    width: 80%;
    max-width: 400px;
    padding: ${props => props.theme.space[5]};
    margin-top: ${props => props.theme.space[4]};
    border: 1px solid black;

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;