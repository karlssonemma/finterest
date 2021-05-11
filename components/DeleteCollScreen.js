import React, { useState } from 'react';

import styled from 'styled-components';

import { readCurrentUser, readUsersCollections, readUsers, readCurrentUsersCollections, deleteCollectionDoc, readCurrentUserDoc, readCollections, readPhotosFromCollection } from '../helpers/firebaseHelpers';
import Overlay from '../components/Overlay';
import CloseBtn from './Buttons/CloseBtn';
import StandardBtn from './Buttons/StandardBtn';
import { useAuth } from '../contexts/AuthContext';
import firebaseInstance from '../config/firebase';
import { useRouter } from 'next/router';


const DeleteCollScreen = ({ collId }) => {

    const { currentUser } = useAuth()
    const router = useRouter()

    const closeWindow = () => {
        let item = document.querySelector('.deleteCollScreen')
        item.classList.toggle('visible');
    };

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
        <Overlay className='deleteCollScreen'>
            <CloseBtn btnFunction={closeWindow} icon={'/cancel.png'} />
            <p>Are you sure you want to delete this collection?</p>
            <StandardBtn onClick={handleDeleteColl}>Delete coll</StandardBtn>
        </Overlay>
    )
}

export default DeleteCollScreen;