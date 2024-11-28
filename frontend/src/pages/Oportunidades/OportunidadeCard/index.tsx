
import {OportunidadeContainer,ItemsContainer,MessageNoLeads, LeadSearchWrapper,ColumnsContainer} from "./styles";
import {BsPersonFill, BsTrash} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { useEffect, useRef, useState } from "react";
import { Property } from "../../../types/property";
import { eventSSe, findProperty, findPropertyLead } from "../../../services/resources/property";
import { Link } from "react-router-dom";
import {FaWhatsapp} from 'react-icons/fa'
import {FiCornerDownRight} from 'react-icons/fi'
import { columns, Columntype, Lead, LeadPage } from "../../../types/lead";
import { deleteLead, editLead, editLeadStep, leadsPageable, opportunitiesPageable, stepsOpportunity } from "../../../services/resources/lead";
import {AiOutlineMail} from 'react-icons/ai';

import Carousel from 'react-elastic-carousel';
import "./ModalStyleLeadCard.css";
import LoadingLogin from "../../../components/LoadingLogin";

import React from "react";
import { Opportunity, OpportunityPage, Step } from "../../../types/opportunity";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { VscArrowSwap } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { tokenAux } from "../../../utils/requests";




const OportunidadeCard = (props:{param:string})=>{


  const [stepsOp, setSteps] = useState<Step[]>();
  const [itemsToShow,setItemsToShow]= useState<any>();

  const [data, setData] = useState<{ num: number } | null>();




  

  useEffect(() => {
    if(stepsOp?.length){
      const items= stepsOp?.length;
        setItemsToShow(items)
    }

},
 [stepsOp?.length]);

 
 const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 450, itemsToShow: 2},
  { width: 650, itemsToShow: 3 },
  { width: 750, itemsToShow: 4 },
  { width: 850, itemsToShow: 5 },
  { width: 950, itemsToShow: 4 },
  { width: 1250, itemsToShow: 5 },
]

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

    const [page, setPage] = useState<Opportunity[]>();
  

    const columnMap= stepsOp as Array<Step>;
  

    const getSteps = async () => {     
        const {data}= await stepsOpportunity();
        setSteps(data as Step[]) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getSteps();
      
    },[pageNumber])



    const [newPage,setNewPage]=useState<OpportunityPage>()
    const [pageN,setPageN]=useState(0);
    const [sizePage,setSizePage]= useState(6);

     const getOpportunities = async () => {      
        const data= await opportunitiesPageable();    
        setPage(data.data)
        
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
   
  
 useEffect(() => {
        
       const evtSource = new EventSource(`https://standi-v1-2024-f863ecac91d0.herokuapp.com/opportunities/SSe`)   
       if(typeof(EventSource) !== 'undefined'){
        console.log('error')
      } 
       evtSource.onmessage = (event) => {
      
        if (event.data) {
         console.log(event.data)
           getOpportunities()
      };
      evtSource.onerror = (error) => {
        console.log(error)
        evtSource.close();
      }
   };

   return ()=>{
    evtSource.close()
   }
}, [page]);


    

    const draggedItem= React.useRef<any>(null)
    const handleColumnDrop=(step: Step)=>{
     
    if(page){
    const index= page.findIndex((card=>  card.id===draggedItem.current))

    const aux= [...page]  as Array<Opportunity>;
    aux[index].stepName=step.name;
    setPage(aux)
    handleSubmit(aux[index].idLead,step.id)
    setStepsVisible(false)
     

   }
}
   useEffect(() =>{          

},[page])   


   
    const [stepsVisible,setStepsVisible]= useState(false);
    const [selectedIdStep,setSelectedIdStep]= useState<number>();
    const openChangeSteps=(column:number) =>{
      
            //mover oportuidade, salvar e salvar lead
        setSelectedIdStep(column as number)
        setStepsVisible(stepsVisible=>!stepsVisible)
    }
    const handleCloseStepMove=() =>{
    setStepsVisible(stepsVisible=>!stepsVisible)
}

    
    const handleSubmit = async (id:number,stepId:number) =>{    
        console.log(id,stepId) 
        setStepsVisible(stepsVisible=>!stepsVisible)
        console.log("chguei aqui")
            const data = await editLeadStep( id as number, stepId as number) 
          if(data.status === 204){
            getOpportunities();
            setTimeout(()=> {
     
          },2000)                                       
        }                                                              
    }

    return(
         
        <OportunidadeContainer>
              
                 <Carousel
                         isRTL={false}                      
                         breakPoints={breakPoints}
                         enableMouseSwipe={true}
                        showEmptySlots
                        pagination={false} 
                        showArrows={false}
                        enableSwipe={true}                                                                                                          
                         >                
                   
                 {  columnMap && columnMap.map(column=>(
                  
            <div className="column" id="column" 
                onDragOver={(e)=> e.preventDefault()}
                onDrop={(e) => 
                   handleColumnDrop(column)}
                                                                                                              
            >
            <h5 className="title-column">{column.name.toUpperCase()}</h5>
        
             { page?.length && page.length ?
               <>
            {page.filter((card) => card.stepName === column.name).map(lead => (

                <div key={lead.id} className="leadWrapper" 
                draggable
                onDragStart={(e) =>(draggedItem.current= lead.id)}
                onDragOver={(e) => e.preventDefault()}
                           
                > 
            
                 <Link to={`/oportunidades/oportunidade/${lead.id}`} className="link-item-lead" >                                                             
                            {loading &&<LoadingLogin/>}                         
                            <div className="content-first" onClick={openMessage}>             
                            <div className="data-lead-left-wrapper">
                            <h4>{capitalize(lead.nameLead)}</h4>   
                            <span><AiOutlineMail className="email-icon"/>{lead.emailLead}</span>
                            <div className="phone-date-wrapper-lead"><p className="phone-leads"><FaWhatsapp className="icon-phone-lead"/>{lead.phoneLead}</p><p className="instant-lead">{lead.instant}</p></div>
                            </div>
                                                                                                                                            
                     </div>
                     </Link>  

                   <div className="icon-opportunity-op-wrapper"> <VscArrowSwap onClick={()=>openChangeSteps(lead.id)} key={lead.id} style={{zIndex:1}} className="icon-opportunity-op" /> </div> 
                     {stepsVisible && selectedIdStep === lead.id &&
                                <ul className="list-steps-change">
                                    <h5>mover para:</h5>
                                    {
                                    columnMap && columnMap.map(step=>(                                                                    
                                      <li onClick={()=>handleSubmit(lead.idLead,step.id)}>{step.name}</li>
                                     
                                    ))}
                                    <IoClose onClick={handleCloseStepMove} className="icon-step-move"/>

                                </ul>
                                
                            }                                                                              
                   </div>
                                          
            ))}
             <p className="item-opacity" style={{width:"100%", height:"70px",opacity:"0"}}>primeiro item escondido</p>
            </>
            : <MessageNoLeads><h4 className="message-no-leads">Você não possui oportunidades no momento...</h4></MessageNoLeads>}
      
            </div>         
                        
        ))       
      }
     
       </Carousel>
           
  </OportunidadeContainer>
    
      
    )
    
}

export default OportunidadeCard;