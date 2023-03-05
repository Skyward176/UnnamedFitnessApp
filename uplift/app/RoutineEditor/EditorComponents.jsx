'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {AiOutlineSave} from 'react-icons/ai';
import IconButton from '@/components/IconButton';
import {useEffect, useState} from 'react';
import {getDoc} from 'firebase/firestore';
const Week = (props) => {
    const [days, setDays] = useState({
        days:[],
    })
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
            setDays(fetchedData);
        }
        resolveData(props.data);
    },[props])
    return(
        <>
            <div className='flex items-center'>
                <button><HiXMark color='red' size='1.75rem'/></button>
                <HiBars3 size='1.75rem'/>
                <HiPlus size='1.75rem'/>
                <p className='font-sans font-light text-2xl ml-2'>Week 1</p>
            </div>
            <div className='h-full p-4 block w-full'>
                {days.days.map(day => <Day data={day}/>)}
            </div>
        </>
    );
}
const Exercise = (props) => {
    const [data, setData] = useState({
        name:'',
        sets:0,
        reps:0
    })
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
    },[props])

    return(
        <>
            <div className=' px-7 flex items-center'>
                <button><HiXMark color='red' size='1.75rem'/></button>
                <HiBars3 size='1.75rem'/>
                <div className='flex'>
                    <input type='text' placeholder = {data.name} className='w-1/4 appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> for </p>
                    <input type='text' placeholder = {data.sets} className='w-6 text-center appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> Sets x </p>
                    <input type='text' placeholder = {data.reps} className='w-6 text-center appearance-none bg-black mx-2  border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '>
                    </input>
                    <p> Reps </p>
                </div>
            </div>
        </>
    );
}
const Day = (props) => {
    const [exercises, setExercises] = useState({
        exercises:[],
    })
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
            setExercises(fetchedData);
        }
        resolveData(props.data);
    },[props])
    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <button><HiXMark color='red' size='1.75rem'/></button>
                <HiBars3 size='1.75rem'/>
                <HiOutlineDocumentDuplicate size='1.75rem'/>
                <HiPlus size='1.75rem'/>
                <p className='font-sans font-light text-2xl ml-2'>Day 1</p>
            </div>
            <div className='flex flex-col w-fit my-2'>
                {exercises.exercises.map(exercise => <Exercise data = {exercise}/>)} 
            </div>
        </div>
    );
}
const DescriptionForm = (props) => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <label className='text-2xl font-light font-sans'>Title: </label>
                <input id='titleBox' onBlur={props.changeTitle} placeholder={props.title} type='text' className='font-light font-sans text-2xl appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex flex-col h-1/2'>
                <label className='text-2xl font-light font-sans'>Description:</label>
                <input onBlur={props.changeDescription} placeholder={props.description} type='text' className='font-light font-sans text-xl text-left w-full h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex items-center'>
                <label className='text-white'>Tags</label>
                <input type='text' className='appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex items-center'>
                <IconButton onClick={props.saveFunction}>
                    <AiOutlineSave color='white' size='3rem'/>
                </IconButton>
            </div>
        </div>
    );
}
const AddDayButton = () => {
    return(
        <button className='self-center'>
            <div className='flex border-2 w-12 rounded justify-center items-center my-4'>
                <HiPlus size='1.75rem'/>
            </div>
        </button>
    );
} 
export {Week, Day, Exercise, DescriptionForm, AddDayButton};
