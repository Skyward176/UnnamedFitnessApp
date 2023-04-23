import SearchResult from './SearchResult';
import {useContext} from 'react';
import { SearchContext } from '@/context/SearchContext';
const ResultList = ({selectedRoutine, handleRoutineClick, searchParams, display}) => {
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 
    return(
        <div style={{display: display}} className={`flex flex-col items-center h-full ${selectedRoutine? 'w-1/2':'w-full'}`}>
            <div className = {`${selectedRoutine? 'lg:w-full':'lg:w-1/2'} pl-2 flex flex-col h-full md:w-96 md:h-3/4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900`}>
                <div className='flex items-center justify-start w-full h-36 ml-4'>
                    <p className='text-gray-400 font-sans font-light text-3xl'>Showing results for <span className='text-white'>'{searchParams.get('searchQuery')}'</span></p>
                </div>
                {Object.values(searchResults).map((doc)=> <SearchResult handleRoutineClick={handleRoutineClick} doc={doc} key={doc._firestore_id} selected={selectedRoutine===doc._firestore_id ? true: false} />)}

            </div>
        </div>
    )
}
export default ResultList;
