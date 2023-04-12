'use client'
import { useEffect, createContext, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getDoc, doc, getFirestore} from 'firebase/firestore';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children, }) =>{
    const [user, setUser ] = useState({
        name:"",
        pinnedRoutines: []
    });
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const db = getFirestore(firebase_app);
        const getUserProfile = async(user) => {
            let profile = await getDoc(doc(db, 'users', user));
            return profile;
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserProfile(auth.currentUser.uid).then((profile) => {
                    setUser(profile.data());
                })
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        
      return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={ [user, setUser] }>
            {loading ? <div></div> : children }
        </AuthContext.Provider>
    );
}
