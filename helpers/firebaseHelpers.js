import React from 'react';

import firebase from 'firebase';
import firebaseInstance from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';


export const readUsers = async () => {
    return await firebaseInstance.firestore().collection('users');
};

export const readCurrentUser = async (id) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(id)
};

export const readAllCollections = async (id) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(id)
    .collection('collections');
};

export const readCollection = async (userId, collId) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId);
};

export const getCollection = async (userId, collId) => {
    return firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .get();
};

export const deleteCollectionDoc = async (userId, collId) => {
    firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .delete();
};

export const readPhotos = async (userId, collId) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .collection('photos');
};

export const getPhoto = async (userId, collId, photoId) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .collection('photos')
    .doc(photoId)
    .get();
};

export const deletePhoto = async (userId, collId, photoId) => {
    await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .collection('photos')
    .doc(photoId)
    .delete()
    .then(() => subCount(userId, collId))
};

export const addPhoto = async (userId, collId, photoId, photoObject) => {
    firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .collection('photos')
    .doc(photoId)
    .set(photoObject)
    .then(() => addToCount(userId, collId))
};

export const addToCount = async (userId, collId) => {
    firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .update({
        numberOfPins: firebase.firestore.FieldValue.increment(1)
    })
}

export const subCount = async (userId, collId) => {
    firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc(collId)
    .update({
        numberOfPins: firebase.firestore.FieldValue.increment(-1)
    })
}

export const addCollection = async (userId, collObject) => {
    await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .doc()
    .set(collObject);
};

export const getCollectionByName = async (userId, input) => {
    return await firebaseInstance.firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .where('name', '==', input)
    .get();
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

export const getProfilePicWithUserId = async (userId) => {
    let pic;
    await firebaseInstance.storage()
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
    let ref = await firebaseInstance.storage().ref('profilePictures')
    ref.child(userId).put(picRef).then(() => {
                console.log('did it!!')
            })
};
