import RoutineView from './View';
function DetailView({setReviews, showReviewForm, selectedRoutine}) {
    if(!selectedRoutine) {
        return null;
    } else {
        return(
            <div className='border border-y-0 border-l-1 border-r-0 border-gray-400 flex justify-center h-full w-1/2'>
                <RoutineView setReviews={setReviews} showReviewForm={showReviewForm} docId = {selectedRoutine}/>
            </div>
        )
    }
}
export default DetailView;
