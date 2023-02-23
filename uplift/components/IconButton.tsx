import Link from "next/link";
export default function IconButton (props:any) {
    return(
        <>
            <button onClick={props.onclick} className='text-white'>
                {props.children}
            </button>
        </>
    );
}