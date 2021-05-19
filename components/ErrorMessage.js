import styled from 'styled-components';
import theme from '../utils/theme';

export const ErrorMessage = styled.p`
    margin-bottom: ${props => props.theme.space[4]};
    font-size: ${props => props.theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: .2em;
    font-weight: 100;
    color: red;
`;