'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {useState, useEffect} from 'react';
import {getDoc, updateDoc} from 'firebase/firestore';
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

    const handleTitleChange= (e) =>{
        updateDoc(props.data, {
            name: e.target.value
        });
    }
    const handleSetsChange= (e) =>{
        updateDoc(props.data, {
            sets: Number(e.target.value)
        });
    }
    const handleRepsChange= (e) =>{
        updateDoc(props.data, {
            reps: Number(e.target.value)
        });
    }
    const handleDelete= () => {
        if(props.exerciseCount>1){
            props.deleteExercise(props.data);
        }
    }
    return(
        <>
            <div className=' px-7 flex items-center'>
                <button onClick={handleDelete}><HiXMark color='red' size='1.75rem'/></button>
                <HiBars3 size='1.75rem'/>
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