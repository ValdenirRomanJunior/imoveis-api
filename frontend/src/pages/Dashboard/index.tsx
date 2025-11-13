
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

import PageNotFoundDashboard from '../../components/PageNotFoundDashboard';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';
import { IoCloudUploadOutline, IoEyeOutline } from 'react-icons/io5';
import { RiDoorLockLine } from 'react-icons/ri';
import Funil from '../../components/Funnel';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import AdminStats from '../../components/AdminStats';
import { useSidebar } from '../../context/SidebarContext';
import TrialMessage from '../../components/TrialMessage';
import useSubscriptionStatus from '../../hooks/useSubscriptionStatus';
import TrialWarningBanner from '../../components/TrialWarningBanner';
import TrialExpiredModal from '../../components/TrialExpiredModal';
// Helper para testes de trial (apenas desenvolvimento)
import '../../utils/trialTestHelper';
import whatsapp from '../../assets/images/whatsapp.png'




const Dashboard = ()=>{
  
    const navigate = useNavigate();

    const [imageUser,setImageUser]= useState<string>("");
    const [totalProperties,setTotalProperties]= useState();
    const [publishedProperties,setPublishedProperties]= useState();
    const [totalLeads,setTotalLeads]= useState();
    const [errors,setErrors]= useState(false);
    const [errorMessage,setErrorMessage]= useState("");
    const [errorMessageTotalLeads,setErrorMessageTotalLeads]= useState("");
    
    const {user, getCurrentUser} = useAuth();
    const { sidebar, setSidebar } = useSidebar();
    const subscriptionStatus = useSubscriptionStatus();
    const trialDaysRemaining = subscriptionStatus.endDate 
      ? Math.max(0, Math.ceil((subscriptionStatus.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : 0;
    
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

    useEffect(() =>{
        
        getCurrentUser()
      
        if(user === null){
            setErrors(true)
        }
       
    },[])

  

   // const getUrl = async() =>{       
       // const data=  await getImageIfExist(user.id,user.perfis[0]);
       //     if(data){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
             //   setImageUser(data);
             //   return data;
         //   }
        
     // }  
    
      //useEffect(() => {  
      //  if(user.id !== '' && user.perfis[0] !== ''){
      //  getUrl()
     //   } 
      //  }, [user.id, user.perfis]);


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
 
              
    
          let perfilTenant=user?.perfis ? Object.values(user.perfis).some(obj => obj === 'TENANT') : false;
            let perfilAdmin=user?.perfis ? Object.values(user.perfis).some(obj => obj === 'ADMIN') : false;
     
    
    return(
        <>
        
        {subscriptionStatus.isExpired && !subscriptionStatus.isActive ? (
          <TrialExpiredModal onViewPlans={() => navigate('/plans')} />
        ) : (
        <div>
       
        <ErrorBoundary FallbackComponent={PageNotFoundDashboard}>
         {!errors ?    
        <DashboardBackground>
                 
        <Header />     
        <BarTop />

      <AdminStats isVisible={user?.perfis?.includes('ADMIN')} />
      
      {/* Banner de Aviso do Trial - Apenas durante o período ativo */}
      {subscriptionStatus.isTrialActive && !subscriptionStatus.isExpired && (
        <TrialWarningBanner 
          daysRemaining={trialDaysRemaining}
          onViewPlans={() => navigate('/plans')}
        />
      )}
      
        <p className='left-side-message-user welcome-message'>Olá, <strong>{user.slug}</strong>, o que temos pra hoje?</p>
        
        <TrialMessage />
        
       { perfilTenant ? 
        <BodyContainer>
        
                  
            <div className='left-side'>

           <div className='top-right-side'>               
                               
                  <div className='card-wrapper-top' style={{border: '1px solid #2fc900ff', background:'#00ff080e'}} >
                    <img src={whatsapp} alt='whatsapp' className='whatsapp-image' />
                    
                     <p style={{fontSize:'18px',fontWeight:'bold', width:'100%', textAlign:'center', color:'#155701ff'}}>Entre no grupo e coloque sua imobiliária no topo!</p>
                     <a href='https://chat.whatsapp.com/LsKPMsjAZTnEv9F2lQ3nxR' target='_blank' className='opportunities-link'> <button  className="button-top" style={{background: 'linear-gradient(135deg, rgba(1, 255, 5, 1), rgba(1, 139, 70, 1))', color: 'white', fontWeight:'bold'}}><IoEyeOutline className='eye-icon' style={{fontWeight:'bold'}} />Entrar no grupo</button> </a>
                 </div>
            </div>

       
            <div className='cards-left-side'>
            <p className='cards-left-side-title'>O que já temos com sua conta</p>  
                <div className='cards-wrapper'>          
             <div className='card-wrapper-left properties-card'>
                   <div className='card-lef-inside'>
                     <div className='title-card-left-wrapper'><div className='icon-card-left-wrapper'><AiOutlineHome className='icon-card-left first-card' /></div><p>Imóveis Cadastrados</p></div>

                     <span className='number-card-dashboard'>{totalProperties && totalProperties}</span>
                   </div>
                   </div>
                            <div className='card-wrapper-left leads-card'>
                            <div className='card-lef-inside'>
                                <div className='title-card-left-wrapper'><div className='icon-card-left-wrapper'><AiOutlineUser className='icon-card-left second-card'/></div><p className='second-title'>Leads</p></div>
                                <span className='number-card-dashboard'>{totalLeads && totalLeads}</span>
                            </div>
                            </div>
                          
                            <div className='card-wrapper-left published-properties'>
                    <div className='card-lef-inside'>
                        <div className='title-card-left-wrapper'><div className='icon-card-left-wrapper'><IoCloudUploadOutline className='icon-card-left'/></div><p>Imóveis Publicados</p></div>
                        <span className='number-card-dashboard'>{publishedProperties && publishedProperties}</span>
                    </div>
                    </div>
                   
                   
                </div>
                </div>

                  
            </div>



            <div className='right-side'>

            <div  className='card-right-bottom funnel-section'>    
                <h2 ><RiDoorLockLine className='icon-portais'/>Oportunidades</h2>
                <Funil/>              
            </div>
            

            <Card width='100%' height='100%' noShadow={true} border='1px solid #e6e9ed' borderRadius='2px'>
            <h2 className='title-perfil-card'><RiDoorLockLine className='icon-portais'/>Corretor</h2>
                <UserInfo>
                    <div className='user-image-wrapper-dashboard'>
                    {imageUser !== '' ? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{user ? user.slug.substring(0,1)+ user.email?.substring(0,1) as string: 'sem nome'}</p>}
                    </div>
                    <p className='name-perfil-dashboard'>{user.slug}</p>
                    <p className='name-perfil-dashboard'>{user.lastName}</p>
                    <p className='message-welcome-perfil'><BsBuilding className='builder-icon'/> Seja bem vindo!</p>
                </UserInfo>
                
            </Card>

      
         
            </div>
            
            {/* Componente de estatísticas administrativas */}
           
            
        </BodyContainer>
    : ''}

        </DashboardBackground> 
        : <PageNotFoundDashboard/>}  
        </ErrorBoundary>
      
        </div>
        )}
     
      </>
    )
}

export default Dashboard;
