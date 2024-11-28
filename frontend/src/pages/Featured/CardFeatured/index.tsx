/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import {  changeStatusPropertyReq, changeStatusPropertyReqFeature, deletePropertyReq, propertiesFeatured, propertiesPageable} from '../../../services/resources/property';
import { Link } from 'react-router-dom';
import { Property, PropertyPage } from "../../../types/property";
import Pagination from '../../../components/Pagination';
import defaultImage from '../../../assets/images/no-pictures.png';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import LoadingLogin from '../../../components/LoadingLogin';
import {MdPublishedWithChanges} from 'react-icons/md';
import PaginationSearch from '../../../components/PaginationSearch';

import { UserDto } from '../../../services/resources/user';



const CardListItem = ({id,name,images,price,address,statusFeatured,onChange,close,error,booleanModal,booleanFeatured}: Property) =>{

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
    if(statusFeatured === 'DESTACADO'){
  
        return '1' as string;
    }
    if(statusFeatured === 'NAO_DESTACADO'){
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
      
      }  

      const sendChangeStatus = async() => {
        const data= await changeStatusPropertyReqFeature(String(id),Number(form['status']));

        if(data.status === 204){
          
            setLoading(true);
            setTimeout(()=> {
            setLoading(false)  
            booleanFeatured(true)       
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
        <>
        {statusFeatured ==='DESTACADO' &&
      
        <CardWrapper>
            {loading &&<LoadingLogin/>}
            <StatusProperty statusProperty={form['status'] as string}><MdPublishedWithChanges/>
            { form['status'] ==='1' &&
                 <p>TIRAR DESTAQUE</p> } 
                  { form['status'] ==='2' &&
                 <p>NÃO DESTACADO</p> } 
                         
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
     
    }
       </>

    )
}

const CardProperty = ()=>{

    const [pageNumber, setPageNumber] = useState(0);
    const [pageNumberSearch, setPageNumberSearch] = useState(0);
    const[closeModalProperty, setCloseModalProperty]= useState(true);
    const [error,setError]= useState('');
    const [booleanLoadingModal, setBooleanLoadingModal]= useState(false);
    const [errorBadRequest,setErrorBadRequest]=useState(false);

  
 
    const [page, setPage] = useState<Property[]>([])



   
    const getProperties = async () => {
     
        const data= await propertiesFeatured();  
     
        if(data.data){     
            setPage(data.data as Property[]);              
                
        }
        if(data.response.status === 400){
            console.log(data.status)
              
         }
        setBooleanLoadingModal(true);

        
    }

    useEffect (() =>{ 
    
        getProperties(); 
      
  
    },[])
   
    const [param,setParam]=useState(false);
    const getUpdateProperties = (param:boolean)=>{
       setParam(param)
        
    }
    useEffect (() =>{ 
        if(param){
            getProperties()
        }
        setParam(false)
    },[param])
    return(
       
        
        <CardContainer>   
        { page.length>0 ? 
         <>
            {page && page.map(property => (
            <div className='wrapper-properties' key={property.id}>  
            <CardListItem {...property}  booleanFeatured={getUpdateProperties} close={closeModalProperty} error={error} booleanModal={booleanLoadingModal} />

            </div>  
            )
            )}
            </>
            :<p className='properties-features'>Você não tem imóveis destacados</p>}
         </CardContainer>

          
       
    )

}

export default CardProperty;