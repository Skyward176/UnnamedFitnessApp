'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useContext} from 'react';
import {getDoc, updateDoc} from 'firebase/firestore';
import {RoutineContext} from '@/context/RoutineContext';
import { DocrefContext } from '@/context/DocrefContext';

const Exercise = (props) => {
    const [data, setData] = useState(props.data);
    const [routineData, setRoutineData] = useContext(RoutineContext);

    return(
        <>
            <div className=' px-7 flex items-center'>
                <div className='flex'>
                    <p className='max-w-48 w-fit appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>{data.name}</p>
                    <p> for </p>
                    <p  className='w-6 text-center appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>{String(data.sets)}</p>
                    <p> Sets x </p>
                    <p  className='w-6 text-center appearance-none bg-black mx-2  border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>{String(data.reps)}</p>
                    <p> Reps </p>
                </div>
            </div>
        </>
    );
}
export default Exercise;
