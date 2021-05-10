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

    const signup = async (email, password, username) => {
        const user = await auth.createUserWithEmailAndPassword(email, password)
        await user.user.updateProfile({
            displayName: username
        })

        return user;
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