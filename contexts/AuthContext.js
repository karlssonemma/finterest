import React, { useContext, createContext, useState, useEffect } from 'react';
import firebaseInstace, { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !loading && currentUser !== null;


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
            setLoading(false)
        })
    }, [])

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    };

    const logout = () => {
        auth.signOut()
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