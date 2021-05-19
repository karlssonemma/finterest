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
export const readCollectionFromUser = async (userId, collId) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId);
};

export const deleteCollectionDoc = async (userId, collId) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).delete();
};

export const readPhotosFromCollection = async (userId, collId) => {
    // console.log(userId, collId)
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos');
};

export const readPhotoFromCollection = async (userId, collId, photoId) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos').doc(photoId);
};

export const deletePhotoFromCollection = async (userId, collId, photoId) => {
    await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos').doc(photoId).delete();
};

export const addPhoto = async (userId, collId, photoId, photoObject) => {
    console.log(photoObject)
    await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc(collId).collection('photos').doc(photoId).set(photoObject);
};

export const addCollection = async (userId, collObject) => {
    await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').doc().set(collObject);
};

export const checkIfCollectionExistsByName = async (userId, input) => {
    let found = false;
    await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .where('name', '==', input)
    .get()
    .then(query => {
        query.forEach(doc => {
            if(doc.exists) found = true;
        })
    })
    return found;
};

export const checkIfUsernameExists = async (input) => {
    let found = false;
    await firebaseInstance
    .firestore()
    .collection('users')
    .where('username', '==', input)
    .get()
    .then(query => {
        query.forEach(doc => {
            if(doc.exists) found = true;
        })
    })
    return found;
};

export const readCollectionByName = async (userId, input) => {
    return await firebaseInstance.firestore().collection('users').doc(userId).collection('collections').where('name', '==', input);
};

export const getProfilePicWithUserId = async (userId) => {
            let pic;
            await firebaseInstance
            .storage()
            .ref('profilePictures')
            .child(userId)
            .getDownloadURL()
            .then((url) => {
                pic = url;
            })
            .catch((e) => {
                pic = null;
            })
            return pic;
};

export const setProfilePic = async (userId, picRef) => {
    let ref = firebaseInstance.storage().ref('profilePictures')
    ref.child(userId).put(picRef).then(() => {
                console.log('did it!!')
            })
};
