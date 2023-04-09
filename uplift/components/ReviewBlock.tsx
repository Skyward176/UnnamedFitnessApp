import {AiFillStar, AiOutlineStar } from 'react-icons/ai';
function ReviewBlock({totalStars, stars}) {
    const populateIcons = () => {
        const icons = [];
        for(let i =0; i< totalStars; i++){
            if(i<stars){
                icons.push(<AiFillStar size='2rem' color='#00FFF0'/>)
            } else{
                icons.push(<AiOutlineStar size='2rem' color='#00FFF0'/>)
            }
        }
        return icons;
    }
    return(
        <div className='flex'>
            {populateIcons()}
        </div>
    )
}
export default ReviewBlock;
