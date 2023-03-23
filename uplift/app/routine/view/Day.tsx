'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useEffect} from 'react';
import {getDoc} from 'firebase/firestore';
import Exercise from './Exercise';
import {updateDoc, deleteDoc, arrayUnion, arrayRemove, addDoc,collection} from 'firebase/firestore'
import {useContext} from 'react';
import {DocrefContext} from '@/context/DocrefContext';
import {RoutineContext} from '@/context/RoutineContext';
import {v4 as uuid} from 'uuid';
const Day = (props) => {
    const [data, setData] = useState(props.data)
    const [routineData, setRoutineData] = useContext(RoutineContext);
    useEffect(() => {
    },[])

    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <p className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2'>{data.title}</p>
            </div>
            <div className='flex flex-col w-fit my-2'>
                {data.exercises.map((exercise,i )=> <Exercise index = {i} key = {exercise.eid} data = {exercise}/>)} 
            </div>
        </div>
    );
}
export default Day;