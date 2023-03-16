
import {LeadItemContainer, LeadWrapper,PropertyItemLeadContainer,MessageNoLeads} from "./styles";
import {BsPersonFill, BsTrash} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { useEffect, useState } from "react";
import { Property } from "../../../types/property";
import { findProperty, findPropertyLead } from "../../../services/resources/property";
import { Link } from "react-router-dom";
import {FaWhatsapp} from 'react-icons/fa'
import {FiCornerDownRight} from 'react-icons/fi'
import { Lead, LeadPage } from "../../../types/lead";
import { deleteLead, leadsPageable } from "../../../services/resources/lead";
import {AiOutlineMail} from 'react-icons/ai';
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";
import "./ModalStyleLeadCard.css";
import LoadingLogin from "../../../components/LoadingLogin";
import PageNotFound from "../../../components/PageNotFound";
import PaginationLead from "../../../components/PaginationLead";


type Prop={
    param:boolean;
  
   
}





const LeadCardItem = ({id,name,lastName,email,phone, message, propertyId, onChange,close,error}: Lead)  => {

    const [property,setProperty]=useState<Property>();
    const [loading,setLoading]= useState(false);
    const [errors,setErrors]=useState();
  

   
  
    const getProperty = async() => {  
        if(propertyId != null){

                 
        const data = await findPropertyLead(String(propertyId));          
        if(data.status === 200){  
            console.log(data.status) 
            setProperty(data.data as Property) 
          } else if(data.response.status === 404){ 
         
            setErrors(data.response.data.error);
             
          }  
                          
    }
    }      
     
    useEffect(() => {
        getProperty();

    },
     []);





    const [hiddenMessage, setHiddenMessage]= useState(false);

    const openMessage = () =>{
        console.log('cliquei')
        setHiddenMessage(true);
        closeMessage()
    }

    const closeMessage = () => {
        if(hiddenMessage === true ){
            setHiddenMessage(false)
        }
    }

    const capitalize = (string:string)=> {
        return string.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())
      }

      const [modalIsOpen, setIsOpen] = useState(false);
      const [putId,setPutId]= useState(false);
      

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
           closeMessage();
           setIsOpen(false);  
        
    
      }

  
     
    return(
       
       // {errors && <div><PageNotFound/></div> }
     <LeadWrapper prop={hiddenMessage}>
                {loading &&<LoadingLogin/>}
                <div className="content-first" onClick={openMessage}>
                
                <div><BsPersonFill className="icon-lead"/></div>

                <div className="data-lead-left-wrapper">
                <h4>{capitalize(name)}</h4>   
                <span><AiOutlineMail className="email-icon"/>{email}</span>
                <p className="phone-leads"><FaWhatsapp className="icon-phone-lead"/>{phone}</p>
                </div>
                            
                <MdKeyboardArrowDown className="icon-arrow-lead" />     
                </div>

                {(!errors && propertyId) ?
                <Link to={`/details/${propertyId}`} className='link-detail-property-lead'>
                <PropertyItemLeadContainer prop={hiddenMessage}>
                 { property?.images && property.images.map((image) => {
                    return(
                        <div className="image-property-lead-wrapper">                      
                            <img src={image.url}  alt='Foto do Imóvel'/>                      
                        </div>
                               )                  
                            })                         
                        }
                        
                          <div className="data-property-lead-wrapper">
                                <span>{property?.name}</span>
                                <span>{property?.address.street}  {property?.address.number} {property?.address.district} {property?.address.city.name}</span>                              
                            </div>
                           
                            </PropertyItemLeadContainer></Link> : ''} 
                            {(!errors && propertyId) ?
                    <div className="message-lead" >           
                    <FiCornerDownRight className="icon-arrow-down-message"/>               
                    {message}            
                     </div>
                    :''}
                 <div>
                 
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal} 
                onAfterClose={handleCloseModal}  
                className='Mod'                           
              > 
                
              <h1>Por favor confirme</h1>
              <p>Tem certeza que deseja excluir este lead?</p>
              <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' /> 
              <div className="buttons-wrapper-lead">
              <button onClick={handleCloseModal}  className='cancel-button-lead'>Cancelar</button>
              <button onClick={handlePutId}  className='delete-button-lead'>Excluir</button>
              
              </div>
              </Modal>
                
                </div> 
                <div className="icon-lead-trash">
                <button onClick={handleOpenModal} className='icon-trash'><BsTrash /> </button>
                </div>      
       </LeadWrapper>
       
       
   

    )
}


const LeadCard = (param:Prop)=>{

    const[closeModalLead, setCloseModalLead]= useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    
    const [error,setError]=useState('');

    const [page, setPage] = useState<LeadPage>({

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

    
   
   
     const getLeads = async () => {
       
        const {data}= await leadsPageable(pageNumber);
        setPage(data as LeadPage) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{
        getLeads();
    },[pageNumber,])



    useEffect(() =>{
        if(param){
        getLeads();
        }
    },[])
   
   
    const handleToDelete = async(id: number) => {
        setTimeout(async ()=> {
        setCloseModalLead(false);

        const data =  await deleteLead(String(id));
        if(data !== '204'){
            setError(data)
        }
      
          
        getLeads();
    },1000)
      }

      const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }   
    


    return(
        <>
         
        { page.content.length && page.content.length ?
        <LeadItemContainer>
           
            {page.content.map(lead => <LeadCardItem {...lead} onChange={handleToDelete} close={closeModalLead} error={error}/>)}
            <PaginationLead page={page} onChange={handlePageChange}/>
         </LeadItemContainer> : <MessageNoLeads><h4 className="message-no-leads">Você não possui leads no momento...</h4></MessageNoLeads> 
        }
        </>
    )
    
}

export default LeadCard;