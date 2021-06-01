import styled from 'styled-components';
import theme from '../../utils/theme';

export const StyledForm = styled.form`
    width: 100%;
    height: 100%;
    padding: 90px;
    border-left: 1px solid black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    background-color: white;

    @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
        width: 50%;
        max-width: 600px;
    }
`;