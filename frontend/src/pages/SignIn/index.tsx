import React from "react";
import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import {Wrapper,Background,InputContainer,ButtonContainer} from './styles';
import Card  from "../../components/Card";
import background from '../../assets/images/bg-login.png';
import logo from '../../assets/images/logo-site.png';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import './modal.css';
import { sendNewPasswordForEmail } from "../../services/resources/tenant";
import Loading from "../../components/Loading";

import { refreshToken, UserDto } from "../../services/resources/user";
import LoadingLogin from "../../components/LoadingLogin";
import {BsArrowRepeat} from 'react-icons/bs'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
     
    },
  };

 type ErrorProp={
  fieldName?: string,
   message?: string;
 }

 

const SignIn = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError]=useState('');
    const [errorEmail, setErrorEmail]=useState<ErrorProp[]>([]);
    const [emailNewPassword,setEmailNewPassword]= useState('');
    const [emptyValue,setEmptyValue]= useState(false);
    const [emptyValuePassword,setEmptyValuePassword]= useState(false);

    const [loading,setLoading]=useState(false);
    const [loadingSendEmail,setLoadingSendEmail]=useState(false);
    const [loadingLogin,setLoadingLogin]=useState(false);
    const [verificationAccount,setVerificationAccount]= useState(true);
    

   // const {user, getCurrentUser} = useAuth();
    //useEffect(() =>{
      // se user voltar nulo ir para login
      //getCurrentUser();

  //},[])
  


 
    const navigate =useNavigate();
    const {userSignIn} = useAuth();

    //Handle Login

    const handleToSignIn = async() =>{
      setLoading(true) 
        

  
       
      let emptyValues=email === '';
      setEmptyValue(emptyValues);
      let emptyValuesPassword=password==='';
      setEmptyValuePassword(emptyValuesPassword);

      if(emptyValues && emptyValuesPassword) {
        setLoading(false)
      }
     
      if(!emptyValues && !emptyValuesPassword) {
        setTimeout(async () =>{

      
      
        const data ={
            email,
            password
        }

                             
       const response =  await userSignIn(data); 
       const initialsLogin= response.substring(0,3) as string;
       const initialsSecondPart= response.substring(3,13) as string;
        
          
          if (initialsLogin !== '200' && initialsSecondPart !== 'VERIFICADO') {         
            setError(response as any)
            setLoadingLogin(false)
            setLoading(false)
          }
          if (initialsLogin === '200' && initialsSecondPart !== 'VERIFICADO') {
            setLoadingLogin(false)
            setLoading(false)
            setVerificationAccount(false);
           
          }
                       
          if(initialsLogin === '200' && initialsSecondPart === 'VERIFICADO') {
         
            setLoading(false)
            setLoadingLogin(true)
            console.log('tenant')
    
          
          setTimeout(() =>{        
            navigate('/dashboard')
                     
        },2000) 
                 
        }

        else if(initialsLogin === '200' && initialsSecondPart === 'admin') {
          setVerificationAccount(true)
       
          setLoading(false)
          setLoadingLogin(true)
          console.log('admin')
          
          
        setTimeout(() =>{        
          navigate('/dashboard')
                   
      },2000) 
               
      }
    },2000)                              
    }   
    setEmail('');
    setPassword('');
    
  }
 
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
   
    }
  
    function closeModal() { 
     
      setIsOpen(false);
      setEmailNewPassword('');
      setErrorEmail([])
      setSuccessMessage(false)
      setLoadingSendEmail(false)
      setEmptyValue(false)
      
    }


    const [successMessage, setSuccessMessage] = React.useState(false); 

    const sendNewEmail = async(e:any) =>{ 
      
      let emptyValuesSendEmail=emailNewPassword === '';
      setEmptyValue(emptyValuesSendEmail); 

       e.preventDefault();
       if(emailNewPassword){
       setLoadingSendEmail(true)

     
     
        
        const emailDto= emailNewPassword;
          
        const response =  await sendNewPasswordForEmail(emailDto);
       
       
        try {
          if(response.response.data.errors !== null){         
            setErrorEmail(response.response.data.errors as ErrorProp[])

            setLoadingSendEmail(false)
            setSuccessMessage(false)
        }
        else{
          setLoadingSendEmail(false)
          setSuccessMessage(true);
          cleanForm()
         
         
        
        }
          
        } catch (response) {
          setLoadingSendEmail(false)       
          setSuccessMessage(true);
          cleanForm()
                     
        }
           
      }
      cleanForm()
    }

    const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{
             
      if(e.currentTarget.name  === 'email'){
      
       setError('');
      }

      if(e.currentTarget.name  === 'password'){
       
        setError('');
       }

       if(e.currentTarget.name  === 'emailNewPass'){
        setErrorEmail([])
        setError('');
       }

      

      
    }

    const cleanForm = ()=> {
      setEmailNewPassword('');
      
    }

  
    //refreshtoken
    
      const refreshTokenUser = async ()=>{
            const  resp = await refreshToken();    
            if(resp === 204){  
              navigate('/dashboard')
            }
        }

      useEffect( () =>  {
      refreshTokenUser()
    },[])
   

    return (
    <Wrapper>
        <Background image={background} />
        <Card width="403px" paddingTop="30px">
        <img src={logo} width={172} height={27}  alt="logo dynamous" />
        <InputContainer>
        
        {!verificationAccount && <p className="account-verification ">Por favor Verifique sua conta no seu email
        <span className="resend-verification"><BsArrowRepeat className="resend-icon"/>reenviar</span></p>}
        
        <Input placeholder="EMAIL" onKeyUp={handleKeyUp} name='email' value={email} onChange={e => setEmail(e.target.value)}/>
        { emptyValue && email === '' ? <span className='formField__error'>Por favor digite seu email</span>: ''}
        <Input placeholder="SENHA" onKeyUp={handleKeyUp} name='password' type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        { emptyValuePassword && password === '' ? <span className='formField__error'>Por favor digite sua senha</span>:''}
        <div className="message-backend">
       <p className="formField__error_backend" >{error && error}</p>
        </div>
        </InputContainer>
        { loadingLogin &&  <LoadingLogin/> }
        
          <ButtonContainer>
            
           { loading  ?  
           <Button type="button" className="button-login" onClick={handleToSignIn}><div className="loading-login-wrapper"><Loading/></div></Button>: ''}
            
           {!loading  && <Button type="button" onClick={handleToSignIn}>Entrar</Button>}
            <p className="messageToSignUp">Ainda não é cadastrado? <a href="https://dynamous.com.br" target="_blank" rel="noopener noreferrer">Cadastre-se já</a></p>
            
            
             
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className='Modal'
        
      >
        <IoCloseOutline onClick={closeModal}  className='button-close-modal' />
        <h1>Enviar nova senha por Email</h1>
         <form>
            <Input placeholder="Exemplo: joãocorretor@gmail.com" name='emailNewPass' value={emailNewPassword} id='emailNewPass'  onKeyUp={handleKeyUp} onChange={e => setEmailNewPassword(e.target.value)}/>
            <div className="button-send-email-wrapper">
            {
                loadingSendEmail ? <Button  onClick={sendNewEmail} className="button-send-email-loading"><div className="loading-sendemail-wrapper"><Loading /></div></Button>:''}

              {
                !loadingSendEmail &&                  
                <Button  onClick={sendNewEmail} className="button-send-email">Enviar</Button>}
            </div>
              <div className="message">
              { !loadingSendEmail && successMessage ===true   ? <span className='formField__error success'>Email enviado com sucesso!</span>: ''}
              {errorEmail && errorEmail ? <span className='formField__error'>{errorEmail.map(x => x.message)}</span>: ''}
              {emptyValue && emailNewPassword === '' ? <span className='formField__error'>Por favor digite seu e-mail</span>:''}
              </div>
            
            
         </form>
      </Modal>


      <p onClick={openModal} className="send-new-password">Esqueci a senha</p>
            
          
        </ButtonContainer>
        
       
        </Card>
       
    </Wrapper>

    )

}
export default SignIn;

function getCurrentUser() {
  throw new Error("Function not implemented.");
}
