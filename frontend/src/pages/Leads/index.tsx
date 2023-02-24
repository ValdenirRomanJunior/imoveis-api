import BarTop from "../../components/Bartop";
import Header from "../../components/Header";
import LeadCard from "./LeadCard";
import { LeadsBackground, LeadsContainer } from "./styles";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "../Leads/ModalStyle.css";
import { BsPersonPlus } from "react-icons/bs";
import { currency, number, phone } from "../Registration/masks";
import { newLead } from "../../services/resources/lead";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { refreshToken } from "../../services/resources/user";
import LoadingLogin from "../../components/LoadingLogin";

type Error = {
    fieldName:string;
    message:string;
}

const Leads = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Error[]>([]);

    const [loadingLogin,setLoadingLogin]= useState(true);

    useEffect(() =>{
       
        setTimeout(() =>{
            setLoadingLogin(false)
        },1500)

    },[])

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/leads')
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
    const [param, setParam]= useState(false);
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

    
            
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{   
        e.preventDefault()
        
        let emptyValues=Object.values(form).some(obj => obj === '');
        setEmptyValue(emptyValues);
        

        if(!emptyValues){
        setLoadingAddLead(true)

              setTimeout(async() =>{
               
            const data = await newLead(form['name'],form['email'],form['phone'])
          if(data.status === 201){
            cleanForm()
            
            setSuccessMessage(true)
            setLoadingAddLead(false)

         
            
          }
            if(data.response.data.errors){              
                setErrors(data.response.data.errors);
                setSuccessMessage(false)
                setLoadingAddLead(false)
                                                                               
            }  
            
        },2000)   
                                             
        }      
                                             
    }


    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal =() => {
        setIsOpen(true)
    }

    const handleCloseModal =() =>{
        setParam(true);
        setIsOpen(false)

      
        
        setEmptyValue(false)
        setErrors([]);
        setSuccessMessage(false)

      
    }

    
    const customStyles = {
        content: {
            top: '350px',
            left:'50%',
            width: '90%',
            height: '60vh',
            transform:'translate(-50%,-50%)',
            
        
        }
    }

 


    return(
        <div>
        { loadingLogin &&  <LoadingLogin/> }
   { !loadingLogin ?  
        <LeadsBackground>
            <Header />
            <BarTop />
            <LeadsContainer>

            <div className="title-leads"><h2>Contatos</h2>
            <button className="button-add-lead" onClick={handleOpenModal}><BsPersonPlus className="icon-add-lead"/></button> 
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
                <div className="message">
                    {successMessage   ? <span className='success'>Lead salvo com sucesso!</span>: ''}
                    </div>
                  
            </Modal>
                   
            <LeadCard param={param as boolean}/>
            
            </LeadsContainer>
        </LeadsBackground>
        :''}
        </div>
    )


}

export default Leads;