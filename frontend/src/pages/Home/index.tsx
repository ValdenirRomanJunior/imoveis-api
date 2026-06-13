import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiUsers, HiChartBar, HiClock, HiStar, HiKey } from 'react-icons/hi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { FaGlobe, FaUsers, FaPlug, FaImage, FaBars, FaTimes } from 'react-icons/fa';
import { useCountUp } from '../../hooks/useCountUp';
import { trackAccess } from '../../services/resources/adminStats';
import RegisterModal from '../../components/RegisterModal';
import RegisterSuccess from '../../components/RegisterSuccess';
import WhatsAppHome from './WhatsappHome';
import tela1 from '../../assets/images/tela-1.png';
import tela2 from '../../assets/images/tela-2.png';
import tela3 from '../../assets/images/foto-1.png';
import google from '../../assets/images/google.png'
import gpt from '../../assets/images/gpt.webp'
import standi from '../../assets/images/logo.png'
import standilogo from '../../assets/images/logo-sem fundo.png'
import Whats from '../../assets/images/whatsapp.png'
import userImage from '../../assets/images/user-image.jpeg'
import imagem1 from '../../assets/images/imagem-1-recursos-1.png'
import imagem2 from '../../assets/images/banner-recursos-3.png'
import imagem3 from '../../assets/images/lps.png'
import lancamento from '../../assets/images/lancamento.png'
import rocket from '../../assets/images/rocket.png'

import {
  HomeContainer,
  Header,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  LoginButton,
  MobileMenuButton,
  MobileSidebar,
  MobileSidebarOverlay,
  MobileSidebarHeader,
  MobileSidebarLogo,
  MobileSidebarCloseButton,
  MobileSidebarNav,
  MobileSidebarNavLink,
  MobileSidebarLoginButton,
  HeroSection,
  HeroContent,
  Title,
  Subtitle,
  CTAButton,
  ProductsSection,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  ProductIcon,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductFeatures,
  ResourcesSection,
  ResourcesContainer,
  ResourcesTitle,
  ResourcesSubtitle,
  ResourcesContent,
  ResourcesNavigation,
  ResourceNavItem,
  ResourceNavIcon,
  ResourceMockupArea,
  ResourceMockupHeader,
  ResourceMockupTitle,
  ResourceMockupSubtitle,
  ResourceMockupImage,
  ResourceMockupPlaceholder,
  StatsSection,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  AnimatedCirclesContainer,
  AnimatedCircle,
  CircleImage,
  TestFreeButton,
  TestimonialsSection,
  TestimonialsContainer,
  TestimonialCard,
  TestimonialAvatar,
  TestimonialText,
  TestimonialAuthor,
  TestimonialCompany,
  PricingSection,
  PricingContainer,
  PricingToggleContainer,
  PricingToggle,
  PricingToggleButton,
  EconomyBadge,
  EconomyArrow,
  PricingGrid,
  PricingCard,
  PricingIcon,
  PricingPlanName,
  PricingDescription,
  PricingPrice,
  PricingCurrency,
  PricingAmount,
  PricingPeriod,
  PricingNote,
  PricingButton,
  PricingFeatures,
  PricingFeature,
  FAQSection,
  FAQContainer,
  FAQTitle,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  CallToActionBanner,
  CTALeftSide,
  CTARightSide,
  CTAText,
  CTAButton as CTABannerButton,
  WhatsAppIcon,
  WhatsAppText,
  CTABannerButtonBottom,
  PersonImage,
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  Copyright,
  RegisterButton,
  MobileSidebarRegisterButton,
  LaunchPagesBannerWrapper,
  LaunchPagesBanner,
  LPHeaderContainer,
  LPHeaderLeft,
  LPBadge,
  LPTitle,
  LPSubtitle,
  LPHeaderRight,
  LPPriceLabel,
  LPPriceValue,
  LPPriceSub,
  LPCTAButton,
  LPCardsGrid,
  LPCard,
  LPCardHeader,
  LPCardTitle,
  LPCardNumber,
  LPList,
  LPListItem,
  LPFooter,
  LPFooterLabel,
  LPTagsContainer,
  LPTag
} from './styles';

import { FaRegCheckSquare } from 'react-icons/fa';
import { FiSliders } from 'react-icons/fi';
import WhatsappHome from './WhatsappHome';
import Promotion from '../../components/Promotion';
import MetaPixel from '../../components/MetaPixel';

  const styles = `
    .container-main-mockup {


      position: absolute;
      top: calc(70% + 40px);
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
  
      z-index: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background-color: transparent;
      color: #f3f4f6; /* gray-100 */
      font-family: 'Inter', sans-serif;

      @media screen and (min-width: 1000px) {
      position: absolute;
      top: calc(57% + 40px);
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      z-index: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: transparent;
      color: #f3f4f6; /* gray-100 */
      font-family: 'Inter', sans-serif;

}
    }
    
    .mockup-section {
      position: relative;
      width: 100%;
      max-width: 80rem; /* w-full max-w-5xl, equivalente a 1024px */
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (min-width: 768px) {
      .mockup-section {
        height: 37.5rem; /* md:h-[600px] */
      }
    }

    .monitor-mockup {
      position: absolute;
      width: 90%;
      height: 75%;
      background-color:rgba(98, 98, 98, 0.31); /* gray-800 */
      border-radius: 1.5rem; /* rounded-3xl */
      box-shadow: 0 -27px 50px -12px rgba(59, 130, 246, 0.4); /* shadow-1xl azul apenas na parte superior */
      overflow: hidden;

       display: flex;
       align-items: center;
       justify-content: center;

       @media screen and (min-width: 1000px) {
      position: absolute;
      width: 80%;
      height: 80%;
      background-color:rgba(98, 98, 98, 0.31); /* gray-800 */
      border-radius: 1.5rem; /* rounded-3xl */
      box-shadow: 0 -27px 50px -12px rgba(59, 130, 246, 0.4); /* shadow-1xl azul apenas na parte superior */
      overflow: hidden;

       display: flex;
       align-items: center;
       justify-content: center;
       }
    }

    .monitor-mockup img {
      width: 100%;
      height: 90%;
      object-fit: cover;
    
     
    }

    .phone-mockup {
      position: absolute;
      right: 10rem;
      width: 6rem; /* w-40 */
      height: 11rem; /* h-80 */
      background-color:rgba(92, 92, 92, 0.23); /* gray-900 */
      border-radius: 1.9rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
      border: 1px solid #374151; /* border-4 border-gray-700 */
      overflow: hidden;
      transform: translateX(11rem) translateY(-1rem); /* translate-x-40 -translate-y-8 */
      
      @media screen and (min-width: 1000px) {
      position: absolute;
      right: 10rem;
      width: 9rem; /* w-40 */
      height: 19rem; /* h-80 */
      background-color:rgba(92, 92, 92, 0.23); /* gray-900 */
      border-radius: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
      border: 1px solid #374151; /* border-4 border-gray-700 */
      overflow: hidden;
      transform: translateX(10rem) translateY(-2rem); /* translate-x-40 -translate-y-8 */
      }
      
    }
    
    .phone-mockup img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 2rem;
    }
  `;


const Home: React.FC = () => {
  const [activeResource, setActiveResource] = React.useState('site');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);

  // Tracking de acesso à página Home
  useEffect(() => {
    const trackHomeAccess = async () => {
      try {
        await trackAccess('HOME_ACCESS');
      } catch (error) {
        console.error('Erro ao rastrear acesso à home:', error);
      }
    };

    trackHomeAccess();
  }, []);
  
  // Preços dos planos
  const planPrices = {
    lite: {
      monthly: 87.00,
      annual: 78.30 // 10% de desconto
    },
    pro: {
      monthly: 239.00,
      annual: 215.10 // 10% de desconto
    }
  };
  
  const resources = {
    site: {
      title: 'Site',
      image: imagem1,
      description: 'Mockup do site'
    },
    crm: {
      title: 'CRM',
      image: imagem2,
      description: 'Mockup do CRM'
    },
    integracao: {
      title: 'Integração',
      image: imagem3,
      description: 'Mockup da Integração'
    }
  };

  const handleResourceClick = (resourceKey: string) => {
    setActiveResource(resourceKey);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenRegisterModal = async () => {
    try {
      await trackAccess('TEST_BUTTON_CLICK');
    } catch (error) {
      console.error('Erro ao rastrear clique no botão de teste:', error);
    }
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegisterSuccess = (userData: any) => {
    setRegisteredUser(userData);
    setIsRegisterModalOpen(false);
    setShowSuccessPage(true);
  };

  const handleBackToHome = () => {
    setShowSuccessPage(false);
    setRegisteredUser(null);
  };

  // Fechar menu ao clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('[data-mobile-sidebar]');
      const menuButton = document.querySelector('[data-mobile-menu-button]');
      
      if (isMobileMenuOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) &&
          menuButton &&
          !menuButton.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  // Hooks para animação dos contadores
  const yearsCount = useCountUp({ end: 3, duration: 2000, suffix: '+' });
  const usersCount = useCountUp({ end: 500, duration: 2500, suffix: '+' });
  const clientsCount = useCountUp({ end: 290, duration: 2200, suffix: '+' });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "O que é a Standi?",
      answer: "É uma plataforma que te ajuda a criar sites imobiliários e criar páginas de lançamento imobiliário integrados ao nosso CRM para imobiliárias, construtoras e incorporadoras. "

    },
    {
      question: "Posso personalizar o design do meu site e das Landing Pages?",
      answer: "Sim, você pode editar cores, textos, imagens e logotipo, pode usar seu próprio domínio para o site, mantendo a identidade do seu negócio imobiliário."
    },
    {
      question: "O site é rápido e otimizado para SEO do Google e para buscas por I.A?",
      answer: "Sim, a Standi entrega um “site rápido e profissional”, com estrutura leve e responsiva, o que melhora a pontuação e ajuda a ranquear melhor no Google e nas buscas por I.A."
    },
    {
      question: "Terei suporte quando surgir alguma dúvida?",
      answer: "Sim, você conta com um suporte Standi que “não te deixa na mão”, atendendo via WhatsApp nos horários comerciais e com plantões de urgência para casos críticos."
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "A vista ou parcelado no cartão."
    }
  ];
  return (
    <>
      <MetaPixel />
      <section>
              CRIE SEU SITE IMOBILIÁRIO EM 1 MINUTO!
            </section>
      <HomeContainer>
     <WhatsappHome />
      <Header>
        <Nav>
          <Logo>
            <img src={standi} alt="Standi" />
          </Logo>
          <NavLinks>
            
            <NavLink href="#recursos">Recursos</NavLink>
            <NavLink href="#planos">Planos</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#contato">Contato</NavLink>
           
              <LoginButton as={Link} to="/login">
              Acessar
            </LoginButton >
             <RegisterButton onClick={handleOpenRegisterModal} style={{cursor:'pointer'}}>
              Teste Grátis
            </RegisterButton>
      
          </NavLinks>
          
          {/* Botão hambúrguer mobile */}
          <MobileMenuButton 
            data-mobile-menu-button
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </MobileMenuButton>
        </Nav>
        
        {/* Sidebar mobile */}
        {isMobileMenuOpen && (
          <>
            <MobileSidebarOverlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
            <MobileSidebar isOpen={isMobileMenuOpen} data-mobile-sidebar>
              <MobileSidebarHeader>
                <MobileSidebarLogo>
                  <img src={standi} alt="Standi" />
                </MobileSidebarLogo>
                <MobileSidebarCloseButton onClick={closeMobileMenu}>
                  <FaTimes />
                </MobileSidebarCloseButton>
              </MobileSidebarHeader>
              
              <MobileSidebarNav>
           
                <MobileSidebarNavLink href="#recursos" onClick={closeMobileMenu}>
                  Recursos
                </MobileSidebarNavLink>
                <MobileSidebarNavLink href="#planos" onClick={closeMobileMenu}>
                  Planos
                </MobileSidebarNavLink>
                <MobileSidebarNavLink href="/blog" onClick={closeMobileMenu}>
                  Blog
                </MobileSidebarNavLink>
                <MobileSidebarNavLink href="#contato" onClick={closeMobileMenu}>
                  Contato
                </MobileSidebarNavLink>
                <MobileSidebarLoginButton as={Link} to="/login" onClick={closeMobileMenu}>
                  Fazer Login
                </MobileSidebarLoginButton>
                <MobileSidebarRegisterButton onClick={handleOpenRegisterModal}>
                  Teste Grátis
                </MobileSidebarRegisterButton> 
              </MobileSidebarNav>
            </MobileSidebar>
          </>
        )}
      </Header>

      <HeroSection>
        <HeroContent>
         
            {/* Badge de IA otimizada */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-green-300 bg-green-50/10 backdrop-blur-sm  rounded-full text-sm font-medium">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600"
              >
                <path 
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                  fill="currentColor"
                />
                <path 
                  d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" 
                  fill="currentColor"
                />
                <path 
                  d="M5 9L5.5 11.5L8 12L5.5 12.5L5 15L4.5 12.5L2 12L4.5 11.5L5 9Z" 
                  fill="currentColor"
                />
              </svg>
              Site otimizado para buscas I.A
            </div>
            <Title>PLATAFORMA IMOBILIÁRIA</Title>
            <Subtitle>
              PARA IMOBILIÁRIAS, CONSTRUTORAS E INCORPORADORAS!
            </Subtitle>
            <p>
              Site, Páginas de lançamento com rastreador embutido e Formulário inteligente.
            </p>
            <CTAButton onClick={handleOpenRegisterModal}>
              TESTAR GRÁTIS AGORA
            </CTAButton>
         
          

        </HeroContent>
        
      </HeroSection>

      {/* Container dos Mockups posicionado 40px abaixo do botão */}
      <style>{styles}</style>
      <div className="container-main-mockup">

        {/* Frase manuscrita e seta do lado esquerdo dos mockups */}
        <div className="absolute left-[-70px] top-20 transform -translate-y-1/2 hidden md:block">
          <div className="font-handwriting text-green-300 text-lg transform rotate-5 whitespace-nowrap mb-2">
             Posiciona na sua cidade
          </div>
          <svg 
            width="120" 
            height="80" 
            viewBox="0 0 130 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-300 transform rotate-12"
          >
            <path 
             d="M26 1 Q 10 20, 40 65 T  80 Q 100 55, 110 60" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
              markerEnd="url(#arrowhead-left)"
            />
            <defs>
              <marker 
                id="arrowhead-left" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon 
                  points="0 0, 10 3.5, 0 7" 
                  fill="currentColor"
                />
              </marker>
            </defs>
          </svg>
        </div>
        
    {/* Frase manuscrita e seta do lado direito dos mockups */}
        <div className="absolute right-[-90px] top-20 transform -translate-y-1/2 hidden md:block">
          <div className="font-handwriting text-green-300 text-lg transform rotate-5 whitespace-nowrap mb-2">
            Lançe empreendimentos
          </div>
          <svg 
            width="120" 
            height="80" 
            viewBox="0 0 120 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-300 transform rotate-12"
          >
            <path 
              d="M26 1 Q 50 20, 40 65 T  80 Q 100 55, 110 60" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
              markerEnd="url(#arrowhead-left)"
            />
            <defs>
              <marker 
                id="arrowhead-left" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon 
                  points="0 0, 10 3.5, 0 7" 
                  fill="currentColor"
                />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="mockup-section">
          {/* Mockup do Monitor (mais fino) */}
          <div className="monitor-mockup">
            {/* Div com 3 círculos no canto superior esquerdo */}
            <div className="absolute top-2 left-2 flex gap-2 bg-transparent">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <img
              src={tela3}
              alt="Tela do Dashboard Standi"
            />
          </div>

          {/* Mockup do Celular (lado direito) */}
          <div className="phone-mockup">
            <img
              src={tela2}
              alt="Tela do Aplicativo Móvel Standi"
            />
          </div>
        </div>
      </div>
    
      <ProductsSection id="produtos">
        <SectionTitle>Porque eu deveria assinar com a Standi?</SectionTitle>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem', color: '#666', padding:'0 1rem' }}>
          Além do Google você já percebeu que as pessoas também usam o chatGpt para buscar imóveis certo?<br/>
             Nosso site imobiliário é projetado para estas buscas modernas
        </p>
        
        <ProductsGrid>
          <ProductCard>
            <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>
            <ProductIcon>
             <img src={google} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Posicionamento Digital</span>
            </div>
            <ProductContent>
              <ProductTitle>Site otimizado para buscas do Google (SEO)</ProductTitle>
              <ProductDescription>
                Seu site será encontrado facilmente pelos clientes através de buscas inteligentes e otimização para.
              </ProductDescription>
           
            </ProductContent>
          </ProductCard>

          <ProductCard>
             <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>

            <ProductIcon>
           <img src={rocket} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Módulo de Lançamentos</span>
            </div>
            <ProductContent>
              <ProductTitle>Crie landing pages inteligentes</ProductTitle>
              <ProductDescription>
                Aqui você cria páginas de lançamentos por fase do seu projeto, com rastreador e form inteligente.
              </ProductDescription>
           
            </ProductContent>
          </ProductCard>

          <ProductCard>
          <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>

            <ProductIcon>
             <img src={standilogo} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Também somos agência!</span>
            </div>
            <ProductContent>
              <ProductTitle>Personalize sua página de lançamento!</ProductTitle>
              <ProductDescription>
                Se você quer uma página detalhada, elegante, sem cara de temaplate, nós criamos uma para você.
              </ProductDescription>
            
            </ProductContent>
          </ProductCard>
        </ProductsGrid>
        
        <TestFreeButton onClick={handleOpenRegisterModal}>Testar Grátis Agora</TestFreeButton>
      </ProductsSection>

      <ResourcesSection id="recursos">
        <ResourcesContainer>
          <ResourcesTitle>Estes são os recursos que você pode aproveitar:</ResourcesTitle>
          <ResourcesSubtitle>Além de um site moderno preparado para SEO e GEO também você tem a liberdade de editar seu site, <br/>
             adicionar o pixel, fazer a gestão dos imóveis e seus clientes</ResourcesSubtitle>
          
          <ResourcesContent>
            <ResourcesNavigation>
              <ResourceNavItem 
                className={activeResource === 'site' ? 'active' : ''}
                onClick={() => handleResourceClick('site')}
              >
                <ResourceNavIcon>
                  <FaGlobe />
                </ResourceNavIcon>
                Site
              </ResourceNavItem>
              
              <ResourceNavItem 
                className={activeResource === 'crm' ? 'active' : ''}
                onClick={() => handleResourceClick('crm')}
              >
                <ResourceNavIcon>
                  <FaUsers />
                </ResourceNavIcon>
                CRM
              </ResourceNavItem>
              
              <ResourceNavItem 
                className={activeResource === 'integracao' ? 'active' : ''}
                onClick={() => handleResourceClick('integracao')}
              >
                <ResourceNavIcon>
                  <FaPlug />
                </ResourceNavIcon>
                Módulo de lançamentos
              </ResourceNavItem>
            </ResourcesNavigation>
            
            <ResourceMockupArea>
              {resources[activeResource as keyof typeof resources] ? (
                <>
                  <ResourceMockupHeader>
                    <ResourceMockupTitle>
                      {activeResource === 'site' && 'Site Imobiliário'}
                      {activeResource === 'crm' && 'CRM Completo'}
                      {activeResource === 'integracao' && 'Lançamento por fase'}
                    </ResourceMockupTitle>
                    <ResourceMockupSubtitle>
                      {activeResource === 'site' && 'Tenha seu site profissional pronto em minutos'}
                      {activeResource === 'crm' && 'Gerencie leads, clientes e vendas em um só lugar'}
                      {activeResource === 'integracao' && 'Páginas com rastreador de lead e form inteligente'}
                    </ResourceMockupSubtitle>
                  </ResourceMockupHeader>
                  <ResourceMockupImage 
                    src={resources[activeResource as keyof typeof resources].image}
                    alt={resources[activeResource as keyof typeof resources].description}
                  />
                </>
              ) : (
                <ResourceMockupPlaceholder>
                  <FaImage size={48} />
                  <p>Selecione um recurso para ver o mockup</p>
                </ResourceMockupPlaceholder>
              )}
            </ResourceMockupArea>
          </ResourcesContent>
        </ResourcesContainer>
        

      </ResourcesSection>

      <StatsSection>
        <AnimatedCirclesContainer>
          {/* Círculos da esquerda para direita */}
          <AnimatedCircle className="left-to-right" style={{ top: '10%', animationDelay: '0s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="Pessoa 1" />
          </AnimatedCircle>
          <AnimatedCircle className="left-to-right" style={{ top: '30%', animationDelay: '3s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Pessoa 2" />
          </AnimatedCircle>
          <AnimatedCircle className="left-to-right" style={{ top: '50%', animationDelay: '6s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/65.jpg" alt="Pessoa 3" />
          </AnimatedCircle>
          <AnimatedCircle className="left-to-right" style={{ top: '70%', animationDelay: '9s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="Pessoa 4" />
          </AnimatedCircle>
          <AnimatedCircle className="left-to-right" style={{ top: '20%', animationDelay: '12s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/78.jpg" alt="Pessoa 5" />
          </AnimatedCircle>
          <AnimatedCircle className="left-to-right" style={{ top: '60%', animationDelay: '15s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/25.jpg" alt="Pessoa 6" />
          </AnimatedCircle>

          {/* Círculos da direita para esquerda */}
          <AnimatedCircle className="right-to-left" style={{ top: '15%', animationDelay: '2s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/45.jpg" alt="Pessoa 7" />
          </AnimatedCircle>
          <AnimatedCircle className="right-to-left" style={{ top: '35%', animationDelay: '5s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Pessoa 8" />
          </AnimatedCircle>
          <AnimatedCircle className="right-to-left" style={{ top: '55%', animationDelay: '8s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/23.jpg" alt="Pessoa 9" />
          </AnimatedCircle>
          <AnimatedCircle className="right-to-left" style={{ top: '75%', animationDelay: '11s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/56.jpg" alt="Pessoa 10" />
          </AnimatedCircle>
          <AnimatedCircle className="right-to-left" style={{ top: '25%', animationDelay: '14s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/men/89.jpg" alt="Pessoa 11" />
          </AnimatedCircle>
          <AnimatedCircle className="right-to-left" style={{ top: '65%', animationDelay: '17s' }}>
            <CircleImage src="https://randomuser.me/api/portraits/women/73.jpg" alt="Pessoa 12" />
          </AnimatedCircle>
        </AnimatedCirclesContainer>

       
   
        
        <StatsGrid>
          <StatCard>
            <StatNumber ref={yearsCount.ref}>{yearsCount.value}</StatNumber>
            <StatLabel>anos de mercado</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber ref={usersCount.ref}>{usersCount.value}</StatNumber>
            <StatLabel>usuários ativos</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber ref={clientsCount.ref}>{clientsCount.value}</StatNumber>
            <StatLabel>clientes ativos</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <TestFreeButton onClick={handleOpenRegisterModal}>Testar Grátis Agora</TestFreeButton>
      </StatsSection>

         
      <LaunchPagesBannerWrapper>
        <LaunchPagesBanner>
          <LPHeaderContainer>
            <LPHeaderLeft>
              <LPBadge>
                <div className="dot" /> STANDI DETAIL
              </LPBadge>
              <LPTitle>
                LPs <span>exclusivas</span> para cada etapa<br /> do seu lançamento imobiliário
              </LPTitle>
              <LPSubtitle>
                Design personalizado, copy de conversão e integração com CRM e WhatsApp — feito do zero para o seu empreendimento.
              </LPSubtitle>
            </LPHeaderLeft>
            
            <LPHeaderRight>
              <LPPriceLabel>Pacote 3 etapas</LPPriceLabel>
              <LPPriceValue>R$6.500</LPPriceValue>
              <LPPriceSub>ou R$2.500 por etapa</LPPriceSub>
              <LPCTAButton onClick={() => window.open('https://api.whatsapp.com/send?phone=45974007155', '_blank')}>
                Solicitar proposta
              </LPCTAButton>
            </LPHeaderRight>
          </LPHeaderContainer>

          <LPCardsGrid>
            <LPCard $accentColor="#86efac">
              <LPCardHeader>
                <LPCardTitle $accentColor="#86efac">
                  <div className="dot" /> Pré-lançamento
                </LPCardTitle>
                <LPCardNumber>01</LPCardNumber>
              </LPCardHeader>
              <LPList>
                <LPListItem $accentColor="#86efac">
                  <FaRegCheckSquare /> Cadastro de interesse
                </LPListItem>
                <LPListItem $accentColor="#86efac">
                  <FaRegCheckSquare /> Copy de antecipação
                </LPListItem>
                <LPListItem $accentColor="#86efac">
                  <FaRegCheckSquare /> WhatsApp Integrado
                </LPListItem>
              </LPList>
            </LPCard>

            <LPCard $accentColor="#93c5fd">
              <LPCardHeader>
                <LPCardTitle $accentColor="#93c5fd">
                  <div className="dot" /> Lançamento
                </LPCardTitle>
                <LPCardNumber>02</LPCardNumber>
              </LPCardHeader>
              <LPList>
                <LPListItem $accentColor="#93c5fd">
                  <FaRegCheckSquare /> LP completa com galeria
                </LPListItem>
                <LPListItem $accentColor="#93c5fd">
                  <FaRegCheckSquare /> Plantas e diferenciais
                </LPListItem>
                <LPListItem $accentColor="#93c5fd">
                  <FaRegCheckSquare /> Contador de urgência
                </LPListItem>
              </LPList>
            </LPCard>

            <LPCard $accentColor="#fdba74">
              <LPCardHeader>
                <LPCardTitle $accentColor="#fdba74">
                  <div className="dot" /> Estoque
                </LPCardTitle>
                <LPCardNumber>03</LPCardNumber>
              </LPCardHeader>
              <LPList>
                <LPListItem $accentColor="#fdba74">
                  <FaRegCheckSquare /> Copy de escassez
                </LPListItem>
                <LPListItem $accentColor="#fdba74">
                  <FaRegCheckSquare /> Copy de Urgência
                </LPListItem>
                <LPListItem $accentColor="#fdba74">
                  <FaRegCheckSquare /> Foco nas últimas unidades
                </LPListItem>
              </LPList>
            </LPCard>
          </LPCardsGrid>

          <LPFooter>
            <LPFooterLabel>Incluso em todas as etapas:</LPFooterLabel>
            <LPTagsContainer>
              <LPTag>
                <FaRegCheckSquare /> Painel de leads
              </LPTag>
              <LPTag>
                <FaRegCheckSquare /> WhatsApp integrado
              </LPTag>
              <LPTag>
                <FiSliders /> Leads tagueados por etapa
              </LPTag>
              <LPTag>
                <FaRegCheckSquare /> Mobile-first
              </LPTag>
            </LPTagsContainer>
          </LPFooter>
        </LaunchPagesBanner>
      </LaunchPagesBannerWrapper>

      {/* Seção de Planos */}
      <PricingSection id='planos'>
        
        <PricingContainer>
          <SectionTitle>Nossos Planos</SectionTitle>
          
          {/* Toggle de Preços */}
          <PricingToggleContainer>
            <PricingToggle>
              <PricingToggleButton 
                active={pricingPlan === 'annual'} 
                onClick={() => setPricingPlan('annual')}
              >
                Anual
              </PricingToggleButton>
              <PricingToggleButton 
                active={pricingPlan === 'monthly'} 
                onClick={() => setPricingPlan('monthly')}
              >
                Mensal
              </PricingToggleButton>
            </PricingToggle>
            <EconomyBadge>
              
              Economize até 10%
              <EconomyArrow />
            </EconomyBadge>
          </PricingToggleContainer>
          
          <PricingGrid>
            {/* Plano Lite */}
            <PricingCard>
              <PricingIcon>
                <HiHome />
              </PricingIcon>
              <PricingPlanName>Lite</PricingPlanName>
              <PricingDescription>
                CRM para acompanhar negócios e mais possibilidades de integrações.
              </PricingDescription>
                <PricingPrice>
                <PricingCurrency>R$</PricingCurrency>
                <PricingAmount>{planPrices.lite[pricingPlan]}</PricingAmount>
                <PricingPeriod>/mês</PricingPeriod>
              </PricingPrice>
              <PricingFeatures>
                <PricingFeature>1 usuário</PricingFeature>
                <PricingFeature>Site profissional e personalizável</PricingFeature>
                <PricingFeature>Gestão de imóveis e clientes</PricingFeature>
                <PricingFeature>Editor do site</PricingFeature>
                <PricingFeature>Site seguro com SSL</PricingFeature>
                <PricingFeature>Whatsapp integrado</PricingFeature>
                <PricingFeature>Até 200 imóveis</PricingFeature>
              </PricingFeatures>
            
              <PricingNote>Para testar, não precisa de cartão</PricingNote>
              <PricingButton onClick={handleOpenRegisterModal}>Teste Grátis</PricingButton>
            </PricingCard>

            {/* Plano Pro */}
            <PricingCard className="popular" style={{display:'none'}}>
              <PricingIcon>
                <HiRocketLaunch />
              </PricingIcon>
              <PricingPlanName>Pro</PricingPlanName>
              <PricingDescription>
                Para gerenciar negócios e equipes de maneira profissional e escalável.
              </PricingDescription>
              <PricingPrice>
                <PricingCurrency>R$</PricingCurrency>
                <PricingAmount>{planPrices.pro[pricingPlan]}</PricingAmount>
                <PricingPeriod>/mês</PricingPeriod>
              </PricingPrice>
              <PricingFeatures>
               <PricingFeature style={{fontWeight:'bold'}}>1 usuário</PricingFeature>
                <PricingFeature>Site profissional e personalizável</PricingFeature>
                <PricingFeature>Gestão de imóveis e clientes</PricingFeature>
                <PricingFeature>Editor do site</PricingFeature>
                <PricingFeature>Site seguro com SSL</PricingFeature>
                <PricingFeature>Whatsapp integrado</PricingFeature>
                <PricingFeature style={{fontWeight:'bold'}}>Imóveis ilimitados</PricingFeature>
              </PricingFeatures>
        
              <PricingNote>Para testar, não precisa de cartão</PricingNote>
              <PricingButton className="primary" onClick={handleOpenRegisterModal}>Teste Grátis</PricingButton>
            </PricingCard>
          </PricingGrid>
        </PricingContainer>
      </PricingSection>

      <FAQSection>
        <FAQContainer>
          <FAQTitle>Perguntas frequentes sobre sistema imobiliário</FAQTitle>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion 
                className={openFAQ === index ? 'active' : ''}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </FAQQuestion>
              <FAQAnswer className={openFAQ === index ? 'active' : ''}>
                {faq.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </FAQSection>

      <CallToActionBanner id='contato'>
        <CTALeftSide>
          <CTAText>Transforme sua imobiliária hoje mesmo!</CTAText>
          <CTABannerButtonBottom onClick={handleOpenRegisterModal}>Testar grátis agora</CTABannerButtonBottom>
        </CTALeftSide>
        <CTARightSide>
          <PersonImage src={userImage} alt="Atendente" />
          <a href={`https://api.whatsapp.com/send?phone=45974007155`} target="_blank">
          <div>
            <WhatsAppIcon><img src={Whats} alt="WhatsApp" /></WhatsAppIcon>
            <WhatsAppText>Dúvidas,clique aqui e fale conosco</WhatsAppText>
          </div></a>
        </CTARightSide>
      </CallToActionBanner>

         <Footer style={{ backgroundColor: '#0a1628', color: 'white', padding: '4rem 2rem 2rem'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
            {/* Newsletter / CTA Section */}
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#e2e8f0',display:'none'}}>Newsletter</h4>
              <Logo style={{ marginBottom: '1rem' }}>
                <img src={standi} alt="Standi" style={{ filter: 'brightness(0) invert(1)' }} />

              </Logo>
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Crie páginas de lançamentos e criativos automáticos<br/>Qualifique leads e poupe tempo com criativos.
              </p>
              <button 
                onClick={() => window.open('https://forms.fillout.com/t/prjyisTSa2us', '_blank')}
                style={{ 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '0.5rem', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.5)'
                }}
              >
                Entrar na lista de espera
              </button>
            </div>

            {/* Social Media Section */}
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#e2e8f0' }}>Social Media</h4>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Entre em nossa comunidade</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.facebook.com/profile.php?id=100075702506516" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', backgroundColor: '#1e293b', borderRadius: '0.5rem', textDecoration: 'none', color: 'white', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86b0efff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>FACEBOOK</span>
                </a>
                <a href="https://www.instagram.com/standi.com.br/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', backgroundColor: '#1e293b', borderRadius: '0.5rem', textDecoration: 'none', color: 'white', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86b0efff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>INSTAGRAM</span>
                </a>
                <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', backgroundColor: '#1e293b', borderRadius: '0.5rem', textDecoration: 'none', color: 'white', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86b0efff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>YOUTUBE</span>
                </a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>© 2024 Standi. Todos os direitos reservados.</p>
          </div>
        </div>
      </Footer>

      {/* Modal de Cadastro */}
      {isRegisterModalOpen && (
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          onSuccess={handleRegisterSuccess}
        />
      )}

      {/* Página de Sucesso */}
      {showSuccessPage && registeredUser && (
        <RegisterSuccess
          userData={registeredUser}
          onBackToHome={handleBackToHome}
        />
      )}
    </HomeContainer>
    </>
  );
};

export default Home;