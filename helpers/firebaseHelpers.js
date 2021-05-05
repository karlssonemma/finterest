import React from 'react';

import firebaseInstance from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';


export const readUsers = async () => {
    return await firebaseInstance.firestore().collection('users')
};

export const readCurrentUser = async (id) => {
    return await firebaseInstance.firestore().collection('users').doc(id)
};

export const readUsersCollections = async (id) => {
    return await firebaseInstance.firestore().collection('users').doc(id).collection('collections');
};

export const getCollectionFromUser = async (userId, collId) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).get();
};

export const deleteCollection = async (userId, collId) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).delete();
};

export const readPhotosFromCollection = async (userId, collId) => {
    // console.log(userId, collId)
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos');
};

export const readPhotoFromCollection = async (userId, collId, photoId) => {
    await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos').doc(photoId);
};

export const deletePhotoFromCollection = async (userId, collId, photoId) => {
    await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos').doc(photoId).delete();
};
