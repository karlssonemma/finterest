import styled from 'styled-components';


export const ButtonFieldForImages = styled.div`
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.space[3]};

    position: absolute;
    bottom: 0;

    opacity: 0;
    background-color: rgba(0,0,0, 0.5);

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &.visibleBtnField {
        opacity: 1
    }
    &:hover {
        opacity: 1
    }

    /* &:hover {
        opacity: 1;
    }
    &:focus {
        opacity: 1;
    } */

`;