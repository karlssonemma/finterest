import React from 'react';

import firebaseInstance from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';


export const readUsers = async () => {
    return await firebaseInstance.firestore().collection('users')
};

export const readUsersCollections = async () => {
    return await firebaseInstance.firestore().collection('collections')
};

export async function readCurrentUsersCollections({ id }) {
    // const { currentUser } = useAuth();
    return await firebaseInstance.firestore().collection('collections').where('user', '==', `${id}`)
};