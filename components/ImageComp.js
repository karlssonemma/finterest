import React from 'react';

import styled from 'styled-components';
import SelectCollection from './SelectCollection';
import { ButtonFieldForImages } from '../components/ButtonFieldForImages';
import IconBtn from './Buttons/IconBtn';
import InfoBox from '../components/InfoBox';

const Container = styled.li`

    animation: slideIn 1s;
    list-style: none;
    height: 500px;
    position: relative;
    //??
    /* z-index: 0; */

    @keyframes slideIn {
        0% {
            opacity: 0%;
            transform: translateX(-20deg)
        } 100% {
            opacity: 1;
            transform: translateX(0)
        }
    }
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    /* &:hover + .buttonField {
        opacity: 1;
    } */


`;



const ImageComp = ({ item }) => {

    const { id, url, alt_description, user } = item;
    
    const showInfo = () => {
       let box = document.querySelector(`.infoBox_${id}`)    
       box.classList.toggle('infoVisible');
    };

    const showBtns = () => {
        document.querySelector(`.buttonField_${id}`).classList.add('visibleBtnField')
    }
    const hideBtns = () => {
        document.querySelector(`.buttonField_${id}`).classList.remove('visibleBtnField')
    }

    return(
        <Container>
            <Photo src={url} alt={alt_description} />
            <ButtonFieldForImages 
                className={`buttonField_${id}`} 
                tabIndex={0} 
                onFocus={showBtns}
                onBlur={hideBtns}
                onMouseLeave={hideBtns}
                onMouseEnter={showBtns}
            >
                <IconBtn 
                    icon='/info.png'
                    white={true}
                    label='Info about the photo.'
                    btnFunction={() => showInfo()}
                />
                <InfoBox 
                    photographer={user}
                    newClassName={`infoBox_${id}`}
                />
                <SelectCollection item={item} />
            </ButtonFieldForImages>
        </Container>
    )
}

export default ImageComp;