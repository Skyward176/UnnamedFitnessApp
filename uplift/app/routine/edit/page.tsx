'use client'
import Navbar from '@/components/Navbar';
import Week from './Week';
import DescriptionForm from './DescriptionForm';
import {useState, useEffect} from 'react';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, collection,getDoc,deleteDoc,doc, addDoc, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation'
export default function RoutineEditor() {

    // state variables
    const [routineData, setRoutineData] = useState({
        title: '',
        weeks:[]
    });
    const [docRef, setDocRef] = useState();
    const [weeks, setWeeks] = useState([]);
    
    // db ref
    const db = getFirestore(firebase_app);

    // router
    const router = useRouter();
    // parameters to control creation of routine
    const searchParams = useSearchParams();

    // routine creation function
    const createRoutine = async (db) => {
        const newRoutine = await addDoc(collection(db, 'routines'), {
            weekOrder: [1],
            weeks: {
                1:{
                    title: 'Week 1',
                    weekId: 1,
                    dayOrder: [1],
                    days: {
                        1: {
                            title: 'Day 1',
                            dayId: 1,
                            exerciseOrder: [1],
                            exercises: {
                                1: {
                                    exerciseId: 1,
                                    name: 'Bench Press',
                                    sets: 0,
                                    reps: 0
                                }
                            }
                        }
                    }
                },
            }
        });
        console.log("Created new routine");
        //save docref to state
        setDocRef(newRoutine);
        let currentData = await getDoc(newRoutine);
        setRoutineData(currentData.data());
    }

    // on page load, check params to determine creation of new routine, else grab routine reference passed through params
    // use
    useEffect(() => {
        if(searchParams.get('newRoutine')) {
            createRoutine(db).catch(console.error);
            router.push('routine/edit', undefined,{shallow: true})
        }
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
    const newWeekHandler = () => {// needs rewrite
        const createDoc = async (docRef) => {
            const newWeek = await addDoc(collection(docRef, 'weeks'), {
                uid:auth.currentUser.uid,
                days:[],
                title:''
            });
            const newDay = await addDoc(collection(docRef, 'days'), {
                uid:auth.currentUser.uid,
                exercises:[],
            });
            const newExercise = await addDoc(collection(docRef, 'exercises'), {
                uid:auth.currentUser.uid,
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
    const deleteWeek = (ref) => { //needs rewrite
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
                    {Object.entries(routineData.weeks).map(([key, value]) => <div className='h-full p-4 block w-full'>
                                            <Week routineRef ={docRef} weekCount={Object.keys(routineData.weeks).length} deleteWeek={deleteWeek} newWeekHandler={newWeekHandler} data={value} key={key}/>
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
