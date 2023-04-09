import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {getDoc} from 'firebase/firestore';
import {AiOutlineSave} from 'react-icons/ai';
import IconButton from '@/components/IconButton';

const Description = (props) => {
    return(
        <div className='h-1/2 flex flex-col'>
            <div className='flex items-center'>
                <p className='text-2xl font-light font-sans'>Title: {props.title} </p>
            </div>
            <div className='flex flex-col h-1/2'>
                <p className='text-2xl font-light font-sans'>Description: {props.description} </p>
            </div>
            <div className='flex items-center'>
                <label className='text-white'>Tags: </label>
            </div>
        </div>
    );
}
export default Description;
