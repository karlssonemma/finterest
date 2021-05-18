import React, { useState } from 'react';

import styled from 'styled-components';

import { deleteCollectionDoc, readPhotosFromCollection } from '../../helpers/firebaseHelpers';
import ModalContainer from '../ModalContainer';
import CloseBtn from '../Buttons/CloseBtn';
import { StandardBtn } from '../Buttons/StandardBtn';
import { useAuth } from '../../contexts/AuthContext';
import firebaseInstance from '../../config/firebase';
import { useRouter } from 'next/router';

// const Container = styled.section`
//     width: 100%;
//     min-height: 100vh;
//     padding: ${props => props.theme.space[5]};


//     background-color: white;
//     position: relative;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     @media screen and (min-width: ${props => props.theme.breakpoints[1]}) {
//         width: max-content;
//         min-height: 300px;
//     }
// `;

const Text = styled.p`
    margin-bottom: ${props => props.theme.space[3]};
`;


const DeleteCollScreen = ({ collId }) => {

    const { currentUser } = useAuth()
    const router = useRouter()

    const handleDeleteColl = async () => {
        let photos = await readPhotosFromCollection(currentUser.uid, collId)
        photos.get()
        .then((query) => {
            query.forEach((doc) => {
                doc.ref.delete()
            })
        })

        await deleteCollectionDoc(currentUser.uid, collId)
        .then(() => {
            console.log('successful delete')
            router.push('/profile')
        })
        
    };
    
    return(
        <ModalContainer name='deleteCollScreen'>
                <Text>Are you sure you want to delete this collection?</Text>
                <StandardBtn onClick={handleDeleteColl}>Delete collection</StandardBtn>
        </ModalContainer>
    )
}

export default DeleteCollScreen;