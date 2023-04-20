'use client'
import {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {AuthContext} from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import {AiOutlineEdit} from 'react-icons/Ai';
import {updateDoc, doc,getFirestore} from 'firebase/firestore';
import {auth, firebase_app} from '@/config/firebaseInit';
export default function UserProfile () {
    const [profile,setProfile] = useContext(AuthContext); 
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const handleEditButton = () => {
        if(editing){
            saveChanges();
        }
        setEditing(!editing);
    }
    const db = getFirestore(firebase_app);
    const saveChanges = () => {
        updateDoc(doc(db,'users',auth.currentUser.uid), profile);

    }
    const handleChangeUser = (e) => {
        setProfile({...profile,
                   name:e.target.value
                    })
    }
    const handleChangeGender = (e) => {
        setProfile({...profile,
                   gender:e.target.value
                    })
    }
    const handleChangeWeight = (e) => {
        setProfile({...profile,
                   weight:e.target.value
                    })
    }
    if(profile==null){
        router.push('/');
        return(<></>);
    }else{
        return(
            <>
                <Navbar/>
                <div className='flex items-center justify-center'>
                <div className='flex flex-col text-white font-sans font-light text-2xl md:text-4xl md:w-1/2 items-center justify-center'>
                        <div className='flex h-24 justify-center items-center'>
                            <h1> Your Profile: </h1>
                            <button className='ml-2' onClick={handleEditButton}>
                                <AiOutlineEdit size='2.25rem' color={editing===true?'#00FFF0':'white'}/>
                            </button>
                        </div>
                        <div className='w-1/2 h-0 border border-1 border-accent-100'></div>
                        <div className='h-1/4 text-lg md:text-xl my-8 w-full flex flex-col'>
                            <label className = 'font-light font-sans text-white text-2xl w-full'>
                                Username: 
                                <input className='font-light font-sans text-2xl appearance-none bg-black mx-2 my-2 border border-t-0 border-l-0 border-r-0 border-b-1' 
                                    style={{'border-color': editing?'#00FFF0': 'white'}}
                                    placeholder={profile?profile.name:'null'}
                                    readOnly={editing===true?false:true}
                                    onBlur={(e)=>handleChangeUser(e)}/>
                            </label>
                            <label className = 'font-light font-sans text-white text-2xl w-full'>
                                Gender: 
                                <select onChange={(e)=> handleChangeGender(e)}
                                    className='bg-black text-white text-2xl font-light font-sans h-8 border border-l-0 border-r-0 border-t-0 border-b-1' 
                                    style={{'border-color': editing?'#00FFF0': 'white'}}
                                    value={profile.gender}
                                    disabled={editing===true?false:true}
                                    >
                                    <option value=''>I'd rather not say</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                            </label>
                            <label className = 'font-light font-sans text-white text-2xl w-full'>
                                Weight: 
                                    <input className='font-light font-sans text-2xl appearance-none bg-black mx-2 my-2 border border-t-0 border-l-0 border-r-0 border-b-1 ' 
                                    style={{'border-color': editing?'#00FFF0': 'white'}}
                                    placeholder={profile?profile.weight:'null'}
                                    type='number' 
                                    readOnly={editing===true?false:true}
                                    onBlur={(e)=>handleChangeWeight(e)}/>
                            </label>
                        </div>
                    </div>
                </div>
            </>
        );

    }
}
