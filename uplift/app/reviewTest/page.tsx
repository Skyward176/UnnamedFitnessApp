'use client'
import Navbar from '@/components/Navbar';
import {auth, firebase_app} from '@/config/firebaseInit';
import {useState} from 'react';
import {getFirestore, addDoc, collection} from 'firebase/firestore';
function ReviewTest() {   
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(0);
    const db = getFirestore(firebase_app);
    const handleReviewForm = () => {
        const createReview = async () => {
            const newReview = await addDoc(collection(db, 'reviews'), {
                uid: auth.currentUser.uid,
                routineID: '',
                rating: {rating},
                comment: {comment},
            });
        }
        createReview();
    }
    return(
        <>
            <Navbar />
            <div className='w-full flex flex-col flex-grow items-center justify-center'>
                <h1 className='text-white text-4xl font-light font-sans my-4'>Create Review </h1>
                <form className = 'flex flex-col w-72 md:w-96 ' onSubmit={handleReviewForm}>
                    <div className='flex w-full items-center'>
                        <label className = 'font-light font-sans text-white text-2xl mr-2'>
                            Rating:
                        </label>
                        <input className='w-full text-white flex-grow font-light font-sans text-2xl appearance-none bg-black my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100' 
                            onChange={(e) => setRating(e.target.value)}  placeholder="4" type='number'/>
                        <p className = 'font-light font-sans text-white text-2xl w-1/2 ml-2'> stars </p>
                    </div>
                    <label className = 'font-light font-sans text-white text-2xl'>
                        Write Comment:
                        <input className='w-full font-light font-sans text-2xl appearance-none bg-black mx-2 my-4 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 ' 
                            onChange={(e) => setComment(e.target.value)} required name="comment" id="comment" placeholder="" />
                    </label>
                    <div className='my-4 flex w-full items-center justify-center'>
                        <button className = 'text-white font-sans font-light text-2xl bg-black border border-accent-100 rounded w-24 h-10' type="submit">Sumbit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default ReviewTest;
