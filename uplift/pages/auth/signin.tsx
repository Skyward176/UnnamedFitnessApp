import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase/clientApp';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import Link from 'next/link'

async function signInHandler(email, password) {
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
    const handleSignInForm = async(event) => {
        event.preventDefault();
        const {result, error } = await signInHandler(email, password);
        if(error) {
            return(console.log(error));
        }

        console.log(result);
        return router.push('/');
    }
    return(
        <>
            <form onSubmit={handleSignInForm}>
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign In</button>
            </form>
            <Link href='auth/signup'> Don't have an account? </Link>
        </>
    );
}
