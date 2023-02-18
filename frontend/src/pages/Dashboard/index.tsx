
import {DashboardBackground,BodyContainer,UserInfo} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import rightSideImage from '../../assets/images/banner-right.png';
import BarTop from '../../components/Bartop';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import LoadingLogin from '../../components/LoadingLogin';
import {BsBuilding} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { getImageIfExist, refreshToken } from '../../services/resources/user';
import { getTotalPropertiesById } from '../../services/resources/property';
import { getTotalLeadsById } from '../../services/resources/lead';
 

const Dashboard = ()=>{
  
    const navigate = useNavigate();

    const [loadingLogin,setLoadingLogin]= useState(true);

    const {user, getCurrentUser} = useAuth();
    const [imageUser,setImageUser]= useState<string>("");
    const [totalProperties,setTotalProperties]= useState();
    const [totalLeads,setTotalLeads]= useState();

    useEffect(() =>{
        getCurrentUser();

    },[])


    const userPerfil= user.perfis[0];

    
    const getUrl = async() =>{       
        const data=  await getImageIfExist(user.id,userPerfil);
            if(data){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                setImageUser(data);
                return data;
            }
        
      }  
    
      useEffect(() => {  
        getUrl()
         
        }, [user.id]);



        const getTotalProperties = async() =>{
            const data=  await getTotalPropertiesById(user.id);
                if(data !=null){
                   // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                    setTotalProperties(data);
                    return data
                }
            
        
          }  

        useEffect(() => {  
            getCurrentUser();
            getTotalProperties();
             
            }, [user.id]);


            const getTotalLeads = async() =>{
                const data=  await getTotalLeadsById(user.id);
                    if(data !=null){
                       // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                        setTotalLeads(data);
                        return data
                    }
                
            
              }  
    
            useEffect(() => {  
                getTotalLeads();
                 
                }, [user.id]);
    
    useEffect(() =>{
       
        setTimeout(() =>{
            setLoadingLogin(false)
        },2000)

    },[])
   

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/dashboard')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])
 

    const initials= user.slug.substring(0,1)+ user.lastName.substring(0,1);
    return(

        <div>
             { loadingLogin &&  <LoadingLogin/> }
        { !loadingLogin ?  
        <DashboardBackground>
                 
        <Header />     
        <BarTop />
    
        
        <p className='left-side-message-user'>Olá, <strong>Valdenir Roman Junior</strong> O que temos pra hoje?</p>
        <BodyContainer>
       
                  
            <div className='left-side'>

           <div className='top-right-side'>               
              
                  <div className='card-wrapper-top'>             
                     <p>Ver imoveis cadastrados no seu site</p>
                     <Link to='/properties'>  <Button style={{ background: "#009d43", borderRadius:"4px", marginBottom:"0"}} className="button-top">Ver agora meus imóveis</Button> </Link>
                 </div>
            </div>

       
            <div className='cards-left-side'>
            <p className='cards-left-side-title'>O que já temos com sua conta</p>  
                <div className='cards-wrapper'>          
             <div className='card-wrapper-left'>
                   <Card  width='100%' height='100%' noShadow={true}  borderRadius='2px'   background={false}>
                     <p>Imóveis Cadastrados</p>
                     <span className='number-card-dashboard'>{totalProperties}</span>
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
                        <p>Visitas no site</p>
                        <span className='number-card-dashboard'>1</span>
                    </Card>
                    </div>
                   
                   
                </div>
                </div>
            </div>


            <div className='right-side'>
            <Card width='100%' height='100%' noShadow={true} border='1px solid #e6e9ed' borderRadius='2px' >
                <UserInfo>
                    <div className='user-image-wrapper-dashboard'>
                    {imageUser !== '' ? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials && initials}</p>}
                    </div>
                    <p className='name-perfil-dashboard'>Valdenir Roman Junior</p>
                    <p className='message-welcome-perfil'><BsBuilding className='builder-icon'/> Seja bem vindo!</p>
                </UserInfo>
                
            </Card>

            <Card width='90%' height='auto' noShadow={true} margin='25px 0' border='1px solid #e6e9ed' paddingTop='0' borderRadius='2px'>    
               <img className='img-right' src={rightSideImage} />
                                          
            </Card>

            </div>
         
        </BodyContainer>
     
        </DashboardBackground>
        : ''}
        </div>
        
    )
}

export default Dashboard;