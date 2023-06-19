/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import {  changeStatusPropertyReq, deletePropertyReq, propertiesPageable} from '../../../services/resources/property';
import { Link } from 'react-router-dom';
import { Property, PropertyPage } from "../../../types/property";
import Pagination from '../../../components/Pagination';
import defaultImage from '../../../assets/images/no-pictures.png';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import LoadingLogin from '../../../components/LoadingLogin';
import {MdPublishedWithChanges} from 'react-icons/md';
import PaginationSearch from '../../../components/PaginationSearch';
import '../styleModal.css';
import { UserDto } from '../../../services/resources/user';



type Props={
    paramToGetAll:boolean;
    onChange: Function;
    id:string
    state:string;
    city:string;
    goal:string;
    type:string;
 
}



const CardListItem = ({id,name,images,price,address,statusProperty,onChange,close,error,booleanModal}: Property) =>{

    const [loading,setLoading]= useState(false);
   
    useEffect(()=>{
        if(booleanModal){
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
            },500)
           
           }
    },[booleanModal])
 



  const [putId,setPutId]= useState(false);
      
  const [modalIsOpen, setIsOpen] = useState(false);


  const handlePutId = ()=>{
    
            setLoading(true) 
                    setPutId(true)
                    onChange(id);
            setIsOpen(false)

            setTimeout(() => {
                setLoading(false)
            }, 1000);
   
  }

  const handleOpenModal =() => {
    setIsOpen(true)
}


const handleCloseModal =() =>{        
     setIsOpen(false);  
  

}

const intialValueStatusProperty = () =>{
    if(statusProperty === 'PUBLICADO'){
  
        return '1' as string;
    }
    if(statusProperty === 'NAO_PUBLICADO'){
        return '2' as string;
    }
  
}


const [statusPropertyState,setStatusProperty]= useState(()=> intialValueStatusProperty());
const [colorStatus,setColorStatus]= useState(false);

const [form, setForm] = useState({
            
    status:statusPropertyState as string
});

const handleChange = async(e:any) =>{
                             
    const field= e.target.getAttribute('name');
    const value= e.target.value;
    setForm({ ...form,
        [field]:value,
        
    }); 
    setColorStatus(true);
              
            // console.log(data)
      }  

      const sendChangeStatus = async() => {
        const data= await changeStatusPropertyReq(String(id),Number(form['status']));

        if(data.status === 204){
            setLoading(true);
            setTimeout(()=> {
            setLoading(false)         
            },500)
        }
        if(data.response.status === 404 || data.response.status === 403){
            setLoading(true);
            setTimeout(()=> {
            setLoading(false)        
            },500)
            
            setForm({ ...form,
                ['status']:intialValueStatusProperty() as string,
                
            });           
        }
      }
      
      useEffect(()=> {
        if(colorStatus=== true){
            sendChangeStatus()
        }
      },[form.status])
    

    return(
        <CardWrapper>
            {loading &&<LoadingLogin/>}
            <StatusProperty statusProperty={form['status'] as string}><MdPublishedWithChanges/>
            { form['status'] ==='1' &&
                 <p>PUBLICADO</p> } 
                  { form['status'] ==='2' &&
                 <p>NÃO PUBLICADO</p> } 
           
               
                    <InputRangeProperty> 
                         <input id="status" name="status" value={form['status']} min='1' max='2'  type='range'   onChange={(e) => handleChange(e)}/>    
                    </InputRangeProperty>
                </StatusProperty> 

         <Card width='100%' height='100%' noShadow={true} borderRadius="0" background={false}> 
                 
              <CardContent>
                    
                   
                    {images?.[0] ?  <Link to={`/details/${id}`}> <img src={images?.[0]?.url }/> </Link> : <Link to={`/details/${id}`}><img src={defaultImage}/> </Link>}            
                     <div className='text-wrapper-card'>
                     <Link to={`/details/${id}`} className='link-wrapper-name-cod'> <p className='title-card-property'>{name}</p></Link>  
                     <span className='cod-property-card'>cod.{id}</span>
                     <p className='value'>R${price}</p>
                     <div className='localization-wrapper'>
                     <p className='localization'><BiMap className='localization-icon'/>
                     {address.city.name}</p>

                     <p className='localization district-localization'>
                     {address.district}</p>
                     </div>
                         
                         <div className='links-card'>
                         <Link to={`/edit/${id}`}><p><AiOutlineEdit  className='icon-links' /> Editar</p></Link>
                           
                         <p onClick={handleOpenModal} ><BsTrash   className='icon-links'/>Excluir</p>
                         </div>

                         <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal} 
                onAfterClose={handleCloseModal}  
                className='Mod'                           
              > 
                
              <h1>Por favor confirme</h1>
              <p>Tem certeza que deseja excluir este Imóvel?</p>
              <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' /> 
              <div className="buttons-wrapper-lead">
              <button onClick={handleCloseModal}  className='cancel-button-lead'>Cancelar</button>
              <button onClick={handlePutId}   className='delete-button-lead'>Excluir</button>
              
              </div>
              </Modal> 

                  </div>
              </CardContent>
        </Card>
        
      </CardWrapper>
      

    )
}

const CardProperty = ({id,state,city,goal,type,onChange,paramToGetAll}:Props)=>{

    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumberSearch, setPageNumberSearch] = useState(0);
    const[closeModalProperty, setCloseModalProperty]= useState(true);
    const [error,setError]= useState('');
    const [booleanLoadingModal, setBooleanLoadingModal]= useState(false);
    const [errorBadRequest,setErrorBadRequest]=useState(false);

  
 
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

    const [pageSearch, setPageSearch] = useState<PropertyPage>({

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

   
        const getPropertiesS = async () => {
        if( paramToGetAll===true ){
            const data= await propertiesPageable('','','','','',pageNumberSearch); 
            setPageSearch(data.data as PropertyPage);
            onChange(true)
            setPage( {
                content: [],
                last: true,
                totalPages: 0,
                totalElements: 0,
                size: 12,
                number: 0,
                first: true,
                numberOfElements: 0,
                empty: true
            })

        }

    }
    useEffect(() => {
    getPropertiesS()
    },[paramToGetAll, pageNumberSearch, onChange])

   
    const getProperties = async () => {
     
        const data= await propertiesPageable(id,state,city,goal,type,pageNumber);  
     
        if(data.data){     
            setPage(data.data as PropertyPage);              
            onChange(true)
            if(page.content.length>0){
            setPageSearch( {
                content: [],
                last: true,
                totalPages: 0,
                totalElements: 0,
                size: 12,
                number: 0,
                first: true,
                numberOfElements: 0,
                empty: true
            }) 
        }           
        }
        if(data.response.status === 400){
            console.log(data.status)
              
         }
        setBooleanLoadingModal(true);
        localStorage.removeItem('images')
        
    }

    useEffect (() =>{ 
    if(pageNumber>0  && (state.length !==0 || id.length !== 0 || city.length !== 0 || goal.length !==0 || type.length !== 0)){
           setPageNumber(0)
                    
     }
       
        getProperties(); 
    },[pageNumber,state, city, goal, type, id, onChange])

   

    const handlePageChange = (newPageNumber : number)=>{          
            setPageNumber(newPageNumber);
               
    }

    const handlePageChangeSearch = (newPageNumberSearch : number)=>{           
        setPageNumberSearch(newPageNumberSearch);
           
    }

    const deleteProperty = async (id: number) => { 
        setCloseModalProperty(false);
   const data = await deletePropertyReq(String(id));
   setTimeout(async ()=> {
    if(data.status === 204){
       setPageNumber(0);
       getProperties();   
    }
    if(data.status !== 204){    
        setError(data.response.data.error);
    }
      
   },500)
  }



    return(
        <> { page.content.length>0 ?
        
        <CardContainer>   
               
            {page.content && page.content.map(property => (
            <div className='wrapper-properties' key={property.id}>  
            <CardListItem {...property} onChange={deleteProperty} close={closeModalProperty} error={error} booleanModal={booleanLoadingModal} />

            </div>  
            )
            )}
         <Pagination page={page} onChange={handlePageChange}/>
         </CardContainer>:  <CardContainer>   
               
               {pageSearch.content && pageSearch.content.map(property => (
               <div className='wrapper-properties' key={property.id}>  
               <CardListItem {...property} onChange={deleteProperty} close={closeModalProperty} error={error} booleanModal={booleanLoadingModal} />
   
               </div>  
               )
               )}
            <PaginationSearch page={pageSearch} onChange={handlePageChangeSearch}/>
            </CardContainer>

            }
         </>
    )

}

export default CardProperty;