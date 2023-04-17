'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark, HiChevronUp, HiChevronDown} from 'react-icons/hi2';
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
    const docRef = useContext(DocrefContext);
    useEffect(() => {
    },[])

    const handleTitleChange= (e) =>{
        const updatedData = routineData;
        updatedData.weeks[props.index].title = e.target.value;
        setRoutineData(updatedData);
        updateDoc(docRef, routineData);
    }
    const deleteHandler = (e) => {
        if(props.weekCount>1){
            props.deleteWeek(docRef,props.data);
        }
    }
    const newDayHandler = () => {
        const createDay= async (docRef) => {
            const newDay = {
                    title: "newDay",
                    duid: uuid(),
                    exercises: [{
                            eid:uuid(),
                            name: "",
                            sets: 0,
                            reps: 0
                        }
                    ]
                }
            const updatedData = routineData;
            updatedData.weeks[props.index].days = [...updatedData.weeks[props.index].days, newDay];
            setRoutineData({...routineData,
                weeks:updatedData.weeks
            });
            updateDoc(docRef, routineData);
        }
        console.log("Create Day Fired");
        createDay(docRef);
    }
    const duplicateDayHandler = (index) => {
        const dupeDay= async (docRef) => {

            const oldDay = routineData.weeks[props.index].days[index];
            const newDay = {
                title:oldDay.title,
                duid:uuid(),
                exercises: []
            }
            oldDay.exercises.forEach((exercise,i) => {
                newDay.exercises.push({
                    ...oldDay.exercises[i],
                    eid:uuid()
                });
            });
            console.log(newDay);
            let newDays = [...routineData.weeks[props.index].days, newDay];
            const updatedData = routineData;
            updatedData.weeks[props.index].days = newDays;
            setRoutineData({
                ...routineData,
                weeks:updatedData.weeks
            });
            updateDoc(docRef, routineData)
        }
        dupeDay(docRef);
    }
    const deleteDay = (docRef,data) => {
        const removeDay = async () => {
            let newDays = routineData.weeks[props.index].days.filter(function (day) {
                return(day!=data);
            });
            const updatedData = routineData;
            updatedData.weeks[props.index].days = newDays;
            setRoutineData({...routineData,
                weeks:updatedData.weeks
            });
            updateDoc(docRef, routineData);
        }
        removeDay();
    }
    return(
        <>
            <div className='flex items-center'>
                <div className='flex flex-col w-7 h-7'>
                    <button onClick={(e)=>props.handleMoveWeekUp(props.index)}><HiChevronUp size='1rem'/></button>
                    <button onClick={(e)=>props.handleMoveWeekDown(props.index)}><HiChevronDown /></button>
                </div>
                <button onClick={deleteHandler}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newWeekHandler}><HiPlus size='1.75rem'/></button>
                <button onClick={(e) => props.duplicateWeekHandler(props.index)}><HiOutlineDocumentDuplicate size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={props.data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='h-full p-4 block w-full'>
                {
                    routineData.weeks[props.index].days.map((day, i) => <Day weekIndex = {props.index} 
                                                                        index ={i}  
                                                                        dayCount={props.data.days.length} 
                                                                        deleteDay={deleteDay} 
                                                                        newDayHandler={newDayHandler} 
                                                                        duplicateDayHandler={duplicateDayHandler}
                                                                        data={day} 
                                                                        key={day.duid}/>)
                }
            </div>
        </>
    );
}
export default Week;
