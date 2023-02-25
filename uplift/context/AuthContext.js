'use client'
import { useEffect, createContext, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '@/config/firebaseInit';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children, }) =>{
    const [user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) { setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        
      return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div></div> : children }
        </AuthContext.Provider>
    );
}
