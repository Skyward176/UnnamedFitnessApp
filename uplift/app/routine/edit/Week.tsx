'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useEffect, useState} from 'react';
import {getDoc, updateDoc, addDoc, collection, arrayUnion,arrayRemove, deleteDoc} from 'firebase/firestore';
import {auth} from '@/config/firebaseInit';
import Day from './Day'
const Week = (props) => {
    const [data, setData] = useState(props.data);
    useEffect(() => {
    },[])

    const handleTitleChange= (e) =>{
        updateDoc(props.routineRef, {
        });
    }
    const deleteHandler = (e) => {
        if(props.weekCount>1){
            props.deleteWeek(props.routineRef,data);
        }
    }
    const newDayHandler = () => { //needs rewrite
        const createDoc = async (routineRef) => {
            const newDay = await addDoc(collection(routineRef, 'days'), {
                uid:auth.currentUser.uid,
                exercises:[],
            });
            const newExercise = await addDoc(collection(routineRef, 'exercises'), {
                uid:auth.currentUser.uid,
                name:'',
                reps:0,
                sets:0,
            });
            await updateDoc(newDay, {
                exercises: [newExercise]
            })
            await updateDoc(weekRef, {
                days: arrayUnion(newDay)
            })
            let newDays =  [...data.days, newDay];
            setData({...data, days: newDays

            });
        }
        console.log("Create Day Fired");
        createDoc(props.routineRef);
    }
    const deleteDay = (ref) => {//needs rewrite
        deleteDoc(ref);
        updateDoc(weekRef, {
            days: arrayRemove(ref)
        })
        setData({
            title: data.title,
            days: data.days.filter(function (day){
                    return day!=ref
                })
            }
       )
        console.log(ref);
        getDoc(weekRef).then((data)=>console.log(data.data().days))
    }
    return(
        <>
            <div className='flex items-center'>
                <button onClick={deleteHandler}><HiXMark color='red' size='1.75rem'/></button>
                <button onClick={props.newWeekHandler}><HiPlus size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='h-full p-4 block w-full'>
                {data.days.map((day) => <Day routineRef={props.routineRef} dayCount={data.days.length} deleteDay={deleteDay} newDayHandler={newDayHandler} data={day} key={day.title}/>)}
            </div>
        </>
    );
}
export default Week;