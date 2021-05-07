import styled from 'styled-components';
import theme from '../utils/theme';

export const Pagetitle = styled.h1`
    font-size: ${props => props.theme.fontSizes.lg};
    padding-bottom: ${props => props.theme.space[1]};
`;