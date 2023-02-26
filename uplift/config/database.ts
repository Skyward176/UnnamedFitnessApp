// CURRENTLY DOESN'T WORK!!!
import {firebase_app}from '@/config/firebaseInit';
import { getFirestore } from 'firebase/firestore/lite';

const db = getFirestore(firebase_app);

export default db;