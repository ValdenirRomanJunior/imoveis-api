import styled from 'styled-components';

export const SiteContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.div<{ logoSize?: string }>`
  font-size: ${props => {
    switch (props.logoSize) {
      case 'pequena':
        return '1.2rem';
      case 'media':
        return '1.8rem';
      case 'grande':
        return '2.4rem';
      default:
        return '1.5rem';
    }
  }};
  height: ${props => {
    switch (props.logoSize) {
      case 'pequena':
        return '30px';
      case 'media':
        return '45px';
      case 'grande':
        return '60px';
      default:
        return '40px';
    }
  }};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  
  img {
    height: 100%;
    width: auto;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Banner = styled.section<{ bannerImage?: string; defaultBanner: string }>`
  height: 100vh;
  background: ${props => props.bannerImage ? `url('${props.bannerImage}') center/cover` : `url('${props.defaultBanner}') center/cover`};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 80px;
`;

export const BannerContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

export const BannerTitle = styled.h1<{ titleColor?: string; titleSize?: number }>`
  font-size: ${props => props.titleSize ? `${props.titleSize}px` : '3rem'};
  margin-bottom: 2rem;
  color: ${props => props.titleColor || '#ffffff'};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: ${props => props.titleSize ? `${Math.max(props.titleSize * 0.7, 24)}px` : '2rem'};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 10px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

export const SearchButton = styled.button<{ buttonColor?: string }>`
  padding: 1rem 2rem;
  background: ${props => props.buttonColor || props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.buttonColor ? `${props.buttonColor}dd` : props.theme.colors.primaryDark};
  }

  @media (max-width: 768px) {
    border-radius: 0 0 10px 10px;
  }
`;

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2<{ textColor?: string }>`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.textColor || '#333'};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const ServiceCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

export const ServiceIcon = styled.div<{ buttonColor?: string }>`
  font-size: 3rem;
  color: ${props => props.buttonColor || props.theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ServiceTitle = styled.h3<{ textColor?: string }>`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.textColor || '#333'};
`;

export const ServiceDescription = styled.p<{ textColor?: string }>`
  color: ${props => props.textColor ? `${props.textColor}99` : '#666'};
  line-height: 1.6;
`;

export const ContactSection = styled.section`
  background: #f8f9fa;
  padding: 4rem 2rem;
`;

export const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ContactImage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;

export const ContactForm = styled.form<{ textColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.textColor || '#333'};
  }
`;

export const ContactInput = styled.input`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ContactTextarea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ContactSubmitButton = styled.button<{ buttonColor?: string }>`
  padding: 1rem 2rem;
  background: ${props => props.buttonColor || props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.buttonColor ? `${props.buttonColor}dd` : props.theme.colors.primaryDark};
  }
`;

export const AgentSection = styled.section`
  padding: 4rem 2rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const AgentPhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const AgentQuote = styled.blockquote<{ textColor?: string }>`
  font-size: 1.2rem;
  font-style: italic;
  color: ${props => props.textColor ? `${props.textColor}cc` : '#555'};
  line-height: 1.6;
  max-width: 600px;

  strong {
    color: ${props => props.textColor || '#333'};
    font-style: normal;
  }
`;

export const PropertiesSection = styled(Section)`
  background: #f8f9fa;
`;

export const PropertyCard = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  padding: 1.5rem;
`;

export const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const PropertyTitle = styled.h4<{ textColor?: string }>`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.textColor || '#333'};
`;

export const PropertyLocation = styled.p<{ textColor?: string }>`
  color: ${props => props.textColor ? `${props.textColor}99` : '#666'};
  font-size: 0.9rem;
`;

export const NavigationSection = styled.section`
  padding: 2rem;
  background: #f8f9fa;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const NavigationLink = styled.a`
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Footer = styled.footer<{ backgroundColor?: string }>`
  background: ${props => props.backgroundColor || '#333'};
  color: white;
  padding: 3rem 2rem 2rem;
  text-align: center;
`;

export const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const FooterText = styled.p<{ textColor?: string }>`
  color: ${props => props.textColor ? `${props.textColor}cc` : '#ccc'};
  font-size: 0.9rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  margin: 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h2<{ textColor?: string }>`
  margin: 0;
  color: ${props => props.textColor || '#333'};
`;

export const ModalCloseButton = styled.button<{ textColor?: string }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.textColor ? `${props.textColor}99` : '#666'};
  
  &:hover {
    color: ${props => props.textColor || '#333'};
  }
`;

export const ModalBody = styled.div<{ textColor?: string }>`
  color: ${props => props.textColor ? `${props.textColor}99` : '#666'};
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
`;