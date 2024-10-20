
import {OportunidadeContainer, LeadWrapper,ItemsContainer,MessageNoLeads, LeadSearchWrapper,ColumnsContainer} from "./styles";
import {BsPersonFill, BsTrash} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { useEffect, useState } from "react";
import { Property } from "../../../types/property";
import { findProperty, findPropertyLead } from "../../../services/resources/property";
import { Link } from "react-router-dom";
import {FaWhatsapp} from 'react-icons/fa'
import {FiCornerDownRight} from 'react-icons/fi'
import { columns, Columntype, Lead, LeadPage } from "../../../types/lead";
import { deleteLead, leadsPageable, opportunitiesPageable, stepsOpportunity } from "../../../services/resources/lead";
import {AiOutlineMail} from 'react-icons/ai';
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";
import "./ModalStyleLeadCard.css";
import LoadingLogin from "../../../components/LoadingLogin";
import PageNotFound from "../../../components/PageNotFound";
import PaginationLead from "../../../components/PaginationLead";
import { BiSearch } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import React from "react";
import Card from "../../../components/Card";
import { Opportunity, OpportunityPage, Step } from "../../../types/opportunity";
import PaginationOpportunity from "../../../components/PaginationOpportunity";




const OportunidadeCard = (props:{param:string})=>{

    const [property,setProperty]=useState<Property>();
    const [loading,setLoading]= useState(false);
    const [errors,setErrors]=useState();
  

  
    const getProperty = async() => {  
        if(property?.id != null){

                 
        const data = await findPropertyLead(String(property.id));          
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

      const [modalIsOpen, setIsOpen] = useState(false);
      const [putId,setPutId]= useState(false);
      

      const handlePutId = ()=>{    
            setLoading(true)      
        setPutId(true)
        //onChange(page.content[0].id);

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

    const[closeModalLead, setCloseModalLead]= useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const[name,setName]= useState('');
    const [error,setError]=useState('');

    const [page, setPage] = useState<OpportunityPage>();
    const [stepsOp, setSteps] = useState<Step[]>();

    const columnMap= stepsOp as Array<Step>;
  

    const getSteps = async () => {     
        const {data}= await stepsOpportunity();
        setSteps(data as Step[]) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getSteps();
       
    },[pageNumber])

     const getOpportunities = async () => {     
        const {data}= await opportunitiesPageable(pageNumber);
        setPage(data as OpportunityPage) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getOpportunities();
       
    },[pageNumber,name])


    useEffect(() =>{
        if(props.param !==''){
            getOpportunities();
        }
    },[props.param])
   
 

      const handlePageChange = (newPageNumber : number)=>{
        setPageNumber(newPageNumber);
    }   
    

    const draggedItem= React.useRef<any>(null)

    const handleColumnDrop=(step: Step)=>{
        console.log(step.name)
        //aqui editar card quando mudar
       //const handleColumnDrop=(column: Columntype)=>{
    if(page){
    const index= page.content.findIndex((card=>  card.id===draggedItem.current))
    
   
   const aux= [...page.content]  as Array<Opportunity>;
    aux[index].step.name=step.name;
    setPage({
        content:[...aux]  ,
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
   useEffect(() =>{      
    
   
},[page])   

    return(
         
        <OportunidadeContainer>
    
             <ColumnsContainer>
      {
        columnMap && columnMap.map(column=>(
        <div className="column">
            <h5>{column.name.toUpperCase()}</h5>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => 
                   handleColumnDrop(column)}

            >

             { page?.content.length && page?.content.length ?
               <>
            {page.content.filter((card) => card.stepName === column.name).map(lead => (
                 <Link to={`/leadDetail/${lead.id}`}
                 key={lead.id} className="list-item" 
                 draggable
                 onDragStart={(e) =>(draggedItem.current= lead.id)}
                 onDragOver={(e) => e.preventDefault()}>
            
                 
                    <LeadWrapper prop={hiddenMessage} >
                    
                            {loading &&<LoadingLogin/>}
                          
                            <div className="content-first" onClick={openMessage}>              
                            <div className="data-lead-left-wrapper">
                            <h4>{capitalize(lead.nameLead)}</h4>   
                            <span><AiOutlineMail className="email-icon"/>{lead.emailLead}</span>
                            <div className="phone-date-wrapper-lead"><p className="phone-leads"><FaWhatsapp className="icon-phone-lead"/>{lead.phoneLead}</p><p className="instant-lead">{lead.instant}</p></div>
                            </div>
                            <div className="lead-oportunity-wrapper">
                            <BiFilterAlt />
                            <span>resolvido</span>
                            </div>
                                      
                            </div>
                          
                            
                             <div>
                             
                       
                            
                            </div> 
                  
                   </LeadWrapper>
                   </Link>  
                            
            ))}
            <PaginationOpportunity page={page} onChange={handlePageChange}/> 
            </>
            : <MessageNoLeads><h4 className="message-no-leads">Você não possui leads no momento...</h4></MessageNoLeads>}

            </div>
             </div>
        ))
      }
            
            </ColumnsContainer>
            </OportunidadeContainer>
    
      
    )
    
}

export default OportunidadeCard;