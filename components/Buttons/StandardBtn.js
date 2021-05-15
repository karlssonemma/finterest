import styled from 'styled-components';

import theme from '../../utils/theme';

export const StandardBtn = styled.button`
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[4]};
    border: 2px solid black;
    cursor: pointer;
    color: black;
    background-color: transparent;
    text-transform: uppercase;
    letter-spacing: .1em;

    &:hover, :focus {
        background-color: black;
        color: white;
    }
`;

