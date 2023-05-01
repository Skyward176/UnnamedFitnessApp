import {HiArrowTopRightOnSquare} from 'react-icons/hi2';
import Link from 'next/link';
const Description = (props) => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <p className='text-2xl font-light font-sans mx-1'>Title: {props.title} </p>
                <Link href={{pathname:'routine/view',query:{routineID:props.docId}}} className='text-white text-2xl font-sans font-light'>
                    <HiArrowTopRightOnSquare color='white' size='2rem'/>
                </Link>
            </div>
            <div className='flex flex-col h-1/2'>
                <p className='text-2xl font-light font-sans'>Description: {props.description} </p>
            </div>
            <div className='flex text-xl items-center'>
                <div className='flex text-white'>Tags: {props.tags.map((tag)=> <div className = 'bg-gray-900 p-1 rounded-lg  mx-1'> {tag} </div>)}</div>
            </div>
        </div>
    );
}
export default Description;
