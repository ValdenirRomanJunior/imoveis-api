import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import bgPrincipal from '../../assets/images/bg-principal.png';
import corretorPadrao from './assets/corretor-padrao.jpg';
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
  SearchBar,
  SearchInput,
  SearchButton,
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
  PropertyCard,
  PropertyImage,
  PropertyInfo,
  PropertyPrice,
  PropertyTitle,
  PropertyLocation,
  NavigationSection,
  NavigationLink,
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
  ModalBody
} from './styles';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePhone,
  AiFillFacebook,
  AiFillInstagram,
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
import { FaFacebook, FaInstagram, FaWhatsapp, FaKey, FaCalculator, FaHandshake, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { HiMenu, HiX, HiHome, HiKey, HiCalculator, HiHeart, HiSearch, HiDocumentText } from 'react-icons/hi';
import { MdRealEstateAgent, MdAttachMoney, MdBusiness, MdLocationOn, MdSecurity } from 'react-icons/md';
import { propertiesFeatured } from '../../services/resources/property';
import api from '../../utils/requests';
import PseudoSearch from './PseudoSearch';
import WhatsappButton from './WhatsappButton';

interface Property {
  id: number;
  name: string;
  price: string;
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

  privacyPolicy: string;
  aboutUs: string;
  tenantId: number;
}

const Site: React.FC = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [clientSlug, setClientSlug] = useState<string | null>(null);

  // Set client slug from URL parameter
  useEffect(() => {
    if (companyName) {
      setClientSlug(companyName);
    }
  }, [companyName]);

  useEffect(() => {
    if (clientSlug) {
      loadThemeConfig();
      loadFeaturedProperties();
    }
  }, [clientSlug]);

  const loadThemeConfig = async () => {
    try {
      // Use clientSlug to get theme config
      const response = await api.get(`/api/themes/account/${clientSlug}`);
      const data = response.data;
      
      // Parse JSON strings from backend
      const parsedData = {
        ...data,
        menuLinks: typeof data.menuLinks === 'string' ? JSON.parse(data.menuLinks || '[]') : data.menuLinks || [],
        services: typeof data.services === 'string' ? JSON.parse(data.services || '[]') : data.services || [],
        socialLinks: typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks || '{}') : data.socialLinks || {}
      };
      
      setThemeConfig(parsedData);
    } catch (error) {
      console.error('Error loading theme config:', error);
      // Fallback default config
      const defaultConfig: ThemeConfig = {
        name: 'Tema Padrão',
        logo: '',
        logoSize: 'medium',
        menuLinks: [{ label: 'Início', url: `/site/${clientSlug}` }, { label: 'Imóveis', url: `/site/${clientSlug}/imoveis` }],
        phone: '(00) 0000-0000',
        bannerImage: '',
        bannerTitle: 'Encontre o imóvel dos seus sonhos',
        bannerTitleColor: '#ffffff',
        bannerTitleSize: 48,
        bannerColor: '#f8fafc',
        services: [
          { icon: 'home', title: 'Venda de Imóveis', description: 'Encontre o imóvel perfeito para você', active: true },
          { icon: 'key', title: 'Locação', description: 'Alugue com segurança e praticidade', active: true },
          { icon: 'calculator', title: 'Financiamento', description: 'Facilitamos seu financiamento imobiliário', active: true }
        ],
        contactTitle: 'Entre em contato',
        contactImage: '',
        agentPhoto: corretorPadrao,
        agentQuote: 'Mais de 10 anos ajudando pessoas a encontrar o lar dos seus sonhos.',
        agentName: 'João Silva',
        footerLogo: '',
        socialLinks: { facebook: '#', instagram: '#', whatsapp: '#' },
        footerText: '© 2024 Imobiliária. Todos os direitos reservados.',
        footerBackgroundColor: '#1f2937',
        textColor: '#2563eb',
        buttonColor: '#64748b',
        h2Color: '#1f2937',
        privacyPolicy: 'Política de privacidade padrão.',
        aboutUs: 'Sobre nós padrão.',
        tenantId: 1
      };
      setThemeConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedProperties = async () => {
    try {
      const response = await api.get(`/properties/findAll/${clientSlug}`);
      if (response.data) {
        setFeaturedProperties(response.data.slice(0, 6)); // Mostrar apenas 6 propriedades
      }
    } catch (error) {
      console.error('Erro ao carregar propriedades em destaque:', error);
    }
  };

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

  return (
    <ThemeProvider theme={dynamicTheme}>
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
          <NavLink href={`tel:${themeConfig.phone}`}>{themeConfig.phone}</NavLink>
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
      <WhatsappButton/>

      {/* Bloco 2 - Banner */}
      <Banner id="inicio" bannerImage={themeConfig.bannerImage} defaultBanner={bgPrincipal}>
        <BannerContent>
          <BannerTitle titleColor={themeConfig.bannerTitleColor} titleSize={themeConfig.bannerTitleSize}>{themeConfig.bannerTitle}</BannerTitle>
                 
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
        <ServicesGrid>
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id}>
              <PropertyImage 
                src={property.images?.[0]?.url || '/assets/images/no-pictures.png'} 
                alt={property.name}
              />
              <PropertyInfo>
                <PropertyPrice>R$ {property.price}</PropertyPrice>
                <PropertyTitle textColor={themeConfig.textColor}>{property.name}</PropertyTitle>
                <PropertyLocation textColor={themeConfig.textColor}>{property.address?.city?.name}, {property.address?.city?.state?.name}</PropertyLocation>
              </PropertyInfo>
            </PropertyCard>
          ))}
        </ServicesGrid>
      </Section>

      {/* Bloco 5 - Contato */}
      <ContactSection id="contato">
        <ContactContent>
          <ContactImage>
            {themeConfig.contactImage ? (
              <img src={themeConfig.contactImage} alt="Contato" style={{ width: '80px', height: '80px' }} />
            ) : (
              <AiOutlineHome size={80} />
            )}
          </ContactImage>
          <ContactForm>
            <h2 style={{color: themeConfig.h2Color || themeConfig.textColor}}>{themeConfig.contactTitle}</h2>
            <ContactInput type="text" placeholder="Seu nome" />
            <ContactInput type="email" placeholder="Seu email" />
            <ContactInput type="tel" placeholder="Seu telefone" />
            <ContactTextarea placeholder="Sua mensagem" rows={4} />
            <ContactSubmitButton buttonColor={themeConfig.buttonColor}>Enviar mensagem</ContactSubmitButton>
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