'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useEffect, useState} from 'react';
import {getDoc, updateDoc, addDoc, collection, arrayUnion,arrayRemove, deleteDoc} from 'firebase/firestore';
import {auth} from '@/config/firebaseInit';
import {useContext} from 'react';
import {RoutineContext} from '@/context/RoutineContext';
import {DocrefContext} from '@/context/DocrefContext';
import Day from './Day'
import {v4 as uuid} from 'uuid';

const Week = (props) => {
    const [routineData, setRoutineData] = useContext(RoutineContext);
    return(
        <>
            <div className='flex items-center'>
                <p className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2'>{props.data.title}</p>
            </div>
            <div className='h-full p-4 block w-full'>
                {
                    routineData.weeks[props.index].days.map((day, i) => <Day index ={i} data={day} key={day.duid}/>)
                }
            </div>
        </>
    );
}
export default Week;