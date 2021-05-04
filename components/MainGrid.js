import styled from 'styled-components';

const MainGrid = styled.ul`
    width: 100%;
    height: max-content;
    margin-top: 100px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
`;

export default MainGrid;