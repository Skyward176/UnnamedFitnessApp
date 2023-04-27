'use client'
import {getFirestore, query, collection, getDocs, where} from 'firebase/firestore';
import {firebase_app, auth} from '@/config/firebaseInit';
import {useState, useEffect} from 'react';
import ReviewBlock from '@/components/ReviewBlock';
function ReviewList({routineId}) {
    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        const db = getFirestore(firebase_app);
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('routineID', '==',routineId))
        const querySnapshot = await getDocs(q);
        let reviewArr: any[] = [];

        querySnapshot.forEach((doc) => {
            reviewArr.push(doc);
        });
        setReviews(reviewArr);
    }

    useEffect( () => {
        fetchData().catch((error)=>{
            console.log('Failed fetching data')
            console.log(error)
        })
    }, [routineId]);
    return(
        <div className='text-white overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
            {
                reviews.map((review) => <div key={review.id} className='flex flex-col border-b border-white h-fit p-4 w-72 md:w-96 lg:w-full '>
                    <div  className='flex items-center justify-between my-2'>
                        <ReviewBlock stars={review.data().rating} totalStars={5}/>
                        <div>
                        <p className='text-2xl font-light font-sans'><span className='text-accent-100'>By</span> {review.data().userName}</p>
                        </div>
                    </div>
                    <div className='text-white text-2xl font-sans font-light'>
                        {review.data().comment}
                    </div>
                </div>)
            }
        </div>
    );
}
export default ReviewList;
