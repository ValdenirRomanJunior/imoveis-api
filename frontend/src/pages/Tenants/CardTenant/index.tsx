/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import {CardWrapper,CardContent,CardContainer} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import defaultImage from '../../../assets/images/no-pictures.png';
import { deleteTenant, tenantsPageable } from '../../../services/resources/tenant';
import { Tenant, TenantPage } from '../../../types/tenant';
import PaginationTenant from '../../../components/PaginationTenant';



type Props = {
    tenant: Tenant;
}



 const CardListItem = ({tenant}: Props) =>{

   const imgs= tenant.images?.map((post) =>{
    return(
       
    <div key={post.id}>
    <img src={post.url}/>
    </div> 
        
);
  });

  const capitalize = (string:string)=> {
    return string.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
  }
     
  const handleToDelete = async () => {

    const data =  await deleteTenant(String(tenant.id));
  }

    return(
        <CardWrapper>
        <Card width='100%' height='100%' noShadow={true}>
            
              <CardContent>                   
               

                     <div className='text-wrapper-card'>
                     <Link to={`/details/${tenant.id}`}> <p className='slug-card-tenant'>{capitalize(tenant.slug) } </p>
                     <p className='slug-card-tenant'>{capitalize( tenant.lastName)}</p>
                      </Link>  

                     <p className='email'>{tenant.email}</p>
                     <p className='status'>{tenant.status}</p>
                     <p className='status'>{tenant.verification}</p>
                        <div className='dates-tenant-wrapper'>
                     <div className='date-tenant-wrapper'><span>Entrada </span> <span className='date-tenant-value'>{tenant.start}</span></div>
                     <div className='date-tenant-wrapper'><span>Renovação</span> <span className='date-tenant-value'>{tenant.renovation}</span></div>

                     <div className='date-tenant-wrapper'><span>Vencimento </span> <span className='date-tenant-value'>{tenant.endDate}</span></div>
                     </div>
                         <div className='links-card'>
                         <Link to={`/edittenant/${tenant.id}`}><p><AiOutlineEdit  className='icon-links' /> Editar</p></Link>                         
                         <a onClick={handleToDelete}><p><BsTrash className='icon-links'/>Excluir</p></a>  
                         </div>

                  </div>
              </CardContent>
        </Card>
        
      </CardWrapper>
      

    )


}

const CardTenant = ()=>{

    const [pageNumber, setPageNumber] = useState(0);

    const [page, setPage] = useState<TenantPage>({

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

   
   
    const getTenants = async () => {
        const {data}= await tenantsPageable(pageNumber);
        setPage(data as TenantPage) ;
        localStorage.removeItem('images')
          
    }

    useEffect(() =>{
        getTenants()
    },[pageNumber])

    const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }

    return(
        <CardContainer>
            {page.content.map(tenant => (
            <div className='wrapper-properties' key={tenant.id}>  
            <CardListItem tenant={tenant} />

            </div>  
            )
            )}
            <PaginationTenant page={page} onChange={handlePageChange}/>
         </CardContainer>
    
    )

}

export default CardTenant;