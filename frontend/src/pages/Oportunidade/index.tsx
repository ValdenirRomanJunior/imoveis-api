import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {BsPersonFill} from 'react-icons/bs';
import {EtapasContainer, MessagePropertyContainer, OportunidadeBackground, OportunidadeContainer, PropertyItemOportunityContainer, UserInfoContainer, UserPropertyWrapper} from './styles';

import LeadMessage from '../LeadDetail/LeadMessage';
import { Property } from "../../types/property";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findPropertyLead } from '../../services/resources/property';
import { useEffect, useState } from 'react';
import { Lead } from '../../types/lead';
import { FiCornerDownRight } from 'react-icons/fi';
import { refreshToken } from '../../services/resources/user';
import { deleteOpportunity, findLead, findOpportunity, stepsOpportunity } from '../../services/resources/lead';
import { BiFilterAlt } from 'react-icons/bi';
import { FaHome, FaRegUser, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { Background } from '../SignIn/styles';
import { Opportunity, Step } from '../../types/opportunity';
import defaultImage from '../../assets/images/no-pictures.png'
import LeadMessageOpp from './LeadMessageOpp';
import { VscDebugStepOver } from 'react-icons/vsc';
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';
import { MdOutlineCopyAll } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';
import "./styleModaldelOpp.css";
import LoadingLogin from '../../components/LoadingLogin';


const Oportunidade = () => {

    const [Opportunity, setOpportunity]= useState<Opportunity>();
    const [property,setProperty]=useState<Property>();  
    const [lead, setLead]= useState<Lead>();
    const [loading,setLoading]= useState(false);
    const [errors,setErrors]=useState();
    const [errorsProperty,setErrorsproperty]=useState();
    const params = useParams();
    const navigate = useNavigate();
    
 
    const [stepsOp, setSteps] = useState<Step[]>();

    const {user, getCurrentUser} = useAuth();  
    useEffect(() =>{
          
      getCurrentUser();
    
  
  },[])

 
    const getSteps = async () => {     
        const {data}= await stepsOpportunity();
        setSteps(data as Step[]) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getSteps();
       
    },[])


    const getOpportunity = async() => {  
        if(params != null){              
        const data = await findOpportunity(String(params.opportunityId));   
      
        if(data.status === 200){  
          setOpportunity(data.data as Opportunity) 
          setLoading(true);
          setTimeout(()=> {
            setLoading(false)        
            },500)
    
          } else if(data.response.status === 404){        
            setErrors(data.response.data.error);        
          }                          
    }
    }          
    useEffect(() => {
        getOpportunity();
    },
     []);

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
       navigate(`/oportunidades/oportunidade/${params.opportunityId}`);
        }else{
       navigate('/')
        }
    }
   


    useEffect( () =>  {
        refreshTokenUser()
      },[params.leadId])


    const getLead = async() => {  
        if(Opportunity?.idLead){

        
        const data = await findLead(String(Opportunity?.idLead));   
        if(data.status === 200){  
          setLead(data.data as Lead)           
          } else if(data.response.status === 404){        
            setErrors(data.response.data.error);        
          }                          
        }
    }          


    const getProperty = async() => {  
         
            if(Opportunity?.propertyId){     
        const data = await findPropertyLead(String(Opportunity?.propertyId));          
        if(data.status === 200){  
            console.log(data.status) 
         
            setProperty(data.data as Property) 
          } else if(data.response.status === 404){ 
         
            setErrorsproperty(data.response.data.error);  
          }                   
        }
    }      
    
    useEffect(() => {
        getProperty();

    },
     [Opportunity?.propertyId]);

     const [copyUrl,setCopyUrl]=useState(false);

    const copyLink= ()=> {
            
            var url_atual = `https://${user.domain}/detail/${property?.id}`;
           
            navigator.clipboard.writeText(url_atual);
            setCopyUrl(true)
            setTimeout(() => {
                setCopyUrl(false)
            },3000)
  
    }
   
    const ErrorHandler = () => {
        return <PageNotFound/>;
      }
      
  

    const [modalIsOpenTrashOpp, setIsOpenTrashOpp] = useState(false);
    const[idTrash,setIdTrash]= useState<number>();

    const handleOpenModalTrash =(id:number) => {
        setIdTrash(id)
        setIsOpenTrashOpp(true)
    }
    
    
    const handleCloseModalTrash =() =>{        
         setIsOpenTrashOpp(false);  
      
    } 

    const handleDeleteOpportunity = async () => { 
    setIsOpenTrashOpp(false);
    if(idTrash){
  
   const data = await deleteOpportunity((idTrash as number));

   setTimeout(async ()=> {
    if(data.status === 204){
       
        navigate('/oportunidades')
    }
    if(data.status !== 204){    
    }
      getSteps()
   },500)
  }
}
let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');

   
    return(

        <>
        {perfilTenant && !errors? 
        
        <div>
              {loading && <LoadingLogin/>}
                <>   
        <ErrorBoundary FallbackComponent={ErrorHandler}>
      
        <OportunidadeBackground>
            <Header />
            <BarTop />
            <div className='deleteOpportunityWrapper'>
            <span className='deleteOpportunity' onClick={()=>handleOpenModalTrash(Opportunity?.id as number)} >Finalizar</span>
            <Modal 
                        isOpen={modalIsOpenTrashOpp}
                        onRequestClose={handleCloseModalTrash} 
                        onAfterClose={handleCloseModalTrash}  
                        className='Mod'                           
                      > 
                        
                      <h1>Por favor confirme</h1>
                      <p>Tem certeza que deseja excluir esta oportunidade?</p>
                      <IoCloseOutline onClick={handleCloseModalTrash} className='button-close-modal-opp' /> 
                      <div className="buttons-wrapper-lead">
                      <button onClick={handleCloseModalTrash}  className='cancel-button-lead'>Cancelar</button>
                    
                      <button onClick={handleDeleteOpportunity}className='delete-button-lead' >Excluir</button>
                      
                      </div>
                      </Modal> 
            </div>
            <OportunidadeContainer>
               
                <EtapasContainer>
                <h2 className='subtitle-opportunity'><VscDebugStepOver  className='icon-property-opportunity'/>Etapa</h2>   
                <ul>
                    
                    {  stepsOp?.map((etapa) => {
                        if(etapa.name===Opportunity?.stepName ){
                            return (
                                
                                <><div className='etapa-wrapper'><li style={{background: "#0c3a67"}}></li><span >{etapa.name}</span></div></>
                       )
                        }
                        if(etapa.name!==Opportunity?.stepName){
                            return (
                  
                                <><div className='etapa-wrapper'><li></li><span >{etapa.name}</span></div></>
                       )
                        }             
                        })}
                   
                   
                </ul>
                </EtapasContainer>

                <UserPropertyWrapper>                  
              <MessagePropertyContainer>    
             
               <PropertyItemOportunityContainer>         
               <h2 className='subtitle-opportunity'><FaHome className='icon-property-opportunity'/>Imóvel interessado</h2>   
               {(!errorsProperty && Opportunity?.propertyId) ?
                <Link to={`/details/${Opportunity.propertyId}`} className='link-detail-property-lead-opp'>
                
                <div className='property-wrapper-opportunity'>

                 { property?.images && property.images.map((image) => 
                                       
                        <div className="image-property-lead-wrapper-opp">                      
                            <img src={image.url}  alt='Foto do Imóvel'/>                      
                        </div>
                            )}  

                        {property?.images?.length ===0 as number && <div className="image-property-lead-wrapper-opp">                      
                            <img src={defaultImage}  alt='Foto do Imóvel'/>                      
                        </div> }
                                                                           
                          <div className="data-property-opportunity-wrapper">
                                <span>{property?.name}</span>
                                <span>{property?.address.street} {property?.address.number} {property?.address.district} </span> 
                                <span>{property?.address.city.name}</span>                            
                            </div>
                           
                            </div></Link> : <span  style={{fontSize:'12px', paddingLeft:'10px'}}>Imóvel não relacionado</span>} 
           
              </PropertyItemOportunityContainer>
             
              <LeadMessageOpp message={Opportunity?.messageLead as string}/>
            
               </MessagePropertyContainer>    
               <UserInfoContainer copy={copyUrl}>
                <div className='subtitle-info-lead-wrapper'>
                 <h2><FaRegUser />Cliente</h2> <Link to={`/leadDetail/${Opportunity?.idLead}`}><p className='more-details'>Mais detalhes</p></Link>
                 </div>
                 <div className='info-item-wrapper'>
                 <h3>Nome</h3>
                 <span>{Opportunity?.nameLead}</span>
                 </div>
                 <div className='info-item-wrapper'>
                 <h3>Email</h3>
                 <span>{Opportunity?.emailLead}</span>
                 </div>
                 <div className='info-item-wrapper'>
                 <h3>Telefone</h3>
                 <span>{Opportunity?.phoneLead}</span>
                 </div>
                 <div className='info-item-wrapper'>
                 <h3>Data</h3>
                 <span>{Opportunity?.instant}</span>
                 </div>
                 <div className='whats-checkbox-wrapper'> 
                 {Opportunity?.phoneLead && !property?.id &&                                          
                 <a href={`https://wa.me/55${Opportunity.phoneLead.replace(/[^0-9]/g, '')}`} target='blank'><span className='info-item-wrapper-whats'><FaWhatsapp className='icon-item-info-oportunity' />Conversar</span></a>
                   }
                    {Opportunity?.phoneLead && property?.id &&                                          
                 <a href={`https://wa.me/55${Opportunity.phoneLead.replace(/[^0-9]/g, '')}?text=https://${user.domain}/detail/${property?.id}`} target='blank'><span className='info-item-wrapper-whats'><FaWhatsapp className='icon-item-info-oportunity' />Conversar</span></a>
                   }
                 {property?.id &&
                  <div  onClick={copyLink} className='button-wrapper'>Copiar imóvel <MdOutlineCopyAll className='icon-copy'/> </div>
                }        
                 
                 </div>
                 
  
               </UserInfoContainer>
               </UserPropertyWrapper>
            </OportunidadeContainer>
        </OportunidadeBackground>
        </ErrorBoundary>
        </>
     
        </div>
        : <PageNotFound/>}
        </>
    )


}

export default Oportunidade;