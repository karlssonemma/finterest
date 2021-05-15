import styled from 'styled-components';

const Overlay = styled.section`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    background-color: white;

    z-index: 100;
    display: none;

    &.visible {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

`;

export default Overlay;