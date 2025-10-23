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
import imagem3 from '../../assets/images/banner-recursos-2.png'
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
  MobileSidebarRegisterButton
} from './styles';
import WhatsappHome from './WhatsappHome';

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
      question: "Como a plataforma ajuda na geração de clientes?",
      answer: "O site vem equipado para captar clientes, chat de WhatsApp integrado, guiando o visitante até encontrar o imóvel certo e aumentando as chances de gerar uma venda."
    },
    {
      question: "Posso personalizar o design do meu site?",
      answer: "Sim, você pode editar cores, textos, imagens e logotipo, pode usar seu próprio domínio, mantendo a identidade da sua imobiliária ou marca pessoal."
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
      answer: "Aceitamos pix, a vista ou parcelado no cartão."
    }
  ];
  return (
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
            <Title>SITE IMOBILIÁRIO</Title>
            <Subtitle>
              PARA IMOBILIÁRIAS E CORRETORES AUTÔNOMOS
            </Subtitle>
            <p>
              O site imobiliário que aparece nas buscas por I.A e do Google. Gestão de imóveis, gestão de clientes, 
              editor do site em um só lugar.
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
             Posiciona sua imobiliária
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
            Gestão do seu negócio
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
        <SectionTitle>Porque eu deveria ter um site com a Standi?</SectionTitle>
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
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Google</span>
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
           <img src={gpt} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Chat GPT</span>
            </div>
            <ProductContent>
              <ProductTitle>Site otimizado para buscas por I.A (GEO)</ProductTitle>
              <ProductDescription>
                O jogo no digital mudou e você precisa ter um site que apareça nas buscas por Inteligência Artificial.
              </ProductDescription>
           
            </ProductContent>
          </ProductCard>

          <ProductCard>
          <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>

            <ProductIcon>
             <img src={standilogo} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Pronto em 5 minutos!</span>
            </div>
            <ProductContent>
              <ProductTitle>Site Pronto assim que faz o seu cadastro</ProductTitle>
              <ProductDescription>
                Seu site pode ter domínio personalizado, editado de forma simples e ter um pixel de conversão.
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
                Editor do seu site
              </ResourceNavItem>
            </ResourcesNavigation>
            
            <ResourceMockupArea>
              {resources[activeResource as keyof typeof resources] ? (
                <>
                  <ResourceMockupHeader>
                    <ResourceMockupTitle>
                      {activeResource === 'site' && 'Site Imobiliário'}
                      {activeResource === 'crm' && 'CRM Completo'}
                      {activeResource === 'integracao' && 'Editor Visual'}
                    </ResourceMockupTitle>
                    <ResourceMockupSubtitle>
                      {activeResource === 'site' && 'Tenha seu site profissional pronto em minutos'}
                      {activeResource === 'crm' && 'Gerencie leads, clientes e vendas em um só lugar'}
                      {activeResource === 'integracao' && 'Edite seu site facilmente com nosso editor visual'}
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
          <a href={`https://api.whatsapp.com/send?phone=45988348165`} target="_blank">
          <div>
            <WhatsAppIcon><img src={Whats} alt="WhatsApp" /></WhatsAppIcon>
            <WhatsAppText>Dúvidas,clique aqui e fale conosco</WhatsAppText>
          </div></a>
        </CTARightSide>
      </CallToActionBanner>

      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Standi</FooterTitle>
            <p>A plataforma completa para gestão imobiliária. Simplifique sua rotina e aumente seus resultados.</p>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Produtos</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">CRM Imobiliário</FooterLink>
              <FooterLink href="#">Site Imobiliário</FooterLink>
             
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Recursos</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Funil de Vendas</FooterLink>
              <FooterLink href="#">Editor do Site</FooterLink>
              <FooterLink href="#">Integrações</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Suporte</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Central de Ajuda</FooterLink>
              <FooterLink href="#">Contato</FooterLink>
              <FooterLink href="#">Blog(em construção)</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2024 Standi. Todos os direitos reservados.
          </Copyright>
        </FooterBottom>
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
  );
};

export default Home;
