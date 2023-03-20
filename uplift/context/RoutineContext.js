import {createContext} from 'react';

export const RoutineContext = createContext({
    uid: 0,
    title: "",
    description: "",
    weeks: [{
        title: "",
        days: [{
            title: "",
            exercises: [{
                name: "",
                sets: 0,
                reps: 0
            }],
        }],
    }],
});