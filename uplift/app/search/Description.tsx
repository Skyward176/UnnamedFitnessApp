import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {getDoc} from 'firebase/firestore';
import {AiOutlineSave} from 'react-icons/ai';
import IconButton from '@/components/IconButton';

const Description = (props) => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <p className='text-2xl font-light font-sans'>Title: {props.title} </p>
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
