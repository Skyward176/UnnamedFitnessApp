'use client'
import Navbar from '@/components/Navbar';
import {Day, Week, Exercise, DescriptionForm, AddDayButton} from './EditorComponents';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,doc, addDoc} from 'firebase/firestore';
export default function RoutineEditor() {
    //use state for temp storing routine changes
    // state will look like a nested object 
    // routine{
    //     name:"",
    //     description:"",
    //     tags: [],
    //     weeks: [
    //         week{
    //             name: "",
    //             day{
    //                 name:"",
    //                 exercises: [
    //                     exercise{
    //                         name:"",
    //                         sets:int,
    //                         reps:int
    //                     }
    //                 ]
    //             }
    //     ]    }
    // }
    
    // create new routine with the authenticated user's UID on page load.


    useEffect(() => {
        //get db
        const db = getFirestore(firebase_app);
        //async create doc function
        const createRoutine = async (db) => {
            const newRoutine = await addDoc(collection(db, 'routines'), {
                description:'',
                posted_by:auth.currentUser.uid,
                tags:[],
                title:'',
            });
            //save docref to state
            setRoutineData(newRoutine);
        }
        //call method, catch error
        createRoutine(db).catch(console.error);;
    }, []);

    const [routineData, setRoutineData] = useState();
    
    const renameDay = () => {

    }
    const addDay = () => {

    }
    const deleteDay = () => {

    }
    const duplicateDay = () => {

    }
    const addExercise = () => {

    }
    const changeExercise = () => {

    }
    const removeExercise= () => {

    }
    const addWeek = () => {

    }
    const deleteWeek = () => {

    }
    const duplicateWeek = () => {

    }
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
            <Navbar />
            <div className='w-screen grow flex md:flex-row flex-col text-white '>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2 border-b border-b-white md:border-b-0 md:border-r md:border-r-white'>
                    <div className='h-full p-4 block w-full'>
                        <Week>
                            <Day>
                                <Exercise />
                                <Exercise />
                                <AddDayButton/>
                            </Day>
                        </Week>
                    </div>
                </div>
                <div className='flex justify-center items-center md:w-1/2 md:h-full w-full h-1/2'>
                    <div className='h-full p-4 block w-full'>
                        <DescriptionForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}
