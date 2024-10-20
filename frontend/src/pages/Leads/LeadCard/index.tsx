
import {LeadItemContainer, LeadWrapper,PropertyItemLeadContainer,MessageNoLeads, LeadSearchWrapper} from "./styles";
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
import { BiSearch } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";



const LeadCardItem = ({id,name,lastName,email,phone, message,instant, propertyId,opportunityId, onChange,close,error}: Lead)  => {

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


    return(
        
       
    // {errors && <div><PageNotFound/></div> }
    <Link to={`/leadDetail/${id}`} >
        <LeadWrapper prop={hiddenMessage}>    
                {loading &&<LoadingLogin/>}            
                <div className="content-first" onClick={openMessage}>
                
                <div className="data-lead-left-wrapper">
                <h4>{capitalize(name)}</h4>   
                <span><AiOutlineMail className="email-icon"/>{email}</span>
                <div className="phone-date-wrapper-lead"><p className="phone-leads"><FaWhatsapp className="icon-phone-lead"/>{phone}</p><p className="instant-lead">{instant}</p></div>
                </div>
                <div className="lead-oportunity-wrapper">
                { opportunityId !== null &&
                <Link to={`/oportunidades/oportunidade/${opportunityId}`} className="link-opportunidade-leads"><BiFilterAlt className="icon-funil"/></Link>}
                  {opportunityId  ===null &&  <div className='span-status' style={{background:"#e5fce5"}}> resolvido</div>
                    }
                    {opportunityId  !==null &&  <div className='span-status' style={{background:"#ffe6b857"}}> em aberto</div>}
                </div>                        
                </div>                  
            <div>                             
         </div> 
                           
       </LeadWrapper>
       </Link>  
       
   

    )
}


const LeadCard = (props:{param:string})=>{

    const[closeModalLead, setCloseModalLead]= useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const[name,setName]= useState('');
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
     
        const {data}= await leadsPageable(name.toLowerCase(),pageNumber);
        setPage(data as LeadPage) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{       
        getLeads();     
    },[pageNumber,name])


    useEffect(() =>{
        if(props.param !==''){
       getLeads();
        }
    },[props.param])
   
   
    const handleToDelete = async(id: number) => {
        setTimeout(async ()=> {
        setCloseModalLead(false);

        const data =  await deleteLead(String(id));
        if(data !== '204'){
            setError(data)
        }

        setPageNumber(0);
          
        getLeads();
    },1000)
      }

      const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }   
    


    return(
      
         
      
        <LeadItemContainer>
            <LeadSearchWrapper>
            <BiSearch className='icon-search-leads' />
             <input type="search"  placeholder="Busca por nome" onChange={(e)=>setName(e.target.value)} maxLength={35}/>
          
             </LeadSearchWrapper>

             <div className="lead-header-title">               
                    <span>Dados</span>
                    <span className="span-oportunidade">Oportunidade</span>
                    <span className="span-status">Status</span>                    
             </div>

             { page.content.length && page.content.length ?
               <>
            {page.content.map(lead => <LeadCardItem {...lead} onChange={handleToDelete} close={closeModalLead} error={error}/>)}
            <PaginationLead page={page} onChange={handlePageChange}/> 
            </>
            : <MessageNoLeads><h4 className="message-no-leads">Você não possui leads no momento...</h4></MessageNoLeads>}
           
            </LeadItemContainer>
    
      
    )
    
}

export default LeadCard;