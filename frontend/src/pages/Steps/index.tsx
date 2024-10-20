import BarTop from "../../components/Bartop";
import Header from "../../components/Header";

import { StepsBackground, StepsContainer } from "./styles";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "../Leads/ModalStyle.css";
import { BsPersonPlus, BsTrash } from "react-icons/bs";
import { currency, number, phone } from "../Registration/masks";
import { deleteStep, newStep, stepsOpportunity } from "../../services/resources/lead";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { refreshToken } from "../../services/resources/user";
import LoadingLogin from "../../components/LoadingLogin";
import PageNotFound from "../../components/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import useAuth from "../../hooks/useAuth";
import { BiBorderRadius } from "react-icons/bi";
import { Step } from "../../types/opportunity";
import "./style-modal.css";
import { IoMdAdd } from "react-icons/io";

type Error = {
    fieldName:string;
    message:string;
}

const Steps = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const [errorLimite, setErrorLimite] = useState(false);



    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/steps')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])

    const [form,setForm]=useState<any>({
        name:'',
        email:'',
        phone:'',
        
    });

   const cleanForm = () =>{

    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      
    setForm({ ...form,
        name:'',
        email:'',
        phone:'',
        
    });  
   }

    const [emptyValue,setEmptyValue]= useState(false);
    const [successMessage, setSuccessMessage] = useState(false); 
    const [param, setParam]= useState("");
    const [loadingAddLead, setLoadingAddLead]=useState(false);

    const handleChange = (e:any) => {
        const field= e.target.getAttribute('name');
        const value= e.target.value
        
        setForm({ ...form,
            [field]:value,
        }); 
       
    }

    

    const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{          
        setErrors([])
       
    }

    
    
   

    const handleSubmit = async (e:any) =>{   
        e.preventDefault();

        let emptyValues=Object.values(form).some(obj => obj === '');
        setEmptyValue(emptyValues);
       
        
        if(form['name']){
    
        setLoadingAddLead(true)
      
            const data = await newStep(form['name'])
          
           
       
          if(data.status === 201){
            cleanForm()         
            setSuccessMessage(true)
            setLoadingAddLead(false)
            setParam("getLeads")
            setParam('');
            getSteps()
     
          }
          if(data.response.status === 400){
            setErrorLimite(true)
            setSuccessMessage(false)
            setLoadingAddLead(false)
            setParam('')
     
          }
            if(data.response.data.errors){              
                setErrors(data.response.data.errors);
                setSuccessMessage(false)
                setLoadingAddLead(false)
                setParam('')
                                                                                     
            } 
            else if(data.response.status === 404 || data.response.status === 403){
                   console.log(data.response.status)
                setOtherError(true)
                setSuccessMessage(false)
                setLoadingAddLead(false)
                setParam('')
               
                setTimeout(()=>{
                    setOtherError(false)
                },2000)               
            }
        }                                                 
    }
    
    const [stepsOp, setSteps] = useState<Step[]>();

    const getSteps = async () => {     
        const {data}= await stepsOpportunity();
        setSteps(data as Step[]) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getSteps();
       
    },[])


    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal =() => {
        setIsOpen(true)
    }

    const handleCloseModal =() =>{
        setParam('')
        setIsOpen(false)     
        setEmptyValue(false)
        setErrors([]);
        setSuccessMessage(false)

    }

    const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
     
      useEffect(() =>{       
        getCurrentUser();
          
    },[])

    const [modalIsOpenTrash, setIsOpenTrash] = useState(false);
    const[idTrash,setIdTrash]= useState<number>();
    const handleOpenModalTrash =(id:number) => {
        setIdTrash(id)
        setIsOpenTrash(true)
    }
    
    
    const handleCloseModalTrash =() =>{        
         setIsOpenTrash(false);  
      
    
    } 

 


    const handleDeleteStep = async () => { 
        console.log(idTrash)
    setIsOpenTrash(false);
   const data = await deleteStep((idTrash as number));

   console.log(data.status)
   setTimeout(async ()=> {
    if(data.status !== 204){
      
    }
      getSteps()
   },500)
  }
    
    return(
        <>
        {user?.perfis?.[0] === 'TENANT'? 
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
        
        <StepsBackground>
            <Header />
            <BarTop />
            <StepsContainer>

            <div className="title-steps"><BiBorderRadius className="icon-title-steps"/><h2>Etapas</h2>
            <button className="button-add-step" onClick={handleOpenModal}><IoMdAdd className="icon-add-step"/></button> 
            </div>
            <div className="steps-wrapper">
                <ul>
                    {stepsOp && stepsOp.map(steps => (
                          <>
                        <li><span>{steps.name}</span><p onClick={()=>handleOpenModalTrash(steps.id)} ><BsTrash className='icon-trash'/>Excluir</p></li>
                      
                        <Modal 
                        isOpen={modalIsOpenTrash}
                        onRequestClose={handleCloseModalTrash} 
                        onAfterClose={handleCloseModalTrash}  
                        className='Mod'                           
                      > 
                        
                      <h1>Por favor confirme</h1>
                      <p>Tem certeza que deseja excluir esta etapa?</p>
                      <IoCloseOutline onClick={handleCloseModalTrash} className='button-close-modal' /> 
                      <div className="buttons-wrapper-lead">
                      <button onClick={handleCloseModalTrash}  className='cancel-button-lead'>Cancelar</button>
                    
                      <button onClick={handleDeleteStep}className='delete-button-lead' >Excluir</button>
                      
                      </div>
                      </Modal> 
                      </>
                    ))}
                    
                </ul>
            </div>

            
   
                 
              <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}    
                className='Modall'
                            
              >
                <h2>Adicionar Etapa</h2>
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal'/>

                <form  onSubmit={(e)=> {handleSubmit(e)}}>

                    <label>Nome</label>   
                    <Input placeholder="Nome da etapa" className="input-class" id="name" name="name" onChange={(e) => handleChange(e)} maxLength={15} onKeyUp={handleKeyUp}/>
                    {errors.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error'>{x.message}</p>})}
                    {form['name'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}

                                    
                    {
                        loadingAddLead && <Button className="button-send-email" type='submit'><Loading/></Button>
                    }
                    {
                        !loadingAddLead &&
                    <Button className="button-send-email" type='submit'>Adicionar</Button>
                    }

                </form>
                { otherError &&   
                <div className='other-error'>Erro Inesperado</div>
                 }
                   { errorLimite &&   
                <div className='other-error'>8 é o máximo de etapas</div>
                 }
                <div className="message">
                    {successMessage   ? <span className='success'>Etapa salva com sucesso!</span>: ''}
                    </div>
                  
            </Modal>
                                   
            </StepsContainer>
        </StepsBackground>
        </div>
        </ErrorBoundary>
        : <PageNotFound/>}
        </>
    )
}

export default Steps;