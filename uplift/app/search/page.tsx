'use client'

import { useCallback, useState, useEffect, useContext} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import { SearchContext } from "@/context/SearchContext";
import SearchResult from './SearchResult';
import DetailView from "./DetailView";
import ResultList from './ResultList';
import ResultWithReviews from './ResultWithReviews';
import {query, getDocs, where, getFirestore, collection} from 'firebase/firestore';
import {firebase_app} from '@/config/firebaseInit';
function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults, searchQuery, setSearchQuery] = useContext(SearchContext); 

    const [selectedRoutine, setSelectedRoutine] = useState();

    const [selectedData, setSelectedData] = useState();

    const [showReviewForm, setShowReviewForm] = useState(true);
    const [reviews, setReviews] = useState([]);

    const db = getFirestore(firebase_app);
    const handleRoutineClick = (doc) => {
        const id = doc._firestore_id;
        if(selectedRoutine === id){
            setSelectedRoutine(null);
            setSelectedData(null);

        } else {
            setSelectedRoutine(id);
            setSelectedData(doc);
        }
    }

    const fetchReviews = useCallback(async (routineId) => {
        console.log(routineId);
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('routineID','==', routineId));
        const querySnapshot = await getDocs(q);
        let reviewArr: any[] = [];
        querySnapshot.forEach((doc) => {
            reviewArr.push(doc);
        });
        setReviews(reviewArr);
    }, [db])
    // This is how to make a link to the view page. Saving it for later, when I decide where to put it.
    // <Link href={{pathname:'routine/view',query:{routineID:doc._firestore_id}}} className='text-2xl text-white '>{doc.title}</Link>
    return(
        <div className='overflow-hidden h-full'>
            <Navbar/>
            <div className='flex h-full'>
                <ResultList selectedRoutine={selectedRoutine} 
                            handleRoutineClick={handleRoutineClick}
                            searchParams={searchParams}
                            display={selectedRoutine!=null?'none':'flex'}
                            setShowForm = {setShowReviewForm}
                />
                <ResultWithReviews
                    fetchReviews={fetchReviews}
                    display={selectedRoutine!=null?'flex':'none'} 
                    handleRoutineClick={handleRoutineClick}
                    docData = {selectedData}
                    setShowReviewForm = {setShowReviewForm}
                    reviews = {reviews}
                    
                />
                <DetailView setReviews={setReviews} showReviewForm = {showReviewForm} selectedRoutine={selectedRoutine}/>
            </div>
        </div>
    )
}
export default Search;
