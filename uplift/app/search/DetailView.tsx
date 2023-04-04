import RoutineView from './View';
function DetailView({selectedRoutine}) {
    if(!selectedRoutine) {
        return null;
    } else {
        return(
            <div className='border border-y-0 border-l-1 border-r-0 border-gray-400 flex justify-center h-full w-1/2'>
                <RoutineView docId = {selectedRoutine}/>
            </div>
        )
    }
}
export default DetailView;