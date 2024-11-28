import BarTop from "../../components/Bartop";
import Header from "../../components/Header";
//import LeadCard from "./LeadCard";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "./ModalStyle.css";
import { BsFillGearFill, BsPersonPlus } from "react-icons/bs";
import { currency, number, phone } from "../Registration/masks";
import { newLead, newStep } from "../../services/resources/lead";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { refreshToken } from "../../services/resources/user";
import LoadingLogin from "../../components/LoadingLogin";
import PageNotFound from "../../components/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import useAuth from "../../hooks/useAuth";
import { BiBorderRadius } from "react-icons/bi";
import { OportunidadesBackground, OportunidadesContainer } from "./styles";
import OportunidadeCard from "./OportunidadeCard";
import { findPropertyLead } from "../../services/resources/property";
import { Property } from "../../types/property";
import defaultImage from '../../assets/images/no-pictures.png';
import { IoIosCloseCircle } from "react-icons/io";
type Error = {
    fieldName:string;
    message:string;
}

const Oportunidades = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/oportunidades')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
  setNameProperty('')
},[])

    const [form,setForm]=useState<any>({
        name:'',
        email:'',
        phone:'',
        idProperty:''
        
    });


   const cleanForm = () =>{

    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      
    setForm({ ...form,
        name:'',
        email:'',
        phone:'',
        idProperty:''
        
    }); 
    setNameProperty('');

   }

    const [emptyValue,setEmptyValue]= useState(false);
    const [successMessage, setSuccessMessage] = useState(false); 
    const [param, setParam]= useState("");
    const [loadingAddLead, setLoadingAddLead]=useState(false);
    const [otherErrorRegister, setOtherErrorRegister]=useState(false);


    const handleChange = (e:any) => {
        const field= e.target.getAttribute('name');
        const value= e.target.value
        setForm({ ...form,
            [field]:value,
        });
         
    }
 
    
    const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{      
        if(e.currentTarget.name === 'phone'){  
            phone(e)         
        }  
        if(e.currentTarget.name === 'idProperty'){  
            number(e)         
        }    
       setErrors([])
    }

            
    const handleSubmit = async (e:any) =>{ 

        e.preventDefault()    
        let emptyValues= form['name']==='' || form['email']==='' || form['phone'] === '';  
        
        setEmptyValue(emptyValues);
        
        if(!emptyValues){
            
        setLoadingAddLead(true)
    
            const data = await newLead(form['name'],form['email'],form['phone'], form['idProperty'])
          
          if(data.status === 201){
            cleanForm()         
            setSuccessMessage(true)
            setLoadingAddLead(false)
            setParam("getLeads")
            setParam('');  
            setButtonVisible(false)
            setForm({ ...form,
                name:'',
                email:'',
                phone:'',
                idProperty:''
                
            }); 

            setTimeout(()=>{
                setSuccessMessage(false)
            },2000)
          }

            if(data.response.data.errors){              
                setErrors(data.response.data.errors);
                setSuccessMessage(false)
                setLoadingAddLead(false)
                setParam('')
                                                                               
            } 
            else if(data.response.status === 404 || data.response.status === 403){              
                setOtherError(true)
                setSuccessMessage(false)
                setLoadingAddLead(false)
                setParam('')
               
                setTimeout(()=>{
                    setOtherError(false)
                },2000)
            }
            else if(data.response.status === 400){              
                setOtherErrorRegister(true)
                setSuccessMessage(false)
                setLoadingAddLead(false)
                setParam('')
               
                setTimeout(()=>{
                    setOtherErrorRegister(false)
                },2000)
            }
        }                                                  
    }

    const [modalIsOpen, setIsOpen] = useState(false);


    const handleOpenModal =() => {
          
        setIsOpen(true)
    }

    const handleCloseModal =() =>{
        
        cleanForm()
        setParam('')
        setIsOpen(false) 
        setEmptyValue(false)
        setErrors([]);
        setSuccessMessage(false) 
        openButton()
        setButtonVisible(false)
    }
    
    
    const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
     
      useEffect(() =>{          
        getCurrentUser();
    
    },[])

    const [errorsproperty,setErrorsproperty]= useState<string>();
    const [property,setProperty]= useState<Property>();
    const [nameProperty,setNameProperty]= useState<string>();
    const [loadingButton,setLoadingButton]=useState(false)

    const getProperty = async() => { 
       
            setLoadingButton(true) 
        if(form['idProperty']){     
        const data = await findPropertyLead(String(form['idProperty']));          
        if(data.status === 200){  
            
        setTimeout(()=>{
            setLoadingButton(false)         
        },300)
        setProperty(data.data as Property) 
        setTimeout(()=>{
         setNameProperty(property?.name as string)          
        },200)
        

      } else if(data.response.status === 404){ 
     console.log(data.response.data.error)
        setLoadingButton(false)
        setErrorsproperty(data.response.data.error); 
        setTimeout(()=>{
            setErrorsproperty('')         
           },4000)

      }                   
    }
}      

useEffect(() => {
    getProperty();

},[])


       const cleanProperty = ()=> {
        setNameProperty('')
        setErrorsproperty(" ");
        setForm({ ...form,
            name:form['name'],
            email:form['email'],
            phone:form['phone'],
            idProperty:''
            
        }); 
        setNameProperty('');
      
       }
       const [buttonVisible,setButtonVisible]= useState(false);
      const openButton= () => {
    
            setButtonVisible(buttonVisible=>!buttonVisible)
      }

      let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');
    return(
        <>
        {perfilTenant ? 
        <ErrorBoundary FallbackComponent={ErrorHandler}>

        <div>
        
        
        <OportunidadesBackground>

            <Header />
            <BarTop />
            <OportunidadesContainer>
        
            <div className="title-leads"><BiBorderRadius className="icon-title-lead"/><h2>Oportunidades</h2>
            <button className="button-add-lead" onClick={handleOpenModal}><BsPersonPlus className="icon-add-lead"/></button>
            <Link to={`/steps`} className="etapa-config-wrapper"><BsFillGearFill className="icon-step-config"/><span className="etapa-text">Etapas</span></Link>
            </div>
            
                 
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}    
                className='Modall'
                            
              >
                <h2>Adicionar Contato</h2>
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' />

          

                    <label>Nome</label>   
                    <Input placeholder="Rogerio" className="input-class" id="name" name="name" onChange={(e) => handleChange(e)} maxLength={41} onKeyUp={handleKeyUp}/>
                    {errors.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error'>{x.message}</p>})}
                    { emptyValue && form['name'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}

                    <label>Email</label>
                    <Input placeholder="ex: joao@gmail.com" className="input-class" id="email" name="email" onChange={(e) => handleChange(e)}  maxLength={40} onKeyUp={handleKeyUp}/>
                    {errors.map(x => { if(x.fieldName === 'email') return  <p className=' formField__error'>{x.message}</p>})}
                    { emptyValue && form['email'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}

                    <label>Telefone</label>
                    <Input  placeholder="(85) 982251423" className="input-class" id="phone" name="phone" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}/>
                    {errors.map(x => { if(x.fieldName === 'phone') return  <p className=' formField__error'>{x.message}</p>})}
                    { emptyValue && form['phone'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}
                    { form['phone'].length >1 && form['phone'].length <14 &&  <span className='formField__error'>Formato de telefone errado</span>}
                    
                    
                    <label className="label-message-property" onClick={openButton}>Relacionar imóvel (Não obrigatório)</label>

                    { buttonVisible && 

                    <div className="input-property-wrapper-cod">             
                     
                     {nameProperty ==='' ?
                    <><button className="button-cod" onClick={getProperty}>Buscar</button><input placeholder="Digite o código" id="idProperty" name="idProperty" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}></input></>
                   :
                    <>
                    {loadingButton? <span className="loading-search-property"><Loading/></span>: 
                 
                    <div className="property-wrapper-op">
                    <IoIosCloseCircle className="icon-property-search-opp"  onClick={cleanProperty}/>
                    {property?.images && property?.images[0]?.url? <img src={property.images?.[0]?.url} className="img-property-search-opportunity"/>: <img src={defaultImage} className="img-property-search-opportunity"/>}
                     <span className="property-name-op">{property?.name}</span>
                    </div> } 
                    </>
                     }   
                    </div>
                    }
                    {errorsproperty && <p className=' formField__error'>{errorsproperty}</p>}
                  
                
                    {
                        loadingAddLead && <Button  className="button-send-email"><Loading/></Button>
                    }
                    
                    {  !loadingAddLead && (!form['name'] || !form['email'] || !form['phone'])    && !buttonVisible&&
                    <Button disabled  className="button-send-email" onClick={(e)=> handleSubmit(e)} >Adicionar</Button> }

                       {  !loadingAddLead && (form['name'] && form['email'] && form['phone']) && !buttonVisible &&
                    <Button   className="button-send-email" onClick={(e)=> handleSubmit(e)} >Adicionar</Button> }


                
                    { !loadingAddLead  && (form['name'] && form['email'] && form['phone'] && nameProperty !== '') && buttonVisible &&
                    <Button   className="button-send-email" onClick={(e)=> handleSubmit(e)} >Adicionar</Button> 
                     
                       }
                             { !loadingAddLead  && (form['name'] && form['email'] && form['phone'] && form['idProperty'] && nameProperty ==='') && buttonVisible &&
                    <Button   disabled className="button-send-email" onClick={(e)=> handleSubmit(e)} >Adicionar</Button> 
                     
                       }
                   
                        { !loadingAddLead  && (!form['name'] || !form['email'] || !form['phone'] || !form['idProperty']) && buttonVisible &&
                    <Button  disabled className="button-send-email" onClick={(e)=> handleSubmit(e)} >Adicionar</Button> 
                     
                       }
                     
                   

             
                { otherError &&   
                <div style={{color:"red"}} className='other-error'>Erro Inesperado</div>
                 }
                    { otherErrorRegister &&   
                <div style={{color:"red"}} className='other-error'>Precisa ter pelo menos 1 etapa</div>
                 }
                <div className="message">
                    {successMessage   ? <span className='success'>Lead salvo com sucesso!</span>: ''}
                    </div>
                  
            </Modal>                      
            <OportunidadeCard  param={param as string}/>
            
            </OportunidadesContainer>
        </OportunidadesBackground>
      
   
        </div>
        </ErrorBoundary>
        : <PageNotFound/>}
        </>
    )


}

export default Oportunidades ;