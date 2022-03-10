import {PaginationContainer} from './styles';
import {IoIosArrowDroprightCircle,IoIosArrowDropleftCircle} from 'react-icons/io';

const Pagination = () => {
    return(
        <PaginationContainer>
           <div className='pagination-box'>
                <button className='pagination-button' disabled={true} >
                <IoIosArrowDropleftCircle  className='left'/>
                </button>
                <p>{`${1} de ${3}`}</p>
                <button className='pagination-button' disabled={false} >
                <IoIosArrowDroprightCircle />
                </button>
           </div>
           </PaginationContainer>

    
    )
}

export default Pagination;