'use client'

import { useState, useEffect, useContext} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { SearchContext } from "@/context/SearchContext";
import ReviewBlock from "@/components/ReviewBlock";
function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 

    return(
        <>
            <Navbar/>
            <div className='flex items-center justify-center w-full h-36'>
                <p className='text-gray-400 font-sans font-light text-3xl'>Showing results for <span className='text-white'>'{searchParams.get('searchQuery')}'</span></p>
            </div>
            <div className='w-full flex justify-center h-full'>
                <div className = 'flex flex-col h-full md:w-96 lg:w-1/2 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
                    {Object.values(searchResults).map((doc)=> <div key={doc._firestore_id} 
                                                                   className='font-sans font-light border-b border-white h-24 p-4 w-72 md:w-96 lg:w-full flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <Link href={{pathname:'routine/view',query:{routineID:doc._firestore_id}}} className='text-2xl text-white '>{doc.title}</Link>
                                        <p className='text-gray-400 text-xl'>{doc.weeks.length} Weeks</p>
                                        <p className='text-gray-400 text-xl'>{doc.weeks[0].days.length} Days/Week</p>
                                    </div>
                                    <ReviewBlock routineId={doc._firestore_id}/>
                                </div>)}

                </div>
            </div>
        </>
    )
}
export default Search;