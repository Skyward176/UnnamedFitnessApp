'use client'

import { useState, useEffect, useContext} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { SearchContext } from "@/context/SearchContext";
import SearchResult from './SearchResult';
import DetailView from "./DetailView";
function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 

    const [selectedRoutine, setSelectedRoutine] = useState();

    const handleRoutineClick = (id) => {
        if(selectedRoutine === id){
            setSelectedRoutine(null);
        } else {
            setSelectedRoutine(id);
        }
    }
    // This is how to make a link to the view page. Saving it for later, when I decide where to put it.
    // <Link href={{pathname:'routine/view',query:{routineID:doc._firestore_id}}} className='text-2xl text-white '>{doc.title}</Link>
    return(
        <div className='overflow-hidden h-full'>
            <Navbar/>
            <div className='flex h-full'>
                <div className={`flex flex-col items-center h-full ${selectedRoutine? 'w-1/2':'w-full'}`}>
                    <div className = {`${selectedRoutine? 'lg:w-full':'lg:w-1/2'} pl-2 flex flex-col h-full md:w-96 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900`}>
                        <div className='flex items-center justify-start w-full h-36 ml-4'>
                            <p className='text-gray-400 font-sans font-light text-3xl'>Showing results for <span className='text-white'>'{searchParams.get('searchQuery')}'</span></p>
                        </div>
                        {Object.values(searchResults).map((doc)=> <SearchResult handleRoutineClick={handleRoutineClick} doc={doc} key={doc._firestore_id} selected={selectedRoutine===doc._firestore_id ? true: false} />)}

                    </div>
                </div>
                <DetailView selectedRoutine={selectedRoutine}/>
            </div>
        </div>
    )
}
export default Search;