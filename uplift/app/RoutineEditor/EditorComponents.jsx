'use client'
import {HiBars3, HiPlus, HiOutlineDocumentDuplicate} from 'react-icons/hi2';
const Week = ({children}) => {
    //testing purposes
    let number=1;
    return(
        <>
            <div className='flex items-center'>
                <HiBars3 size='1.75rem'/>
                <HiPlus size='1.75rem'/>
                <p className='font-sans font-light text-2xl ml-2'>Week {number}</p>
            </div>
            { children }
        </>
    );
}
const Exercise = () => {
    return(
        <>
            <div className=' px-7 flex items-center'>
                <HiBars3 size='1.75rem'/>
                <div className='flex'>
                    <input type='text' className='w-1/4 appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
                    <p> for </p>
                    <input type='text' className='w-6 text-center appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
                    <p> Sets x </p>
                    <input type='text' className='w-6 text-center appearance-none bg-black mx-2  border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
                    <p> Reps </p>
                </div>
            </div>
        </>
    );
}
const Day = ({children}) => {
    let number = 1; //testing purposes
    return(
        <div className='px-7'>
            <div className='flex items-center'>
                <HiBars3 size='1.75rem'/>
                <HiOutlineDocumentDuplicate size='1.75rem'/>
                <HiPlus size='1.75rem'/>
                <p className='font-sans font-light text-2xl ml-2'>Day {number}</p>
            </div>
            {children}
        </div>
    );
}
const DescriptionForm = () => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <label className='text-2xl font-light font-sans'>Title: </label>
                <input type='text' className='appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex flex-col h-1/2'>
                <label className='text-2xl font-light font-sans'>Description:</label>
                <input type='text' className='w-full h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex items-center'>
                <label className='text-white'>Tags</label>
                <input type='text' className='appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
        </div>
    );
}
 
export {Week, Day, Exercise, DescriptionForm};
