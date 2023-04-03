'use client'

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect, useContext} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { SearchContext } from "@/context/SearchContext";

function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 

    return(
        <>
            <Navbar/>
            <div className='flex items-center justify-center'>
                <p className='text-white'>Showing results for '{searchParams.get('searchQuery')}'</p>
            </div>
            <div className = 'flex flex-col h-full md:w-96 lg:w-1/2 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
                {Object.values(searchResults).map((doc)=> <div key={doc.id} className='border-b border-white h-20 p-4 w-72 md:w-96 lg:w-full flex items-center justify-between'>
                                <Link href={{pathname:'routine/view',query:{routineID:doc.id}}} className='text-white text-2xl font-sans font-light'>{doc.title}</Link>
                            </div>)}

            </div>
        </>
    )
}
export default Search;