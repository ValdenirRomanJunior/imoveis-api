
import {OportunidadeContainer,ItemsContainer,MessageNoLeads, LeadSearchWrapper,ColumnsContainer} from "./styles";
import { BsPersonFill, BsTrash, BsListTask, BsKanban } from 'react-icons/bs';
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




const OportunidadeCard = (props:{param:string, viewMode?: 'kanban' | 'list'})=>{


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
        
       const evtSource = new EventSource(`https://standi-api-dd146fec77bd.herokuapp.com/opportunities/SSe`)   
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

    const getTemperatureEmoji = (id: number) => {
        const temp = id % 3;
        if (temp === 0) return '🧊'; // Frio
        if (temp === 1) return '🌤️'; // Morno
        return '🔥'; // Quente
    };

    if (props.viewMode === 'list') {
        return (
            <div style={{ marginTop: '20px', background: '#fff', border: '1px solid #eaeaea', borderRadius: '8px', padding: '16px' }}>
                {page?.length && page.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {page.map(lead => (
                            <div key={lead.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #eaeaea', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 2 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Link to={`/oportunidades/oportunidade/${lead.id}`} style={{ textDecoration: 'none', color: '#111', fontWeight: 600, fontSize: '15px' }}>
                                                {capitalize(lead.nameLead)}
                                            </Link>
                                        </div>
                                        <span style={{ color: '#666', fontSize: '13px', marginTop: '2px' }}><AiOutlineMail style={{marginRight: '4px'}}/>{lead.emailLead} | <FaWhatsapp style={{marginRight: '4px', marginLeft: '8px'}}/>{lead.phoneLead}</span>
                                        <div style={{ position: 'relative', width: '100%', marginTop: '6px' }}>
                                            {((lead as any).empreendimentoName || lead.propertyId) && (
                                                <div style={{ width: '90%' }}>
                                                    <span style={{ fontSize: '11px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        🏢 {(lead as any).empreendimentoName || `Lançamento ${lead.propertyId}`}
                                                    </span>
                                                </div>
                                            )}
                                            <span style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', width: '50px', display: 'flex', justifyContent: 'center' }} title="Temperatura do Lead">
                                                {getTemperatureEmoji(lead.idLead)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>
                                        {lead.stepName}
                                    </span>
                                </div>
                                <div>
                                    <VscArrowSwap onClick={() => openChangeSteps(lead.id)} style={{ cursor: 'pointer', color: '#666', fontSize: '18px' }} />
                                    {stepsVisible && selectedIdStep === lead.id &&
                                        <ul className="list-steps-change" style={{ top: 'auto', bottom: '100%', right: '50px' }}>
                                            <h5>mover para:</h5>
                                            {columnMap && columnMap.map(step => (                                                                    
                                              <li key={step.id} onClick={() => handleSubmit(lead.idLead, step.id)}>{step.name}</li>
                                            ))}
                                            <IoClose onClick={handleCloseStepMove} className="icon-step-move"/>
                                        </ul>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <MessageNoLeads><h4 className="message-no-leads">Você não possui oportunidades no momento...</h4></MessageNoLeads>
                )}
            </div>
        );
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '4px', maxWidth: '100%' }}>
                                    {capitalize(lead.nameLead)}
                                </h4>
                            </div>
                            <span><AiOutlineMail className="email-icon"/>{lead.emailLead}</span>
                            <div className="phone-date-wrapper-lead"><p className="phone-leads"><FaWhatsapp className="icon-phone-lead"/>{lead.phoneLead}</p><p className="instant-lead">{lead.instant}</p></div>
                            
                            <div style={{ position: 'relative', width: '100%', marginTop: '8px', marginBottom: '4px' }}>
                                {((lead as any).empreendimentoName || lead.propertyId) && (
                                    <div style={{ width: '90%' }}>
                                        <span style={{ fontSize: '10px', background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '6px' }} title={(lead as any).empreendimentoName || `Lançamento ${lead.propertyId}`}>
                                            🏢 {(lead as any).empreendimentoName || `Lançamento ${lead.propertyId}`}
                                        </span>
                                    </div>
                                )}
                                <span style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', zIndex: 1, width: '50px', display: 'flex', justifyContent: 'center' }} title="Temperatura do Lead">
                                    {getTemperatureEmoji(lead.idLead)}
                                </span>
                            </div>
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