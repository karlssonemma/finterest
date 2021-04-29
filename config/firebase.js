import firebase from 'firebase';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

try {
    firebase.initializeApp(firebaseConfig)
} catch (error) {
    if(!/already exists/.test(error.message)) {
        console.error('Firebase error')
    };
};

const firebaseInstance = firebase;
export default firebaseInstance;
export const auth = firebase.auth();
