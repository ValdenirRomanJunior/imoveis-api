import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { Link } from 'react-router-dom';
import { HiHome, HiUsers, HiChartBar, HiClock, HiStar, HiKey } from 'react-icons/hi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { FaGlobe, FaUsers, FaPlug, FaImage, FaBars, FaTimes } from 'react-icons/fa';
import { useCountUp } from '../../hooks/useCountUp';
import { trackAccess } from '../../services/resources/adminStats';
import RegisterModal from '../../components/RegisterModal';
import RegisterSuccess from '../../components/RegisterSuccess';

import tela1 from '../../assets/images/tela-1.png';
import tela2 from '../../assets/images/tela-2.png';
import tela3 from '../../assets/images/foto-1.png';
import heroImage from '../../assets/images/bg-principal-home.png';
import heroBgImage from '../../assets/images/hero-bg.png';
import bgBlurImage from '../../assets/images/bg-blur.png';
import google from '../../assets/images/google.png'
import gpt from '../../assets/images/gpt.webp'
import standi from '../../assets/images/logo.png'
import standilogo from '../../assets/images/logo-sem fundo.png'
import Whats from '../../assets/images/whatsapp.png'
import userImage from '../../assets/images/user-image.jpeg'
import imagem1 from '../../assets/images/imagem-1-recursos-1.png'
import imagem2 from '../../assets/images/lps.png'
import imagem3 from '../../assets/images/banner-recursos-2.png'
import imagem4 from '../../assets/images/crm.png'
import construtora from '../../assets/images/construtora.png'
import imobiliaria from '../../assets/images/imobiliaria.png'
import etapas from '../../assets/images/etapas.png'

import {
  HomeContainer,
  Header,
  Nav,
  Logo,
  DesktopNav,
  DesktopNavLink,
  HeaderRight,
  ContactLink,
  LoginLink,
  GetStartedButton,
  MobileMenuButton,
  MobileSidebar,
  MobileSidebarOverlay,
  MobileSidebarHeader,
  MobileSidebarLogo,
  MobileSidebarCloseButton,
  MobileSidebarNav,
  MobileSidebarNavLink,
  MobileSidebarLoginButton,
  PlatformSection,
  PlatformHeader,
  PlatformBadge,
  PlatformTitle,
  PlatformGrid,
  PlatformCard,
  PlatformCardHeader,
  PlatformCardTitle,
  PlatformCardText,
  PlatformCardImageWrapper,
  PlatformCardImage,
  PlatformCardButton,
  PlatformCarouselWrapper,
  HeroSection,
  HeroContainer,
  BadgeDev,
  CTASubtext,
  HeroCarouselWrapper,
  HeroCarouselCard,
  HeroCarouselBackground,
  FloatingChatBtn,
  HeroContent,
  Title,
  Subtitle,
  ButtonGroup,
  CTAButton,
  SecondaryButton,
  QuotesSection,
  QuotesContainer,
  QuoteCard,
  QuoteIconWrapper,
  QuoteText,
  QuoteAuthor,
  FeatureGridSection,
  FeatureGridLeft,
  FeatureGridRight,
  VSAIFeatureCard,
  FeatureIcon,
  FeatureCardTitle,
  FeatureCardText,
  HowItWorksSection,
  HowItWorksContainer,
  HowItWorksBadge,
  HowItWorksTitle,
  HowItWorksSubtitle,
  HowItWorksGrid,
  HowItWorksCard,
  HowItWorksCardHeader,
  HowItWorksCardTitle,
  HowItWorksStepNumber,
  HowItWorksCardText,
  HowItWorksImageWrapper,
  HowItWorksOverlayBlack,
  HowItWorksOverlayGreen,
  HowItWorksDots,
  ComparisonSection,
  ComparisonBadge,
  ComparisonTitle,
  ComparisonGrid,
  ComparisonCardBlue,
  ComparisonCardRed,
  ComparisonCardTitle,
  ComparisonList,
  ComparisonItem,
  ComparisonItemTitle,
  VsBadge,
  FAQSection,
  FAQContainer,
  FAQLeft,
  FAQBadge,
  FAQTitle,
  FAQRight,
  FAQItem,
  FAQQuestionRow,
  FAQQuestionText,
  FAQIconWrapper,
  FAQAnswerWrapper,
  FAQAnswerText,
  PreLaunchCTASection,
  PreLaunchCTAContainer,
  PreLaunchCTALeft,
  PreLaunchCTATitle,
  PreLaunchCTADesc,
  PreLaunchCTAButtonContainer,
  PreLaunchCTAButton,
  PreLaunchCTASubtext,
  PreLaunchCTARight,
  PreLaunchCTAImage,
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
  PricingToggleLabel,
  PricingToggleSwitch,
  EconomyBadge,
  EconomyArrow,
  PricingGrid,
  PricingCard,
  PricingCardTop,
  PricingCardBottom,
  PricingPlanHeader,
  PricingPlanName,
  PricingDescription,
  PricingPrice,
  PricingCurrency,
  PricingAmount,
  PricingPeriod,
  PricingButton,
  PricingFeaturesTitle,
  PricingFeaturesSubtitle,
  PricingFeatures,
  PricingFeature,
  OldFAQSection,
  OldFAQContainer,
  OldFAQTitle,
  OldFAQItem,
  OldFAQQuestion,
  OldFAQAnswer,
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
  MobileSidebarRegisterButton
} from './styles';

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

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const carouselImages = [
    'https://i.pinimg.com/736x/ce/07/25/ce072533ccd80191ab95c532d6380638.jpg',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const platformCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
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
      answer: "A vista ou parcelado no cartão."
    }
  ];
  return (
    <>
      <MetaPixel />
      <HomeContainer>
    
      <Header>
        <Nav>
          <Logo>
            <img src={standi} alt="Standi" style={{ filter: 'brightness(0)' }} />
          </Logo>
          
          <DesktopNav>
            <DesktopNavLink href="#recursos">Produto</DesktopNavLink>
              <DesktopNavLink href="#planos">Preço</DesktopNavLink>
               <DesktopNavLink href="#recursos">Recursos</DesktopNavLink>
            <DesktopNavLink href="#faq">Faq</DesktopNavLink>
           
          </DesktopNav>

          <HeaderRight>
            
          {/* <LoginLink href="/login">Login</LoginLink>*/}
            <GetStartedButton onClick={() => window.open('https://forms.fillout.com/t/prjyisTSa2us', '_blank')}>
              Lista de espera
            </GetStartedButton>
          </HeaderRight>
          
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
                <MobileSidebarNavLink href="#faq" onClick={closeMobileMenu}>
                  Faq
                </MobileSidebarNavLink>
            
              </MobileSidebarNav>
            </MobileSidebar>
          </>
        )}
      </Header>

      <HeroSection style={{ backgroundImage: `url(${heroBgImage})` }}>
        <HeroContainer>
          <HeroContent>
            <BadgeDev>
              PRÉ-LANÇAMENTO ABERTO
            </BadgeDev>
            
            <Title>
              Lance um imóvel em poucos minutos.
            </Title>
            
            <Subtitle>
              A Standi qualifica Leads, gera Criativos com I.A e permite que você faça o Lançamento do seu Imóvel em 1 Clique.
            </Subtitle>
            
            <ButtonGroup>
              <CTAButton onClick={() => window.open('https://forms.fillout.com/t/prjyisTSa2us', '_blank')}>
                Lista de espera aberta
              </CTAButton>
              <SecondaryButton onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
                Fale com um humano <span className="arrow">→</span>
              </SecondaryButton>
            </ButtonGroup>
          </HeroContent>
        </HeroContainer>

        <HeroCarouselBackground style={{ backgroundImage: `url(${heroBgImage})` }}>
          <HeroCarouselWrapper>
            <Slider {...carouselSettings}>
              {carouselImages.map((img, index) => (
                <div key={index}>
                  <HeroCarouselCard>
                    <img src={img} alt={`Empreendimento ${index + 1}`} />
                  </HeroCarouselCard>
                </div>
              ))}
            </Slider>
          </HeroCarouselWrapper>
        </HeroCarouselBackground>
      </HeroSection>

      <PlatformSection id="recursos">
        <PlatformHeader>
          <PlatformBadge>A PLATAFORMA</PlatformBadge>
          <PlatformTitle>Posicionamento e Lançamento em um único lugar</PlatformTitle>
        </PlatformHeader>
        <PlatformGrid>
          <PlatformCard>
            <PlatformCardHeader>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" />
              </svg>
              CRM
            </PlatformCardHeader>
            <PlatformCardTitle>Crm integrado ao seu site e landing page</PlatformCardTitle>
            <PlatformCardText>
              CRM que qualifica antes do lead chegar, ele te mostra quem está ou não pronto para comprar.
            </PlatformCardText>
            <PlatformCardImageWrapper>
              <PlatformCardImage src={imagem4} alt="Projects" />
            </PlatformCardImageWrapper>
          </PlatformCard>

          <PlatformCard>
            <PlatformCardHeader>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" />
              </svg>
              LANÇAMENTO IMOBILIÁRIO
            </PlatformCardHeader>
            <PlatformCardTitle style={{ marginBottom: '2rem !important' }}>Páginas de lançamento, com rastreador e formulario inteligente</PlatformCardTitle>
           
            <PlatformCardImageWrapper>
              <PlatformCardImage src={imagem2} alt="Wiki" />
            </PlatformCardImageWrapper>
          </PlatformCard>

              <PlatformCard>
            <PlatformCardHeader>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" />
              </svg>
              SITE
            </PlatformCardHeader>
            <PlatformCardTitle>Site para Imobiliárias, Construtoras e Incorporadoras</PlatformCardTitle>
           <PlatformCardText>
             Templates prontos para diversos segmentos do mercado imobiliário.
            </PlatformCardText>
            <PlatformCarouselWrapper>
              <Slider {...platformCarouselSettings}>
                <div>
                  <img src={imobiliaria} alt="Imobiliária" />
                </div>
                <div>
                  <img src={construtora} alt="Construtora" />
                </div>
              </Slider>
            </PlatformCarouselWrapper>
          </PlatformCard>
              <PlatformCard>
            <PlatformCardHeader>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" />
              </svg>
              SERVIÇOS
            </PlatformCardHeader>
            <PlatformCardTitle>Landing page Personalizada pela nossa equipe!</PlatformCardTitle>
            <PlatformCardText>
             Para quem quer páginas elegantes e detalhadas!
            </PlatformCardText>
            <PlatformCardImageWrapper>
              <PlatformCardImage src={etapas} alt="Wiki" />
            </PlatformCardImageWrapper>
            <PlatformCardButton>Quero personalizar meu lançamento</PlatformCardButton>
          </PlatformCard>
        </PlatformGrid>
      </PlatformSection>


      <PricingSection id="planos">
        <PlatformHeader>
          <PlatformTitle>Comece grátis, faça upgrade confortavelmente</PlatformTitle>
          <Subtitle style={{ maxWidth: '800px', margin: '1rem auto 2rem' }}>
            Empacotado para equipes modernas, cada um dos nossos planos desbloqueia muito mais que as alternativas disponíveis.
          </Subtitle>
        </PlatformHeader>

        <PricingContainer>
          <PricingToggleContainer>
            <PricingToggle>
              <PricingToggleLabel className={pricingPlan === 'monthly' ? 'active' : ''}>Mensal</PricingToggleLabel>
              <PricingToggleSwitch 
                active={pricingPlan === 'annual'} 
                onClick={() => setPricingPlan(pricingPlan === 'monthly' ? 'annual' : 'monthly')}
              />
              <PricingToggleLabel className={pricingPlan === 'annual' ? 'active' : ''}>Anual</PricingToggleLabel>
            </PricingToggle>
          </PricingToggleContainer>

          <PricingGrid>
            <PricingCard>
              <PricingCardTop>
                <PricingPlanName>Free</PricingPlanName>
                <PricingPrice>
                  <PricingCurrency>R$</PricingCurrency>
                  <PricingAmount>0</PricingAmount>
                  <PricingPeriod>por corretor por mês</PricingPeriod>
                </PricingPrice>
                <PricingDescription>Gerenciamento de lançamentos sem firulas para corretores autônomos.</PricingDescription>
                <PricingButton className="outline">Começar grátis</PricingButton>
              </PricingCardTop>
              <PricingCardBottom>
                <PricingFeaturesTitle>Comece grátis com</PricingFeaturesTitle>
                <PricingFeaturesSubtitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  1 Lançamento ativo
                </PricingFeaturesSubtitle>
                <PricingFeatures>
                  <PricingFeature>1 Landing Page</PricingFeature>
                  <PricingFeature>Criativos básicos</PricingFeature>
                  <PricingFeature>CRM básico</PricingFeature>
                  <PricingFeature>1 usuário</PricingFeature>
                </PricingFeatures>
              </PricingCardBottom>
            </PricingCard>

            <PricingCard>
              <PricingCardTop>
                <PricingPlanHeader>
                  <PricingPlanName>Pro</PricingPlanName>
                  {pricingPlan === 'annual' && <EconomyBadge>ECONOMIZE 25%</EconomyBadge>}
                </PricingPlanHeader>
                <PricingPrice>
                  <PricingCurrency>R$</PricingCurrency>
                  <PricingAmount>{pricingPlan === 'monthly' ? '97' : '72'}</PricingAmount>
                  <PricingPeriod>por corretor por mês</PricingPeriod>
                </PricingPrice>
                <PricingDescription>Projetado e construído para corretores que precisam de mais poder.</PricingDescription>
                <PricingButton>Assinar Pro</PricingButton>
              </PricingCardTop>
              <PricingCardBottom>
                <PricingFeaturesTitle>Tudo no Free +</PricingFeaturesTitle>
                <PricingFeaturesSubtitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  Lançamentos ilimitados
                </PricingFeaturesSubtitle>
                <PricingFeatures>
                  <PricingFeature>Landing Pages ilimitadas</PricingFeature>
                  <PricingFeature>Dashboard Avançado</PricingFeature>
                  <PricingFeature>I.A avançada para criativos</PricingFeature>
                  <PricingFeature>Domínio personalizado</PricingFeature>
                  <PricingFeature>Até 5 usuários</PricingFeature>
                </PricingFeatures>
              </PricingCardBottom>
            </PricingCard>

            <PricingCard>
              <PricingCardTop>
                <PricingPlanHeader>
                  <PricingPlanName>Business</PricingPlanName>
                  {pricingPlan === 'annual' && <EconomyBadge>ECONOMIZE 13%</EconomyBadge>}
                </PricingPlanHeader>
                <PricingPrice>
                  <PricingCurrency>R$</PricingCurrency>
                  <PricingAmount>{pricingPlan === 'monthly' ? '197' : '147'}</PricingAmount>
                  <PricingPeriod>por corretor por mês</PricingPeriod>
                </PricingPrice>
                <PricingDescription>Melhor para grandes imobiliárias e maior controle de corretores.</PricingDescription>
                <PricingButton>Assinar Business</PricingButton>
              </PricingCardTop>
              <PricingCardBottom>
                <PricingFeaturesTitle>Tudo no Pro +</PricingFeaturesTitle>
                <PricingFeaturesSubtitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  Suporte prioritário 24/7
                </PricingFeaturesSubtitle>
                <PricingFeatures>
                  <PricingFeature>Integrações (Zap, Viva Real)</PricingFeature>
                  <PricingFeature>Onboarding dedicado</PricingFeature>
                  <PricingFeature>Relatórios personalizados</PricingFeature>
                  <PricingFeature>Usuários ilimitados</PricingFeature>
                </PricingFeatures>
              </PricingCardBottom>
            </PricingCard>

            <PricingCard>
              <PricingCardTop>
                <PricingPlanName>Criação de Lançamentos</PricingPlanName>
                <PricingPrice>
                  <PricingAmount style={{ fontSize: '1.5rem' }}>Sob Consulta</PricingAmount>
                </PricingPrice>
                <PricingDescription>Serviço extra da Standi para nosso time criar as Landing Pages do seu lançamento.</PricingDescription>
                <PricingButton>Fale conosco</PricingButton>
              </PricingCardTop>
              <PricingCardBottom>
                <PricingFeaturesTitle>Serviço Premium Standi</PricingFeaturesTitle>
                <PricingFeaturesSubtitle>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  LPs criadas por especialistas
                </PricingFeaturesSubtitle>
                <PricingFeatures>
                  <PricingFeature>Design focado em conversão</PricingFeature>
                  <PricingFeature>Copywriting persuasivo</PricingFeature>
                  <PricingFeature>Aprovação antes de ir ao ar</PricingFeature>
                  <PricingFeature>Revisões ilimitadas</PricingFeature>
                </PricingFeatures>
              </PricingCardBottom>
            </PricingCard>
          </PricingGrid>
        </PricingContainer>
      </PricingSection>

      <ComparisonSection>
      <PlatformHeader>
          <PlatformBadge>Comparação</PlatformBadge>
        
        </PlatformHeader>


        <ComparisonTitle>
         Por que nos escolher?  <strong>A vantagem da Standi</strong>
        </ComparisonTitle>

        <ComparisonGrid>
          <ComparisonCardBlue>
            <ComparisonCardTitle>Standi Ai</ComparisonCardTitle>
            <ComparisonList>
              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>Resultados instantâneos: </ComparisonItemTitle>
                  5 minutos do seu tempo.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>Combo lançamento: </ComparisonItemTitle>
                  Gera landing page e criativo para lançamento.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>CRM inteligente: </ComparisonItemTitle>
                  Lead cai no CRM já classificado.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>Foco em lead qualificado: </ComparisonItemTitle>
                  a página tem literalmente um rastreador de lead embutido e formulário de contato. inteligente
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>I.A altamente precisa para gerar os criativos: </ComparisonItemTitle>
                   mantém o layout fiel a página.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>
                  <ComparisonItemTitle>Atende diferentes players imobiliários: </ComparisonItemTitle>
                  crie páginas para diferentes tipologias.
                </span>
              </ComparisonItem>
            </ComparisonList>
          </ComparisonCardBlue>

          <VsBadge>VS</VsBadge>

          <ComparisonCardRed>
            <ComparisonCardTitle>Outros</ComparisonCardTitle>
            <ComparisonList>
              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Vários dias: </ComparisonItemTitle>
                  Tempo é dinheiro que vai pro ralo do seu lançamento.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Instruções tediosas: </ComparisonItemTitle>
                  Precisa falar com Social media e Agência para criar a página.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Caro: </ComparisonItemTitle>
                 R$ 1200,00 reais por LP de lançamento.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Páginas negéricas: </ComparisonItemTitle>
                  Landing pages sem rastreador e form inteligente.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Erro humano: </ComparisonItemTitle>
                  Qualidade diferente a cada vez.
                </span>
              </ComparisonItem>

              <ComparisonItem>
                <svg fill="#dc2626" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>
                  <ComparisonItemTitle>Foco em tudo: </ComparisonItemTitle>
                  Foco pulverizado em diversas areas e não somente no lançamento.
                </span>
              </ComparisonItem>
            </ComparisonList>
          </ComparisonCardRed>
        </ComparisonGrid>
      </ComparisonSection>

      <FAQSection id="faq">
        <FAQContainer>
          <FAQLeft>
            
          <PlatformBadge>FAQ</PlatformBadge>
        
     
            <FAQTitle>
             Tem perguntas?
              <span>Nós temos as respostas.</span>
            </FAQTitle>
          </FAQLeft>

          <FAQRight>
            {[
              {
                question: "O que é a Standi?",
                answer: "É uma plataforma que permite criar um site para imobiliárias, construtoras e incorporadoras em poucos minutos e criar landing pages para lançamentos imobiliários."
              },
              {
                question: "Por que devo escolher a Standi e não criar com uma agência ou com i.a externa?",
                answer: "Porquê quando você cria uma landing page com i.a externa existem muitos erros gerados e com agência é caro, além disso as páginas da Standi tem um qualificador de leads embutido além de gerar os criativos com 1 clique."
              },
              {
                question: "Porque anunciar com uma Landing Page?",
                answer: "Dará a seus lançamentos mais possibilidades de ter leads conscientes, qualificados e consequentemente mais vendas."
              },
              {
                question: "Como são os criativos gerados?",
                answer: "Assim que voce cria uma landing page, você aperta um botão e automaticamente será gerado a partir dos dados da landing page mas com I.A."
              },
              {
                question: "Posso cancelar quando quiser?",
                answer: "Sim, pode cancelar quando quiser."
              },
              {
                question: "Vocês garantem que vou ter resultados?",
                answer: "Quem fala que garante resultados(vendas) está mentindo, nós agilizamos o processo do seu lançamento que permitirá a geração de leads mais quentes."
              }
            ].map((faq, index) => (
              <FAQItem key={index} onClick={() => toggleFaq(index)}>
                <FAQQuestionRow>
                  <FAQQuestionText>{faq.question}</FAQQuestionText>
                  <FAQIconWrapper $isOpen={openFaqIndex === index}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </FAQIconWrapper>
                </FAQQuestionRow>
                <FAQAnswerWrapper $isOpen={openFaqIndex === index}>
                  <FAQAnswerText>{faq.answer}</FAQAnswerText>
                </FAQAnswerWrapper>
              </FAQItem>
            ))}
          </FAQRight>
        </FAQContainer>
      </FAQSection>



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
