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
  padding: 8rem 2rem 4rem;
  position: relative;
  
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
  padding: 6rem 2rem;
  background: rgba(30, 58, 138, 0.1);
  backdrop-filter: blur(10px);
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
  }
`;

export const ProductIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #3b82f6;
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

export const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  
  li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }
  }
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(10, 22, 40, 0.8);
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
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Testimonials Section
export const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(30, 58, 138, 0.1);
`;

export const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

export const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  opacity: 0.9;
`;

export const TestimonialAuthor = styled.div`
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

export const TestimonialCompany = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
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
export const FeatureSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 2rem auto 0;
  }
`;

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