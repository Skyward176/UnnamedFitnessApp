'use client'
import Link from 'next/link'
import {Bars3Icon} from '@heroicons/react/24/solid';
import IconButton from './IconButton';
import {useState} from 'react';
import {useAuthContext} from '@/context/AuthContext';
export default function Navbar () {
    const [display, setDisplay] = useState('none');
    const user = useAuthContext();
    const menuButtonHandler = (e:any) =>{
        if ( display == 'none' ) {

            setDisplay( 'flex' )

        } else {

            setDisplay( 'none' )

        }
    }
    const logoutHandler = () => {
        if(user) {
            
        }
    }
    const menuItems=[{'name':'Profile', 'href':'user/profile'}];
    return (
        <>
            <div className='w-full h-16 bg-black border-b-white border-b flex flex-row'>
                <div className='my-3 w-1/2 mx-4'>
                    <Link href='/'>
                        <p className='font-light font-sans text-4xl text-white'>
                            <span className='text-accent-100'>up</span>Lift
                        </p>
                    </Link>
                </div>
                <div className='my-auto w-1/2 flex flex-row-reverse'>
                    <div>
            
                    </div>
                    <IconButton className='' onClick={menuButtonHandler}>
                        <Bars3Icon className='h-12 mx-4'/>
                    </IconButton>
                </div>
            </div>
            <div className='relative flex flex-col items-center justify-center bottom-0 w-full border border-white bg-black md:w-96 md:float-right' style={{display:display}}>
                {
                    menuItems.map((item) => <div className='w-full border border-white text-center text-2xl font-sans font-light'><Link className='text-white ' href={item.href}>{item.name}</Link></div>)
                }
                <div onClick={logoutHandler} className='text-white text-2xl font-sans font-light'>{user ? 'Logout':'Login'}</div>
            </div>
        </>
    );
}
