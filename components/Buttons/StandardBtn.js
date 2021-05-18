import styled from 'styled-components';

import theme from '../../utils/theme';

export const StandardBtn = styled.button`
    display: block;
    padding: ${props => props.theme.space[2]} ${props => props.theme.space[4]};
    margin-top: ${props => props.theme.space[4]};
    border: 1px solid black;
    
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

