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
import heroImage from '../../assets/images/bg-principal-home.png';
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
  HeroContainer,
  BadgeDev,
  CTASubtext,
  HeroImageWrapper,
  FloatingChatBtn,
  HeroContent,
  Title,
  Subtitle,
  CTAButton,
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
            <img src={standi} alt="Standi" style={{ filter: 'brightness(0) invert(1)' }} />
            
          </Logo>
          
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
              </MobileSidebarNav>
            </MobileSidebar>
          </>
        )}
      </Header>

      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <BadgeDev>
              Pré-Lançamento Aberto
            </BadgeDev>
            
            <Title>
              Lance um imóvel em poucos minutos.
            </Title>
            
            <Subtitle>
            LP que qualifica Leads, I.A que Gera Criativos <strong>Lance em 1 Clique.</strong>
            </Subtitle>
            
            <CTAButton onClick={() => window.open('https://forms.fillout.com/t/prjyisTSa2us', '_blank')}>
              Lista de espera <span className="free">aberta</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </CTAButton>
            
            <CTASubtext>
              Desconto de 30% | No lançamento
            </CTASubtext>
          </HeroContent>

          <HeroImageWrapper>
            <img src={heroImage} alt="Hero Section Image" />
          </HeroImageWrapper>
        </HeroContainer>
      </HeroSection>

      <QuotesSection>
        <QuotesContainer>
          <QuoteCard>
            <QuoteIconWrapper>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
              </svg>
            </QuoteIconWrapper>
            <QuoteText>É indiscutivel que a Standi facilitou o nosso lançamento.</QuoteText>
            <QuoteAuthor>IRONCORP</QuoteAuthor>
          </QuoteCard>

          <QuoteCard>
            <QuoteIconWrapper>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
              </svg>
            </QuoteIconWrapper>
            <QuoteText>Criar Landing Page e Criativos Agora ficou fácil.</QuoteText>
            <QuoteAuthor>SIDE URBAN<br/></QuoteAuthor>
          </QuoteCard>

          <QuoteCard>
            <QuoteIconWrapper>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
              </svg>
            </QuoteIconWrapper>
            <QuoteText> A página literalmente tem um qualificador embutido.</QuoteText>
            <QuoteAuthor style={{textTransform: 'lowercase', letterSpacing: '-1px'}}>Ativo imobiliaria</QuoteAuthor>
          </QuoteCard>  

          <QuoteCard>
            <QuoteIconWrapper>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
              </svg>
            </QuoteIconWrapper>
            <QuoteText>A contrutora me passa os dados crio a LP e criativos facilmente.</QuoteText>
            <QuoteAuthor>TC <span style={{fontWeight: '500', textTransform: 'none', letterSpacing: '0'}}>Imóveis</span></QuoteAuthor>
          </QuoteCard>
        </QuotesContainer>
      </QuotesSection>

      <FeatureGridSection>
        <FeatureGridLeft>
          <BadgeDev style={{ backgroundColor: '#1f2937', color: '#86efac' }}>
            <span style={{ marginRight: '0.5rem' }}>🛏️</span> Processo simplificado
          </BadgeDev>
          <Title style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            Faça lançamentos em minutos com maturidade
          </Title>
          <CTAButton onClick={() => window.open('https://forms.fillout.com/t/prjyisTSa2us', '_blank')} style={{ width: '100%', marginBottom: '1rem' }}>
            Lista de espera <span className="free">aberta</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </CTAButton>
          <CTASubtext>Desconto de 30% | No lançamento</CTASubtext>
        </FeatureGridLeft>

        <FeatureGridRight>
          <VSAIFeatureCard>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7M14 14l-4 4M10 10l4-4"/>
              </svg>
            </FeatureIcon>
            <FeatureCardTitle>Fácil de usar</FeatureCardTitle>
            <FeatureCardText>
              Crie Landing Pages e Criativos  <strong>em 1 clique.</strong>
            </FeatureCardText>
          </VSAIFeatureCard>

          <VSAIFeatureCard>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </FeatureIcon>
            <FeatureCardTitle>Resultados instantâneos</FeatureCardTitle>
            <FeatureCardText>
              Obtenha leads qualificados com <strong>rastreador embutido.</strong> Chega de leads frios.
            </FeatureCardText>
          </VSAIFeatureCard>

          <VSAIFeatureCard>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </FeatureIcon>
            <FeatureCardTitle>Preço Baixo</FeatureCardTitle>
            <FeatureCardText>
              Você pode começar com <strong>com pouco</strong> Isso é mais barato do que a maioria das agências cobra por uma única página.
            </FeatureCardText>
          </VSAIFeatureCard>

          <VSAIFeatureCard>
            <FeatureIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.84-10.36L2 8"></path>
              </svg>
            </FeatureIcon>
            <FeatureCardTitle>Ciclo ilimitado</FeatureCardTitle>
            <FeatureCardText>
               Em breve a standi terá novidades e seu lançamento completo, <strong>estará aqui</strong> na Standi.
            </FeatureCardText>
          </VSAIFeatureCard>
        </FeatureGridRight>
      </FeatureGridSection>

      <HowItWorksSection>
        <HowItWorksContainer>
        <ComparisonBadge>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"></path>
          </svg>
          Como funciona?
        </ComparisonBadge>
          <HowItWorksTitle>
            Obtenha resultados excelentes <strong>Em poucos minutos</strong>
          </HowItWorksTitle>
          <HowItWorksSubtitle>
            Siga<strong> três passos simples</strong> para transformar seus lançamentos imobiliários.
          </HowItWorksSubtitle>

          <HowItWorksGrid>
            <HowItWorksCard>
              <HowItWorksCardHeader>
                <HowItWorksCardTitle>Clique em "Criar página"</HowItWorksCardTitle>
                <HowItWorksStepNumber>1</HowItWorksStepNumber>
              </HowItWorksCardHeader>
              <HowItWorksCardText>Inicie o processo rapidamente no nosso painel.</HowItWorksCardText>
              <HowItWorksImageWrapper>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid #e2e8f0', borderRadius: '1rem' }}>
                  <div style={{ padding: '14px 28px', backgroundColor: '#2563eb', color: 'white', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px 0 rgba(37,99,235,0.39)', fontSize: '1.1rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                    Criar página
                  </div>
                  <svg style={{ position: 'absolute', top: '55%', left: '55%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1"><path d="M5 3l7 19 3-8 8-3-18-8z"/></svg>
                </div>
              </HowItWorksImageWrapper>
            </HowItWorksCard>

            <HowItWorksCard>
              <HowItWorksCardHeader>
                <HowItWorksCardTitle>Clique em "Gerar criativos"</HowItWorksCardTitle>
                <HowItWorksStepNumber>2</HowItWorksStepNumber>
              </HowItWorksCardHeader>
              <HowItWorksCardText>A I.A. cria seus anúncios automaticamente.</HowItWorksCardText>
              <HowItWorksImageWrapper>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexDirection: 'column', gap: '20px', border: '1px solid #e2e8f0', borderRadius: '1rem' }}>
                  <div style={{ width: '70%', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px' }}></div>
                  <div style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: 'white', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px 0 rgba(139,92,246,0.39)', fontSize: '1.1rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Gerar criativos
                  </div>
                  <svg style={{ position: 'absolute', top: '65%', left: '55%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1"><path d="M5 3l7 19 3-8 8-3-18-8z"/></svg>
                </div>
                <HowItWorksOverlayBlack>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l-1.5 4.5L7 9l4.5 1.5L13 15l1.5-4.5L19 9l-4.5-1.5L13 3z"/>
                  </svg>
                  Gerando com I.A...
                </HowItWorksOverlayBlack>
              </HowItWorksImageWrapper>
            </HowItWorksCard>

            <HowItWorksCard>
              <HowItWorksCardHeader>
                <HowItWorksCardTitle>Pronto para usar</HowItWorksCardTitle>
                <HowItWorksStepNumber>3</HowItWorksStepNumber>
              </HowItWorksCardHeader>
              <HowItWorksCardText>Sua página e criativos gerados com sucesso.</HowItWorksCardText>
              <HowItWorksImageWrapper>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '20px', boxSizing: 'border-box', borderRadius: '1rem' }}>
                  {/* Mock Landing Page */}
                  <div style={{ width: '45%', height: '100%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)' }}>
                    <div style={{ height: '35%', backgroundColor: '#94a3b8' }}></div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ width: '70%', height: '10px', backgroundColor: '#cbd5e1', borderRadius: '4px' }}></div>
                      <div style={{ width: '40%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
                      <div style={{ width: '100%', height: '20px', backgroundColor: '#3b82f6', borderRadius: '4px', marginTop: '12px' }}></div>
                    </div>
                  </div>
                  {/* Mock Ad */}
                  <div style={{ width: '45%', aspectRatio: '1/1', backgroundColor: 'white', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', border: '2px solid #8b5cf6' }}>
                    <div style={{ width: '100%', height: '65%', backgroundColor: '#94a3b8', borderRadius: '4px' }}></div>
                    <div style={{ width: '100%', height: '16px', backgroundColor: '#8b5cf6', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <HowItWorksOverlayGreen>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                  </svg>
                  Combo Lançamento Completo!
                </HowItWorksOverlayGreen>
              </HowItWorksImageWrapper>
            </HowItWorksCard>
          </HowItWorksGrid>

          <HowItWorksDots>
            <div className="dot"></div>
            <div className="dot active"></div>
            <div className="dot"></div>
          </HowItWorksDots>
        </HowItWorksContainer>
      </HowItWorksSection>

      <ComparisonSection>
        <ComparisonBadge>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"></path>
          </svg>
          Compare e veja
        </ComparisonBadge>

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

      <FAQSection>
        <FAQContainer>
          <FAQLeft>
            <FAQBadge>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              FAQ
            </FAQBadge>
            <FAQTitle>
             Tem perguntas?
              <span>Nós temos as respostas.</span>
            </FAQTitle>
          </FAQLeft>

          <FAQRight>
            {[
              {
                question: "O que é a Standi lançamentos imobiliários?",
                answer: "É uma plataforma que permite você criar landing pages e criativos para lançamentos imobiliários."
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



  

      <Footer style={{ backgroundColor: '#0a1628', color: 'white', padding: '4rem 2rem 2rem' }}>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>FACEBOOK</span>
                </a>
                <a href="https://www.instagram.com/standi.com.br/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', backgroundColor: '#1e293b', borderRadius: '0.5rem', textDecoration: 'none', color: 'white', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>INSTAGRAM</span>
                </a>
                <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', backgroundColor: '#1e293b', borderRadius: '0.5rem', textDecoration: 'none', color: 'white', gap: '0.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
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
