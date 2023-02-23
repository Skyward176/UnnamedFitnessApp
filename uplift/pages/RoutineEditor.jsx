import Navbar from '../components/Navbar';
export default function RoutineEditor() {
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
            <Navbar />
            <div className='w-screen grow flex md:flex-row flex-col text-white'>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2'>
                    <p className='text-center'>Hi, mom!</p>
                </div>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2'>
                    <p className=''>Hi, mom!</p>
                </div>
            </div>
        </div>
    );
}
