import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {BsPersonFill} from 'react-icons/bs';
import {LeadDetailBackground, LeadDetailContainer} from './styles';

import LeadMessage from './LeadMessage';
import { Property } from "../../types/property";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findPropertyLead } from '../../services/resources/property';
import { useEffect, useState } from 'react';
import { Lead } from '../../types/lead';
import { FiCornerDownRight } from 'react-icons/fi';
import { refreshToken } from '../../services/resources/user';
import { deleteLead, editLead, findLead } from '../../services/resources/lead';
import { BiFilterAlt } from 'react-icons/bi';
import { FaRegUser, FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { number, phone } from '../Registration/masks';
import Loading from '../../components/Loading';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';
import "./ModalStyleLead.css";
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';

type Error = {
  fieldName:string;
  message:string;
}

const LeadDetail = () => {

    const [property,setProperty]=useState<Property>();
    const [lead, setLead]= useState<Lead>();
    const [loading,setLoading]= useState(false);
    const [errors,setErrors]=useState();
    const params = useParams();
    const navigate = useNavigate();


   

      const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();  
      useEffect(() =>{
            
        getCurrentUser();
      
    
    },[])
    
    const getLead = async() => { 
        if(params != null){
               
        const data = await findLead(String(params.leadId));   
         
        if(data.status === 200){
            setLead(data.data as Lead)
            console.log(data.status)
         
           
          } else if(data.response.status === 404){ 
                   
            setErrorGetLead(data.response.status);        
          }                       
    }
    }          
    useEffect(() => {
        getLead();

    },
     []);

     const refreshTokenUser = async ()=>{
      const  resp = await refreshToken();    
      if(resp === 204){  
        navigate(`/leadDetail/${params.leadId}`)
      }else{
     navigate('/')
      }
  }

  useEffect( () =>  {
      refreshTokenUser()
    },[params.leadId])
    const getProperty = async() => {  
        if(lead?.propertyId != null){
               
        const data = await findPropertyLead(String(lead.propertyId));          
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

     const [errorsLead, setErrorsLead] = useState<Error[]>([])
     const [errorGetLead, setErrorGetLead] = useState()
     const [changeButtonName,setChangeButtonName]= useState(false);

     const changeEditButton= () => {
      setChangeButtonName(changeButtonName => !changeButtonName);
     
     }

     const [changeEditButtonEmail,setChangeButtonEmail]= useState(false);
    
     const handlechangeEditButtonEmail= () => {
      setChangeButtonEmail(changeButtonEmail => !changeButtonEmail);
     }

     const [changeEditButtonPhone,setChangeButtonPhone]= useState(false);
    
     const handlechangeEditButtonPhone= () => {
      setChangeButtonPhone(changeButtonPhone => !changeButtonPhone);
     }

     const handleCancelEdit= ()=>{
      setChangeButtonName(false)
      setChangeButtonEmail(false)
      setChangeButtonPhone(false)
      if(lead){

      
        setForm({ ...form,  
          name:lead.name,
          email:lead.email,
          phone:lead.phone        
        }); 
      }
     }

  
     const [form, setForm] = useState({
      name:"",
      email:"",
      phone:""  
      });

  
      useEffect(() => {
        if(lead){

      
        setForm({ ...form,  
          name:lead.name,
          email:lead.email,
          phone:lead.phone        
        }); 
      }

    },
     [lead?.name]);

      const cleanForm = () =>{
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
          
        setForm({ ...form,
          name:"",
          email:"",
          phone:""         
        });    
       }

       
       const [emptyValue,setEmptyValue]= useState(false);
       const [successMessage, setSuccessMessage] = useState(false); 
       const [param, setParam]= useState("");
       const [loadingEditName, setLoadingEditName]=useState(false);
       const [otherError, setOtherError] = useState(false);
       const [errorIntegrity, setErrorIntegrity] = useState(false);

       const handleChange = (e:any ) =>{                       
           let field= e.target.getAttribute('name');
           const value= e.target.value    
           setForm({ ...form,
               [field]:value,
           });     
          }

          const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{      
            if(e.currentTarget.name === 'phone'){  
                phone(e)             
            }          
           setErrorsLead([])
        }

        const handleSubmit = async (e:any) =>{     
          e.preventDefault()        
          let emptyValues=Object.values(form).some(obj => obj === '');
          setEmptyValue(emptyValues);
           
          if(!emptyValues){
          setLoadingEditName(true)
          
           
              const data = await editLead(form['name'] as string,form['email'] as string,form['phone'] as string, lead?.id as number) 
            if(data.status === 204){
              setTimeout(()=> {
                setLoadingEditName(false)
                setChangeButtonEmail(false)
                setChangeButtonName(false)
                setChangeButtonPhone(false)
                setSuccessMessage(true)
                getLead()
            },2000)          
                           
              setParam("getLeads")
              setParam('');  
            }
              if(data.response.data.errors){   
                        
                  setErrorsLead(data.response.data.errors);
                  setSuccessMessage(false)
                  setLoadingEditName(false)
                  setParam('')
                                                                                 
              } 
              else if(data.response.status === 404 || data.response.status === 403){                     
                  setOtherError(true)
                  setSuccessMessage(false)
                  setLoadingEditName(false)
                  setParam('')              
                  setTimeout(()=>{
                      setOtherError(false)
                  },1000)
              }           
          }                                                 
      }
      const [modalIsOpenTrashOpp, setIsOpenTrashOpp] = useState(false);
      const[idTrash,setIdTrash]= useState<number>();
      const handleOpenModalTrash =(id:number) => {
        setIdTrash(id)
        setIsOpenTrashOpp(true)
    }
    
    
    const handleCloseModalTrash =() =>{  
          setErrorIntegrity(false)    
         setIsOpenTrashOpp(false);  
      
    
    } 
      const[closeModalLead, setCloseModalLead]= useState(true);

      const handleToDelete = async() => {
     
        setTimeout(async ()=> {
        setCloseModalLead(false);

        const data =  await deleteLead(String(idTrash));
    
        if(data.status === 204){

          setIsOpenTrashOpp(false);
          navigate(`/leads`)
            
        }
      
        if(data.response.status === 400){
            setErrorIntegrity(data)
            setIsOpenTrashOpp(true);
        }          
        getLead()
    },500)
      }
  
      
    return(
      <>
        {user?.perfis?.[0] === 'TENANT' && !errorGetLead? 
        <div>
     
        <LeadDetailBackground>
            <Header />
            <BarTop />
            <LeadDetailContainer disableName={changeButtonName} disableEmail={changeEditButtonEmail} disablePhone={changeEditButtonPhone}>

                    <div className='h1-oportunidade-wrapper'>
                    <h1><FaRegUser className='icon-lead-detail'/>Lead</h1>
                    { lead?.opportunityId !== null &&
                   <Link to={`/oportunidades/oportunidade/${lead?.opportunityId}`} className='link-opportunity'><span> <BiFilterAlt />Ver oportunidade</span></Link> 
                  }
                    <p className='excluir-lead' style={{cursor:"pointer"}} onClick={()=>handleOpenModalTrash(lead?.id as number)}>Excluir</p>
            
                    <Modal 
                        isOpen={modalIsOpenTrashOpp}
                        onRequestClose={handleCloseModalTrash} 
                        onAfterClose={handleCloseModalTrash}  
                        className='Mod'                           
                      > 
                        
                      <h1>Por favor confirme</h1>
                      <p>Tem certeza que deseja excluir este lead?</p>
                      <IoCloseOutline style={{cursor:"pointer"}} onClick={handleCloseModalTrash} className='button-close-modal-opp'/> 
                      <div className="buttons-wrapper-lead">
                      <button onClick={handleCloseModalTrash}  className='cancel-button-lead'>Cancelar</button>                 
                      <button onClick={(handleToDelete)} className='delete-button-lead' >Excluir</button>
                      { errorIntegrity ? <span className='error-integrity'>Não pode excluir lead com oportunidade em aberto</span>: ''}
                      
                      </div>
                      </Modal> 
                    </div>
                    <h2>Informações</h2>
                    <div className='info'>
                    <p className='lead-message-date'>{lead?.instant}</p>

                    <form  onSubmit={(e)=> {handleSubmit(e)}}>

                    <label>Nome</label>
                    {!changeButtonName ?                
                   <div className='data-detail-lead-wrapper'><p className='lead-name-detail'>{lead?.name}</p><span onClick={changeEditButton} className='edit-label' style={{cursor:'pointer'}}>editar</span></div>: 
                      <div className='input-wrapper-data'><input placeholder="Rogerio" className="input-class" id="name" name="name" value={form['name']} onChange={(e) => handleChange(e)} maxLength={41} onKeyUp={handleKeyUp}></input> 
                       {!loadingEditName &&
                       <div className='button-wrapper-send-data'><button className='button-send-data' type='submit' style={{cursor:'pointer'}} >Salvar</button> <span  className='button-cancel-data' onClick={handleCancelEdit} style={{cursor:'pointer'}}>cancelar</span></div>}
                         {loadingEditName &&
                       <div className='button-wrapper-send-data'> <button className="button-send-data" type='submit'><Loading/></button></div>} </div>}
                       {errorsLead.map(x => { if(x.fieldName === 'name') return  <p className='formField__error'>{x.message}</p>})}
                       { emptyValue && form['name'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}
    
                    <label>Email</label>
                    {!changeEditButtonEmail?
                    <div className='data-detail-lead-wrapper'><p className='lead-email'><AiOutlineMail/>{lead?.email}</p><span  onClick={handlechangeEditButtonEmail} className='edit-label-email' style={{cursor:'pointer'}}>editar</span></div>:
                    <div className='input-wrapper-data'><input placeholder="ex: joao@gmail.com" className="input-class" id="email" name="email" value={form['email'] } onChange={(e) => handleChange(e)}  maxLength={40} onKeyUp={handleKeyUp}></input>
                    {!loadingEditName &&
                       <div className='button-wrapper-send-data'><button className="button-send-data" type='submit' style={{cursor:'pointer'}}>Salvar</button> <span  className='button-cancel-data' onClick={handleCancelEdit} style={{cursor:'pointer'}}>cancelar</span></div>}
                         {loadingEditName &&
                       <div className='input-wrapper-data'><button className="button-send-data" type='submit'><Loading/></button></div>} </div>}
                     {errorsLead.map(x => { if(x.fieldName === 'email') return  <p className='formField__error'>{x.message}</p>})}
                     { emptyValue && form['email'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}


                    <label>Telefone</label>
                    {!changeEditButtonPhone ?
                    <div className='data-detail-lead-wrapper'>  <p className='lead-phone'><FaWhatsapp/>{lead?.phone}</p><span onClick={handlechangeEditButtonPhone} className='edit-label-phone' style={{cursor:'pointer'}}>editar</span></div>:
                   <div  className='input-wrapper-data'> <input placeholder="(85) 982251423" className="input-class" id="phone" name="phone" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}></input>
                     {!loadingEditName &&
                         <div className='button-wrapper-send-data'><button className="button-send-data" type='submit' style={{cursor:'pointer'}}>Salvar</button> <span  className='button-cancel-data' onClick={handleCancelEdit} style={{cursor:'pointer'}}>cancelar</span></div>}
                         {loadingEditName &&
                       <div className='input-wrapper-data'><button className="button-send-data" type='submit'><Loading/></button> </div>} </div>}
                    {errorsLead.map(x => { if(x.fieldName === 'phone') return  <p className=' formField__error'>{x.message}</p>})}
                    { emptyValue && form['phone'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}
                    {form['phone'] && form['phone'].length  >1 && form['phone'].length <14 &&  <span className='formField__error'>Formato de telefone errado</span>}
                    </form>
                    {lead?.opportunityId ===null &&  <div className='status-lead'> resolvido</div>
                    }
                    {lead?.opportunityId !==null &&  <div className='status-lead' style={{background:"#ffe6b857"}}> em aberto</div>}
                   

                    </div>
                
            </LeadDetailContainer>
        </LeadDetailBackground>
    
        </div>
        : <PageNotFound/>}
        </>
    )


}

export default LeadDetail;