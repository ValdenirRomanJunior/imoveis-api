/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import {CardContainer} from './styles';
import { Link, createSearchParams, useNavigate, useParams, useLocation } from 'react-router-dom';
import { PropertyPage } from "../../types/property";
import Pagination from '../../Pagination';
import { searchProperties } from '../../Services/property';
import PseudoSearch from '../../PseudoSearch';
import { BsGrid, BsList, BsMap } from 'react-icons/bs';
import { useSubdomain } from '../../../../components/SubdomainRouter';
import { CardListItem } from '../../components/FeaturedPropertyCard';

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

const CardProperty = (props:{goal:string, themeConfig?: any})=>{
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const clientSlug = subdomainCompanyName || companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');

    const location = useLocation();
    const navigateSearch = useNavigateSearch();

    // states para mandar os parametros da pesquisa
    const [goal, setGoal] = useState(props.goal);
    const [type, setType] = useState<string | null>('');
    const [name, setName] = useState<string | null>('');
    const [city, setCity] = useState<string | null>('');
    const [district, setDistrict] = useState<string | null>('');
    const [minPrice, setMinPrice] = useState<string | null>('');
    const [maxPrice, setMaxPrice] = useState<string | null>('');
    const [minRooms, setMinRooms] = useState<string | null>('');
    const [minSuites, setMinSuites] = useState<string | null>('');
    const [minVacancies, setMinVacancies] = useState<string | null>('');
    const [minArea, setMinArea] = useState<string | null>('');
    const [maxArea, setMaxArea] = useState<string | null>('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setGoal(params.get('goal') || props.goal);
        setType(params.get('type') || '');
        setName(params.get('name') || '');
        setCity(params.get('city') || '');
        setDistrict(params.get('district') || '');
        setMinPrice(params.get('minPrice') || '');
        setMaxPrice(params.get('maxPrice') || '');
        setMinRooms(params.get('minRooms') || '');
        setMinSuites(params.get('minSuites') || '');
        setMinVacancies(params.get('minVacancies') || '');
        setMinArea(params.get('minArea') || '');
        setMaxArea(params.get('maxArea') || '');
    }, [location.search, props.goal]);

    const [url, setUrl] = useState(clientSlug || window.location.hostname);

    useEffect(() => {
        setUrl(clientSlug || window.location.hostname);
    }, [clientSlug]);
    
    
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
        const data= await searchProperties({
            name: name as string,
            goal: goal as string,
            typeProperty: type as string,
            city: city as string,
            district: district as string,
            minPrice: minPrice as string,
            maxPrice: maxPrice as string,
            minRooms: minRooms as string,
            minSuites: minSuites as string,
            minVacancies: minVacancies as string,
            minArea: minArea as string,
            maxArea: maxArea as string,
            url: url as string,
            pageNumber
        });  
       
        if(data.data){     
            setPage(data.data as PropertyPage);
                               
        }
        if(data.response.status === 400){              
         }
    }

    useEffect (() =>{ 
 
        getProperties(); 
    },[pageNumber,name,goal,type,city,district,minPrice,maxPrice,minRooms,minSuites,minVacancies,minArea,maxArea,props,url])
   

    const handlePageChange = (newPageNumber : number)=>{          
            setPageNumber(newPageNumber);               
    }


    //pesquisa ja estando na pagina de propriedades
    const handleToSearch = (goal:string,type:string,name:string) => {
        setGoal(goal)
        setType(type)
        setName(name)
        
        const targetPath = isLocalhost ? `/site/${clientSlug}/imoveis` : `/imoveis`;
        navigateSearch(targetPath,{ 'goal': `${goal}`, type: `${type}`, name:`${name}`});
    }

    return(
       
        <CardContainer>
          <div className="properties-page-header">
            <div className="properties-search-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              <PseudoSearch variant="properties" buttonColor={props.themeConfig?.buttonColor} buttonTextColor={props.themeConfig?.bannerTitleColor || '#ffffff'} />
            </div>

            <h1 className="properties-main-title">{page.totalElements} Imóveis à venda</h1>
            
            <div className="properties-controls-bar">
              <div className="view-modes">
                <span className="view-modes-label">Visualizar como</span>
                <div className="view-modes-icons">
                  <BsGrid className="active" />
                  <BsList />
                  <BsMap />
                </div>
              </div>
              <div className="sort-by">
                <span className="sort-by-label">Ordenar por</span>
                <select className="sort-by-select">
                  <option value="mais-recentes">Mais Recentes</option>
                  <option value="maior-valor">Maior Valor</option>
                  <option value="menor-valor">Menor Valor</option>
                </select>
              </div>
            </div>
          </div>

          <div className='wrapper-properties' >  
          {page.content && page.content.map((property, index) => (
          
            <CardListItem key={property.id} {...property} index={index} buttonColor={props.themeConfig?.buttonColor} brandColor2={props.themeConfig?.brandColor2} />
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
