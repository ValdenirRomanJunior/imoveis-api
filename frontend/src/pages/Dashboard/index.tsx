
import {DashboardBackground,BodyContainer,UserInfo, SocialList} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import userImage from '../../assets/images/user-image.jpeg';
import rightSideImage from '../../assets/images/banner-right.png';
import {FaWhatsapp} from 'react-icons/fa';
import {BsFacebook} from 'react-icons/bs';
import {FiInstagram} from 'react-icons/fi';
import BarTop from '../../components/Bartop';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
 

const Dashboard = ()=>{

    const {user, getCurrentUser} = useAuth();

    const initials= user.slug.substring(0,1)+ user.lastName.substring(0,1);

    useEffect(() =>{
        getCurrentUser();
    },[])

    if(!user){
        return null;
    }

    
    return(
        <DashboardBackground>
        <Header />
        <BarTop />
       
        <p className='left-side-message-user'>Olá, <strong>Valdenir Roman Junior</strong> O que temos pra hoje?</p>
        <BodyContainer>
                  
            <div className='left-side'>

           <div className='top-right-side'>               
              
                  <div className='card-wrapper-top'>             
                      <p>Ver imoveis cadastrados no seu site</p>
                    <Button style={{ background: "#009d43", borderRadius:"4px", marginBottom:"0"}} className="button-top">Ver agora meus imóveis</Button>  
                 </div>
            </div>



            
            <div className='cards-left-side'>
            <p className='cards-left-side-title'>Desempenho nos ultimos 7 dias</p>  
                <div className='cards-wrapper'>          
             <div className='card-wrapper-left'>
                   <Card  width='100%' height='100%' noShadow={true}  borderRadius='2px'   background={false}>
                     <p>Contatos vindos do site</p>
                     <span className='number-card-dashboard'>2</span>
                   </Card>
                   </div>
                            <div className='card-wrapper-left'>
                            <Card width='100%' height='100%'  noShadow={true}  borderRadius='2px'  background={false} >
                                <p>Novos imóveis</p>
                                <span className='number-card-dashboard'>0</span>
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
                    <p className='initials'>{initials}</p>
                    </div>
                    <p>Valdenir Roman Junior</p>
                </UserInfo>
                <SocialList>
                    <li><a><FaWhatsapp /></a></li>
                    <li><a><BsFacebook /></a></li>
                    <li><a><FiInstagram /></a></li>
                </SocialList>
            </Card>

            <Card width='90%' height='auto' noShadow={true} margin='25px 0' border='1px solid #e6e9ed' paddingTop='0' borderRadius='2px'>    
               <img className='img-right' src={rightSideImage} />
                                          
            </Card>

            </div>
        </BodyContainer>
       
        </DashboardBackground>
            
        
    )
}

export default Dashboard;