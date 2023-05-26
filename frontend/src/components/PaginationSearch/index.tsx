
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io';
import {PaginationContainer,PaginationBox} from '../Pagination/styles';
import { PropertyPage } from "../../types/property";



type Props ={
    page: PropertyPage;
    onChange: Function;
}
function PaginationSearch ({page, onChange} : Props){

    
    return(
        <PaginationContainer>
    <PaginationBox>
        <button className="pagination-button" 
        disabled={page.first} onClick={()=> onChange(page.number-1 )}>
            <IoIosArrowBack />
        </button>
        <p>{`${page.number+1} de ${page.totalPages}`}</p>
        <button className="pagination-button" 
        disabled={page.last} onClick={()=> onChange(page.number+1 )} >
            <IoIosArrowForward />
        </button>
    </PaginationBox>
</PaginationContainer>

    );
}

export default PaginationSearch;