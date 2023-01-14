/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import {CardWrapper,CardContent,CardContainer} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import { propertiesPageable} from '../../../services/resources/property';
import { Link } from 'react-router-dom';
import { Property, PropertyPage } from "../../../types/property";
import Pagination from '../../../components/Pagination';
import defaultImage from '../../../assets/images/no-pictures.png';



type Props = {
    property: Property;
}



const CardListItem = ({property}: Props) =>{

   const imgs= property.images?.map((post) =>{
    return(
       
    <div key={post.id}>
    <img src={post.url}/>
    </div> 
        
);
  });


    return(
        <CardWrapper>
        <Card width='100%' height='100%' noShadow={true}>
            
              <CardContent>
                    
                    <Link to={`/details/${property.id}`}> {imgs && imgs} </Link>
                    {imgs?.length=== 0 && ( <Link to={`/details/${property.id}`}><img src={defaultImage}/> </Link>)}            
                     <div className='text-wrapper-card'>
                     <Link to={`/details/${property.id}`}> <p className='title-card-property'>{property.name}</p> </Link>  
                     <p className='value'>R${property.price}</p>
                     <p className='localization'><BiMap className='localization-icon'/>{property.address.city.name}{property.address.district}</p>
                         <div className='links-card'>
                         <Link to={`/edit/${property.id}`}><p><AiOutlineEdit  className='icon-links' /> Editar</p></Link>                         
                         <a><p><BsTrash className='icon-links'/>Excluir</p></a>  
                         </div>

                  </div>
              </CardContent>
        </Card>
        
      </CardWrapper>
      

    )


}

const CardProperty = ()=>{

    const [pageNumber, setPageNumber] = useState(0);

    const [page, setPage] = useState<PropertyPage>({

        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

   
   
    const getProperties = async () => {
        const {data}= await propertiesPageable(pageNumber);
        setPage(data as PropertyPage) ;
        localStorage.removeItem('images')
          
    }

    useEffect(() =>{
        getProperties();
    },[pageNumber])

    const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }

    return(
        <CardContainer>
            {page.content.map(property => (
            <div className='wrapper-properties' key={property.id}>  
            <CardListItem property={property} />

            </div>  
            )
            )}
            <Pagination page={page} onChange={handlePageChange}/>
         </CardContainer>
    
    )

}

export default CardProperty;