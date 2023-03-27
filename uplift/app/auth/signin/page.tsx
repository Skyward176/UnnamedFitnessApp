'use client'
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/config/firebaseInit';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import Link from 'next/link'
import Navbar from '@/components/Navbar';

async function signInHandler(email:string, password:string) {
    let result = null;
    let error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return {result, error};
}


export default function Signin() {
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
        return router.push('/');
    }
    return(
        <div className='h-full flex flex-col'>
            <Navbar />
            <div className='w-full flex flex-col flex-grow items-center justify-center'>
                <h1 className='text-white text-4xl font-light font-sans my-4'>Sign In </h1>
                <form className = 'flex flex-col w-1/4 ' onSubmit={handleSignInForm}>
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
                    <div className='my-2'>
                        <Link href='auth/signup'> <p className='text-white'>Don't have an account? </p></Link>
                    </div>
                    <div className='my-2 flex w-full items-center justify-center'>
                        <button className = 'text-white font-sans font-light text-2xl bg-black border border-accent-100 rounded w-24' type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
