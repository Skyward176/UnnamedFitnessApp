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
    const docRef = useContext(DocrefContext);
    const [routineData, setRoutineData] = useContext(RoutineContext);
    useEffect(() => {
    },[])

    const handleTitleChange= (e) =>{
        const updatedData = routineData;
        updatedData.weeks[props.weekIndex].days[props.index].title = e.target.value;
        setRoutineData(updatedData);
        updateDoc(docRef, routineData);
    }
    const handleDelete= () => {
        if(props.dayCount>1){
            props.deleteDay(docRef, data);
        }
    }
    const newExerciseHandler = () => {
        const createExercise= async (docRef) => {
            const newExercise = {
                    eid:uuid(),
                    name: "",
                    sets: 0,
                    reps: 0
            }
            const updatedData = routineData;
            updatedData.weeks[props.weekIndex].days[props.index].exercises = [...updatedData.weeks[props.weekIndex].days[props.index].exercises, newExercise];
            setRoutineData({...routineData,
                weeks:updatedData.weeks
            });
            updateDoc(docRef, routineData);
        }
        console.log("Create Exercise Fired");
        createExercise(docRef);
    }
    const deleteExercise= (data) => {
        const removeExercise = async () => {
            let newExercises = routineData.weeks[props.weekIndex].days[props.index].exercises.filter(function (exercise) {
                return(exercise!=data);
            });
            const updatedData = routineData;
            updatedData.weeks[props.weekIndex].days[props.index].exercises = newExercises;
            setRoutineData({...routineData,
                weeks:updatedData.weeks
            });
            updateDoc(docRef, routineData);
        }
        removeExercise();
    }
    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <button onClick={handleDelete}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newDayHandler}><HiPlus size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex flex-col w-fit my-2'>
                {data.exercises.map((exercise,i )=> <Exercise weekIndex={props.weekIndex} dayIndex = {props.index} index = {i} exerciseCount={data.exercises.length} deleteExercise ={deleteExercise} newExerciseHandler={newExerciseHandler} key = {exercise.eid} data = {exercise}/>)} 
            </div>
        </div>
    );
}
export default Day;