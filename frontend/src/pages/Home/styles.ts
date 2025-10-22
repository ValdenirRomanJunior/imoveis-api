import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: 100vh;
  background: white;
  color: white;
`;

// Header Styles
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 22, 40, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
`;

export const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
  margin: 0;

  img {
  
    height: 40px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;

export const LoginButton = styled.a`
  background: transparent;
  color: white !important;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid gray;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

export const RegisterButton = styled.a`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 0.75rem 1.7rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

// Mobile Menu Styles
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileSidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background: rgba(10, 22, 40, 0.98);
  backdrop-filter: blur(20px);
  z-index: 2000;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  border-right: 1px solid rgba(59, 130, 246, 0.2);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileSidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileSidebarHeader = styled.div`
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MobileSidebarLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  
  img {
    height: 32px;
  }
`;

export const MobileSidebarCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const MobileSidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 2rem;
  flex: 1;
`;

export const MobileSidebarNavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b82f6;
    padding-left: 1rem;
  }
`;

export const MobileSidebarLoginButton = styled.a`
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  margin: 2rem;
  transition: all 0.3s ease;
  border: 1px solid gray;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

export const MobileSidebarRegisterButton = styled.a`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  margin: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
`;

// Hero Section
export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem 4rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%233b82f6" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #93c5fd;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: .8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  z-index:1000;
  cursor:pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
  }
`;

// Products Section
export const ProductsSection = styled.section`
  padding: 1rem 0.5rem 3rem 0.5rem;
  background: white;
  margin-top: 170px; /* Espaço para os mockups */

  @media (min-width: 768px) {
  padding: 10rem 2rem 4rem;
  }

`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;

  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;



export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

export const ProductCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  padding: 2rem;
  height: 250px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductIcon = styled.div`
  position: relative;
  color: #6b7280;
    width: 34px;
    height: 34px;
 
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
`;

export const ProductTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #6b7280;
  font-weight: 600;
  line-height: 1.4;
`;

export const ProductDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #9ca3af;
`;

export const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  li {
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: #9ca3af;
    text-align: center;
    position: relative;
    
    &::before {
      content: "✓";
      color: #10b981;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 1rem 1rem;
  background: white;
  position: relative;
  overflow: hidden;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
  border-radius: 15px;
  padding: 1rem;
  color: white;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
  border-radius: 15px;
  padding: 2rem;
  color: white;
  position: relative;
  z-index: 2;
  }
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

// Estilos para os círculos animados com imagens de pessoas
export const AnimatedCirclesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

export const AnimatedCircle = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &.left-to-right {
    animation: moveLeftToRight 15s linear infinite;
  }
  
  &.right-to-left {
    animation: moveRightToLeft 15s linear infinite;
  }
  
  @keyframes moveLeftToRight {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(calc(100vw + 100px));
    }
  }
  
  @keyframes moveRightToLeft {
    0% {
      transform: translateX(calc(100vw + 100px));
    }
    100% {
      transform: translateX(-100px);
    }
  }
`;

export const CircleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

// Botão "Testar Grátis Agora" para as seções
export const TestFreeButton = styled.button`
  display: block;
  margin: 6rem auto 0;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Testimonials Section
export const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

export const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding: 0 1rem;
    margin: 0 -1rem;
    
    &::-webkit-scrollbar {
      height: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(59, 130, 246, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(59, 130, 246, 0.3);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(59, 130, 246, 0.5);
    }
  }
`;

export const TestimonialCard = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(59, 130, 246, 0.5);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-width: 300px;
    flex-shrink: 0;
    scroll-snap-align: center;
  }
`;

export const TestimonialAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 3px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
    transform: scale(1.05);
  }
`;

export const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: #666;
`;

export const TestimonialAuthor = styled.div`
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

export const TestimonialCompany = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

// Footer
export const Footer = styled.footer`
  background: rgba(10, 22, 40, 0.95);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const FooterSection = styled.div`
  
`;

export const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #3b82f6;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;

export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
  text-align: center;
`;

export const Copyright = styled.p`
  opacity: 0.6;
  margin: 0;
`;

// Legacy styles for compatibility

export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  h3 {
    color: #3b82f6;
    margin-bottom: 1rem;
  }
`;

export const CTASection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(30, 58, 138, 0.1);
`;

// FAQ Section
export const FAQSection = styled.section`
  padding: 6rem 1rem;
  background: #f8fafc;

  @media screen and(min-width:768px){
    padding: 6rem 2rem;
  background: #f8fafc;
  }
`;

export const FAQContainer = styled.div`
  width: 100%;
  margin: 0 auto;

 @media (min-width:768px){
  width: 80% !important;
 }
`;

export const FAQTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: left;
  margin-bottom: 3rem;
  color: #1e293b;
  
  &::before {
    content: "FAQ";
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #3b82f6;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }
`;

export const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f8fafc;
  }

  &::after {
    content: "▼";
    font-size: 0.8rem;
    color: #64748b;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  &.active::after {
    transform: rotate(180deg);
  }
`;

export const FAQAnswer = styled.div`
  padding: 0 2rem 1.5rem;
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
  display: none;

  &.active {
    display: block;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Pricing Section Styles
export const PricingSection = styled.section`
  padding: 6rem 1.2rem;
  background: #f8fafc;
`;

export const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PricingToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  position: relative;
`;

export const PricingToggle = styled.div`
  display: flex;
  background: #e5e7eb;
  border-radius: 50px;
  padding: 4px;
  position: relative;
`;

export const PricingToggleButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 46px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  min-width: 100px;
  
  ${props => props.active ? `
    background: #3b82f6;
    color: white;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  ` : `
    background: transparent;
    color: #6b7280;
  `}
  
  &:hover {
    ${props => !props.active && `
      color: #374151;
    `}
  }
`;

export const EconomyBadge = styled.div`
  position: absolute;
  top: 65px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.7rem;
  
  @media (min-width: 768px) {
  position: absolute;
  top: 65px;
  left: 400px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9rem;


  }
`;

export const EconomyArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid #3b82f6;
  transform: rotate(-45deg);
  
  @media (min-width: 768px) {
    transform: rotate(-30deg);

  }
`;

export const PricingGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  
  @media (min-width: 678px) {
    justify-content: center;
    align-items: flex-start;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const PricingCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  text-align: center;
  position: relative;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: auto;
 
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 678px) {
    width: 350px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
    border-color: #3b82f6;
  }

  &.popular {
    border-color: #3b82f6;
    transform: scale(1.02);
    
    &::before {
      content: "✨ MAIS POPULAR";
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 1px;
    }
    
    &:hover {
      transform: translateY(-8px) scale(1.02);
    }
  }


`;

export const PricingIcon = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 1.2rem;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #1e3a8a;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
`;

export const PricingPlanName = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

export const PricingDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

export const PricingPrice = styled.div`
  margin-bottom: 0.5rem;
`;

export const PricingCurrency = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b82f6;
  vertical-align: top;
`;

export const PricingAmount = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  color: #3b82f6;
  line-height: 1;
`;

export const PricingPeriod = styled.span`
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
`;

export const PricingNote = styled.p`
  font-size: 0.8rem;
  color: #9ca3af;
  font-style: italic;
  margin-bottom: 1rem;
`;

export const PricingButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.outline {
    background: transparent;
    color: #3b82f6;
    border: 2px solid #3b82f6;
    text-transform: uppercase;
    
    &:hover {
      background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
      color: white;
      border-color: transparent;
    }
  }
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;
`;

export const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #6b7280;
  
  &::before {
    content: "✓";
    color: #6b7280;
    font-weight: bold;
    margin-right: 0.75rem;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  &.highlight {
    color: #1e293b;
    font-weight: 600;
  }
`;

// Call to Action Banner
export const CallToActionBanner = styled.section`
  height: 300px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  margin: 0 auto 50px;
  width: 90%; 
  border: 1px solid #e5e7eb;
  border-radius: 15px;

  @media (min-width: 768px) {
  flex-direction: row;
  height: 170px;
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0 auto 50px;
  width: 80%;
  
    border: 1px solid #e5e7eb;
  border-radius: 15px;
  }


`;

export const CTALeftSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  position: relative;

  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 70px 30px 0 0;
    border-color: transparent transparent transparent transparent;
  }
`;

export const CTARightSide = styled.div`
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  background: #34c5070d;
  position: relative;

  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 70px 30px;
    border-color: transparent transparent transparent transparent;
  }
`;

export const CTAText = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const CTABannerButtonBottom = styled.button`
  background:#3b82f6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size:1rem !important;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (min-width: 768px) {
    padding : 0.4rem 0.8rem;
    font-size: 1.2rem !important;
  }
`;

export const WhatsAppIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(37, 211, 102, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #25d366;
  font-size: 1.5rem;
`;

export const WhatsAppText = styled.span`
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const PersonImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3b82f6;
    transform: scale(1.05);
  }
`;

// Seção Recursos
export const ResourcesSection = styled.section`
  padding: 2rem 1rem 2rem 1rem;
  background: white;
`;

export const ResourcesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ResourcesTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ResourcesSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

export const ResourcesContent = styled.div`
  background: #f8fafc;
  border-radius: 20px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  min-height: 500px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem;
    min-height: auto;
  }
`;

export const ResourcesNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ResourceNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }
  
  &.active {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
    color: #3b82f6;
  }
`;

export const ResourceNavIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  flex-shrink: 0;
`;

export const ResourceMockupArea = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
  position: relative;

`;

export const ResourceMockupHeader = styled.div`
  position: absolute;
  top: -25px;
  left: 0px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 250px;

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1e293b;
  }	

  p{
  font-size:0.8rem;
  }

  @media screen and (min-width: 768px) {
   position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  }
`;

export const ResourceMockupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
`;

export const ResourceMockupSubtitle = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  max-width: 300px;
  line-height: 1.4;
`;

export const ResourceMockupImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
`;

export const ResourceMockupPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 1.1rem;
  text-align: center;
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;
