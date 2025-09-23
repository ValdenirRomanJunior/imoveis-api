import {HeaderContainer,HeaderWrapper,UserInfo,Hambuguer,MenuLogoWrapper,NavIcon,SideBarContainer, SidebarFooter,SideBarTop,BoxLinks} from './styles';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo-sem fundo.png';
import {Link, useNavigate} from 'react-router-dom';
import { VscComment } from "react-icons/vsc";
import { useEffect, useState } from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import {VscDashboard} from 'react-icons/vsc';
import {AiOutlineUser} from 'react-icons/ai';
import {IoIosArrowForward} from 'react-icons/io';
import {MdLogout} from 'react-icons/md'
import { getImageIfExist, refreshToken, UserDto } from '../../services/resources/user';
import {IoSettingsOutline} from 'react-icons/io5';
import { BiFilterAlt } from 'react-icons/bi';
import { NavLink } from "react-router-dom";
import React from 'react';
import { number } from '../../pages/Registration/masks';
import { MdDesignServices } from 'react-icons/md';
import { GrIntegration } from "react-icons/gr";
import { FiExternalLink } from 'react-icons/fi';

const Header = () =>{

    const navigate = useNavigate();
    const {user, getCurrentUser,refreshTokenUser} = useAuth();
    const [imageUser,setImageUser]= useState<string>("");

  

  useEffect( () =>  {
    refreshTokenUser();
},[])
  

    useEffect(() =>{
        getCurrentUser();
    },[])

    

    const initials= user?.slug?.substring(0,1) + user?.email?.substring(0,1) || '';
    
    const userPerfil= user?.perfis?.[0];
    
    const getUrl = async() =>{
     
         
      //  const data=  await getImageIfExist(user.id,userPerfil);
        
         ///   if(data){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
           //     setImageUser(data);
               
          //      return data;
           // }
         

    }

      useEffect(() => {
     
        getUrl()
       
        }, [user?.id]);
   

  
   
    const handleLogoff = () =>{
       localStorage.clear();

        navigate('/')
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [linksModal, setLinksModal] =useState(true);
    const showLinksModal = () => setLinksModal(!linksModal);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sidebar, setSidebar] =useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    let perfilTenant=user?.perfis ? Object.values(user.perfis).some(obj => obj === 'TENANT') : false;
    let perfilAdmin=user?.perfis ? Object.values(user.perfis).some(obj => obj === 'ADMIN') : false;

    const [domainInfo, setDomainInfo] = useState<any>(null);

      const getSubdomainUrl = (companySlug: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // Em desenvolvimento, usar parâmetro de query
      return `${window.location.origin}/?subdomain=${companySlug}`;
    } else {
      // Em produção, usar subdomínio
      return `https://${companySlug}.standi.com.br`;
    }
  };
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
               <a href='https://standi.com.br/' target="_blank"> <VscComment  fontSize={22} color="gray" className="message-icon"/></a>

                <UserInfo onClick={showLinksModal}>                           
                   <div className='user-image-wrapper'>
                       {imageUser !== '' && user?.email !== 'admin@outlook.com' ? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials}</p>}
                   </div>
                  
                    <BoxLinks  linksModal={linksModal} >
                        <div className='arrow'></div>
                        <Link to={'/account'}><p>Minha conta</p></Link>
                        <p onClick={handleLogoff}> <MdLogout className='logout-icon'/>Sair</p>
                    </BoxLinks>
                </UserInfo>
            </HeaderWrapper>
         
            <SideBarContainer sidebar={sidebar} className="sidebar-container" >

                <SideBarTop >
                    <NavIcon to="#" onClick={ (event) => event.preventDefault() }>
                        <IoIosArrowForward  className='icon-sidebar'/>
                        <div style={{ cursor: 'pointer', color: '#3b82f6',position: 'relative', top: '-2px', left: '46px'}}
                        >
                         {domainInfo?.subdomain || `${user?.slug || 'seu-slug'}.standi.com.br`}
                  <FiExternalLink  
                    style={{ cursor: 'pointer', color: '#3b82f6',position: 'relative', top: '-2px', left: '12px'}}
                    onClick={() => window.open(getSubdomainUrl(user?.slug || ''), '_blank')}
                  />
             </div>
             
                    </NavIcon>
                    
                </SideBarTop>
                {perfilTenant &&
                <>
            <NavIcon to="/dashboard">
            <VscDashboard className='icon-sidebar'/>
            <p className='description-icon' >Painel</p>
            </NavIcon>
   

            <NavIcon to="/properties" >
            <AiOutlineHome className='icon-sidebar'/>
            <p className='description-icon'>Imóveis</p>
            </NavIcon>

            <NavIcon to="/leads" >
            <AiOutlineUser className='icon-sidebar'/>
            <p className='description-icosn'>Leads</p>
            </NavIcon>

            <NavIcon to="/oportunidades">
            <div className='icon-wrapper-pulse'>
            <div className='pulse'>
            <BiFilterAlt className='icon-pulse'/>
            </div>
            </div>
            <p className='description-icon-op '>Oportunidades</p>
            </NavIcon>

            <NavIcon to="/temaEdit">
            <MdDesignServices className='icon-sidebar'/>
            <p className='description-icon'>Editor de Tema</p>
            </NavIcon>

              
            </>
    }
            {perfilAdmin &&
            <NavIcon to="/accounts" >
            <IoSettingsOutline className='icon-sidebar'/>
            <p className='description-icon'>Configurações</p>
            </NavIcon> 
        }

          <SidebarFooter className='footer-sidebar'>
            <p>Standi</p>
            <p>Termos de Uso</p>
            <p>Política de privacidade</p>
          </SidebarFooter>
        </SideBarContainer>
       
        </HeaderContainer>
        
    )

}
export default Header;