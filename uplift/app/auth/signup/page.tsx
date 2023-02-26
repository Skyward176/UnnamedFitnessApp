'use client'
import {useState} from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore} from 'firebase/firestore'

import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';

import {auth, firebase_app} from '@/config/firebaseInit';
//import {db} from '@/config/database';


async function signInHandler(email:string, password:string) {
    let result = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then(()=> {
            let data = {
                email: email,
            }
            let db = getFirestore(firebase_app);
            let docRef = doc(db, 'users', auth.currentUser.uid);
            setDoc(docRef, data).then(() => {
                console.log("added user");
            }).catch ((e1) => {
                console.log(e1);
            });
        });
    } catch (e) {
        error = e;
    }

    return {result, error};
}


export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
    const handleSignInForm = async(event:any) => {
        event.preventDefault();
        const {result, error } = await signInHandler(email, password);
        if(error) {
            return(console.log(error));
        }

        console.log(result);
        return router.push('/auth/signin');
    }
    return(
        <>
            <Navbar />
            <form onSubmit={handleSignInForm}>
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button className = 'text-white' type="submit">Sign up</button>
            </form>
        </>
    );
}
