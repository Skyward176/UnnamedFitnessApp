'use client'
import {useContext} from 'react';
import {RoutineContext} from '@/context/RoutineContext';
const Description = () => {
    const [routineData, setRoutineData] = useContext(RoutineContext);
    return(
        <div className='h-1/2 flex flex-col'>
            <div className='flex items-center'>
                <p className='text-2xl font-light font-sans'>Title: {routineData.title} </p>
            </div>
            <div className='flex flex-col h-1/2'>
                <p className='text-2xl font-light font-sans'>Description: {routineData.description} </p>
            </div>
            <div className='flex text-xl items-center'>
                <div className='flex text-white'>
                    Tags: {routineData.tags.map((tag)=> <div key={tag} className = 'bg-gray-900 p-1 rounded-lg  mx-1'> {tag} </div>)}
                </div>
            </div>
        </div>
    );
}
export default Description;
