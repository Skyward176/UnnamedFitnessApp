'use client'
import Link from 'next/link';
import {Bars3Icon} from '@heroicons/react/24/solid';
import {HiOutlineMagnifyingGlass} from 'react-icons/hi2';
import IconButton from './IconButton';
import {useState, useContext} from 'react';
import {auth} from '@/config/firebaseInit';
import {useRouter} from 'next/navigation';
import {signOut} from 'firebase/auth';
import { Combobox } from '@headlessui/react';
import {searchClient} from '@/config/meili';
import { Router } from 'next/router';
import { SearchContext } from '@/context/SearchContext';
import { AuthContext } from '@/context/AuthContext';

export default function Navbar () {
    const [display, setDisplay] = useState('none');
    const [searchDisplay, setSearchDisplay] = useState('none');
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext);
    const [profile, setProfile] = useContext(AuthContext);
    const router = useRouter()
    const menuButtonHandler = (e:any) =>{
        if ( display == 'none' ) {

            setDisplay( 'flex' )

        } else {

            setDisplay( 'none' )

        }
    }
    const logoutHandler = () => {
        if(auth.currentUser !=null ) {
            signOut(auth).then(() => {
                router.push('/');
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    const searchHandler = async (query) => {
        setSearchQuery(query)
        const index = searchClient.index('ml_index')
        if(query!=""){
            const results = await index.search(query)
            setSearchResults(results.hits);
            setSearchDisplay('flex');
        } else {
            setSearchResults([]);
            setSearchDisplay('none');
        }
    }
    
    const enterHandler = (key) => {
        if(key==='Enter') {
            router.push(`search?searchQuery=${searchQuery}`)
        }
    }
    const menuItems=[
        {'name':'Profile', 'href':'user'},
        {'name':'My Routines', 'href':'routine/list'},
        {'name':'Search', 'href':'search'}
    ];
    return (
        <>
            <div className='w-full h-16 bg-black border-b-white border-b flex flex-row'>
                <div className='my-3 w-1/2 mx-4 flex-grow'>
                    <Link href='/'>
                        <p className='font-light font-sans text-4xl text-white'>
                            <span className='text-accent-100'>up</span>Lift
                        </p>
                    </Link>
                </div>
                {/* Search box */}
                <div style={{display: profile ? 'flex' : 'none'}} className='my-auto md:w-96 flex-col'>
                    <div className='flex flex-row'>
                        <label>
                            <HiOutlineMagnifyingGlass className='mx-2' size='2rem' color='white'/>
                        </label>
                        <input 
                            placeholder ='Find a routine' 
                            className='hidden md:block text-white bg-black font-sans text-2xl font-light border border-t-0 border-x-0 border-accent-100 md:w-full' 
                            onChange={(e)=> setSearchResults(searchHandler(e.target.value))}
                            onKeyDown={(e) => enterHandler(e.key)}
                            onBlur={(e)=> setSearchDisplay('none')}
                            onFocus={(e)=> setSearchDisplay('flex')}
                        />
                    </div>
                    <div className='absolute top-16 flex flex-col items-center justify-center w-96 text-white' style={{display:searchDisplay}}>
                        {
                            Object.values(searchResults).map((routine) => <Link href={{pathname:'routine/view',query:{routineID:routine._firestore_id}}} className='w-full flex items-center justify-center  text-center text-2xl h-16 '>{routine.title}</Link>)
                        }

                    </div>
                </div>
                {/*end search box */}
                <div className='my-auto w-24 flex flex-row-reverse'>
                    <IconButton className='' onClick={menuButtonHandler}>
                        <Bars3Icon className='h-12 mx-4'/>
                    </IconButton>
                </div>
            </div>
            <div className='relative flex flex-col items-center justify-center bottom-0 w-full border border-white bg-black md:w-96 md:float-right' style={{display:display}}>
                {
                    menuItems.map((item) => <div className='w-full border border-white text-center text-2xl font-sans font-light'><Link className='text-white ' href={item.href}>{item.name}</Link></div>)
                }
                {auth.currentUser ? <button onClick={logoutHandler} className='text-white text-2xl font-sans font-light'>Logout</button>:<div className='w-full border border-white text-center text-2xl font-sans font-light'><Link className='text-white ' href='auth/signin'>Login</Link></div>}
            </div>
        </>
    );
}
