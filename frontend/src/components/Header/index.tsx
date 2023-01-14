import {HeaderContainer,HeaderWrapper,UserInfo,Hambuguer,MenuLogoWrapper,NavIcon,SideBarContainer, SidebarFooter,SideBarTop} from './styles';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo-pontos.png';
import userImage from '../../assets/images/user-image.jpeg';
import {useNavigate} from 'react-router-dom';
import { VscComment } from "react-icons/vsc";
import { useEffect, useState } from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import {VscDashboard} from 'react-icons/vsc';
import {AiOutlineUser} from 'react-icons/ai';
import {RiPagesLine} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io';


const Header = () =>{

    const navigate = useNavigate();
    const {user, getCurrentUser} = useAuth();

    const initials= user.slug.substring(0,1)+ user.lastName.substring(0,1);

    useEffect(() =>{
        getCurrentUser();
    },[])

    if(!user){
        return null;
    }

   


    const handleLogoff = () =>{
        navigate('/')
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sidebar, setSidebar] =useState(false);
    const showSidebar = () => setSidebar(!sidebar);

   
    
   
    

    return(
        <HeaderContainer>
            <HeaderWrapper>
                <MenuLogoWrapper>
                <Hambuguer onClick={showSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Hambuguer>
                <img src={logo} className="logo"  alt='logo dynamous' />
                </MenuLogoWrapper>
                <UserInfo>
                    <VscComment fontSize={22} color="gray" className="message-icon"/>
                   
                    <div className='user-image-wrapper'>
                        <p className='initials'>{initials}</p>
                   </div>
                  
                </UserInfo>
            </HeaderWrapper>
         
            <SideBarContainer sidebar={sidebar} className="sidebar-container" >

                <SideBarTop >
                    <NavIcon to="#" >
                        <IoIosArrowForward  className='icon-sidebar'/>
                        <p className='text-sidebar-top'> Olá ,<span>Valdenir Roman Júnior</span></p>
                    </NavIcon>
                    
                </SideBarTop>
            <NavIcon to="/dashboard" >          
             <a href=''>https://corretor1.com.br</a>          
            </NavIcon>

            <NavIcon to="/dashboard" >
            <VscDashboard className='icon-sidebar'/>
            <p className='description-icon' >Painel</p>
            </NavIcon>

            <NavIcon to="/properties"  >
            <AiOutlineHome className='icon-sidebar'/>
            <p className='description-icon'>Imóveis</p>
            </NavIcon>

            <NavIcon to="/leads"   >
            <AiOutlineUser className='icon-sidebar'/>
            <p className='description-icon'>Contatos</p>
            </NavIcon>


          <SidebarFooter className='footer-sidebar'>
            <p>Dynamob</p>
            <p>Termos de Uso</p>
            <p>Política de privacidade</p>
          </SidebarFooter>
        </SideBarContainer>
       
        </HeaderContainer>
        
    )

}
export default Header;