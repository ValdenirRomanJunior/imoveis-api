import {HeaderContainer,HeaderWrapper,UserInfo,Hambuguer,MenuLogoWrapper,NavIcon,SideBarContainer, SidebarFooter,SideBarTop,BoxLinks} from './styles';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo-sem fundo.png';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { VscComment } from "react-icons/vsc";
import { useEffect, useState } from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import {VscDashboard} from 'react-icons/vsc';
import {AiOutlineUser, AiOutlineBook} from 'react-icons/ai';
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
import { NotificationDropdown } from '../NotificationDropdown';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import { useSidebar } from '../../context/SidebarContext';
import useSubscriptionStatus from '../../hooks/useSubscriptionStatus';
import { MdRocketLaunch } from 'react-icons/md';

const Header = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const {user, getCurrentUser,refreshTokenUser} = useAuth();
    const [imageUser,setImageUser]= useState<string>("");
    const subscriptionStatus = useSubscriptionStatus();

  

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
    const { sidebar, showSidebar, setSidebar } = useSidebar();

    // Fechar sidebar ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.querySelector('.sidebar-container');
            const hamburgerButton = document.querySelector('.hambuguer-button');
            
            if (sidebar && 
                sidebarElement && 
                !sidebarElement.contains(event.target as Node) &&
                hamburgerButton &&
                !hamburgerButton.contains(event.target as Node)) {
                setSidebar(false);
            }
        };

        if (sidebar) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebar, setSidebar]);

    let perfilTenant=user?.perfis ? Object.values(user.perfis).some(obj => 
        obj === 'TENANT' 
    ) : false;
    let perfilAdmin=user?.perfis ? Object.values(user.perfis).some(obj => 
        obj === 'ADMIN'
    ) : false;

    // Debug: verificar perfis do usuário
    console.log('Header - User perfis:', user?.perfis);
    console.log('Header - perfilAdmin:', perfilAdmin);
    console.log('Header - perfilTenant:', perfilTenant);

    const [domainInfo, setDomainInfo] = useState<any>(null);

    // Carregar informações de domínio do usuário (custom domain e subdomínio)
    useEffect(() => {
      const accountId = user?.account?.id || user?.accountId || user?.id;
      if (!accountId) return;
      (async () => {
        try {
          const response = await axios.get(`/api/domains/info/${accountId}`);
          if (response.data?.success) {
            setDomainInfo(response.data);
          }
        } catch (error) {
          console.error('Header - Erro ao carregar informações de domínio:', error);
        }
      })();
    }, [user?.account?.id, user?.accountId, user?.id]);

      const getSubdomainUrl = (companySlug: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const accountId = user?.accountId || user?.id || '';

    // Normaliza o slug para subdomínio: espaços -> hífen e remoção de inválidos
    const base = (companySlug || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$|/g, '');
    
    const subdomain = accountId ? `${base}-${accountId}` : base;
    
    if (isLocalhost) {
      // Em desenvolvimento, usar parâmetro de query
      return `${window.location.origin}/?subdomain=${subdomain}`;
    } else {
      // Em produção, usar subdomínio
      return `https://${subdomain}.standi.com.br`;
    }
  };
  
  const buildSubdomainHost = () => {
    const accountId = user?.accountId || user?.id || '';
    const base = (user?.slug || 'seu-slug')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$|/g, '');
    const subdomain = accountId ? `${base}-${accountId}` : base;
    return `${subdomain}.standi.com.br`;
  };
  
  const customDomainFromApi = domainInfo?.customDomain;
  const customDomainFromUser = user?.account?.customDomain;
  const subdomainLabel = domainInfo?.subdomain || buildSubdomainHost();

  const displayDomainLabel = (customDomainFromApi && customDomainFromApi.trim())
    ? customDomainFromApi.trim()
    : (customDomainFromUser && customDomainFromUser.trim())
      ? customDomainFromUser.trim()
      : subdomainLabel;
  
  const openDomainLink = () => {
    const custom = (customDomainFromApi && customDomainFromApi.trim())
      ? customDomainFromApi.trim()
      : (customDomainFromUser && customDomainFromUser.trim())
        ? customDomainFromUser.trim()
        : null;

    if (custom) {
      window.open(`https://${custom}`,'_blank');
    } else {
      window.open(getSubdomainUrl(user?.slug || ''), '_blank');
    }
  };

    return(
        <>
        <HeaderContainer>
            <HeaderWrapper>
                <MenuLogoWrapper>
                <Hambuguer onClick={showSidebar} className="hambuguer-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </Hambuguer>
                <img src={logo} className="logo"  alt='logo dynamous' />
                </MenuLogoWrapper>

                <a
                  href={`https://api.whatsapp.com/send?phone=45988348165`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-support-link"
                >
                  <span className="whatsapp-support-text">suporte</span>
                  <VscComment fontSize={22} color="gray" className="message-icon" />
                </a>
               
               {/* Sistema de notificações - apenas para Admin */}
               {perfilAdmin && <NotificationDropdown />}

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
                        <div className='domain-info' style={{ cursor: 'pointer', color: '#3b82f6',position: 'relative', top: '0px', left: '20px' , fontSize: '15px', display: 'flex'}}>
                          {displayDomainLabel}
                          <FiExternalLink  
                            style={{ cursor: 'pointer', color: '#3b82f6',position: 'relative', top: '2px', left: '12px'}}
                            onClick={openDomainLink}
                          />
                        </div>
             
                    </NavIcon>
                    
                </SideBarTop>
                {perfilTenant &&
                <>
            <NavIcon to="/dashboard" onClick={() => setSidebar(false)}>
            <VscDashboard className='icon-sidebar'/>
            <p className='description-icon' >Painel</p>
            </NavIcon>
   

            <NavIcon style={{display: 'none'}} to="/properties" onClick={() => setSidebar(false)}>
            <AiOutlineHome className='icon-sidebar'/>
            <p className='description-icon'>Imóveis</p>
            </NavIcon>

            <NavIcon to="/leads" onClick={() => setSidebar(false)}>
            <AiOutlineUser className='icon-sidebar'/>
            <p className='description-icosn'>Leads</p>
            </NavIcon>

            <NavIcon to="/oportunidades" onClick={() => setSidebar(false)}>
            <div className='icon-wrapper-pulse'>
            <div className='pulse'>
            <BiFilterAlt className='icon-pulse'/>
            </div>
            </div>
            <p className='description-icon-op '>Oportunidades</p>
            </NavIcon>

            <NavIcon  to="/temaEdit" onClick={() => setSidebar(false)}>
           <MdDesignServices className='icon-sidebar'/>
           <p className='description-icon'>Site principal</p>
            </NavIcon>

            <NavIcon to="/empreendimentos" onClick={() => setSidebar(false)}>
            <MdRocketLaunch className='icon-sidebar'/>
            <p className='description-icon'>Empreendimentos</p>
          </NavIcon>

              
            </>
    }
            {perfilAdmin &&
            <>
          
            
            <NavIcon to="/users" onClick={() => setSidebar(false)}>
            <AiOutlineUser className='icon-sidebar'/>
            <p className='description-icon'>Usuários</p>
            </NavIcon>

            <NavIcon to="/blog-admin" onClick={() => setSidebar(false)}>
            <AiOutlineBook className='icon-sidebar'/>
            <p className='description-icon'>Blog Admin</p>
            </NavIcon>

            <NavIcon to="/atendimento-standi" onClick={() => setSidebar(false)}>
            <MdSupportAgent className='icon-sidebar'/>
            <p className='description-icon'>Atendimento Standi</p>
            </NavIcon>
            </>
        }

          <SidebarFooter className='footer-sidebar'>
            <NavIcon to="/guide" style={{display: 'flex', alignItems: 'center'}} onClick={() => setSidebar(false)}>
              <FaQuestionCircle className='icon-sidebar'/>
              <p className='description-icon' style={{marginLeft: '5px'}}>Guia de Ajuda</p>
            </NavIcon>
        
          </SidebarFooter>
        </SideBarContainer>
       
        </HeaderContainer>
        
        </>
        )

}
export default Header;
