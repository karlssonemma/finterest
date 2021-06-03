import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';

export const StyledForm = styled.form`
    width: 100%;
    height: 100%;
    padding: 90px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    background-color: white;

    & > * {
        opacity: 0;
        animation: .5s slideUp forwards;
    }

    @keyframes slideUp {
        0% {
            transform: translateY(40px);
            opacity: 0;
        } 100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
`;

