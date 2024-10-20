import BarTop from "../../components/Bartop";
import Header from "../../components/Header";
//import LeadCard from "./LeadCard";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "../Leads/ModalStyle.css";
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
        if(e.currentTarget.name === 'phone'){  
            phone(e)         
        }    
       setErrors([])
    }

            
    const handleSubmit = async (e:any) =>{   
        e.preventDefault()    
        let emptyValues=Object.values(form).some(obj => obj === '');
        setEmptyValue(emptyValues);
        if(!emptyValues){
        setLoadingAddLead(true)
    
            const data = await newLead(form['name'],form['email'],form['phone'])
          if(data.status === 201){
            cleanForm()         
            setSuccessMessage(true)
            setLoadingAddLead(false)
            setParam("getLeads")
            setParam('');  
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

        }      
                                             
    }




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
    
    return(
        <>
        {user?.perfis?.[0] === 'TENANT'  ? 
        <ErrorBoundary FallbackComponent={ErrorHandler}>

        <div>
        
        
        <OportunidadesBackground>

            <Header />
            <BarTop />
            <OportunidadesContainer>
        
            <div className="title-leads"><BiBorderRadius className="icon-title-lead"/><h2>Oportunidades</h2>
            <button className="button-add-lead" onClick={handleOpenModal}><BsPersonPlus className="icon-add-lead"/></button>
            <Link to={`/steps`} ><BsFillGearFill className="icon-step-config"/></Link>
            </div>
            
                 
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}    
                className='Modall'
                            
              >
                <h2>Adicionar Contato</h2>
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' />

                <form  onSubmit={(e)=> {handleSubmit(e)}}>

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