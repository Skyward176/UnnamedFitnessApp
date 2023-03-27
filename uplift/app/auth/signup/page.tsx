'use client'
import {useState} from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore} from 'firebase/firestore'

import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';
import PasswordChecklist from 'react-password-checklist';
import Link from 'next/link'

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
    const [passwordAgain, setPasswordAgain] = useState('')
    const [valid, setValid] = useState(false)
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
                <h1 className='text-white text-4xl font-light font-sans my-4'>Register </h1>
                <div className = 'flex flex-col w-72 md:w-96 ' onSubmit={handleSignUpForm}>
                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="email">
                        Email:
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="sample@mail.com"/>
                    </label>
                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="email">
                        Name:
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={()=>{}} required type="text" placeholder="Your Name"/>
                    </label>
                    
                    <div className='flex w-full'>
                        <label className = 'font-light font-sans text-white text-2xl mr-2'>Gender:</label>
                        <select className='w-full bg-black text-white text-2xl font-light font-sans h-8 border border-l-0 border-r-0 border-t-0 border-b-1 border-b-accent-100'>
                            <option value=''>I'd rather not say</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>
                    <div className='flex w-full items-center'>
                        <label className = 'font-light font-sans text-white text-2xl mr-2'>
                            Weight:
                        </label>
                        <input className='w-full flex-grow font-light font-sans text-2xl appearance-none bg-black my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100' 
                            onChange={(e) => setPassword(e.target.value)}  placeholder="100" type='number'/>
                        <p className = 'font-light font-sans text-white text-2xl w-1/2 ml-2'> lbs </p>
                    </div>
                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="password">
                        Password:
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>

                    <label className = 'font-light font-sans text-white text-2xl' htmlFor="password">
                        Confirm Password:
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setPasswordAgain(e.target.value)} required type="password" name="passwordAgain" id="passwordAgain" placeholder="" />
                    </label>
                    <div className='my-2'>
                        <Link href='auth/signin'> <p className='text-white'>Already have an account? </p></Link>
                    </div>
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","match"]}
                        minLength={5}
                        value={password}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {
                            setValid(isValid);
                        }}
                        className='text-white font-sans text-lg'
                    />
                    <div className='my-4 flex w-full items-center justify-center'>
                        <button disabled = {!valid} className = 'text-white font-sans font-light text-2xl bg-black border border-accent-100 rounded w-24 h-10' type="submit">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
