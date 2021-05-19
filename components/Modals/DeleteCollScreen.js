import React, { useState } from 'react';

import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

import { deleteCollectionDoc, readPhotosFromCollection } from '../../helpers/firebaseHelpers';
import ModalContainer from '../ModalContainer';
import { StandardBtn } from '../Buttons/StandardBtn';


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