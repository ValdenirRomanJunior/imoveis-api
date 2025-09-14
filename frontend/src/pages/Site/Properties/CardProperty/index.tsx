/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty,DetailsCardWrapper} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import { Link, createSearchParams, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { Property, PropertyPage } from "../../types/property";
import Pagination from '../../Pagination';
import { searchProperties } from '../../Services/property';
//import PseudoSearch from '../../../components/PseudoSearch';
import {HiHome} from 'react-icons/hi';
import Search from '../../Search';
import defaultImage from '../../.././../assets/images/no-pictures.png';


type Props={
    name:string
    goal:string;
    type:string;
 
}

const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname:any, params:any) =>
      navigate(`${pathname}/?${createSearchParams(params)}`);
  };

const CardListItem = ({id,name,images,price,address, numberRooms,bathRooms, area, goal,statusProperty,onChange,close,error,booleanModal}: Property) =>{
    const { companyName } = useParams<{ companyName: string }>();



    return(
        <CardWrapper>               
              <CardContent>
                    <div className='image-card-properties-wrapper'>               
                    {images?.[0] ?  <Link to={`/site/${companyName}/detail/${id}`}> <img src={images?.[0]?.url }/>  </Link> : <Link to={`/site/${companyName}/detail/${id}`}> <img src={defaultImage} className='default-image-card-properties'/> </Link> }
                    </div>     
                     <div className='price-wrapper'>R$ {price}</div>  
                     <div className='type-wrapper'><HiHome/></div>    

                                <div className='text-wrapper-card'>
                                <Link to={`/site/${companyName}/detail/${id}`} className='title-wrapper-card-property'> <p className='title-card-property'>{name}</p><p className='title-card-property-cod'>Cod.{id}</p></Link>  
                                
                                <div className='localization-wrapper'>                                   
                                    <BiMap className='localization-icon'/>                              
                                    <p className='localization'>
                                    {address.city.name}</p>
                                    <p className='localization district-localization'>
                                    {address.district}</p>
                                </div>

                                </div>
                  <DetailsCardWrapper>
                    <div className='details-bottom-card '><span className='value-detail-bottom'>{bathRooms}</span><span className='title-detail-bottom'>Banheiros</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{numberRooms}</span><span className='title-detail-bottom'>Quartos</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{area}</span><span className='title-detail-bottom'>m2</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{goal}</span><span className='title-detail-bottom'>Finalidade</span></div>

                  </DetailsCardWrapper>
              </CardContent>       
      </CardWrapper>
      

    )
}

const CardProperty = (props:{goal:string})=>{
    const { companyName } = useParams<{ companyName: string }>();

    const navigateSearch = useNavigateSearch();
    let params = new URLSearchParams(document.location.search);
    const goalParam = params.get('goal');
    const typeParam = params.get('type');
    const  nameParam = params.get('name');

    //states para mandar os parametros da pesquisa
    const[goal,setGoal]= useState(goalParam || props.goal);
    const [type,setType]=useState(typeParam)
    const [name,setName]=useState(nameParam);

    const [url,setUrl]= useState(window.location.hostname);


    
    
    const [pageNumber, setPageNumber] = useState(0);
    const [error,setError]= useState('');



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
        const data= await searchProperties(name as string,goal as string,type as string,  url as string ,pageNumber);  
       
        if(data.data){     
            setPage(data.data as PropertyPage);
                               
        }
        if(data.response.status === 400){              
         }
    }

    useEffect (() =>{ 
 
        getProperties(); 
    },[pageNumber,name,goal,type,props])

   

    const handlePageChange = (newPageNumber : number)=>{          
            setPageNumber(newPageNumber);               
    }


    //pesquisa ja estando na pagina de propriedades
    const handleToSearch = (goal:string,type:string,name:string) => {
        setGoal(goal)
        setType(type)
        setName(name)
        
        navigateSearch(`/site/${companyName}/imoveis`,{'goal': `${goal}`, type: `${type}`, name:`${name}`});
    }

    return(
       
        <CardContainer>         
          <Search onChange={handleToSearch}/>

          <p className='properties-found-message'>Foram encontrados {page.content.length} imóveis em {name ? <strong>{name}</strong>: <strong>todas localidades</strong>}</p>
          <div className='wrapper-properties' >  
          {page.content && page.content.map(property => (
          
            <CardListItem key={property.id} {...property}/>
            )
            )}
            </div>  
          
           
         <Pagination page={page} onChange={handlePageChange}/>
         </CardContainer>

       
    )

}

export default CardProperty;

function getParameterByName(arg0: string) {
    throw new Error('Function not implemented.');
}