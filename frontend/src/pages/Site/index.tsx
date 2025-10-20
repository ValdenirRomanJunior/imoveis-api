import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSubdomain } from '../../components/SubdomainRouter';
import { phone } from "./masks";
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlinePhone, 
  AiOutlineKey, 
  AiOutlineCalculator,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineFileText,
  AiOutlineDollar,
  AiOutlineBank,
  AiOutlineShop,
  AiOutlineCar,
  AiOutlineGift
} from 'react-icons/ai';
import { 
  FaKey, 
  FaCalculator, 
  FaHandshake, 
  FaBuilding, 
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import { 
  HiHome, 
  HiKey, 
  HiCalculator, 
  HiHeart, 
  HiSearch, 
  HiDocumentText,
  HiMenu,
  HiX
} from 'react-icons/hi';
import { 
  MdRealEstateAgent, 
  MdAttachMoney, 
  MdBusiness, 
  MdLocationOn, 
  MdSecurity 
} from 'react-icons/md';
import {
  SiteContainer,
  Header,
  Logo,
  Nav,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  Banner,
  BannerContent,
  BannerTitle,
  Section,
  SectionTitle,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  ContactSection,
  ContactContent,
  ContactImage,
  ContactForm,
  ContactInput,
  ContactTextarea,
  ContactSubmitButton,
  AgentSection,
  AgentPhoto,
  AgentQuote,
  Footer,
  FooterLogo,
  SocialLinks,
  SocialLink,
  FooterText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  NavigationSection,
  NavigationLink
} from './styles';
import PseudoSearch from './PseudoSearch';
import WhatsappButton from './WhatsappButton';
import api from './utils/requests';
import corretorPadrao from './assets/corretor-padrao.jpg';
import bannerPadrao from '../../assets/images/bg-principal.png';
import FeaturedPropertyCard from './components/FeaturedPropertyCard';
import { getPropertiesHome } from './Services/property';
import houseimage from '../../assets/house-image.png';
import { newLeadHome } from './Services/lead';
import DynamicFavicon from '../../components/DynamicFavicon';
import DynamicSEO from '../../components/DynamicSEO';

interface Property {
  id: number;
  name: string;
  price: string;
  goal: string;
  numberRooms: string;
  bathRooms: string;
  area: string;
  address: {
    id: number;
    street: string;
    number: string;
    district: string;
    cep: string;
    city: {
      id: number;
      name: string;
      state: {
        id: number;
        name: string;
      };
    };
  };
  images: Array<{
    id: number;
    url: string;
    idTenant: number;
  }>;
}

interface MenuLink {
  label: string;
  url: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

interface ThemeConfig {
  id?: number;
  name: string;
  logo: string;
  logoSize: string;
  menuLinks: MenuLink[];
  phone: string;
  bannerImage: string;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerTitleSize: number;
  bannerColor: string;
  services: Service[];
  contactTitle: string;
  contactImage: string;
  agentPhoto: string;
  agentQuote: string;
  agentName: string;
  footerLogo: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  footerText: string;
  footerBackgroundColor: string;
  textColor: string;
  buttonColor: string;
  h2Color: string;
  favicon?: string;
  privacyPolicy: string;
  aboutUs: string;
  tenantId: number;
  facebookPixel?: string;
  seoKeywords?: string;
}

const Site: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const { companyName: subdomainCompanyName } = useSubdomain();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [clientSlug, setClientSlug] = useState<string | null>(null);
   const [url,setUrl]= useState((window.location.hostname));

       const [errorsLead, setErrorsLead] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
 
    const [emptyValue,setEmptyValue]= useState(false);
    const [successMessage, setSuccessMessage] = useState(false); 
    const [loadingAddLead, setLoadingAddLead]=useState(false);

              //lead service
  const [form,setForm]=useState<any>({
    name:'',
    email:'',
    phone:'',
    message:''
    
});
  // Set client slug from subdomain context or URL parameter
  useEffect(() => {
    const detectedSlug = subdomainCompanyName || companyName;
    if (detectedSlug) {
      setClientSlug(detectedSlug);
      console.log('Site - Using client slug:', detectedSlug, 'from', subdomainCompanyName ? 'subdomain' : 'URL params');
    }
  }, [subdomainCompanyName, companyName]);

  const loadThemeConfig = useCallback(async () => {
    try {
      // Extract accountId from clientSlug for preview lookup
      let previewKey = clientSlug;
      if (clientSlug) {
        // Extract accountId from clientSlug format: companyName-accountId
        const lastHyphenIndex = clientSlug.lastIndexOf('-');
        if (lastHyphenIndex !== -1 && lastHyphenIndex < clientSlug.length - 1) {
          const possibleId = clientSlug.substring(lastHyphenIndex + 1);
          if (possibleId.match(/^\d+$/)) {
            previewKey = possibleId; // Use accountId as preview key
          }
        }
      }
      
      // Verificar se existe configuração de preview no localStorage
      const previewData = localStorage.getItem(`theme-preview-${previewKey}`);
      
      if (previewData) {
        try {
          const parsedPreview = JSON.parse(previewData);
          // Verificar se o preview não é muito antigo (5 minutos)
          const isRecentPreview = Date.now() - parsedPreview.timestamp < 5 * 60 * 1000;
          
          if (parsedPreview.isPreview && isRecentPreview) {
            console.log('Usando configuração de preview do localStorage com key:', previewKey);
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
            localStorage.removeItem(`theme-preview-${previewKey}`);
          }
        } catch (previewError) {
          console.error('Erro ao processar preview:', previewError);
          localStorage.removeItem(`theme-preview-${previewKey}`);
        }
      }

      // Use clientSlug to get theme config
      const response = await api.get(`/api/themes/theme-config/${clientSlug}`);
      if (response.data && response.data.themeConfig) {
        console.log('Site - ThemeConfig carregado do backend:', response.data.themeConfig);
        console.log('Site - favicon do backend:', response.data.themeConfig.favicon);
        console.log('Site - socialLinks raw:', response.data.themeConfig.socialLinks);
        
        // Parse JSON strings from backend if needed
        const themeData = {
          ...response.data.themeConfig,
          menuLinks: typeof response.data.themeConfig.menuLinks === 'string' ? JSON.parse(response.data.themeConfig.menuLinks || '[]') : response.data.themeConfig.menuLinks || [],
          services: typeof response.data.themeConfig.services === 'string' ? JSON.parse(response.data.themeConfig.services || '[]') : response.data.themeConfig.services || [],
          socialLinks: typeof response.data.themeConfig.socialLinks === 'string' ? JSON.parse(response.data.themeConfig.socialLinks || '{}') : response.data.themeConfig.socialLinks || {}
        };
        
        console.log('Site - socialLinks após parsing:', themeData.socialLinks);
        console.log('Site - socialLinks.whatsapp final:', themeData.socialLinks?.whatsapp);
        console.log('Site - favicon final:', themeData.favicon);
        setThemeConfig(themeData);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração do tema:', error);
      // Fallback para configuração padrão se não encontrar
      setThemeConfig({
        name: 'Site Padrão',
        logo: '',
        logoSize: 'medium',
        menuLinks: [],
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
        buttonColor: '#2563eb',
        h2Color: '#1f2937',
        favicon: '', // Adicionar favicon no fallback
        privacyPolicy: '',
        aboutUs: '',
        tenantId: 0
      });
    } finally {
      setLoading(false);
    }
  }, [clientSlug]);

  const loadFeaturedProperties = useCallback(async () => {
    try {
      const response = await getPropertiesHome(clientSlug as string);
      if (response.data) {
        setFeaturedProperties(response.data.slice(0, 6)); // Mostrar apenas 6 propriedades
      }
    } catch (error) {
      console.error('Erro ao carregar propriedades em destaque:', error);
    }
  }, [clientSlug]);

  useEffect(() => {
    if (clientSlug) {
      loadThemeConfig();
      loadFeaturedProperties();
    }
  }, [clientSlug, loadThemeConfig, loadFeaturedProperties]);

  const handleSearch = () => {
    // Implementar busca de imóveis
    console.log('Buscar por:', searchTerm);
  };

  if (loading || !themeConfig) {
    return (
      <SiteContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Carregando...</p>
        </div>
      </SiteContainer>
    );
  }

  const menuLinks = themeConfig.menuLinks || [];
  // Garantir que sempre temos os 3 serviços padrão se não houver serviços configurados
  const defaultServices = [
    { icon: 'home', title: 'Venda de Imóveis', description: 'Encontre o imóvel perfeito para você', active: true },
    { icon: 'key', title: 'Locação', description: 'Alugue com segurança e praticidade', active: true },
    { icon: 'calculator', title: 'Financiamento', description: 'Facilitamos seu financiamento imobiliário', active: true }
  ];
  
  const services = (themeConfig.services && themeConfig.services.length > 0) ? themeConfig.services : defaultServices;
  const socialLinks = [
    { platform: 'facebook', url: themeConfig.socialLinks?.facebook || '#' },
    { platform: 'instagram', url: themeConfig.socialLinks?.instagram || '#' },
    { platform: 'whatsapp', url: themeConfig.socialLinks?.whatsapp || '#' }
  ];

  // Criar tema dinâmico baseado no themeConfig
  const dynamicTheme = {
    colors: {
      primary: themeConfig.textColor || '#2563eb',
      primaryDark: themeConfig.buttonColor || '#64748b',
      secondary: '#64748b',
      tertiary: '#f8fafc',
      background: '#ffffff',
      backgroundLight: '#f8fafc',
      backgroundGray: '#f3f4f6',
      red: '#ef4444',
      green: '#10b981',
      white: '#ffffff',
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

  type Error = {
    fieldName:string;
    message:string;
}






function handleChange(e: any): void {
    const field= e.target.getAttribute('name');
    const value= e.target.value
    setForm({ ...form,
        [field]:value,
    });

}

      const cleanForm = () =>{
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          ); 
          Array.from(document.querySelectorAll("textarea")).forEach(
            textarea => (textarea.value = "")
          ); 
        setForm({ ...form,
            name:'',
            email:'',
            phone:'',
            message:''
            
        });
        }
        
        const handleKeyUp = (e: React.FormEvent<HTMLInputElement | any>) =>{      
            if(e.currentTarget.name === 'phone'){  
               phone(e);
              
            }        
        
        }
     
       //submete fortmulario do lead
  const handleSubmitLead = async (e:any) =>{   
    e.preventDefault()
    
    let emptyValues=Object.values(form).some(obj => obj === '');
    setEmptyValue(emptyValues);
  
    
    if(!emptyValues){
    setLoadingAddLead(true);
    
    // Detectar se é subdomínio ou domínio personalizado
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    let identifier = '';
    
    if (isLocalhost) {
      // Em localhost, usar o clientSlug (que vem da URL /site/companyName)
      identifier = clientSlug || companyName || '';
    } else {
      // Em produção, verificar se é subdomínio do standi.com.br ou domínio personalizado
      const parts = hostname.split('.');
      
      if (parts.length >= 3 && parts.slice(1).join('.') === 'standi.com.br') {
        // É um subdomínio (ex: corretor1.standi.com.br)
        identifier = parts[0];
      } else {
        // É um domínio personalizado (ex: www.minhaImobiliaria.com.br)
        identifier = hostname;
      }
    }
       
     const data = await newLeadHome(form['name'],form['email'],form['phone'],form['message'], identifier); 
      if(data.status === 201){
        cleanForm()         
        setSuccessMessage(true)
        setTimeout(()=> {
            setSuccessMessage(false)
        },3000)
        setLoadingAddLead(false)
 
      }
        if(data.response.data.errors){              
            setErrorsLead(data.response.data.errors);
            setSuccessMessage(false)
            setLoadingAddLead(false)
                                                                           
        } 
        else if(data.response.status === 404 || data.response.status === 403 || data.response.status === 400){
               
            setOtherError(true)
            setSuccessMessage(false)
            setLoadingAddLead(false)
           
            setTimeout(()=>{
                setOtherError(false)
            },2000)
        }

    }                                               
}

  return (
    <ThemeProvider theme={dynamicTheme}>
      <DynamicFavicon faviconUrl={themeConfig?.favicon} />
      <DynamicSEO facebookPixelId={themeConfig?.facebookPixel} keywords={themeConfig?.seoKeywords} />
      <SiteContainer>
      {/* Bloco 1 - Header */}
      <Header>
         <NavLink href={`/site/${companyName}`}>  <Logo logoSize={themeConfig.logoSize}>
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
          <NavLink href={`tel:${themeConfig.phone}`}>{themeConfig.phone || '(85) 99999-9999'}</NavLink>
        </Nav>
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </MobileMenuButton>
        {mobileMenuOpen && (
          <MobileMenu>
            <NavLink href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</NavLink>
            <NavLink href={`/site/${companyName}/imoveis`} onClick={() => setMobileMenuOpen(false)}>Imóveis</NavLink>
            <NavLink href={`tel:${themeConfig.phone}`} onClick={() => setMobileMenuOpen(false)}>{themeConfig.phone}</NavLink>
          </MobileMenu>
        )}
      </Header>
      <WhatsappButton whatsappNumber={themeConfig?.phone} />

      {/* Bloco 2 - Banner */}
      <Banner id="inicio" bannerImage={themeConfig.bannerImage} defaultBanner={bannerPadrao}>
        <BannerContent>
          <BannerTitle titleColor={themeConfig.bannerTitleColor} titleSize={themeConfig.bannerTitleSize}>{themeConfig.bannerTitle || 'Encontre o imóvel dos seus sonhos'}</BannerTitle>
          <PseudoSearch/> 
        </BannerContent>
          
      </Banner>

      {/* Bloco 3 - Como podemos te ajudar */}
      <Section>
        <SectionTitle textColor={themeConfig.h2Color || themeConfig.textColor}>Como podemos te ajudar</SectionTitle>
        <ServicesGrid>
          {services.filter((service: any) => service.active !== false).map((service: any, index: number) => {
            // Mapeamento completo de ícones
            const getIconComponent = (iconName: string) => {
              const iconMap: { [key: string]: any } = {
                'home': AiOutlineHome,
                'user': AiOutlineUser,
                'phone': AiOutlinePhone,
                'key': AiOutlineKey,
                'calculator': AiOutlineCalculator,
                'heart': AiOutlineHeart,
                'search': AiOutlineSearch,
                'file': AiOutlineFileText,
                'dollar': AiOutlineDollar,
                'bank': AiOutlineBank,
                'shop': AiOutlineShop,
                'car': AiOutlineCar,
                'gift': AiOutlineGift,
                'fa-key': FaKey,
                'fa-calculator': FaCalculator,
                'fa-handshake': FaHandshake,
                'fa-building': FaBuilding,
                'fa-map': FaMapMarkerAlt,
                'hi-home': HiHome,
                'hi-key': HiKey,
                'hi-calculator': HiCalculator,
                'hi-heart': HiHeart,
                'hi-search': HiSearch,
                'hi-document': HiDocumentText,
                'md-agent': MdRealEstateAgent,
                'md-money': MdAttachMoney,
                'md-business': MdBusiness,
                'md-location': MdLocationOn,
                'md-security': MdSecurity
              };
              return iconMap[iconName] || AiOutlineHome;
            };
            
            const IconComponent = getIconComponent(service.icon);
            return (
              <ServiceCard key={index}>
                <ServiceIcon buttonColor={themeConfig.buttonColor}><IconComponent /></ServiceIcon>
                <ServiceTitle textColor={themeConfig.textColor}>{service.title}</ServiceTitle>
                <ServiceDescription textColor={themeConfig.textColor}>{service.description}</ServiceDescription>
              </ServiceCard>
            );
          })}
        </ServicesGrid>
      </Section>

      {/* Bloco 4 - Imóveis em destaque */}
      <Section id="imoveis">
        
      <SectionTitle textColor={themeConfig.h2Color || themeConfig.textColor}>Imóveis em destaque</SectionTitle>
      
          {clientSlug && <FeaturedPropertyCard url={clientSlug} properties={featuredProperties} buttonColor={themeConfig.buttonColor} />}
      </Section>

      {/* Bloco 5 - Contato */}
      <ContactSection id="contato">
        <ContactContent>
          <ContactImage>         
              <img src={houseimage} alt="Contato" style={{ width: '320px', height: '320px', objectFit:'cover' }} />      
          </ContactImage>
          <ContactForm onSubmit={(e) => handleSubmitLead(e)}>
            <h2 style={{color: themeConfig.h2Color || themeConfig.textColor}}>{themeConfig.contactTitle || 'Entre em Contato'}</h2>
            <ContactInput type="text" placeholder="Seu nome" id="name" name="name" onChange={(e) => handleChange(e)} maxLength={41} onKeyUp={handleKeyUp}/>
              {errorsLead.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error error-name'>{x.message}</p>})}
                    { emptyValue && form['name'] === '' ? <span className='formField__error error-name'>Este campo é requerido</span>: ''}
            <ContactInput type="email" placeholder="Seu email" id="email" name="email" onChange={(e) => handleChange(e)}  maxLength={40} onKeyUp={handleKeyUp}/>
               {errorsLead.map(x => { if(x.fieldName === 'email') return  <p className=' formField__error'>{x.message}</p>})}
                    { emptyValue && form['email'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}
            <ContactInput type="tel" placeholder="Seu telefone" id="phone" name="phone" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}/>
               {errorsLead.map(x => { if(x.fieldName === 'phone') return  <p className=' formField__error error-phone'>{x.message}</p>})}
                    { emptyValue && form['phone'] === '' ? <span className='formField__error error-phone'>Este campo é requerido</span>: ''}
                    { form['phone'].length >1 && form['phone'].length <14 &&  <span className='formField__error error-phone'>Formato de telefone errado</span>}
                
            <ContactTextarea placeholder="Sua mensagem" rows={4} id="message" name="message" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} />
                  {errorsLead.map(x => { if(x.fieldName === 'message') return  <p className=' formField__error textarea-class' textarea-class>{x.message}</p>})}
                    { emptyValue && form['message'] === '' ? <span className='formField__error textarea-class'>Este campo é requerido</span>: ''}
            <ContactSubmitButton buttonColor={themeConfig.buttonColor} type='submit'>Enviar mensagem</ContactSubmitButton>
          </ContactForm>
        </ContactContent>
      </ContactSection>

      {/* Bloco 6 - Agent */}
      <AgentSection>
        <AgentPhoto 
          src={themeConfig.agentPhoto || corretorPadrao} 
          alt="Corretor" 
        />
        <AgentQuote textColor={themeConfig.textColor}>
          "{themeConfig.agentQuote || "Aqui está a mensagem do corretor"}"
          <br /><strong>- {themeConfig.agentName || "João Silva"} </strong>
        </AgentQuote>
      </AgentSection>

      {/* Bloco 7 - Navegação */}
      <NavigationSection>
        <NavigationLink href="#" onClick={(e) => { e.preventDefault(); setPrivacyModalOpen(true); }}>Políticas de Privacidade</NavigationLink>
        <NavigationLink href="#" onClick={(e) => { e.preventDefault(); setAboutModalOpen(true); }}>Sobre Nós</NavigationLink>
      </NavigationSection>

      {/* Bloco 8 - Footer */}
      <Footer backgroundColor={themeConfig.footerBackgroundColor}>
        <FooterLogo>
          {themeConfig.footerLogo ? (
            <img src={themeConfig.footerLogo} alt="Logo" style={{ height: '32px' }} />
          ) : themeConfig.logo ? (
            <img src={themeConfig.logo} alt="Logo" style={{ height: '32px' }} />
          ) : (
            'ImóveisLogo'
          )}
        </FooterLogo>
        <SocialLinks>
          {socialLinks.map((social: any, index: number) => {
            const IconComponent = social.platform === 'facebook' ? FaFacebook : 
                               social.platform === 'instagram' ? FaInstagram : FaWhatsapp;
            return (
              <SocialLink key={index} href={social.url}>
                <IconComponent />
              </SocialLink>
            );
          })}
        </SocialLinks>
        <FooterText textColor={themeConfig.textColor}>
          {themeConfig.footerText}
        </FooterText>
      </Footer>

      {/* Modais */}
      {privacyModalOpen && (
        <ModalOverlay onClick={() => setPrivacyModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle textColor={themeConfig.textColor}>Políticas de Privacidade</ModalTitle>
              <ModalCloseButton textColor={themeConfig.textColor} onClick={() => setPrivacyModalOpen(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody textColor={themeConfig.textColor}>
              <p>{themeConfig.privacyPolicy || 'Conteúdo das políticas de privacidade não configurado.'}</p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {aboutModalOpen && (
        <ModalOverlay onClick={() => setAboutModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle textColor={themeConfig.textColor}>Sobre Nós</ModalTitle>
              <ModalCloseButton textColor={themeConfig.textColor} onClick={() => setAboutModalOpen(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody textColor={themeConfig.textColor}>
              <p>{themeConfig.aboutUs || 'Conteúdo sobre nós não configurado.'}</p>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
      </SiteContainer>
    </ThemeProvider>
  );
};

export default Site;