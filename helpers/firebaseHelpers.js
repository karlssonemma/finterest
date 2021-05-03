import React from 'react';

import firebaseInstance from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export const readUsers = async () => {
    return await firebaseInstance.firestore().collection('users')
};

export const readUsersCollections = async () => {
    return await firebaseInstance.firestore().collection('usersCollections')
};

export async function readCurrentUsersCollections({ id }) {
    // const { currentUser } = useAuth();
    return await firebaseInstance.firestore().collection('usersCollections').where('user', '==', `${id}`)
};