import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiUsers, HiChartBar, HiClock } from 'react-icons/hi';
import tela1 from '../../assets/images/tela-1.png';
import tela2 from '../../assets/images/tela-2.png';
import google from '../../assets/images/google.png'
import gpt from '../../assets/images/gpt.webp'
import standi from '../../assets/images/logo-sem fundo.png'
import {
  HomeContainer,
  Header,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  LoginButton,
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
  StatsSection,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  TestimonialsSection,
  TestimonialsContainer,
  TestimonialCard,
  TestimonialAvatar,
  TestimonialText,
  TestimonialAuthor,
  TestimonialCompany,
  FAQSection,
  FAQContainer,
  FAQTitle,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  Copyright,



} from './styles';

  const styles = `
    .container-main-mockup {
      position: absolute;
      top: calc(60% + 40px);
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: transparent;
      color: #f3f4f6; /* gray-100 */
      font-family: 'Inter', sans-serif;
    }
    
    .mockup-section {
      position: relative;
      width: 100%;
      max-width: 80rem; /* w-full max-w-5xl, equivalente a 1024px */
      height: 31.25rem; /* h-[500px] */
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

    .monitor-mockup img {
      width: 100%;
      height: 90%;
      object-fit: cover;

     
    }

    .phone-mockup {
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
    
    .phone-mockup img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 2rem;
    }
  `;


const Home: React.FC = () => {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "É possível gerenciar mais de uma filial em um único sistema imobiliário?",
      answer: "Sim, nosso sistema permite o gerenciamento de múltiplas filiais em uma única plataforma. Você pode controlar diferentes unidades, equipes e relatórios de forma centralizada, mantendo a organização e eficiência operacional."
    },
    {
      question: "Como funciona a integração com portais?",
      answer: "Nossa plataforma oferece integração automática com os principais portais imobiliários do mercado, como Viva Real, ZAP Imóveis e OLX. Os anúncios são sincronizados automaticamente, evitando trabalho manual e garantindo que suas propriedades estejam sempre atualizadas."
    },
    {
      question: "É necessário conhecimento avançado para utilizar o sistema Jetimob?",
      answer: "Não, o sistema foi desenvolvido com foco na usabilidade. Oferecemos uma interface intuitiva e treinamento completo para sua equipe. Além disso, nosso suporte técnico está sempre disponível para auxiliar em qualquer dúvida."
    },
    {
      question: "É possível gerar relatórios no sistema Jetimob?",
      answer: "Sim, o sistema possui um módulo completo de relatórios gerenciais. Você pode gerar relatórios de vendas, comissões, performance de corretores, análise de mercado e muito mais, com dados em tempo real e exportação para diversos formatos."
    },
    {
      question: "O que analisar antes de contratar um sistema imobiliário?",
      answer: "Antes de contratar, avalie: facilidade de uso, integrações disponíveis, suporte técnico, segurança dos dados, escalabilidade, custo-benefício e se atende às necessidades específicas do seu negócio. Também é importante verificar referências de outros clientes."
    }
  ];
  return (
    <HomeContainer>
      <Header>
        <Nav>
          <Logo>Standi</Logo>
          <NavLinks>
            <NavLink href="#produtos">Produtos</NavLink>
            <NavLink href="#recursos">Recursos</NavLink>
            <NavLink href="#planos">Planos</NavLink>
            <NavLink href="#suporte">Suporte</NavLink>
            <LoginButton as={Link} to="/login">
              Fazer Login
            </LoginButton>
          </NavLinks>
        </Nav>
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
            <Title>CRM IMOBILIÁRIO</Title>
            <Subtitle>
              PARA IMOBILIÁRIAS E CONSTRUTORAS
            </Subtitle>
            <p>
              O sistema imobiliário que simplifica sua gestão. Centralize CRM, gestão de aluguéis, 
              gestão de vendas e site em um só lugar, impulsionando suas vendas.
            </p>
            <CTAButton as={Link} to="/login">
              Começar Agora
            </CTAButton>
         
          

        </HeroContent>
        
      </HeroSection>

      {/* Container dos Mockups posicionado 40px abaixo do botão */}
      <style>{styles}</style>
      <div className="container-main-mockup">

        {/* Frase manuscrita e seta do lado esquerdo dos mockups */}
        <div className="absolute left-[-70px] top-20 transform -translate-y-1/2">
          <div className="font-handwriting text-green-300 text-lg transform rotate-5 whitespace-nowrap mb-2">
            Edite seu site como quiser
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
        
    {/* Frase manuscrita e seta do lado esquerdo dos mockups */}
        <div className="absolute right-[-90px] top-20 transform -translate-y-1/2">
          <div className="font-handwriting text-green-300 text-lg transform rotate-5 whitespace-nowrap mb-2">
            Edite seu site como quiser
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
              src={tela1}
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
        <SectionTitle>Porque eu deveria ter um site com Standi?</SectionTitle>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem', color: '#666' }}>
          Soluções completas para o seu negócio imobiliário
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
              <ProductTitle>Site otimizado para GEO (busca por I.A) e SEO do Google</ProductTitle>
              <ProductDescription>
                Seu site será encontrado facilmente pelos clientes através de buscas inteligentes e otimização para mecanismos de busca.
              </ProductDescription>
           
            </ProductContent>
          </ProductCard>

          <ProductCard>
             <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>

            <ProductIcon>
           <img src={gpt} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Google</span>
            </div>
            <ProductContent>
              <ProductTitle>Fácil de editar, sem código e sem programador</ProductTitle>
              <ProductDescription>
                Edite seu site de forma intuitiva, sem conhecimento técnico. Tudo na palma da sua mão.
              </ProductDescription>
           
            </ProductContent>
          </ProductCard>

          <ProductCard>
          <div style={{ display: 'flex', alignItems: 'flex-start' ,justifyContent:'left', width:'100%'}}>

            <ProductIcon>
             <img src={standi} alt="Google" />
            </ProductIcon>
            <span style={{color:'#000',fontSize:'1.2rem', fontWeight:'600', marginLeft:'10px'}}>Google</span>
            </div>
            <ProductContent>
              <ProductTitle>Site Pronto assim que cria a conta</ProductTitle>
              <ProductDescription>
                Seu site fica disponível instantaneamente após o cadastro. Comece a vender imediatamente.
              </ProductDescription>
            
            </ProductContent>
          </ProductCard>
        </ProductsGrid>
      </ProductsSection>



      <StatsSection>
        <SectionTitle>Milhares de usuários confiam na Standi diariamente</SectionTitle>
        <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
          Com anos de experiência no mercado, a Standi atende centenas de empresas do mercado imobiliário.
        </p>
        
        <StatsGrid>
          <StatCard>
            <StatNumber>5+</StatNumber>
            <StatLabel>anos de mercado</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>2K+</StatNumber>
            <StatLabel>usuários ativos</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>500+</StatNumber>
            <StatLabel>clientes ativos</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <TestimonialsSection>
        <SectionTitle>Quem conhece recomenda!</SectionTitle>
        <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
          São vários os cases de sucesso entre nossos usuários. Conheça o que nossos clientes têm a dizer:
        </p>
        
        <TestimonialsContainer>
          <TestimonialCard>
            <TestimonialAvatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Silva" />
            <TestimonialText>
              "O sistema é muito inteligente e objetivo. Além de hoje ele entregar todas as ferramentas principais para o mercado imobiliário."
            </TestimonialText>
            <TestimonialAuthor>João Silva</TestimonialAuthor>
            <TestimonialCompany>Diretor da Silva Imóveis</TestimonialCompany>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialAvatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Santos" />
            <TestimonialText>
              "A utilização da ferramenta facilita o dia a dia tanto da empresa como dos corretores. Os resultados vêm naturalmente."
            </TestimonialText>
            <TestimonialAuthor>Maria Santos</TestimonialAuthor>
            <TestimonialCompany>Gerente da Santos Negócios</TestimonialCompany>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialAvatar src="https://randomuser.me/api/portraits/men/56.jpg" alt="Carlos Oliveira" />
            <TestimonialText>
              "Standi é garantia de qualidade. Hoje eu tenho um sistema que eu realmente posso confiar, e isso é bem raro no mercado."
            </TestimonialText>
            <TestimonialAuthor>Carlos Oliveira</TestimonialAuthor>
            <TestimonialCompany>CEO da Oliveira Incorporações</TestimonialCompany>
          </TestimonialCard>
        </TestimonialsContainer>
      </TestimonialsSection>

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
              <FooterLink href="#">Gestão de Aluguéis</FooterLink>
              <FooterLink href="#">Site Imobiliário</FooterLink>
              <FooterLink href="#">Gestão Financeira</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Recursos</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Pipeline de Vendas</FooterLink>
              <FooterLink href="#">Controle de Chaves</FooterLink>
              <FooterLink href="#">Relatórios</FooterLink>
              <FooterLink href="#">Integrações</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Suporte</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Central de Ajuda</FooterLink>
              <FooterLink href="#">Treinamentos</FooterLink>
              <FooterLink href="#">Contato</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © 2024 Standi. Todos os direitos reservados.
          </Copyright>
        </FooterBottom>
      </Footer>
    </HomeContainer>
  );
};

export default Home;