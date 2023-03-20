'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useEffect} from 'react';
import {getDoc} from 'firebase/firestore';
import Exercise from './Exercise';
import {updateDoc, deleteDoc, arrayUnion, arrayRemove, addDoc,collection} from 'firebase/firestore'
import {auth} from '@/config/firebaseInit';
const Day = (props) => {
    const [data, setData] = useState(props.data)
    useEffect(() => {
    },[])

    const handleTitleChange= (e) =>{
        updateDoc(props.data, {
            title: e.target.value
        });
    }
    const handleDelete= () => {// need rewrite
        if(props.dayCount>1){
            props.deleteDay(props.data);
        }
    }
    const newExerciseHandler = () => {// need rewrite
        const createDoc = async (routineRef) => {
            const newExercise = await addDoc(collection(routineRef, 'exercises'), {
                uid:auth.currentUser.uid,
                name:'',
                reps:0,
                sets:0,
            });
            await updateDoc(dayRef, {
                exercises: arrayUnion(newExercise)
            })
            let newExercises =  [...data.exercises, newExercise];
            setData({...data, exercises: newExercises

            });
        }
        console.log("Create Exercise Fired");
        createDoc(props.routineRef);
    }
    const deleteExercise= (ref) => {//need rewrite
        deleteDoc(ref);
        updateDoc(dayRef, {
            exercises: arrayRemove(ref)
        })
        setData({
            title: data.title,
            exercises: data.exercises.filter(function (exercise){
                    return exercise!=ref
                })
            }
       )
        console.log(ref);
        getDoc(dayRef).then((data)=>console.log(data.data().exercises))
    }
    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <button onClick={handleDelete}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newDayHandler}><HiPlus size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex flex-col w-fit my-2'>
                {data.exercises.map((exercise)=> <Exercise exerciseCount={data.exercises.length} deleteExercise ={deleteExercise} newExerciseHandler={newExerciseHandler} key = {exercise.name} data = {exercise}/>)} 
            </div>
        </div>
    );
}
export default Day;