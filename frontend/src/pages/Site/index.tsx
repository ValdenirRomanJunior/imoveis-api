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
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedinIn,
  FaPaperPlane,
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
  BannerButton,
  BannerIndicators,
  Dot,
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
  NavigationLink,
  UnifiedContactSection,
  UnifiedContactContainer,
  InfoColumn,
  ProfileBlock,
  ProfileText,
  ContactDetailsGrid,
  DetailItem,
  SocialRow,
  FormColumn,
  FormField,
  SubmitBtn,
  MapColumn,
  WhyChooseSection,
  WhyChooseContainer,
  WhyChooseLeft,
  WhyChooseImageWrapper,
  ReviewCard,
  Stars,
  ReviewText,
  ReviewAuthor,
  WhyChooseRight,
  WhyChooseTitle,
  FeatureList,
  FeatureItem,
  FeatureNumber,
  FeatureTextContent,
  FeatureTitle,
  FeatureDesc,
  AnnounceSection,
  AnnounceBackground,
  AnnounceImageWrapper,
  AnnounceContent,
  AnnounceTitle,
  AnnounceSubtitle,
  AnnounceFormRow,
  AnnounceButtonRow
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
  email?: string;
  address?: string;
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
  siteTitle?: string;
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
  const [currentSlide, setCurrentSlide] = useState(0);
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
    let identifierCompanyName = '';
    let domainValue = '';
    
    if (isLocalhost) {
      // Em localhost, usar o clientSlug (que vem da URL /site/companyName)
      identifierCompanyName = clientSlug || companyName || '';
    } else {
      // Em produção, verificar se é subdomínio do standi.com.br ou domínio personalizado
      const parts = hostname.split('.');
      
      if (parts.length >= 3 && parts.slice(1).join('.') === 'standi.com.br') {
        // É um subdomínio (ex: corretor1.standi.com.br)
        identifierCompanyName = parts[0];
      } else {
        // É um domínio personalizado (ex: www.minhaImobiliaria.com.br)
        domainValue = hostname;
      }
    }
       
     // Remover sufixo numérico do slug (ex: "minha-imobiliaria-42" -> "minha-imobiliaria")
     const stripIdSuffix = (val: string) => val ? val.replace(/-\d+$/, '') : '';
     identifierCompanyName = stripIdSuffix(identifierCompanyName);
        
      const data = await newLeadHome(form['name'],form['email'],form['phone'],form['message'], identifierCompanyName, domainValue); 
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
      <DynamicSEO facebookPixelId={themeConfig?.facebookPixel} keywords={themeConfig?.seoKeywords} title={themeConfig?.siteTitle} />
      
      {/* Bloco 1 - Header (Agora Fora do SiteContainer e acima da imagem) */}
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
          {(() => {
            const hostname = window.location.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            const slug = clientSlug || companyName || '';
            const homePath = isLocalhost ? `/site/${slug}` : '/';
            return <NavLink href={homePath}>Início</NavLink>;
          })()}
          {(() => {
            const hostname = window.location.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            const slug = clientSlug || companyName || '';
            const propertiesPath = isLocalhost ? `/site/${slug}/imoveis/?goal=&type=&name=` : '/imoveis/?goal=&type=&name=';
            return <NavLink href={propertiesPath}>Property</NavLink>;
          })()}
          <NavLink href={`tel:${themeConfig.phone}`}>Agent</NavLink>
          <a href="#contato" style={{ background: '#111', color: '#fff', padding: '10px 24px', borderRadius: '30px', textDecoration: 'none', fontWeight: 500, fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Contact Us</a>
        </Nav>
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </MobileMenuButton>
        {mobileMenuOpen && (
          <MobileMenu>
            {(() => {
              const hostname = window.location.hostname;
              const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
              const slug = clientSlug || companyName || '';
              const homePath = isLocalhost ? `/site/${slug}` : '/';
              return <NavLink href={homePath} onClick={() => setMobileMenuOpen(false)}>Início</NavLink>;
            })()}
            {(() => {
              const hostname = window.location.hostname;
              const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
              const slug = clientSlug || companyName || '';
              const propertiesPath = isLocalhost ? `/site/${slug}/imoveis/?goal=&type=&name=` : '/imoveis/?goal=&type=&name=';
              return <NavLink href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Imóveis</NavLink>;
            })()}
            <NavLink href={`tel:${themeConfig.phone}`} onClick={() => setMobileMenuOpen(false)}>{themeConfig.phone}</NavLink>
          </MobileMenu>
        )}
      </Header>

      <SiteContainer>
      <WhatsappButton whatsappNumber={themeConfig?.phone} />

      {/* Bloco 2 - Banner */}
      {(() => {
        const mockSlides = [
          {
            image: themeConfig.bannerImage || bannerPadrao,
            title: themeConfig.bannerTitle || 'Apartamento espetacular no batel',
            link: '#'
          },
          {
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            title: 'Casa luxuosa com piscina',
            link: '#'
          },
          {
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            title: 'Cobertura duplex no centro',
            link: '#'
          }
        ];

        const activeSlide = mockSlides[currentSlide];

        return (
          <Banner id="inicio" bannerImage={activeSlide.image} defaultBanner={bannerPadrao}>
            <BannerContent>
              <BannerTitle titleColor={themeConfig.bannerTitleColor} titleSize={themeConfig.bannerTitleSize}>
                {activeSlide.title}
              </BannerTitle>
              <BannerButton href={activeSlide.link}>Saiba mais</BannerButton>
              <BannerIndicators>
                {mockSlides.map((_, index) => (
                  <Dot 
                    key={index} 
                    active={index === currentSlide} 
                    onClick={() => setCurrentSlide(index)} 
                  />
                ))}
              </BannerIndicators>
              <PseudoSearch/> 
            </BannerContent>
          </Banner>
        );
      })()}

      {/* Bloco 4 - Imóveis em destaque */}
      <Section id="imoveis">
        
      <SectionTitle textColor={'#888'}>Imóveis com alta procura</SectionTitle>
      
          {clientSlug && <FeaturedPropertyCard url={clientSlug} properties={featuredProperties} buttonColor={themeConfig.buttonColor} />}
      </Section>

      {/* Bloco Novo - Anuncie seu imóvel */}
      <AnnounceSection>
        <AnnounceBackground>
          <AnnounceImageWrapper>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Especialista" />
          </AnnounceImageWrapper>
          <AnnounceContent>
            <AnnounceTitle>Anuncie seu imóvel</AnnounceTitle>
            <AnnounceSubtitle>
              Escolha a imobiliária especialista no mercado há mais de 70 anos e tenha a maior segurança e rentabilidade do mercado.
            </AnnounceSubtitle>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Solicitação enviada!'); }}>
              <AnnounceFormRow>
                <input type="text" placeholder="Seu nome:" required />
                <input type="tel" placeholder="Seu telefone:" required />
                <input type="email" placeholder="Seu e-mail:" required />
              </AnnounceFormRow>
              <AnnounceButtonRow>
                <div className="dots-blue"></div>
                <button type="submit">
                  Solicitar Contato &rarr;
                </button>
                <div className="dots-green"></div>
              </AnnounceButtonRow>
            </form>
          </AnnounceContent>
        </AnnounceBackground>
      </AnnounceSection>

      {/* Bloco 5 - Lançamentos */}
      <Section id="lancamentos" style={{ paddingTop: '2rem' }}>
        <SectionTitle textColor={'#888'}>Lançamentos</SectionTitle>
        {clientSlug && <FeaturedPropertyCard url={clientSlug} properties={featuredProperties} buttonColor={themeConfig.buttonColor} isLancamento={true} />}
      </Section>

      {/* Bloco 7 - Navegação */}
      <NavigationSection>
        <NavigationLink href="#" onClick={(e) => { e.preventDefault(); setPrivacyModalOpen(true); }}>Políticas de Privacidade</NavigationLink>
        <NavigationLink href="#" onClick={(e) => { e.preventDefault(); setAboutModalOpen(true); }}>Sobre Nós</NavigationLink>
      </NavigationSection>

      {/* Bloco Novo - Why Choose Us */}
      <WhyChooseSection>
        <WhyChooseContainer>
          <WhyChooseLeft>
            <WhyChooseImageWrapper>
              <img src={houseimage} alt="Interior moderno" />
              <ReviewCard>
                <Stars>★★★★★</Stars>
                <ReviewText>"Best agency we've ever worked with."</ReviewText>
                <ReviewAuthor>- The Andersons</ReviewAuthor>
              </ReviewCard>
            </WhyChooseImageWrapper>
          </WhyChooseLeft>
          <WhyChooseRight>
            <WhyChooseTitle>Why Choose EstateHorizon?</WhyChooseTitle>
            <FeatureList>
              <FeatureItem>
                <FeatureNumber>1</FeatureNumber>
                <FeatureTextContent>
                  <FeatureTitle>Wide Ranging Properties</FeatureTitle>
                  <FeatureDesc>From cozy condos to luxury villas, we have something for every lifestyle.</FeatureDesc>
                </FeatureTextContent>
              </FeatureItem>
              <FeatureItem>
                <FeatureNumber>2</FeatureNumber>
                <FeatureTextContent>
                  <FeatureTitle>Trusted Agents</FeatureTitle>
                  <FeatureDesc>Our team of professionals is dedicated to finding you the best deal.</FeatureDesc>
                </FeatureTextContent>
              </FeatureItem>
              <FeatureItem>
                <FeatureNumber>3</FeatureNumber>
                <FeatureTextContent>
                  <FeatureTitle>Transparent Process</FeatureTitle>
                  <FeatureDesc>No hidden fees or surprises. We guide you through every step.</FeatureDesc>
                </FeatureTextContent>
              </FeatureItem>
            </FeatureList>
          </WhyChooseRight>
        </WhyChooseContainer>
      </WhyChooseSection>

      {/* Bloco Novo - Contato Unificado (Info, Form, Mapa) */}
      <UnifiedContactSection id="contato">
        <UnifiedContactContainer>
          
          {/* Coluna 1: Info */}
          <InfoColumn>
            <ProfileBlock>
              <img src={themeConfig.agentPhoto || corretorPadrao} alt="Corretor" />
              <ProfileText>
                <h3>Fale conosco</h3>
                <p>Estamos aqui para ajudar. Envie sua mensagem e retornaremos o mais breve possível.</p>
              </ProfileText>
            </ProfileBlock>

            <ContactDetailsGrid>
              <DetailItem>
                <div className="icon-box"><FaEnvelope /></div>
                <div className="text-box">
                  <strong>E-mail</strong>
                  <span>{themeConfig.email || 'contato@empresa.com.br'}</span>
                </div>
              </DetailItem>
              <DetailItem>
                <div className="icon-box"><FaPhoneAlt /></div>
                <div className="text-box">
                  <strong>Telefone</strong>
                  <span>{themeConfig.phone || '(11) 98765-4321'}</span>
                </div>
              </DetailItem>
              <DetailItem>
                <div className="icon-box"><FaMapMarkerAlt /></div>
                <div className="text-box">
                  <strong>Endereço</strong>
                  <span>{themeConfig.address || 'Av. Paulista, 1100\nSão Paulo, SP - 01310-100'}</span>
                </div>
              </DetailItem>
            </ContactDetailsGrid>

            <SocialRow>
              <strong>Siga-nos</strong>
              <div className="icons">
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebook /></a>
              </div>
            </SocialRow>
          </InfoColumn>

          {/* Coluna 2: Formulário */}
          <FormColumn onSubmit={(e: any) => handleSubmitLead(e)}>
            <FormField>
              <label>Nome</label>
              <input type="text" placeholder="Digite seu nome" id="name" name="name" onChange={(e: any) => handleChange(e)} maxLength={41} onKeyUp={(e: any) => handleKeyUp(e)} />
              {errorsLead.map((x, i) => x.fieldName === 'name' && <p key={i} className='formField__error error-name'>{x.message}</p>)}
              {emptyValue && form['name'] === '' && <span className='formField__error error-name'>Este campo é requerido</span>}
            </FormField>

            <FormField>
              <label>E-mail</label>
              <input type="email" placeholder="Digite seu e-mail" id="email" name="email" onChange={(e: any) => handleChange(e)} maxLength={40} onKeyUp={(e: any) => handleKeyUp(e)} />
              {errorsLead.map((x, i) => x.fieldName === 'email' && <p key={i} className='formField__error'>{x.message}</p>)}
              {emptyValue && form['email'] === '' && <span className='formField__error'>Este campo é requerido</span>}
            </FormField>

            <FormField>
              <label>Telefone</label>
              <input type="tel" placeholder="Digite seu telefone" id="phone" name="phone" onChange={(e: any) => handleChange(e)} onKeyUp={(e: any) => handleKeyUp(e)} />
              {errorsLead.map((x, i) => x.fieldName === 'phone' && <p key={i} className='formField__error error-phone'>{x.message}</p>)}
              {emptyValue && form['phone'] === '' && <span className='formField__error error-phone'>Este campo é requerido</span>}
            </FormField>

            <FormField>
              <label>Mensagem</label>
              <textarea placeholder="Como podemos ajudar?" rows={3} id="message" name="message" onChange={(e: any) => handleChange(e)} onKeyUp={(e: any) => handleKeyUp(e)} />
              {errorsLead.map((x, i) => x.fieldName === 'message' && <p key={i} className='formField__error textarea-class'>{x.message}</p>)}
              {emptyValue && form['message'] === '' && <span className='formField__error textarea-class'>Este campo é requerido</span>}
            </FormField>

            <SubmitBtn type='submit'>
              <FaPaperPlane /> Enviar Mensagem
            </SubmitBtn>
          </FormColumn>

          {/* Coluna 3: Mapa */}
          <MapColumn>
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(themeConfig.address || 'Avenida Paulista, São Paulo')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapColumn>

        </UnifiedContactContainer>
      </UnifiedContactSection>

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