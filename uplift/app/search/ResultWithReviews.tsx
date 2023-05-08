import SearchResult from './SearchResult';
import ReviewList from '@/components/ReviewList';
import {firebase_app} from '@/config/firebaseInit';
import {doc, getFirestore, deleteDoc} from 'firebase/firestore';
const ResultWithReviews = ({fetchReviews, reviews, setShowReviewForm, display, handleRoutineClick, docData}) => {
    const db = getFirestore(firebase_app);


    const deleteReviewHandler = (reviewId) => {
        deleteDoc(doc(db,'reviews', reviewId));
        fetchReviews(doc(db,'routines', docData._firestore_id));
        
    }
    if(docData!=null){
        return(
            <>
                <div style={{display: display}} className='flex flex-col h-full w-1/2'>
                    <SearchResult handleRoutineClick={handleRoutineClick} doc={docData} selected='true' />
                    <ReviewList deleteHandler={deleteReviewHandler} reviews={reviews} setShowForm = {setShowReviewForm}  />
                </div>

            </>
        )

    } else{
        return(
            <>
            </>
        )
    }
}
export default ResultWithReviews;
