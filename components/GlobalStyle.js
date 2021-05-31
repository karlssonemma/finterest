import { createGlobalStyle } from 'styled-components';
import theme from '../utils/theme';

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: ${props => props.theme.fonts.manrope}
    }
`;