import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useAuth } from '../contexts/AuthContext';
import { readCurrentUsersCollections, readUsersCollections } from '../helpers/firebaseHelpers';
import HeartBtn from '../components/Buttons/HeartBtn';
import firebaseInstance from '../config/firebase';

const SelectCollection = ({ url }) => {
    
    const { currentUser } = useAuth();
    const [collections, setCollections] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    useEffect(async () => {
        if (collections.length < 1) {
            let coll = await readCurrentUsersCollections({ id: currentUser.uid })
            coll.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setCollections(prevState => [...prevState, doc.data()])
                })
            })
        }
        
    }, [])


    const onSubmit = async (data) => {
        
        firebaseInstance.firestore().collection('collections').where('user', '==', currentUser.uid).where('name', '==', data.collectionId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                firebaseInstance.firestore().collection('collections').doc(doc.id).update({
                    photos: firebaseInstance.firestore.FieldValue.arrayUnion(url)
                })
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register('collectionId')}>
                {collections && collections.map(coll => {
                    return(
                        <option key={coll.id} value={coll.id}>{coll.name}</option>
                    )
                })}
            </select>
            <HeartBtn />
        </form>
    )
}

export default SelectCollection;