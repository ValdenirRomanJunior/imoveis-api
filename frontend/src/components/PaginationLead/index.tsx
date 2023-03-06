
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io';
import {PaginationContainer,PaginationBox} from './styles';
import { LeadPage } from '../../types/lead';


type Props ={
    page: LeadPage;
    onChange: Function;
}
function PaginationLead ({page, onChange} : Props){
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

export default PaginationLead;