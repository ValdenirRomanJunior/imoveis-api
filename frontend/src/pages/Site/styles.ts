import styled from 'styled-components';

export const SiteContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background: transparent;
  position: relative;
  transition: all 0.3s ease;
  border-bottom: 1px solid #dededeff;

  .header-divider {
    display: block;
  }

  @media (max-width: 767px) {
    padding: 1rem;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .header-divider {
      display: none !important;
    }
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
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 767px) {
    display: flex; /* Mudado de none para flex para manter o ícone visível */
    margin-left: auto; /* Empurra para a direita se o logo não ocupar todo o espaço */
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
  cursor: pointer;
  color: #333;
  padding: 0;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2b3954c6; /* Fundo azul escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  z-index: 50;
  border-top: 1px solid rgba(255,255,255,0.1);
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-top: none;
  }
`;

export const MenuLinkItem = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    color: #333;
    font-size: 16px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
  }
`;

export const MenuButtonOutline = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #fff;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.1);
  }

  @media (max-width: 768px) {
    color: #333;
    border-color: #333;
    margin-top: 10px;
  }
`;

export const MenuButtonSolid = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #00a8e8;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 168, 232, 0.1);
  }

  @media (max-width: 768px) {
    color: #00a8e8;
    border-color: #00a8e8;
    margin-top: 10px;
  }
`;

export const Banner = styled.section<{ bannerImage?: string; defaultBanner: string }>`
  height: 65vh;
  width: 100%;
  position: relative;
  background-image: ${props => props.bannerImage ? `url('${props.bannerImage}')` : `url('${props.defaultBanner}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
  color: white;
  overflow: visible;
  transition: background 0.5s ease-in-out;

  &::before {
    display: none;
  }

  @media (max-width: 767px) {
    height: 95vh;
    padding-top: 80px; /* Space for the fixed header */
    padding-bottom: 30px;
    align-items: center;
    justify-content: center;
  }
`;

export const BannerContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem 5rem 2rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;


  @media (max-width: 767px) {
    padding: 0 1.5rem 1rem 1.5rem;
    margin-top: 6rem;
  }
`;

export const BannerTitle = styled.h1<{ titleColor?: string; titleSize?: number }>`
  font-size: ${props => props.titleSize ? `${Math.min(props.titleSize, 46)}px` : '3.2rem'};
  margin-bottom: 1.5rem;
  color: ${props => props.titleColor || '#ffffff'};
  font-weight: 600; /* Ajustado peso para combinar com Parkinsans */
  line-height: 1.2;
  font-family: 'Parkinsans', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  max-width: 800px;
  text-align: center;

  @media (max-width: 767px) {
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

export const BannerSearchWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  transform: translateY(50%); /* To make it overlap the edge, or 0 if it should be fully inside */

  @media (max-width: 767px) {

    bottom: -20%;
    padding: 0 0;
     width: 100%;
  
     
  }
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
  padding: 11rem 1rem 1rem 1rem; /* Diminuído padding bottom de 4rem para 1rem */
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding-top: 23rem;
  }
`;

export const SectionTitle = styled.h2<{ textColor?: string }>`
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  color: #6b6f70;
  font-weight: 300;
  font-family: 'Parkinsans', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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
    color: #6b6f70;
    font-family: 'Parkinsans', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 600;
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
  background: ${props => props.buttonColor || props.theme.colors.primaryDark || props.theme.colors.primary};
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
  max-width: 1400px;
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
  background: ${props => props.backgroundColor || '#1C1C38'};
  color: white;
  padding: 4rem 2rem 2rem;
  font-family: 'Inter', sans-serif;
  position: relative;
`;

export const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 3rem;
`;

export const FooterLogoColumn = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  img {
    max-width: 150px;
    height: auto;
  
  }

  h2 {
    font-size: 2.5rem;
    font-family: 'Parkinsans', sans-serif;
    color: white;
    margin: 0;
  }
`;

export const FooterLinksColumn = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const FooterLinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
    font-family: 'Inter', sans-serif;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 400;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }

  .sub-logo {
    margin-top: 0.5rem;
    max-width: 120px;
    height: auto;
    filter: brightness(0) invert(1);
  }
`;

export const FooterContactColumn = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.2rem;
  text-align: right;

  .footer-phone {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    color: white;
    font-family: 'Inter', sans-serif;
  }

  .footer-creci {
    font-size: 0.9rem;
    color: white;
    margin: 0;
    font-weight: 500;
  }

  @media (max-width: 992px) {
    align-items: flex-start;
    text-align: left;
  }
`;

export const SocialLinksRow = styled.div`
  display: flex;
  gap: 0.8rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--brand-color, #FF5317);
    color: white;
    border-radius: 50%;
    font-size: 1.2rem;
    transition: background 0.3s;
    text-decoration: none;

    &:hover {
      background: #1a253a;
    }
  }
`;

export const FooterBottomLine = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
`;

export const ScrollToTopBtn = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 6rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.5);
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: white;
    color: #ff5a1f;
  }

  @media (max-width: 992px) {
    bottom: 2rem;
  }
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
  border-radius: 24px;
  width: min(1080px, calc(100vw - 2rem));
  max-height: 88vh;
  overflow-y: auto;
  position: relative;
  margin: 1rem;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
    width: calc(100vw - 1rem);
    margin: 0.5rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h2<{ textColor?: string }>`
  margin: 0;
  color: ${props => props.textColor || '#333'};
  font-family: 'Parkinsans', sans-serif;
  font-weight: 600;
  font-size: clamp(2rem, 3vw, 2.75rem);
  text-align: center;
`;

export const ModalCloseButton = styled.button<{ textColor?: string }>`
  background: none;
  border: none;
  font-size: 2.25rem;
  line-height: 1;
  cursor: pointer;
  color: ${props => props.textColor ? `${props.textColor}99` : '#666'};
  padding: 0.15rem 0.35rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  
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

export const AboutModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const AboutHeroImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 22px;
  display: block;

  @media (max-width: 768px) {
    height: 220px;
    border-radius: 18px;
  }
`;

export const AboutHistoryText = styled.div<{ textColor?: string }>`
  color: ${props => props.textColor || '#334155'};
  font-family: 'Inter', sans-serif;

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.85;
    color: ${props => props.textColor ? `${props.textColor}cc` : '#475569'};
  }
`;

export const AboutTeamSection = styled.section`
  padding-top: 0.5rem;
`;

export const AboutTeamHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.25rem;

  span {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #94a3b8;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
  }

  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 2vw, 2rem);
    color: #0f172a;
    font-weight: 600;
    font-family: 'Parkinsans', sans-serif;
  }
`;

export const AboutTeamSlider = styled.div`
  margin: 0 -0.5rem;

  .slick-track {
    display: flex;
  }

  .slick-slide {
    height: inherit;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-prev,
  .slick-next {
    width: 46px;
    height: 46px;
    opacity: 1;
    z-index: 4;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
  }
`;

export const AboutTeamSlide = styled.div`
  padding: 0 0.5rem 0.5rem;
  box-sizing: border-box;
`;

export const AboutTeamCard = styled.article`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 360px;
  background: #cbd5e1;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.14);

  @media (max-width: 768px) {
    min-height: 330px;
  }
`;

export const AboutTeamImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    min-height: 330px;
  }
`;

export const AboutTeamOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.25rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.9) 100%);
  color: #fff;

  h3 {
    margin: 0 0 0.2rem;
    font-size: 1.05rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
  }

  p {
    margin: 0;
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.78);
    font-family: 'Inter', sans-serif;
  }
`;

export const AboutCarouselArrow = styled.button`
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 999px;
  background: var(--brand-color-2, #1C1C38);
  color: var(--brand-color-2-text, #FFFFFF);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;

  svg {
    display: block;
    width: 20px;
    height: 20px;
    color: var(--brand-color-2-text, #FFFFFF);
    fill: var(--brand-color-2-text, #FFFFFF);
    stroke: var(--brand-color-2-text, #FFFFFF);
    flex-shrink: 0;
  }

  &:hover {
    transform: translateY(-1px);
    background: #111827;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
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
    font-weight: 600;
    color: #6b6f70;
    margin: 0;
    font-family: 'Parkinsans', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
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
    background: #1C1C38;
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
  background: #1C1C38;
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
  padding: 6rem 1rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
`;

export const WhyChooseContainer = styled.div`
  max-width: 1200px;
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


`;

export const WhyChooseImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
  }

  .slider-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.8);
    }

    &.prev {
      left: 15px;
    }

    &.next {
      right: 15px;
    }
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
  z-index: 11;

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
  font-weight: 600;
  color: #6b6f70;
  margin-bottom: 2.5rem;
  line-height: 1.2;
  font-family: 'Parkinsans', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

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
  background: #e2e2e28d;
  color: #FF5317;
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

export const AnnounceSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  position: relative;
`;

export const AnnounceBackground = styled.div`
  background-color: #f5f5f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 250px;
  margin-top: 40px; /* Space for the image to stick out */

  @media (max-width: 900px) {
    flex-direction: column;
    padding-top: 200px; /* Make room for absolute image */
  }
`;

export const AnnounceImageWrapper = styled.div`
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: 320px;
  height: 380px;
  background-color: #f97316; /* Orange background */
  border-radius: 16px;
  border-bottom-right-radius: 60px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: auto;
    top: -40px;
    height: 250px;
    width: 250px;
  }
`;

export const AnnounceContent = styled.div`
  margin-left: 340px;
  padding: 40px 40px 40px 20px;
  flex: 1;

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 20px;
    text-align: center;
  }
`;

export const AnnounceTitle = styled.h2`
  color: #6b6f70;
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: 'Parkinsans', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const AnnounceSubtitle = styled.p`
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 30px;
  max-width: 600px;
`;

export const AnnounceFormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    outline: none;
    font-family: 'Inter', sans-serif;

    &:focus {
      border-color: #ff5722;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AnnounceButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;

  .dots-blue {
    width: 20px;
    height: 20px;
    background-color: #afafaf8d;
    border-radius: 50%;
  }

  .dots-green {
    width: 20px;
    height: 20px;
    background-color: #afafaf8d;
    border-radius: 50%;
  }

  button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #e64a19;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
