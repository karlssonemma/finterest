import styled from 'styled-components';
import theme from '../utils/theme';

const ImageGrid = styled.ul`
    width: 100%;
    padding: 0 20px;
    z-index: 0;
    gap: 10px;

    display:grid;
    grid-template-columns: 1fr;

    @media screen and (min-width: ${props => props.theme.breakpoints[0]}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(4, 1fr);
        padding: 0 100px;
    }
`;

export default ImageGrid;