import React, { useContext, createContext, useState, useEffect } from 'react';
import firebaseInstace, { auth } from '../config/firebase';
import firebase from 'firebase';

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !loading && currentUser !== null;


    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if(!user) {
                setCurrentUser(null)
            } else {
                setCurrentUser(user)
            }
            setLoading(false)
        })
    
    }, [])

    const signup = async (email, password, username) => {
        const user = await auth.createUserWithEmailAndPassword(email, password)
        await user.user.updateProfile({
            displayName: username
        })

        return user;
    };

    const logout = () => {
        auth.signOut()
    };

    const login = async (email, password) => {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        return auth.signInWithEmailAndPassword(email, password)
    };

   

    const value = {
        currentUser, 
        signup,
        login,
        logout,
        isAuthenticated
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
};