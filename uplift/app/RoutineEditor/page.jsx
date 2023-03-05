'use client'
import Navbar from '@/components/Navbar';
import {Day, Week, Exercise, DescriptionForm, AddDayButton} from './EditorComponents';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,getDoc,doc, addDoc,setDoc, updateDoc} from 'firebase/firestore';
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


        // join array of ids to collection

        const readIds = async(array) => {
            const readPromises = array.map(id => getDoc(id));
            const result = await Promise.all(readPromises);
            return result.map(doc => doc.data());
        }

        const createRoutine = async (db) => {
            const newRoutine = await addDoc(collection(db, 'routines'), {
                description:'',
                posted_by:auth.currentUser.uid,
                tags:[],
                title:'',
                weeks: [],
            });
            const firstWeek = await addDoc(collection(newRoutine, 'weeks'), {
                days:[],
            });
            const firstDay = await addDoc(collection(newRoutine, 'days'), {
                exercises:[],
            });
            const firstExercise = await addDoc(collection(newRoutine, 'exercises'), {
                name:'',
                reps:0,
                sets:0,
            });
            updateDoc(firstDay, {
                exercises: [firstExercise]
            })
            updateDoc(firstWeek, {
                days: [firstDay]
            })
            updateDoc(newRoutine, {
                weeks: [firstWeek]
            })
            console.log("Created new routine");
            //save docref to state
            setDocRef(newRoutine);
            let currentData = await getDoc(newRoutine);
            setRoutineData(currentData.data());
        }
        //call method, catch error
        createRoutine(db).catch(console.error);;
    }, []);

    const [routineData, setRoutineData] = useState({
        title: '',
        weeks:[]
    });
    const [docRef, setDocRef] = useState();

    const saveFunction = (e) => {
        console.log("Save attempted for docref" + docRef);
        updateDoc(docRef, routineData);
    }
    
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
    const changeTitle = (e) => {
        console.log(e.target.value);
        routineData.title=e.target.value; 
    }
    const changeDescription = (e) => {
        console.log(e.target.value);
        routineData.description=e.target.value; 
    }
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
            <Navbar />
            <div className='w-screen grow flex lg:flex-row flex-col text-white '>
                <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2 border-b border-b-white lg:border-b-0 lg:border-r lg:border-r-white'>
                    <div className='h-full p-4 block w-full'>
                        {routineData.weeks.map(week => <Week data={week}/>)}
                    </div>
                </div>
                <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2'>
                    <div className='h-full p-4 block w-full'>
                        <DescriptionForm saveFunction={saveFunction} title={routineData.title} changeTitle={changeTitle} changeDescription={changeDescription} description={routineData.description}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
