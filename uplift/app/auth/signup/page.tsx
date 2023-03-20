'use client'
import {useState} from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore} from 'firebase/firestore'

import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';

import {auth, firebase_app} from '@/config/firebaseInit';
//import {db} from '@/config/database';


async function signUpHandler(email:string, password:string) {
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
    const handleSignUpForm = async(event:any) => {
        event.preventDefault();
        const {result, error } = await signUpHandler(email, password);
        if(error) {
            return(console.log(error));
        }

        console.log(result);
        return router.push('/auth/signin');
    }
    return(
        <>
        <div className='h-full flex flex-col'>
            <Navbar />
            <div className='w-full flex flex-col flex-grow items-center justify-center'>
                <div className = 'flex flex-col w-1/4 ' onSubmit={handleSignUpForm}>
                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="email">
                        Email: 
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com"/>
                    </label>

                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="password">
                        Password: 
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <div className='my-2 flex w-full items-center justify-center'>
                        <button className = 'text-white font-sans font-light text-2xl bg-black border border-accent-100 rounded w-1/4' type="submit">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
