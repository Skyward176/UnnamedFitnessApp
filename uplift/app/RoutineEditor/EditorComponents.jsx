const Week = ({children}) => {
    return(
        <div>
            <p>Week header</p>
            { children }
        </div>
    );
}
const Exercise = () => {
    return(
        <div>
            <p>Exercise Object</p>
        </div>
    );
}
const Day = ({children}) => {
    return(
        <div>
            <p>Day Header</p>
            {children}
        </div>
    );
}
 
export {Week, Day, Exercise };