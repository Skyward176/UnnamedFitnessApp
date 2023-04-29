'use client'
import {useState, useEffect} from 'react';
import ReviewBlock from './ReviewBlock';
import {firebase_app} from '@/config/firebaseInit';
import {getFirestore, collection, query, doc, getDocs, where} from 'firebase/firestore';
function ReviewAverage({routineID}) {
    const [average, setAverage] = useState(0);
    useEffect(() => {
        const fetchData = async (routineID) => {
            const db = getFirestore(firebase_app);
            const reviewsRef = collection(db, 'reviews');
            const routineDoc = doc(db, 'routines', routineID)
            const q = query(reviewsRef, where('routineID', '==', routineDoc))
            const querySnapshot = await getDocs(q);
            let reviewCount = 0;
            let totalStars = 0;
            querySnapshot.forEach((doc) => {
                reviewCount = reviewCount + 1;
                totalStars = totalStars + parseInt(doc.data().rating);
            });
            setAverage(totalStars/reviewCount);
        }
        fetchData(routineID)
    }, [routineID]) 
    return(
        <ReviewBlock totalStars ={5} stars={average}/>
    )
}
export default ReviewAverage;
