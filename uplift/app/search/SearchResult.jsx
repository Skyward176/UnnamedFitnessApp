import ReviewBlock from "@/components/ReviewBlock";
import {useState} from 'react';
function SearchResult(props) {
    return(
        <div className='font-sans font-light border-b border-white h-28 p-4 w-72 md:w-96 lg:w-full flex items-center justify-between' style={props.selected ? {backgroundColor:'rgb(30 41 59)'}: {backgroundColor:'black'}}>
            <div className='flex flex-col'>
                <button className ='text-2xl text-white text-left' onClick={()=> props.handleRoutineClick(props.doc._firestore_id)}>{props.doc.title}</button>
                <p className='text-gray-400 text-xl'>{props.doc.weeks.length} Weeks</p>
                <p className='text-gray-400 text-xl'>{props.doc.weeks[0].days.length} Days/Week</p>
            </div>

            <ReviewBlock routineId={props.doc._firestore_id}/>
        </div>
    )
}
export default SearchResult;