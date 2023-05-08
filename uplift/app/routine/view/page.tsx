'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import Description from './Description';
import {useState, useEffect, useCallback} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore,deleteDoc, getDoc, doc, collection, where, getDocs, query} from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import {RoutineContext} from '@/context/RoutineContext';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList'
export default function RoutineView() {

    // state variables
    const [routineData, setRoutineData] = useState({
        uid: 0,
        title: "",
        description: "",
        weeks: [{
            title: "",
            wuid:"",
            days: [{
                title: "",
                duid:"",
                exercises: [{
                    eid: "",
                    name: "",
                    sets: 0,
                    reps: 0
                }],
            }],
        }],
        tags:[]
    });
    const [docRef, setDocRef] = useState();

    const [showReviewForm, setShowReviewForm] = useState(true);
    const [reviews, setReviews] = useState([]);

    
    // db ref
    const db = getFirestore(firebase_app);

    // router
    const router = useRouter();
    // parameters to control creation of routine
    const searchParams = useSearchParams();


    // on page load, check params to determine creation of new routine, else grab routine reference passed through params
    // use
    const fetchReviews = useCallback(async (routineId) => {
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('routineID','==', routineId));
        const querySnapshot = await getDocs(q);
        let reviewArr: any[] = [];

        querySnapshot.forEach((doc) => {
            reviewArr.push(doc);
        });
        setReviews(reviewArr);
    }, [db])
    useEffect(() => {
        
        var docId = searchParams.get('routineID');
        docId = doc(db, 'routines', docId);
        setDocRef(docId);
        const hydrateData = async (docId) => {
            const data = await getDoc(docId);
            setRoutineData(data.data());
        }
        hydrateData(docId);
        fetchReviews(docId);
    }, [searchParams, db, fetchReviews]);

    const deleteReviewHandler = (reviewId) => {
        deleteDoc(doc(db,'reviews', reviewId));
        fetchReviews(docRef);
        
    }

    return(
        <div className='flex flex-col h-full w-full md:overflow-hidden'>
            <Navbar />
            <RoutineContext.Provider value={[routineData,setRoutineData]}>
                <div className='w-screen grow flex lg:flex-row flex-col text-white '>
                <div className='flex lg:overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg 
                                scrollbar-track-black scrollbar-thumb-slate-900 flex-col justify-center items-center 
                                lg:w-1/2 lg:h-full w-full border-b border-b-white lg:border-b-0 lg:border-r lg:border-r-white'>
                        {routineData.weeks.map((week, i) => <div className='h-full p-4 block w-full'>
                                                    <Week index={i} data={week} key={week.wuid}/>
                                                </div>)}
                    </div>
                    <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2'>
                        <div className='h-full p-4 flex flex-col w-full'>
                            <Description/>
                            <ReviewForm setReviews = {setReviews} showForm = {showReviewForm} routineId={docRef}/>
                            <ReviewList deleteHandler = {deleteReviewHandler} reviews = {reviews} setShowForm = {setShowReviewForm}/>
                        </div>
                    </div>
                </div>

            </RoutineContext.Provider>
        </div>
    );
}
