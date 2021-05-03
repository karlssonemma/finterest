import styled from 'styled-components';

import theme from '../../utils/theme';

const StandardBtn = styled.button`
    padding: ${props => props.theme.space[1]};
    background-color: lightcyan;
`;

export default StandardBtn;