
import {DashboardBackground,BodyContainer,UserInfo} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import rightSideImage from '../../assets/images/banner-right.png';
import BarTop from '../../components/Bartop';
import { useEffect, useState } from 'react';
import LoadingLogin from '../../components/LoadingLogin';
import {BsBuilding} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { UserDto, getImageIfExist, refreshToken } from '../../services/resources/user';
import { getPublishedPropertiesById, getTotalPropertiesById } from '../../services/resources/property';
import { getTotalLeadsById } from '../../services/resources/lead';

import PageNotFound from '../../components/PageNotFound';
import PageNotFoundDashboard from '../../components/PageNotFoundDashboard';
import { ErrorBoundary } from 'react-error-boundary';
import { Sign } from 'crypto';
import SignIn from '../SignIn';
import useAuth from '../../hooks/useAuth';


 

const Dashboard = ()=>{
  
    const navigate = useNavigate();


   // const {user, getCurrentUser} = useAuth();

    const [imageUser,setImageUser]= useState<string>("");
    const [totalProperties,setTotalProperties]= useState();
    const [publishedProperties,setPublishedProperties]= useState();
    const [totalLeads,setTotalLeads]= useState();
    const [errors,setErrors]= useState(false);
    const [errorMessage,setErrorMessage]= useState("");
    const [errorMessageTotalLeads,setErrorMessageTotalLeads]= useState("");
    
    const {user, getCurrentUser} = useAuth();
    useEffect(() =>{
        
        getCurrentUser()
      
        if(user === null){
            setErrors(true)
        }
       
    },[])

  
    const refreshTokenUser = async ()=>{
   
        const  resp = await refreshToken();    
        if(resp === 204){  
         navigate('/dashboard')
        }else{         
           navigate('/');
       
 }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])

    const initials= user.slug.substring(0,1)+ user.lastName?.substring(0,1) as string;
   
 

    const getUrl = async() =>{       
        const data=  await getImageIfExist(user.id,user.perfis[0]);
            if(data){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                setImageUser(data);
                return data;
            }
        
      }  
    
      useEffect(() => {  
        if(user.id !== '' && user.perfis[0] !== ''){
        getUrl()
        } 
        }, [user.id, user.perfis]);



        const getTotalProperties = async() =>{
                    
            const data=  await getTotalPropertiesById(user.id);                
                if(data.status === 200){
                   // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                    setTotalProperties(data.data);                   
                }
                if(data.response.data.status === 403){
                  setErrorMessage(data.response.data.error)                 
                 } 
                    
          }  

        useEffect(() => {  
             if(user.id !== ''){
            getTotalProperties();
             }
            }, [user.id]);


            const getTotalLeads = async() =>{
             
                const dataL=  await getTotalLeadsById(user.id);
               
                    if(dataL.status === 200){                   
                        setTotalLeads(dataL.data);                    
                    }
                    if(dataL.response.data.status === 403){
                        setErrorMessageTotalLeads(dataL.response.data.error)
                       }
                           
              }  
    
            useEffect(() => {  
                if(user.id !== ''){
                getTotalLeads();
                }
                }, [user.id]);
    

   
                const getPublishedProperties = async() =>{
                    const data=  await getPublishedPropertiesById(user.id);                
                        if(data.status === 200){
                           // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                            setPublishedProperties(data.data);                   
                        }
                        if(data.response.data.status === 403){
                          setErrorMessage(data.response.data.error)                 
                         }     
                  }  
        
                useEffect(() => {  
                    if(user.id !== ''){
                    getPublishedProperties();
                    } 
                    }, [user.id]);
 
              
    

    
    return(
        <>
        {user?.perfis?.[0] === 'TENANT' || user?.perfis?.[0] === 'ADMIN' ? 
          
        <div>
       
        <ErrorBoundary FallbackComponent={Dashboard}>
         {!errors ?    
        <DashboardBackground>
                 
        <Header />     
        <BarTop />
    
        
        <p className='left-side-message-user'>Olá, <strong>{user.slug}</strong>, o que temos pra hoje?</p>
        <BodyContainer>
       
                  
            <div className='left-side'>

           <div className='top-right-side'>               
              
                  <div className='card-wrapper-top'>             
                     <p>Ver todos os meus imóveis cadastrados</p>
                     <Link to='/properties'>  <Button style={{ background: "#009d43", borderRadius:"4px", marginBottom:"0"}} className="button-top">Ver agora meus imóveis</Button> </Link>
                 </div>
            </div>

       
            <div className='cards-left-side'>
            <p className='cards-left-side-title'>O que já temos com sua conta</p>  
                <div className='cards-wrapper'>          
             <div className='card-wrapper-left'>
                   <Card  width='100%' height='100%' noShadow={true}  borderRadius='2px'   background={false}>
                     <p>Imóveis Cadastrados</p>

                     <span className='number-card-dashboard'>{totalProperties && totalProperties}</span>
                   </Card>
                   </div>
                            <div className='card-wrapper-left'>
                            <Card width='100%' height='100%'  noShadow={true}  borderRadius='2px'  background={false} >
                                <p>Leads</p>
                                <span className='number-card-dashboard'>{totalLeads && totalLeads}</span>
                            </Card>
                            </div>
                          
                            <div className='card-wrapper-left'>
                    <Card width='100%' height='100%' noShadow={true}  borderRadius='2px'    background={false}>
                        <p>Imóveis Publicados</p>
                        <span className='number-card-dashboard'>{publishedProperties && publishedProperties}</span>
                    </Card>
                    </div>
                   
                   
                </div>
                </div>
            </div>


            <div className='right-side'>
            <Card width='100%' height='100%' noShadow={true} border='1px solid #e6e9ed' borderRadius='2px' >
                <UserInfo>
                    <div className='user-image-wrapper-dashboard'>
                    {imageUser !== '' ? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials ? initials: ''}</p>}
                    </div>
                    <p className='name-perfil-dashboard'>{user.slug}</p>
                    <p className='name-perfil-dashboard'>{user.lastName}</p>
                    <p className='message-welcome-perfil'><BsBuilding className='builder-icon'/> Seja bem vindo!</p>
                </UserInfo>
                
            </Card>

            <Card width='100%' height='auto' noShadow={true} margin='25px 0' border='1px solid #e6e9ed' paddingTop='0' borderRadius='2px'>    
               <img className='img-right' src={rightSideImage} />
                                          
            </Card>

            </div>
         
        </BodyContainer>
     
        </DashboardBackground> 
        : <Dashboard/>}  
        </ErrorBoundary>
      
        </div>
      : <PageNotFoundDashboard/>}
      </>
    )
}

export default Dashboard;