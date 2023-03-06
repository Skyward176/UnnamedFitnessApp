'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useEffect, useState} from 'react';
import {getDoc, updateDoc, addDoc, collection, arrayUnion,arrayRemove, deleteDoc} from 'firebase/firestore';
import Day from './Day'
const Week = (props) => {
    const [data, setData] = useState({
        days:[],
        title:'Unnamed',
    })
    const [weekRef, setWeekRef] = useState();
    useEffect(() => {
        const readIds = async(array) => {
            const readPromises = array.map(id => getDoc(id));
            const result = await Promise.all(readPromises);
            return result.map(doc => doc.data());
        }
        const resolveData = async (data) => {
            let fetchedData= await getDoc(data);
            fetchedData = fetchedData.data()
            //const resolvedData = await readIds(fetchedData);
            setData(fetchedData);
        }
        resolveData(props.data);
        setWeekRef(props.data);
    },[props])

    const handleTitleChange= (e) =>{
        updateDoc(props.data, {
            title: e.target.value
        });
    }
    const deleteHandler = (e) => {
        if(props.weekCount>1){
            props.deleteWeek(weekRef);
        }
    }
    const newDayHandler = () => {
        const createDoc = async (routineRef) => {
            const newDay = await addDoc(collection(routineRef, 'days'), {
                exercises:[],
            });
            const newExercise = await addDoc(collection(routineRef, 'exercises'), {
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
    const deleteDay = (ref) => {
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
                <HiBars3 size='1.75rem'/>
                <button onClick={props.newWeekHandler}><HiPlus size='1.75rem'/></button>
                <input onBlur={handleTitleChange} placeholder={data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='h-full p-4 block w-full'>
                {data.days.map(day => <Day routineRef={props.routineRef} dayCount={data.days.length}deleteDay={deleteDay} newDayHandler={newDayHandler} data={day}/>)}
            </div>
        </>
    );
}
export default Week;