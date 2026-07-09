import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSubdomain } from '../../components/SubdomainRouter';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  FaYoutube,
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
import { PiCaretLeftBold, PiCaretRightBold, PiArrowUpBold } from 'react-icons/pi';
import {
  SiteContainer,
  Header,
  Logo,
  Nav,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  MenuLinkItem,
  MenuButtonOutline,
  MenuButtonSolid,
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
  AnnounceButtonRow,
  FooterContainer,
  FooterLogoColumn,
  FooterLinksColumn,
  FooterLinkGroup,
  FooterContactColumn,
  SocialLinksRow,
  FooterBottomLine,
  ScrollToTopBtn,
  AboutModalSection,
  AboutHeroImage,
  AboutHistoryText,
  AboutTeamSection,
  AboutTeamHeader,
  AboutTeamSlider,
  AboutTeamSlide,
  AboutTeamCard,
  AboutTeamImage,
  AboutTeamOverlay,
  AboutCarouselArrow
} from './styles';
import PseudoSearch from './PseudoSearch';
import WhatsappButton from './WhatsappButton';
import api from './utils/requests';
import corretorPadrao from './assets/corretor-padrao.jpg';
import bannerPadrao from '../../assets/images/banner-padrao-desktop.png';
import FeaturedPropertyCard from './components/FeaturedPropertyCard';
import { getPropertiesHome } from './Services/property';
import team from '../../assets/images/team.jpg';
import { newLeadHome } from './Services/lead';
import DynamicFavicon from '../../components/DynamicFavicon';
import DynamicSEO from '../../components/DynamicSEO';
import camaleonLogo from '../../assets/images/logo-padrao.png';
  
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const defaultAboutHeroImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Mariana Souza',
    role: 'Corretora especialista',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Rafael Lima',
    role: 'Consultor imobiliario',
    image: corretorPadrao
  },
  {
    id: 3,
    name: 'Camila Rocha',
    role: 'Atendimento e vendas',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Bruno Martins',
    role: 'Especialista em locacao',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Juliana Costa',
    role: 'Relacionamento com clientes',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
  }
];

const teamSliderSettings = {
  dots: false,
  infinite: teamMembers.length > 3,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


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

interface AgenciaFeature {
  title: string;
  description: string;
}

interface AgenciaConfig {
  features: AgenciaFeature[];
  images: string[];
}

interface ThemeConfig {
  creci: string;
  companyName: string;
  id?: number;
  name: string;
  logo: string;
  logoSize: string;
  menuLinks: MenuLink[];
  phone: string;
  bannerImage: string;
  bannerImage2?: string;
  bannerImage3?: string;
  bannerOverlayOpacity?: number;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerTitleSize: number;
  bannerColor: string;
  agencia?: AgenciaConfig;
  announceImage?: string;
  announceBackground?: string;
  announceText?: string;
  contactTitle: string;
  contactImage: string;
  agentPhoto: string;
  agentQuote: string;
  agentName: string;
  email?: string;
  address?: string;
  mapIframe?: string;
  footerLogo: string;
  socialLinks: {
    youtube: string;
    linkedin: string;
    twitter: string;
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

function AboutNextArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <AboutCarouselArrow
      type="button"
      className={className}
      style={{
        ...style,
        display: 'flex',
        position: 'absolute',
        top: '50%',
        right: '-12px',
        transform: 'translateY(-50%)',
        zIndex: 2
      }}
      onClick={onClick}
      aria-label="Próximo corretor"
    >
      <PiCaretRightBold size={18} />
    </AboutCarouselArrow>
  );
}

function AboutPrevArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <AboutCarouselArrow
      type="button"
      className={className}
      style={{
        ...style,
        display: 'flex',
        position: 'absolute',
        top: '50%',
        left: '-12px',
        transform: 'translateY(-50%)',
        zIndex: 2
      }}
      onClick={onClick}
      aria-label="Corretor anterior"
    >
      <PiCaretLeftBold size={18} />
    </AboutCarouselArrow>
  );
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
  const [currentWhyChooseImage, setCurrentWhyChooseImage] = useState(0);

  const whyChooseImages = themeConfig?.agencia?.images?.length ? themeConfig.agencia.images : [
    team, // Primeira imagem atual (ou team se importado)
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const nextWhyChooseImage = () => {
    setCurrentWhyChooseImage((prev) => (prev + 1) % whyChooseImages.length);
  };

  const prevWhyChooseImage = () => {
    setCurrentWhyChooseImage((prev) => (prev === 0 ? whyChooseImages.length - 1 : prev - 1));
  };

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

  const [announceForm, setAnnounceForm] = useState<any>({
    name: '',
    email: '',
    phone: '',
    message: '[Captação] Gostaria de anunciar meu imóvel'
  });
  const [successAnnounceMessage, setSuccessAnnounceMessage] = useState(false);
  const [loadingAnnounceLead, setLoadingAnnounceLead] = useState(false);
  const aboutDescription = themeConfig?.aboutUs?.trim()
    ? themeConfig.aboutUs
    : `${themeConfig?.companyName || 'Nossa imobiliaria'} nasceu com o compromisso de aproximar pessoas, bairros e oportunidades. Ao longo da nossa historia, construimos um atendimento consultivo, transparente e humano para ajudar cada cliente a comprar, vender ou alugar com mais seguranca e confianca.`;
  const aboutParagraphs = aboutDescription
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const aboutHeroImage = defaultAboutHeroImage;
  const aboutTeamCarouselSettings = {
    ...teamSliderSettings,
    nextArrow: <AboutNextArrow />,
    prevArrow: <AboutPrevArrow />
  };
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
        let parsedAgencia = null;
        if (response.data.themeConfig.agencia) {
          try {
            parsedAgencia = typeof response.data.themeConfig.agencia === 'string' ? JSON.parse(response.data.themeConfig.agencia) : response.data.themeConfig.agencia;
          } catch (e) {
            console.error('Error parsing agencia', e);
          }
        }

        const themeData = {
          ...response.data.themeConfig,
          menuLinks: typeof response.data.themeConfig.menuLinks === 'string' ? JSON.parse(response.data.themeConfig.menuLinks || '[]') : response.data.themeConfig.menuLinks || [],
          agencia: parsedAgencia || response.data.themeConfig.agencia,
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
        creci: '',
        companyName: '',
        name: 'Site Padrão',
        logo: '',
        logoSize: 'media',
        menuLinks: [],
        phone: '',
        bannerImage: bannerPadrao,
        bannerImage2: '',
        bannerImage3: '',
        bannerOverlayOpacity: 50,
        bannerTitle: 'Para cada imóvel uma nova história se levanta',
        bannerTitleColor: '#ffffff',
        bannerTitleSize: 48,
        bannerColor: '#2563eb',
        agencia: {
          features: [
            { title: 'Propriedades de Ampla Variedade', description: 'De apartamentos aconchegantes a vilas de luxo, temos opções para todos os estilos de vida..' },
            { title: 'Corretores de Confiança', description: 'Nossa equipe de profissionais dedica-se a encontrar a melhor oferta para vocês.' },
            { title: 'Processo transparente', description: 'Sem taxas ocultas ou surpresas. Acompanhamos você em cada etapa.' }
          ],
          images: [
            team,
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        },
        contactTitle: 'Entre em contato',
        announceImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        announceBackground: '#000000',
        announceText: 'Escolha a imobiliária especialista no mercado há mais de 70 anos e tenha a maior segurança e rentabilidade do mercado.',
        contactImage: '',
        agentPhoto: corretorPadrao,
        agentQuote: 'Estou aqui para ajudar você a encontrar o imóvel perfeito.',
        agentName: 'Corretor',
        email: 'contato@empresa.com.br',
        address: 'Av. Paulista, 1100\nSão Paulo, SP - 01310-100',
        mapIframe: '',
        footerLogo: '',
        socialLinks: {
          youtube: '',
          linkedin: '',
          twitter: '',
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
            if(e.currentTarget.name === 'phone' || e.currentTarget.name === 'announcePhone'){  
               phone(e);
              
            }        
        
        }

        function handleAnnounceChange(e: any): void {
          const field = e.target.getAttribute('name');
          const value = e.target.value;
          setAnnounceForm({ ...announceForm, [field]: value });
        }

        const handleSubmitAnnounceLead = async (e:any) => {
          e.preventDefault();
          if(!announceForm.name || !announceForm.email || !announceForm.phone) return;
          
          setLoadingAnnounceLead(true);
          
          const hostname = window.location.hostname;
          const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
          let identifierCompanyName = '';
          let domainValue = '';
          
          if (isLocalhost) {
            identifierCompanyName = clientSlug || companyName || '';
          } else {
            const parts = hostname.split('.');
            if (parts.length >= 3 && parts.slice(1).join('.') === 'standi.com.br') {
              identifierCompanyName = parts[0];
            } else {
              domainValue = hostname;
            }
          }
            
          const stripIdSuffix = (val: string) => val ? val.replace(/-\d+$/, '') : '';
          identifierCompanyName = stripIdSuffix(identifierCompanyName);
              
          const data = await newLeadHome(announceForm.name, announceForm.email, announceForm.phone, announceForm.message, identifierCompanyName, domainValue); 
          
          if(data?.status === 201) {
            setAnnounceForm({ ...announceForm, name: '', email: '', phone: '', message: '[Captação] Gostaria de anunciar meu imóvel' });
            setSuccessAnnounceMessage(true);
            setTimeout(()=> {
                setSuccessAnnounceMessage(false);
            }, 3000);
          } else {
             console.error("Erro ao enviar lead", data);
             alert("Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde.");
          }
          setLoadingAnnounceLead(false);
        };
     
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
                  <img 
                    src={require('../../assets/images/logo-padrao.png')} 
                    alt="Logo Padrão" 
                  />
                )}
              </Logo>
            </NavLink>
          );
        })()}
        <Nav>
          <div className="header-search-bar" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #d8d8d8ff', 
            borderRadius: '6px', 
            padding: '11px 12px',
            width: '350px'
          }}>
            <HiSearch style={{ color: '#666', fontSize: '27px', marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Tipo, bairro, rua, edifício ou código" 
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', color: '#666', fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ height: '35px', width: '1px', backgroundColor: '#eaeaea', marginLeft: '20px', marginRight: '20px' }}></div>
          <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {mobileMenuOpen ? <HiX style={{ fontSize: '36px', color: '#ff6b35' }} /> : <svg width="36" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H17M3 18H21" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <MenuLinkItem href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Comprar imóvel</MenuLinkItem>
                    <MenuLinkItem href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Alugar imóvel</MenuLinkItem>
                  </>
                );
              })()}
              <MenuLinkItem href="#contato" onClick={() => setMobileMenuOpen(false)}>Lançamentos</MenuLinkItem>
              <MenuLinkItem href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</MenuLinkItem>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '1rem' }}>
                <MenuButtonSolid href={`https://wa.me/${themeConfig.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">Suporte ao cliente</MenuButtonSolid>
                <MenuButtonOutline href="#contato" onClick={() => setMobileMenuOpen(false)}>Fale conosco</MenuButtonOutline>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '1rem' }}>
                <a href={`tel:${themeConfig.phone}`} style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>{themeConfig.phone}</span>
                </a>
              </div>
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
            image: themeConfig.bannerImage2 || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            title: themeConfig.bannerTitle || 'Casa luxuosa com piscina',
            link: '#'
          },
          {
            image: themeConfig.bannerImage3 || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            title: themeConfig.bannerTitle || 'Cobertura duplex no centro',
            link: '#'
          }
        ];

        const activeSlide = mockSlides[currentSlide];

        return (
          <Banner id="inicio" bannerImage={activeSlide.image} defaultBanner={bannerPadrao}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: themeConfig.bannerColor || '#000000',
              opacity: (themeConfig.bannerOverlayOpacity ?? 50) / 100,
              zIndex: 0
            }}></div>
            <BannerContent style={{ position: 'relative', zIndex: 1 }}>
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
      <AnnounceSection style={{ background: themeConfig.announceBackground || '#000' }}>
        <AnnounceBackground>
          <AnnounceImageWrapper>
            <img src={themeConfig.announceImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} alt="Especialista" />
          </AnnounceImageWrapper>
          <AnnounceContent>
            <AnnounceTitle>Anuncie seu imóvel</AnnounceTitle>
            <AnnounceSubtitle>
              {themeConfig.announceText || "Escolha a imobiliária especialista no mercado há mais de 70 anos e tenha a maior segurança e rentabilidade do mercado."}
            </AnnounceSubtitle>
            
            <form onSubmit={handleSubmitAnnounceLead}>
              <AnnounceFormRow>
                <input type="text" name="name" value={announceForm.name} onChange={handleAnnounceChange} placeholder="Seu nome:" required />
                <input type="tel" name="phone" value={announceForm.phone} onChange={handleAnnounceChange} onKeyUp={handleKeyUp} placeholder="Seu telefone:" required />
                <input type="email" name="email" value={announceForm.email} onChange={handleAnnounceChange} placeholder="Seu e-mail:" required />
              </AnnounceFormRow>
              <AnnounceButtonRow>
                <div className="dots-blue"></div>
                <button type="submit" disabled={loadingAnnounceLead}>
                  {loadingAnnounceLead ? 'Enviando...' : successAnnounceMessage ? 'Enviado!' : 'Solicitar Contato \u2192'}
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

  

      {/* Bloco Novo - Why Choose Us */}
      <WhyChooseSection>
        <WhyChooseContainer>
          <WhyChooseLeft>
            <WhyChooseImageWrapper>
              <img src={whyChooseImages[currentWhyChooseImage]} alt="Interior moderno" />
              
              <button className="slider-arrow prev" onClick={prevWhyChooseImage}>
                <PiCaretLeftBold size={20} style={{backgroundColor: '#1C1C38'}}/>
              </button>
              <button className="slider-arrow next" onClick={nextWhyChooseImage}>
                <PiCaretRightBold size={20} style={{backgroundColor: '#1C1C38'}}/>
              </button>

              <ReviewCard>
                <Stars>★★★★★</Stars>
                <ReviewText>"A melhor agência com a qual já trabalhamos."</ReviewText>
                <ReviewAuthor>- Camaleon</ReviewAuthor>
              </ReviewCard>
            </WhyChooseImageWrapper>
          </WhyChooseLeft>
          <WhyChooseRight>
            <WhyChooseTitle>Porque escolher a Camaleon?</WhyChooseTitle>
            <FeatureList>
              {themeConfig?.agencia?.features?.map((feature, idx) => (
                <FeatureItem key={idx}>
                  <FeatureNumber>{idx + 1}</FeatureNumber>
                  <FeatureTextContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDesc>{feature.description}</FeatureDesc>
                  </FeatureTextContent>
                </FeatureItem>
              ))}
              {(!themeConfig?.agencia?.features || themeConfig.agencia.features.length === 0) && (
                <>
                  <FeatureItem>
                    <FeatureNumber>1</FeatureNumber>
                    <FeatureTextContent>
                      <FeatureTitle>Propriedades de Ampla Variedade</FeatureTitle>
                      <FeatureDesc>De apartamentos aconchegantes a vilas de luxo, temos opções para todos os estilos de vida..</FeatureDesc>
                    </FeatureTextContent>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureNumber>2</FeatureNumber>
                    <FeatureTextContent>
                      <FeatureTitle>Corretores de Confiança</FeatureTitle>
                      <FeatureDesc>Nossa equipe de profissionais dedica-se a encontrar a melhor oferta para vocês.</FeatureDesc>
                    </FeatureTextContent>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureNumber>3</FeatureNumber>
                    <FeatureTextContent>
                      <FeatureTitle>Processo transparente</FeatureTitle>
                      <FeatureDesc>Sem taxas ocultas ou surpresas. Acompanhamos você em cada etapa.</FeatureDesc>
                    </FeatureTextContent>
                  </FeatureItem>
                </>
              )}
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
                <h3>{themeConfig.contactTitle || 'Fale conosco'}</h3>
                <p>{themeConfig.agentQuote || 'Estamos aqui para ajudar. Envie sua mensagem e retornaremos o mais breve possível.'}</p>
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
            {themeConfig.mapIframe ? (
              <div dangerouslySetInnerHTML={{ __html: themeConfig.mapIframe }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(themeConfig.address || 'Avenida Paulista, São Paulo')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 0 }}
              ></iframe>
            )}
          </MapColumn>

        </UnifiedContactContainer>
      </UnifiedContactSection>

      {/* Bloco 8 - Footer */}
      <Footer backgroundColor={themeConfig.footerBackgroundColor || '#1C1C38'}>
        <FooterContainer>
          <FooterLogoColumn>
            {themeConfig.footerLogo ? (
              <img src={themeConfig.footerLogo} alt="Logo" />
            ) : themeConfig.logo ? (
              <img src={themeConfig.logo} alt="Logo" />
            ) : (
              <img src={camaleonLogo} alt="Logo" />
            )}
          </FooterLogoColumn>

          <FooterLinksColumn>
            <FooterLinkGroup>
              <h4>Filtros</h4>
              <a href="#">Lançamentos</a>
              <a href="#">2+ Dormitórios</a>
              <a href="#">Com Suite</a>
              <a href="#">2+ Vagas</a>
            </FooterLinkGroup>
      
          </FooterLinksColumn>

          <FooterLinksColumn>
            <FooterLinkGroup>
              <h4>Navegação</h4>
              <a href="#">Comprar um imóvel</a>
              <a href="#">Alugar um imóvel</a>
              <a href="#">Vender um imóvel</a>
            </FooterLinkGroup>
          
          </FooterLinksColumn>

          <FooterLinksColumn>
            <FooterLinkGroup>
              <h4>Institucional</h4>
              <a href="#">Área do Cliente</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setPrivacyModalOpen(true); }}>Política de Privacidade</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setAboutModalOpen(true); }}>Sobre nós</a>
              <a href="#contato">Suporte ao cliente</a>
          
            </FooterLinkGroup>
          
          </FooterLinksColumn>

          <FooterContactColumn>
            <h3 className="footer-phone">{themeConfig.phone || '(00) 0000-0000'}</h3>
            <SocialLinksRow>
              <a href={themeConfig.socialLinks?.facebook || '#'}><FaFacebook /></a>
              <a href={themeConfig.socialLinks?.instagram || '#'}><FaInstagram /></a>
              <a href={themeConfig.socialLinks?.linkedin || '#'}><FaLinkedinIn /></a>
              <a href={themeConfig.socialLinks?.youtube || '#'}><FaYoutube /></a>
            </SocialLinksRow>
            <p className="footer-creci">CRECI {themeConfig.creci || 'J00000'}</p>
          </FooterContactColumn>
        </FooterContainer>
        
        <FooterBottomLine>
          <p>&copy; {new Date().getFullYear()} {themeConfig.companyName || 'Nossa Imobiliária'}. Todos os direitos reservados.</p>
        </FooterBottomLine>
        
        <ScrollToTopBtn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <PiArrowUpBold size={20} />
        </ScrollToTopBtn>
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
              <ModalTitle as="h1" textColor={themeConfig.textColor}>Sobre nós</ModalTitle>
              <ModalCloseButton textColor={themeConfig.textColor} onClick={() => setAboutModalOpen(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody textColor={themeConfig.textColor}>
              <AboutModalSection>
                <AboutHeroImage
                  src={aboutHeroImage}
                  alt={`Ambiente da ${themeConfig.companyName || 'imobiliaria'}`}
                />

                <AboutHistoryText textColor={themeConfig.textColor}>
                  {aboutParagraphs.map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`}>{paragraph}</p>
                  ))}
                </AboutHistoryText>

                <AboutTeamSection>
                  <AboutTeamHeader>
                    <span>Nosso time</span>
                    <h2>Conheca os corretores que fazem parte da equipe</h2>
                  </AboutTeamHeader>

                  <AboutTeamSlider>
                    <Slider {...aboutTeamCarouselSettings}>
                      {teamMembers.map((member) => (
                        <AboutTeamSlide key={member.id}>
                          <AboutTeamCard>
                            <AboutTeamImage src={member.image} alt={member.name} />
                            <AboutTeamOverlay>
                              <h3>{member.name}</h3>
                              <p>{member.role}</p>
                            </AboutTeamOverlay>
                          </AboutTeamCard>
                        </AboutTeamSlide>
                      ))}
                    </Slider>
                  </AboutTeamSlider>
                </AboutTeamSection>
              </AboutModalSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
      </SiteContainer>
    </ThemeProvider>
  );
};

export default Site;
