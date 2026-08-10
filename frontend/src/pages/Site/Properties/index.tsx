import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSubdomain } from '../../../components/SubdomainRouter';
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
import corretorPadrao from '../assets/corretor-padrao.jpg';
import bannerPadrao from '../../../assets/images/bg-principal.png';

import DynamicSEO from '../../../components/DynamicSEO';
import DynamicFavicon from '../../../components/DynamicFavicon';

import PseudoSearch from '../PseudoSearch';

interface ThemeConfig {
  name: string;
  logo: string;
  logoSize: string;
  favicon?: string;
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
  agentName?: string;
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
  footerText?: string;
  privacyPolicy?: string;
  aboutUs?: string;
  tenantId?: number;
  bannerColor?: string;
  menuLinks?: any[];
  facebookPixel?: string;
  seoKeywords?: string;
  siteTitle?: string;
}



const Properties = ()=>{

    const navigate = useNavigate();
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const [goal,setGoal]= useState('');
    const [loading, setLoading] = useState(true);
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
    const clientSlug = subdomainCompanyName || companyName || '';

    useEffect(() => {
      if (clientSlug) {
        loadThemeConfig();
      }
    }, [clientSlug]);

    const loadThemeConfig = useCallback(async () => {
      try {
        // Verificar se existe configuração de preview no localStorage
        const previewData = localStorage.getItem(`theme-preview-${clientSlug}`);
        
        if (previewData) {
          try {
            const parsedPreview = JSON.parse(previewData);
            // Verificar se o preview não é muito antigo (5 minutos)
            const isRecentPreview = Date.now() - parsedPreview.timestamp < 5 * 60 * 1000;
            
            if (parsedPreview.isPreview && isRecentPreview) {
              console.log('Usando configuração de preview do localStorage');
              // Parse JSON strings do preview
              const previewConfig = {
                ...parsedPreview,
                menuLinks: typeof parsedPreview.menuLinks === 'string' ? JSON.parse(parsedPreview.menuLinks || '[]') : parsedPreview.menuLinks || [],
                services: typeof parsedPreview.services === 'string' ? JSON.parse(parsedPreview.services || '[]') : parsedPreview.services || [],
                socialLinks: typeof parsedPreview.socialLinks === 'string' ? JSON.parse(parsedPreview.socialLinks || '{}') : parsedPreview.socialLinks || {}
              };
              setThemeConfig(previewConfig);
              setLoading(false);
              return;
            } else {
              // Preview expirado, remover do localStorage
              localStorage.removeItem(`theme-preview-${clientSlug}`);
            }
          } catch (previewError) {
            console.error('Erro ao processar preview:', previewError);
            localStorage.removeItem(`theme-preview-${clientSlug}`);
          }
        }
    
        // Use clientSlug to get theme config
        const response = await api.get(`/api/themes/theme-config/${clientSlug}`);
        if (response.data && response.data.themeConfig) {
          setThemeConfig(response.data.themeConfig);
        }
      } catch (error) {
        console.error('Erro ao carregar configuração do tema:', error);
        // Fallback para configuração padrão se não encontrar
        setThemeConfig({
          name: 'Site Padrão',
          logo: '',
          logoSize: 'media',
          phone: '',
          bannerImage: bannerPadrao,
          bannerTitle: 'Para cada imóvel uma nova história se levanta',
          bannerTitleColor: '#ffffff',
          bannerTitleSize: 48,
          bannerColor: '#2563eb',
          services: [],
          contactTitle: 'Entre em contato',
          contactImage: '',
          agentPhoto: corretorPadrao,
          agentQuote: 'Estou aqui para ajudar você a encontrar o imóvel perfeito.',
          agentName: 'Corretor',
          footerLogo: '',
          socialLinks: {
            facebook: '',
            instagram: '',
            whatsapp: ''
          },
          footerText: 'Todos os direitos reservados.',
          footerBackgroundColor: '#1f2937',
          textColor: '#1f2937',
          buttonColor: '#ff6b35be',
          h2Color: '#1f2937',
          privacyPolicy: '',
          aboutUs: '',
          tenantId: 0
        });
      } finally {
        setLoading(false);
      }
    }, [clientSlug]);

    const getParamHeader = (goal:string) => {
      setGoal(goal);
     
    }

    // Criar tema dinâmico baseado no themeConfig
    const dynamicTheme = {
      colors: {
        primary: themeConfig.buttonColor || '#ff6b35be',
        primaryDark: themeConfig.buttonColor || '#ff6b35be',
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
        <DynamicSEO facebookPixelId={themeConfig.facebookPixel} keywords={themeConfig?.seoKeywords} title={themeConfig?.siteTitle} />
        <DynamicFavicon faviconUrl={themeConfig?.favicon} />
        {/* Header */}
        <Header>
          {(() => {
            const hostname = window.location.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            const slug = clientSlug || companyName || '';
            const homePath = isLocalhost ? `/site/${slug}` : '/';
            return (
              <NavLink href={homePath}>
                <Logo logoSize={themeConfig.logoSize}>
                  {themeConfig.logo ? (
                    <img 
                      src={themeConfig.logo} 
                      alt="Logo" 
                    />
                  ) : (
                    'ImóveisLogo'
                  )}
                </Logo>
              </NavLink>
            );
          })()}
          <Nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <a 
                href="#" 
                style={{ 
                  color: themeConfig.buttonColor || '#FF5317', 
                  border: `1px solid ${themeConfig.buttonColor || '#FF5317'}`,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
              >
                Área do cliente
              </a>
              <div className="header-divider" style={{ height: '35px', width: '1px', backgroundColor: '#eaeaea' }}></div>
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {mobileMenuOpen ? <HiX style={{ fontSize: '36px', color: themeConfig.buttonColor || '#FF5317' }} /> : <svg width="36" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21M3 12H17M3 18H21" stroke={themeConfig.buttonColor || "#FF5317"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
              </div>
            </div>
          </Nav>
          {mobileMenuOpen && (
            <MobileMenu>
              {(() => {
                const hostname = window.location.hostname;
                const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
                const slug = clientSlug || companyName || '';
                const propertiesPath = isLocalhost ? `/site/${slug}/imoveis/?goal=&type=&name=` : '/imoveis/?goal=&type=&name=';
                return (
                  <>
                    <NavLink href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Comprar imóvel</NavLink>
                    <NavLink href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Alugar imóvel</NavLink>
                  </>
                );
              })()}
              <NavLink href="#contato" onClick={() => setMobileMenuOpen(false)}>Lançamentos</NavLink>
              <NavLink href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</NavLink>
            </MobileMenu>
          )}
        </Header>
         
    <PropertiesBackground>
       <BodyPropertiesContainer>           
         <CardProperty goal={goal} themeConfig={themeConfig} />
       </BodyPropertiesContainer>
    </PropertiesBackground>
    <WhatsappButton whatsappNumber={themeConfig.phone} />  
    </div>
    </ThemeProvider>
   
    </ErrorBoundary>

    )

}

export default Properties;