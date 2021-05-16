import styled from 'styled-components';
import theme from '../utils/theme';

const MainGrid = styled.ul`
    width: 100%;
    /* margin-top: 100px; */
    padding: ${props => props.theme.space[4]};
    z-index: 0;
    gap: 60px;

    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: ${props => props.theme.breakpoints[2]}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export default MainGrid;