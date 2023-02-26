import Navbar from '@/components/Navbar';
import {Day, Week, Exercise } from './EditorComponents';
export default function RoutineEditor() {
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
            <Navbar />
            <div className='w-screen grow flex md:flex-row flex-col text-white'>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2'>
                    <div className='h-5/6 block w-5/6'>
                        <Week>
                            <Day>
                                <Exercise />
                            </Day>
                        </Week>
                    </div>
                </div>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2'>
                    <p className=''>Hi, mom!</p>
                </div>
            </div>
        </div>
    );
}
