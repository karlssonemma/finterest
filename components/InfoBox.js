import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    color: lightgray;
    font-weight: 100;
    display: none;

    & p {
        font-family: ${props => props.theme.fonts.cardo};
    }

    &.infoVisible {
        display: block;
    }
`;

const InfoBox = (props) => {

    const { newClassName, photographer } = props;

    const renderInfo = () => {
        return(
            <>
                <p tabIndex={0}>By: {photographer.name ? photographer.name : 'Unknown'}</p>
                <p tabIndex={0}>Instagram: {photographer.instagram ? photographer.instagram : 'Unknown'}</p>
            </>
        )
    }

    return(
        <Box className={newClassName}>
            {
                photographer && renderInfo()
            }
        </Box>
    )
}

export default InfoBox;