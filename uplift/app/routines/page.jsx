import Navbar from '@/components/Navbar'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '@/config/database'

export default function Routines (){
    const getAllRoutines = async () => {
        const routinesRef = db.collection('routines');
        const snapshot = await routinesRef.get();
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }
    getAllRoutines();
    return(
        <>
            <Navbar/>

        </>
    )
}