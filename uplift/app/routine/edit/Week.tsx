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
    const docRef = useContext(DocrefContext);
    const [data, setData] = useState(props.data);
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
    const deleteDay = (docRef,data) => {// can't delete first day but that may not matter???
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
                <button onClick={deleteHandler}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newWeekHandler}><HiPlus size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={props.data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='h-full p-4 block w-full'>
                {
                    routineData.weeks[props.index].days.map((day, i) => <Day index ={i}  dayCount={routineData.weeks[props.index].days.length} deleteDay={deleteDay} newDayHandler={newDayHandler} data={day} key={day.duid}/>)
                }
            </div>
        </>
    );
}
export default Week;