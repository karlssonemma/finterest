import styled from 'styled-components';
import theme from '../utils/theme';

export const ErrorMessage = styled.p`
    margin-bottom: ${props => props.theme.space[4]};
    font-size: ${props => props.theme.fontSizes.s};
    font-weight: 100;
    color: gray;
`;