import React, { useEffect } from 'react';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import firebaseInstance from '../../config/firebase';

import Navigation from '../../components/Navigation';
import { useAuth } from '../../contexts/AuthContext';

const CollectionPage = () => {

    const router = useRouter();
    const collId = router.query.id;
    const { currentUser } = useAuth();
    console.log(router.query.id)

    useEffect(() => {
        // firebaseInstance.firestore().collection('usersCollections').where('user', '==', currentUser.uid).where('name', '==', collId)
        // .get()
        // .then(query => {
        //     query.forEach(doc => {
        //         console.log(doc.data().photos)
        //     })
        // })

        firebaseInstance.firestore().collection('usersCollections').doc('ciK1ho3bDQ3gCV3uNsM2').collection('photos')
        .get()
        .then(query => {
            query.forEach(doc => console.log(doc.data()))
        })
    }, [])

    return(
        <>
        {/* <Navigation /> */}
        <p>{router.query.id}</p>
        </>
    )
}

export default CollectionPage;

