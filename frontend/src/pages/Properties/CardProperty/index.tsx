/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import {  deletePropertyReq, propertiesPageable} from '../../../services/resources/property';
import { Link } from 'react-router-dom';
import { Property, PropertyPage } from "../../../types/property";
import Pagination from '../../../components/Pagination';
import defaultImage from '../../../assets/images/no-pictures.png';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import LoadingLogin from '../../../components/LoadingLogin';





const CardListItem = ({id,name,images,price,address,onChange,close,error}: Property) =>{

    const [loading,setLoading]= useState(false);
   

   const imgs= images?.map((post) =>{
    return(
       
    <div key={post.id}>
    <img src={post.url}/>
    </div> 
        
);
  });

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
  

    return(
        <CardWrapper>
            {loading &&<LoadingLogin/>}
        <Card width='100%' height='100%' noShadow={true} borderRadius="0" background={false}>
            
              <CardContent>
                    
                    <Link to={`/details/${id}`}> {imgs && imgs} </Link>
                    {imgs?.length=== 0 && ( <Link to={`/details/${id}`}><img src={defaultImage}/> </Link>)}            
                     <div className='text-wrapper-card'>
                     <Link to={`/details/${id}`}> <p className='title-card-property'>{name}</p> </Link>  
                     <p className='value'>R${price}</p>
                     <div className='localization-wrapper'>
                     <p className='localization'><BiMap className='localization-icon'/>
                     {address.city.name}</p>

                     <p className='localization district-localization'>
                     {address.district}</p>
                     </div>
                         
                         <div className='links-card'>
                         <Link to={`/edit/${id}`}><p><AiOutlineEdit  className='icon-links' /> Editar</p></Link>
                           
                         <a><p><BsTrash  onClick={handleOpenModal}  className='icon-links'/>Excluir</p></a>  
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

const CardProperty = ()=>{

    const [pageNumber, setPageNumber] = useState(0);
    const[closeModalProperty, setCloseModalProperty]= useState(true);
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
        console.log('chemai')
        const {data}= await propertiesPageable(pageNumber);
        setPage(data as PropertyPage) ;
        localStorage.removeItem('images')
          
    }

    useEffect(() =>{
        getProperties();
    },[ pageNumber])

   

    const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }



    const deleteProperty = async (id: number) => { 

        setCloseModalProperty(false);

   const data = await deletePropertyReq(String(id));
   setTimeout(async ()=> {
    if(data.status === 204){
        console.log(data.status)
       getProperties();
     console.log('entrei aqui')
    }
    if(data.status !== 204){
        console.log(data.response.data.error)
        setError(data.response.data.error);
    }
      
   },500)
  }
    

    return(
        <> { page.content.length && page.content.length ?
        
        <CardContainer>
            {page.content.map(property => (
            <div className='wrapper-properties' key={property.id}>  
            <CardListItem {...property} onChange={deleteProperty} close={closeModalProperty} error={error} />

            </div>  
            )
            )}
            <Pagination page={page} onChange={handlePageChange}/>
         </CardContainer>: <MessageNoProperties><h4>Você não tem Imóveis cadastrados</h4></MessageNoProperties>

            }
         </>
    )

}

export default CardProperty;