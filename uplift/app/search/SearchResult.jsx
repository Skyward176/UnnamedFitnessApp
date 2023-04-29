import ReviewAverage from "@/components/ReviewAverage";
import {useState, useContext} from 'react';
import {AiFillPushpin} from 'react-icons/Ai';
import {firebase_app, auth} from '@/config/firebaseInit';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {AuthContext} from '@/context/AuthContext';
function SearchResult(props) {
    const [profile, setProfile] = useContext(AuthContext);
    const pinHandler = (routineID) => {
        const db = getFirestore(firebase_app);
        let newData = profile.pinnedRoutines;
        if(!newData.includes(routineID)){
            newData.push(routineID);
        } else {
            newData = newData.filter(function (pin) {
                return(pin!=routineID);
            })
        }
        setProfile({...profile,
                   pinnedRoutines:newData
                });
        setDoc(doc(db, 'users', auth.currentUser.uid), profile);
    }
    return(
        <div className='font-sans font-light border-b border-white h-28 p-4 w-72 md:w-96 lg:w-full flex items-center justify-between' style={props.selected ? {backgroundColor:'rgb(30 41 59)'}: {backgroundColor:'black'}}>
            <div className='flex flex-col'>
                <div className='flex'> 
                    <button className ='text-2xl text-white text-left' onClick={()=> props.handleRoutineClick(props.doc)}>
                        {props.doc.title}
                    </button>
                    <button onClick={() => pinHandler(props.doc._firestore_id)}>
                        <AiFillPushpin color='white' size='1.75rem'/>
                    </button>
                </div>
                <p className='text-gray-400 text-xl'>{props.doc.weeks.length} Weeks</p>
                <p className='text-gray-400 text-xl'>{props.doc.weeks[0].days.length} Days/Week</p>
            </div>

            <ReviewAverage routineID={props.doc._firestore_id}/>
        </div>
    )
}
export default SearchResult;
