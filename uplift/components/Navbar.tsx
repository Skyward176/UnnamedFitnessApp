'use client'
import Link from 'next/link'
import {Bars3Icon} from '@heroicons/react/24/solid';
import IconButton from './IconButton';
export default function Navbar () {
    const menuButtonHandler = (e:any) =>{
        console.log('expand menu'+e);
    }
    return (
        <div className='w-full h-16 bg-black border-b-white border-b flex flex-row'>
            <div className='my-3 w-1/2 mx-4'>
                <Link href='/'>
                    <p className='font-light font-sans text-4xl text-white'>
                        <span className='text-accent-100'>up</span>Lift
                    </p>
                </Link>
            </div>
            <div className='my-auto w-1/2 flex flex-row-reverse'>
                <IconButton onclick={menuButtonHandler}>
                    <Bars3Icon className='h-12 mx-4'/>
                </IconButton>
            </div>
        </div>
    )
}
