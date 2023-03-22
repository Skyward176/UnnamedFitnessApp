import {createContext} from 'react';

export const RoutineContext = createContext({
    uid: 0,
    title: "",
    description: "",
    weeks: [{
        title: "",
        wuid:"",
        days: [{
            title: "",
            duid:"",
            exercises: [{
                eid: "",
                name: "",
                sets: 0,
                reps: 0
            }],
        }],
    }],
});