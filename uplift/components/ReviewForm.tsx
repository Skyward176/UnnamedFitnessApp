'use client'
import Navbar from '@/components/Navbar';
import {auth, firebase_app} from '@/config/firebaseInit';
import {useState, useContext} from 'react';
import {query, where, getDocs, getFirestore, addDoc, collection, getDoc, doc} from 'firebase/firestore';
import {AuthContext} from '@/context/AuthContext';
function ReviewForm ({setReviews, showForm, routineId}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(0);
    const db = getFirestore(firebase_app);
    const [profile, setProfile] = useContext(AuthContext);
    const handleReviewForm = async (e) => {
        e.preventDefault();

        const createReview = async () => {
            const newReview = await addDoc(collection(db, 'reviews'), {
                uid: auth.currentUser.uid,
                routineID: routineId,
                rating: rating,
                comment: comment,
                userName: profile.name
            });
        }
        const fetchReviews = async (routineId) => {
            const db = getFirestore(firebase_app);
            const reviewsRef = collection(db, 'reviews');
            const q = query(reviewsRef, where('routineID','==', routineId));
            const querySnapshot = await getDocs(q);
            let reviewArr: any[] = [];

            querySnapshot.forEach((doc) => {
                reviewArr.push(doc);
            });
            setReviews(reviewArr);
        }

        createReview();
        fetchReviews(routineId);

    }
    return(
        <>
            <div style={{display:showForm?'flex':'none'}} className='w-full flex-col h-full items-center justify-center'>
                <h1 className='text-white text-2xl font-light font-sans my-2'>Write a Review </h1>
                <form className = 'flex flex-col w-72 md:w-96 ' onSubmit={(e)=>handleReviewForm(e)}>
                    <div className='flex w-full items-center'>
                        <label className = 'font-light font-sans text-white text-xl mr-2'>
                            Rating:
                        </label>
                        <input className='w-full text-white flex-grow font-light font-sans text-2xl appearance-none bg-black my-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100' 
                            onChange={(e) => setRating(e.target.value)}  placeholder="4" type='number'/>
                        <p className = 'font-light font-sans text-white text-xl w-1/2 ml-2'> stars </p>
                    </div>
                    <label className = 'font-light font-sans text-white text-xl'>
                        Write Comment:
                        <input className='w-full font-light font-sans text-xl appearance-none bg-black mx-2 my-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setComment(e.target.value)} required name="comment" id="comment" placeholder="" />
                    </label>
                    <div className='my-4 flex w-full items-center justify-center'>
                        <button className = 'text-white font-sans font-light text-xl bg-black border border-accent-100 rounded w-24 h-10' type="submit">Sumbit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReviewForm;
