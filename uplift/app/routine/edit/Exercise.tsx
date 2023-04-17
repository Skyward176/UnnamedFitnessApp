'use client'
import {HiChevronUp, HiChevronDown, HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useContext} from 'react';
import {getDoc, updateDoc} from 'firebase/firestore';
import {RoutineContext} from '@/context/RoutineContext';
import { DocrefContext } from '@/context/DocrefContext';

const Exercise = (props) => {
    const [data, setData] = useState(props.data);
    const docRef = useContext(DocrefContext);
    const [routineData, setRoutineData] = useContext(RoutineContext);

    const handleTitleChange= (e) =>{
        const updatedData = routineData;
        updatedData.weeks[props.weekIndex].days[props.dayIndex].exercises[props.index].name= e.target.value;
        setRoutineData(updatedData);
        updateDoc(docRef, routineData);
    }
    const handleSetsChange= (e) =>{
        const updatedData = routineData;
        updatedData.weeks[props.weekIndex].days[props.dayIndex].exercises[props.index].sets= e.target.value;
        setRoutineData(updatedData);
        updateDoc(docRef, routineData);
    }
    const handleRepsChange= (e) =>{
        const updatedData = routineData;
        updatedData.weeks[props.weekIndex].days[props.dayIndex].exercises[props.index].reps= e.target.value;
        setRoutineData(updatedData);
        updateDoc(docRef, routineData);
    }
    const handleDelete= () => {
        if(props.exerciseCount>1){
            props.deleteExercise(props.data);
        }
    }
    return(
        <>
            <div className=' px-7 flex items-center'>
                <div className='flex flex-col w-7 h-7'>
                    <button onClick={(e)=>props.handleMoveExerciseUp(props.index)}><HiChevronUp size='1rem'/></button>
                    <button onClick={(e)=>props.handleMoveExerciseDown(props.index)}><HiChevronDown /></button>
                </div>
                <button onClick={handleDelete}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newExerciseHandler}><HiPlus size='1.75rem'/></button>
                <div className='flex'>
                    <input type='text' onBlur={handleTitleChange} placeholder = {data.name} className='w-1/4 appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> for </p>
                    <input type='text' onBlur={handleSetsChange} placeholder = {String(data.sets)} className='w-6 text-center appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> Sets x </p>
                    <input type='text' onBlur={handleRepsChange} placeholder = {String(data.reps)} className='w-6 text-center appearance-none bg-black mx-2  border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> Reps </p>
                </div>
            </div>
        </>
    );
}
export default Exercise;
