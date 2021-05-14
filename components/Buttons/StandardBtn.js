import styled from 'styled-components';

import theme from '../../utils/theme';

const StandardBtn = styled.button`
    padding: ${props => props.theme.space[1]} ${props => props.theme.space[2]};
    border: 2px solid gray;
    cursor: pointer;
    color: gray;
    background-color: transparent;

    &:hover {
        border: 2px solid black;
        color: black;
    }
`;

export default StandardBtn;