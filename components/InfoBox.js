import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    color: lightgray;
    font-weight: 100;
    display: none;

    &.infoVisible {
        display: block;
    }
`;

const InfoBox = (props) => {

    const { newClassName, user } = props;


    return(
        <Box className={newClassName}>
            {user.name && <p>By: {user.name}</p>}
            {user.instagram && <p>Instagram: {user.instagram}</p>}
        </Box>
    )
}

export default InfoBox;