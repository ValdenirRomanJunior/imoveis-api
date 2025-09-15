import React from 'react';
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
  ProductTitle,
  ProductDescription,
  ProductFeatures,
  StatsSection,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  TestimonialsSection,
  TestimonialCard,
  TestimonialText,
  TestimonialAuthor,
  TestimonialCompany,
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  Copyright
} from './styles';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header>
        <Nav>
          <Logo>Standi</Logo>
          <NavLinks>
            <NavLink href="#produtos">Produtos</NavLink>
            <NavLink href="#recursos">Recursos</NavLink>
            <NavLink href="#clientes">Clientes</NavLink>
            <NavLink href="#suporte">Suporte</NavLink>
            <LoginButton href="https://app.standi.com.br/login">
              Fazer Login
            </LoginButton>
          </NavLinks>
        </Nav>
      </Header>

      <HeroSection>
        <HeroContent>
          <Title>CRM IMOBILIÁRIO</Title>
          <Subtitle>
            PARA IMOBILIÁRIAS E CONSTRUTORAS
          </Subtitle>
          <p>
            O sistema imobiliário que simplifica sua gestão. Centralize CRM, gestão de aluguéis, 
            gestão de vendas e site em um só lugar, impulsionando suas vendas.
          </p>
          <CTAButton href="https://app.standi.com.br/login">
            Começar Agora
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <ProductsSection id="produtos">
        <SectionTitle>Desafios no mercado imobiliário? Nós temos a resposta</SectionTitle>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem', opacity: 0.8 }}>
          Na Standi você encontra as funcionalidades de 3 sistemas distintos operando em uma única plataforma eficiente e fácil de usar.
        </p>
        
        <ProductsGrid>
          <ProductCard>
            <ProductIcon>🏠</ProductIcon>
            <ProductTitle>CRM Imobiliário</ProductTitle>
            <ProductDescription>
              Gerencie seus leads e imóveis de maneira eficiente e finalize cada vez mais negociações.
            </ProductDescription>
            <ProductFeatures>
              <li>Integração com parceiros</li>
              <li>Funil de oportunidades</li>
              <li>Controle de chaves</li>
              <li>Pipeline de vendas</li>
            </ProductFeatures>
          </ProductCard>

          <ProductCard>
            <ProductIcon>💼</ProductIcon>
            <ProductTitle>Gestão de Aluguéis</ProductTitle>
            <ProductDescription>
              Mantenha sua gestão interna enxuta e eficiente, e veja seu faturamento aumentar exponencialmente.
            </ProductDescription>
            <ProductFeatures>
              <li>Reajuste de contratos</li>
              <li>Repasses automáticos</li>
              <li>DIMOB integrada</li>
              <li>Assinatura eletrônica</li>
            </ProductFeatures>
          </ProductCard>

          <ProductCard>
            <ProductIcon>🌐</ProductIcon>
            <ProductTitle>Site Imobiliário</ProductTitle>
            <ProductDescription>
              Crie o canal ideal de comunicação com os seus clientes e aumente suas taxas de conversão.
            </ProductDescription>
            <ProductFeatures>
              <li>SEO otimizado</li>
              <li>Design responsivo</li>
              <li>Integração com CRM</li>
              <li>Portal personalizado</li>
            </ProductFeatures>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <TestimonialCard>
            <TestimonialText>
              "O sistema é muito inteligente e objetivo. Além de hoje ele entregar todas as ferramentas principais para o mercado imobiliário."
            </TestimonialText>
            <TestimonialAuthor>João Silva</TestimonialAuthor>
            <TestimonialCompany>Diretor da Silva Imóveis</TestimonialCompany>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "A utilização da ferramenta facilita o dia a dia tanto da empresa como dos corretores. Os resultados vêm naturalmente."
            </TestimonialText>
            <TestimonialAuthor>Maria Santos</TestimonialAuthor>
            <TestimonialCompany>Gerente da Santos Negócios</TestimonialCompany>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "Standi é garantia de qualidade. Hoje eu tenho um sistema que eu realmente posso confiar, e isso é bem raro no mercado."
            </TestimonialText>
            <TestimonialAuthor>Carlos Oliveira</TestimonialAuthor>
            <TestimonialCompany>CEO da Oliveira Incorporações</TestimonialCompany>
          </TestimonialCard>
        </div>
      </TestimonialsSection>

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