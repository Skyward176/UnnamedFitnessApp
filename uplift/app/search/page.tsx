'use client'

import { useState, useEffect, useContext} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { SearchContext } from "@/context/SearchContext";
import SearchResult from './SearchResult';
function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 

    const [selectedRoutine, setSelectedRoutine] = useState();

    const handleRoutineClick = (id) => {
        setSelectedRoutine(id);
    }
    // This is how to make a link to the view page. Saving it for later, when I decide where to put it.
    // <Link href={{pathname:'routine/view',query:{routineID:doc._firestore_id}}} className='text-2xl text-white '>{doc.title}</Link>
    return(
        <>
            <Navbar/>
            <div className='flex items-center justify-center w-full h-36'>
                <p className='text-gray-400 font-sans font-light text-3xl'>Showing results for <span className='text-white'>'{searchParams.get('searchQuery')}'</span></p>
            </div>
            <div className='w-full flex justify-center h-full'>
                <div className = 'flex flex-col h-full md:w-96 lg:w-1/2 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
                    {Object.values(searchResults).map((doc)=> <SearchResult handleRoutineClick={handleRoutineClick} doc={doc} key={doc._firestore_id} selected={selectedRoutine===doc._firestore_id ? true: false} />)}

                </div>
            </div>
        </>
    )
}
export default Search;