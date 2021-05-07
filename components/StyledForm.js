import styled from 'styled-components';
import theme from '../utils/theme';

export const StyledForm = styled.form`
    width: 80%;
    max-width: 500px;
    padding: ${props => props.theme.space[4]};
    margin-top: ${props => props.theme.space[4]};

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightgray;
`;