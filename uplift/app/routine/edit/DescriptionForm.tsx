import {HiBars3, HiPlus, HiOutlineDocumentDuplicate, HiXMark} from 'react-icons/hi2';
import {getDoc} from 'firebase/firestore';
import {AiOutlineSave} from 'react-icons/ai';
import IconButton from '@/components/IconButton';

const DescriptionForm = (props) => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex items-center'>
                <label className='text-2xl font-light font-sans'>Title: </label>
                <input id='titleBox' onBlur={props.changeTitle} placeholder={props.title} type='text' className='font-light font-sans text-2xl appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex flex-col h-1/2'>
                <label className='text-2xl font-light font-sans'>Description:</label>
                <input onBlur={props.changeDescription} placeholder={props.description} type='text' className='font-light font-sans text-xl text-left w-full h-1/2 appearance-none bg-black mx-2 overflow-y-scroll'></input>
            </div>
            <div className='flex items-center'>
                <label className='text-white'>Tags</label>
                <input type='text' className='appearance-none bg-black mx-2 border border-t-0 border-l-0 border-r-0 border-b-1 border-b-accent-100 '></input>
            </div>
            <div className='flex items-center'>
                <IconButton onClick={props.saveFunction}>
                    <AiOutlineSave color='white' size='3rem'/>
                </IconButton>
            </div>
        </div>
    );
}
export default DescriptionForm;