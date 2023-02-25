import {firebase_app}from '@/config/firebaseInit';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebase_app);

export {db, collection, getDocs};
