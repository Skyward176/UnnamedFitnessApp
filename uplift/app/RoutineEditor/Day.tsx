'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useEffect} from 'react';
import {getDoc} from 'firebase/firestore';
import Exercise from './Exercise';
import {updateDoc} from 'firebase/firestore'
const Day = (props) => {
    const [data, setData] = useState({
        exercises:[],
        title: '',
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

    const handleTitleChange= (e) =>{
        updateDoc(props.data, {
            title: e.target.value
        });
    }
    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <button><HiXMark color='red' size='1.75rem'/></button>
                <HiBars3 size='1.75rem'/>
                <HiOutlineDocumentDuplicate size='1.75rem'/>
                <HiPlus size='1.75rem'/>
                <input onBlur={handleTitleChange} placeholder={data.title} type='text' className='font-light font-sans text-2xl text-left w-1/2 h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex flex-col w-fit my-2'>
                {data.exercises.map(exercise => <Exercise data = {exercise}/>)} 
            </div>
        </div>
    );
}
export default Day;