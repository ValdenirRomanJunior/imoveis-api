import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #3b82f6 100%);
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

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
  margin: 0;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
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
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
  }
`;

// Products Section
export const ProductsSection = styled.section`
  padding: 10rem 2rem 4rem;
  background: white;
  margin-top: 200px; /* Espaço para os mockups */
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProductCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  padding: 2rem;
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
  margin-bottom: 1.5rem;
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
  padding: 6rem 2rem;
  background: white;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  padding: 6rem 2rem;
  background: #f8fafc;
`;

export const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
