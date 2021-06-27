import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { ButtonFieldForImages } from './ButtonFieldForImages';

import IconBtn from './Buttons/IconBtn';
import InfoBox from './InfoBox';
import { deletePhoto } from '../helpers/firebaseHelpers';


const Container = styled.li`
    list-style: none;
    position: relative;
    /* opacity: 0; */
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover + .buttonField {
        visibility: visible;
    }
`;


const ImageInCollection = ({ item }) => {

    const { currentUser } = useAuth();
    const router = useRouter();
    const collId = router.query.id;
    
    const showInfo = () => {
        let box = document.querySelector(`.infoBox_${item.id}`)    
        box.classList.toggle('infoVisible');
    };

    const handleDeletePhoto = () => {
        deletePhoto(currentUser.uid, collId, `img${item.id}`)
    };

    const showBtns = () => {
        document.querySelector(`.buttonField_${item.id}`).classList.toggle('visibleBtnField')
    };

    const hideBtns = () => {
        document.querySelector(`.buttonField_${item.id}`).classList.remove('visibleBtnField')
    };

    return(
        <Container>
            <Photo src={item.url} alt={item.alt_description} tabIndex={0} />
            <ButtonFieldForImages 
                className={`buttonField_${item.id}`}
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
                <IconBtn 
                    icon='/cancel.png' 
                    btnFunction={() => handleDeletePhoto()} 
                    white={true}
                    label='Delete photo from collection.'
                />
                <InfoBox 
                    newClassName={`infoBox_${item.id}`}
                    photographer={item.user}
                />
            </ButtonFieldForImages>
        </Container>
    )
}

export default ImageInCollection;