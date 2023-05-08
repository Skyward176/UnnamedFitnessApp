'use client'
import {HiXMark} from 'react-icons/hi2';
import {auth} from '@/config/firebaseInit';
import {useEffect} from 'react';
import ReviewBlock from '@/components/ReviewBlock';
function ReviewList({deleteHandler, reviews, setShowForm}) {

    useEffect( () => {
        const checkData = async () => {
            const filteredReviews = reviews.filter((review) => {
                return review.data().uid == auth.currentUser.uid
            })
            if(filteredReviews.length > 0){
                setShowForm(false);
            }else {
                setShowForm(true);
            }
        }
        checkData().catch((error)=>{
            console.log('Failed fetching data')
            console.log(error)
        })
    }, [reviews, setShowForm]);
    return(
        <div className='text-white overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-black scrollbar-thumb-slate-900'>
            {
                reviews.map((review) => <div key={review.id} className='flex flex-col border-b border-white h-fit p-4 w-72 md:w-96 lg:w-full '>
                    <div  className='flex items-center justify-between my-2'>
                        <ReviewBlock stars={review.data().rating} totalStars={5}/>
                        <div className='flex'>
                            <p className='text-2xl font-light font-sans'><span className='text-accent-100'>By</span> {review.data().userName}</p>
                            <button style={{display:review.data().uid == auth.currentUser.uid ? 'block':'none'}} onClick={() => deleteHandler(review.id)}><HiXMark color='red' size='1.75rem'/></button>
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
