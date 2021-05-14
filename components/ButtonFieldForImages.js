import styled from 'styled-components';


export const ButtonFieldForImages = styled.div`
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.space[3]};

    position: absolute;
    bottom: 0;

    visibility: hidden;
    background-color: rgba(0,0,0, 0.5);

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    &:hover {
        visibility: visible;
    }

`;