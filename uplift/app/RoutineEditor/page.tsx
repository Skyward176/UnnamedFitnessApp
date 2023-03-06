'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import DescriptionForm from './DescriptionForm';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,getDoc,deleteDoc,doc, addDoc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
export default function RoutineEditor() {

    const [routineData, setRoutineData] = useState({
        title: '',
        weeks:[]
    });
    const [docRef, setDocRef] = useState();
    const [weeks, setWeeks] = useState([]);
    // create new routine with the authenticated user's UID on page load.


    useEffect(() => {
        //get db
        const db = getFirestore(firebase_app);
        //async create doc function


        // join array of ids to collection


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
            setWeeks(currentData.data().weeks);
        }
        //call method, catch error
        createRoutine(db).catch(console.error);;
    }, []);

    const saveDetails = (e) => {
        console.log("Save attempted for docref" + docRef);
        updateDoc(docRef, routineData);
    }
    
    const changeTitle = (e) => {
        console.log(e.target.value);
        routineData.title=e.target.value; 
    }
    const changeDescription = (e) => {
        routineData.description=e.target.value; 
    }
    const newWeekHandler = () => {
        const createDoc = async (docRef) => {
            const newWeek = await addDoc(collection(docRef, 'weeks'), {
                days:[],
                title:''
            });
            const newDay = await addDoc(collection(docRef, 'days'), {
                exercises:[],
            });
            const newExercise = await addDoc(collection(docRef, 'exercises'), {
                name:'',
                reps:0,
                sets:0,
            });
            await updateDoc(newDay, {
                exercises: [newExercise]
            })
            await updateDoc(newWeek, {
                days: [newDay]
            })
            await updateDoc(docRef, {
                weeks: arrayUnion(newWeek),
            })
            let newWeeks =  [...weeks, newWeek];
            setWeeks(newWeeks);
        }
        console.log("Create Week Fired");
        createDoc(docRef);
    }
    const deleteWeek = (ref) => {
        deleteDoc(ref);
        updateDoc(docRef, {
            weeks: arrayRemove(ref)
        })
        setWeeks(weeks.filter(function (week){
            return week!=ref
        }))
        console.log(ref);
        getDoc(docRef).then((data)=>console.log(data.data().weeks))
    }
    return(
        <div className='flex flex-col flex-wrap h-full w-full'>
            <Navbar />
            <div className='w-screen grow flex lg:flex-row flex-col text-white '>
                <div className='flex flex-col justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2 border-b border-b-white lg:border-b-0 lg:border-r lg:border-r-white'>
                    {weeks.map((week) => <div className='h-full p-4 block w-full'>
                                            <Week routineRef ={docRef} weekCount={weeks.length} deleteWeek={deleteWeek} newWeekHandler={newWeekHandler} data={week} key={week.id}/>
                                            </div>)}
                </div>
                <div className='flex justify-center items-center lg:w-1/2 lg:h-full w-full h-1/2'>
                    <div className='h-full p-4 block w-full'>
                        <DescriptionForm saveFunction={saveDetails} title={routineData.title} changeTitle={changeTitle} changeDescription={changeDescription} description={routineData.description}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
