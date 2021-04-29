import styled from 'styled-components';
import theme from '../utils/theme';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: green;

    padding: ${props => props.theme.space[2]};
`;