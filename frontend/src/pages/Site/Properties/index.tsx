import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../../utils/requests';

import CardProperty from './CardProperty';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import {
  Header,
  Logo,
  Nav,
  NavLink,
  MobileMenuButton,
  MobileMenu
} from '../styles';

import { Link, useNavigate } from 'react-router-dom';
import {VscHome } from 'react-icons/vsc';
import {IoIosAdd} from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';

import {BiSearch} from 'react-icons/bi'
import Modal from 'react-modal';
//import LoadingPage from '../../components/LoadingPage';
import WhatsappButton from '../WhatsappButton';
import { ErrorBoundary } from 'react-error-boundary';
import PageNotFound from '../PageNotFound';

interface ThemeConfig {
  name: string;
  logo: string;
  logoSize: string;
  phone: string;
  bannerImage: string;
  bannerTitle: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  contactTitle: string;
  contactImage: string;
  agentPhoto: string;
  agentQuote: string;
  footerLogo: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  // Cores
  textColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  footerBackgroundColor?: string;
  bannerTitleColor?: string;
  bannerTitleSize?: number;
  h2Color?: string;
  h3Color?: string;
}



const Properties = ()=>{

    const navigate = useNavigate();
    const { companyName } = useParams<{ companyName: string }>();
    const [goal,setGoal]= useState('');
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
      name: '',
      logo: '',
      logoSize: 'media',
      phone: '',
      bannerImage: '',
      bannerTitle: '',
      services: [],
      contactTitle: '',
      contactImage: '',
      agentPhoto: '',
      agentQuote: '',
      footerLogo: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        whatsapp: ''
      }
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      if (companyName) {
        loadThemeConfig();
      }
    }, [companyName]);

    const loadThemeConfig = async () => {
      try {
        // Carregar configurações reais do tema da API usando companyName
        const response = await api.get(`/api/themes/account/${companyName}`);
        const data = response.data;
        
        // Parse JSON strings do backend
        const parsedData = {
          ...data,
          menuLinks: typeof data.menuLinks === 'string' ? JSON.parse(data.menuLinks || '[]') : data.menuLinks || [],
          services: typeof data.services === 'string' ? JSON.parse(data.services || '[]') : data.services || [],
          socialLinks: typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks || '{}') : data.socialLinks || {}
        };
        
        setThemeConfig(parsedData);
      } catch (error) {
        console.error('Error loading theme config:', error);
        // Fallback para configuração padrão em caso de erro
        const defaultConfig = {
          name: 'Imóveis',
          logo: '',
          logoSize: 'medium',
          phone: '',
          bannerImage: '',
          bannerTitle: 'Encontre seu imóvel ideal',
          textColor: '#333',
          buttonColor: '#007bff',
          services: [],
          contactTitle: 'Contato',
          contactImage: '',
          agentPhoto: '',
          agentQuote: '',
          footerLogo: '',
          socialLinks: {
            facebook: '',
            instagram: '',
            whatsapp: ''
          }
        };
        setThemeConfig(defaultConfig);
      }
    };

    const getParamHeader = (goal:string) => {
      setGoal(goal);
     
    }

    // Criar tema dinâmico baseado no themeConfig
    const dynamicTheme = {
      colors: {
        primary: themeConfig.buttonColor || '#2563eb',
        primaryDark: themeConfig.buttonColor || '#1d4ed8',
        secondary: themeConfig.secondaryColor || '#64748b',
        tertiary: '#f8fafc',
        background: themeConfig.backgroundColor || '#ffffff',
        backgroundLight: '#f8fafc',
        backgroundGray: '#f3f4f6',
        red: '#ef4444',
        green: '#10b981',
        white: '#ffffff',
        text: themeConfig.textColor || '#333333',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      }
    };
 
    const ErrorHandler = () => {
      return <PageNotFound/>;
    }
    return( 
     
      <ErrorBoundary FallbackComponent={ErrorHandler}>
      <ThemeProvider theme={dynamicTheme}>
      <div>
        {/* Header */}
        <Header>
         <NavLink href={`/site/${companyName}`}> <Logo logoSize={themeConfig.logoSize}>
            {themeConfig.logo ? (
              <img 
                src={themeConfig.logo} 
                alt="Logo" 
              />
            ) : (
              'ImóveisLogo'
            )}
          </Logo></NavLink> 
          <Nav>
            <NavLink href={`/site/${companyName}`}>Início</NavLink>
            <NavLink href={`/site/${companyName}/imoveis/?goal=&type=&name=`}>Imóveis</NavLink>
            <NavLink href={`tel:${themeConfig.phone}`}>{themeConfig.phone}</NavLink>
          </Nav>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </MobileMenuButton>
          {mobileMenuOpen && (
            <MobileMenu>
              <NavLink href={`/site/${companyName}`} onClick={() => setMobileMenuOpen(false)}>Início</NavLink>
              <NavLink href={`/site/${companyName}/imoveis`} onClick={() => setMobileMenuOpen(false)}>Imóveis</NavLink>
              <NavLink href={`tel:${themeConfig.phone}`} onClick={() => setMobileMenuOpen(false)}>{themeConfig.phone}</NavLink>
            </MobileMenu>
          )}
        </Header>
         
    <PropertiesBackground>
         
       <BodyPropertiesContainer>           
        <CardProperty goal={goal}/>
       </BodyPropertiesContainer>
    </PropertiesBackground>
    <WhatsappButton/>  
    </div>
    </ThemeProvider>
   
    </ErrorBoundary>

    )

}

export default Properties;