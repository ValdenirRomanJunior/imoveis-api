import styled from 'styled-components';

export const SiteContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem 0.5rem 3rem;
  background: transparent;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    background: #fff;
    position: fixed;
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
  font-family: 'Inter', sans-serif;
  font-size: 15px;
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
  height: 85vh;
  width: 100%;
  position: relative;
  background: ${props => props.bannerImage ? `url('${props.bannerImage}') center/cover no-repeat` : `url('${props.defaultBanner}') center/cover no-repeat`};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
  color: white;
  overflow: visible;
  transition: background 0.5s ease-in-out;

  /* Overlay sutil estilo Eastate */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: 75vh;
  }
`;

export const BannerContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem 5rem 2rem; /* Reduzido o espaço embaixo para aproximar os elementos da busca */
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 0 1.5rem 6rem 1.5rem;
  }
`;

export const BannerTitle = styled.h1<{ titleColor?: string; titleSize?: number }>`
  font-size: ${props => props.titleSize ? `${Math.min(props.titleSize, 46)}px` : '3.2rem'};
  margin-bottom: 1.5rem;
  color: ${props => props.titleColor || '#ffffff'};
  font-weight: 400; /* Mais fino conforme a imagem */
  line-height: 1.2;
  font-family: 'Inter', -apple-system, sans-serif;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: ${props => props.titleSize ? `${Math.max(props.titleSize * 0.6, 28)}px` : '2.2rem'};
  }
`;

export const BannerButton = styled.a`
  display: inline-block;
  padding: 12px 32px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  transition: all 0.3s;
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
  }
`;

export const BannerIndicators = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 2rem;
  align-items: center;
`;

export const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#000' : '#888'};
  cursor: pointer;
  padding: 0;
  transition: background 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);

  &:hover {
    background: ${props => props.active ? '#000' : '#666'};
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
  padding: 8rem 2rem 4rem 2rem; /* Aumentado padding top para compensar a busca sobreposta */
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2<{ textColor?: string }>`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3.5rem;
  color: ${props => props.textColor || '#1f2937'};
  font-weight: 600;
  font-family: 'Inter', -apple-system, sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
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

/* ===== NOVA SEÇÃO: UNIFIED CONTACT & LOCATION ===== */
export const UnifiedContactSection = styled.section`
  padding: 6rem 0.5rem;
  background: #f4f4f5;
  display: flex;
  justify-content: center;
`;

export const UnifiedContactContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  display: flex;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 1.5rem;
    gap: 2.5rem;
  }
`;

export const InfoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileBlock = styled.div`
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  img {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #111;
    margin: 0;
    font-family: 'Inter', -apple-system, sans-serif;
  }

  p {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
    line-height: 1.4;
    font-family: 'Inter', sans-serif;
  }
`;

export const ContactDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 0 0.5rem;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon-box {
    width: 38px;
    height: 38px;
    background: #111;
    color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .text-box {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 0.9rem;
      font-weight: 600;
      color: #111;
      margin-bottom: 0.1rem;
      font-family: 'Inter', sans-serif;
    }

    span {
      font-size: 0.8rem;
      color: #666;
      font-family: 'Inter', sans-serif;
      line-height: 1.3;
    }
  }
`;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 0.5rem;

  strong {
    font-size: 0.9rem;
    font-weight: 600;
    color: #111;
    font-family: 'Inter', sans-serif;
  }

  .icons {
    display: flex;
    gap: 0.8rem;

    a {
      width: 36px;
      height: 36px;
      background: #f4f4f5;
      color: #111;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        background: #e4e4e7;
      }
    }
  }
`;

export const FormColumn = styled.form`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 1rem;

  @media (max-width: 992px) {
    padding: 0;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #111;
    font-family: 'Inter', sans-serif;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background: #f8f9fa;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    color: #333;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-color: #111;
    }
  }
`;

export const SubmitBtn = styled.button`
  background: #111;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const MapColumn = styled.div`
  flex: 1.2;
  border-radius: 20px;
  overflow: hidden;
  min-height: 350px;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    filter: grayscale(100%) contrast(1.1) opacity(0.8);
  }

  @media (max-width: 992px) {
    min-height: 300px;
  }
`;

/* ===== NOVA SEÇÃO: WHY CHOOSE US ===== */
export const WhyChooseSection = styled.section`
  padding: 6rem 2rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
`;

export const WhyChooseContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

export const WhyChooseLeft = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;

  /* Círculo decorativo azul claro ao fundo */
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 120px;
    height: 120px;
    background: #eef2ff;
    border-radius: 50%;
    z-index: 0;
  }
`;

export const WhyChooseImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  z-index: 1;
  
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

export const ReviewCard = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 260px;
  z-index: 2;

  @media (max-width: 768px) {
    right: 10px;
    bottom: -10px;
    max-width: 220px;
    padding: 1.2rem;
  }
`;

export const Stars = styled.div`
  color: #FFC107;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  letter-spacing: 2px;
`;

export const ReviewText = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  line-height: 1.5;
  margin-bottom: 0.8rem;
  font-family: 'Inter', sans-serif;
`;

export const ReviewAuthor = styled.span`
  font-size: 0.8rem;
  color: #888;
  font-family: 'Inter', sans-serif;
`;

export const WhyChooseRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const WhyChooseTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 2.5rem;
  line-height: 1.2;
  font-family: 'Inter', -apple-system, sans-serif;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

export const FeatureNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f4ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
`;

export const FeatureTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FeatureTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

export const FeatureDesc = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;