import SearchResult from './SearchResult';
import ReviewList from '@/components/ReviewList';
import {firebase_app} from '@/config/firebaseInit';
import {doc, getFirestore} from 'firebase/firestore';
const ResultWithReviews = ({setShowReviewForm, display, handleRoutineClick, docData}) => {
    const db = getFirestore(firebase_app);
    if(docData!=null){
        return(
            <>
                <div style={{display: display}} className='flex flex-col h-full w-1/2'>
                    <SearchResult handleRoutineClick={handleRoutineClick} doc={docData} selected='true' />
                    <ReviewList setShowForm = {setShowReviewForm} routineId = {docData._firestore_id} />
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
