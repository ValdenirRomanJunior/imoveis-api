import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: 100vh;
  background: white;
  color: white;
`;

// Header Styles
export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 1000;
  padding: 1.5rem 0;
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
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;

  img {
    height: 24px; /* Diminuído */
  }

  span {
    font-weight: 400;
    margin-left: 5px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none !important;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem 3rem;
  background-color: #121826; /* Dark background matching reference */
  color: white;
  position: relative;
  min-height: 80vh;

  @media (min-width: 992px) {
    padding: 6rem 2rem;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  z-index: 1;
  max-width: 500px;

  @media (max-width: 991px) {
    order: 2; /* Text below image on mobile */
  }
`;

export const HeroImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  @media (min-width: 992px) {
    flex: 1.2;
    height: 480px;
    max-width: none;
  }

  @media (max-width: 991px) {
    order: 1; /* Image above text on mobile */
    margin-bottom: 0;
    max-width: 343px;
  }
`;

export const HeroImageControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 0.5rem;
`;

export const HeroSelectGroup = styled.div`
  position: relative;
  flex: 1;
  
  &::after {
    content: '↕';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #111827;
    pointer-events: none;
  }
`;

export const HeroSelectLabel = styled.label`
  display: none;
`;

export const HeroSelect = styled.select`
  width: 90%;
  appearance: none;
  background-color: #e5e7eb;
  color: #111827;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  outline: none;
  
  &:hover {
    background-color: #d1d5db;
  }
`;

export const BadgeDev = styled.div`
  background-color: #1f2937; /* Dark gray */
  color: #86efac; /* Light green */
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #f3f4f6;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  strong {
    font-weight: 700;
    color: white;
  }
`;

export const CTAButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #2563eb; /* Bright blue */
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  @media (min-width: 768px) {
    width: auto;
  }

  span.free {
    color: #86efac; /* Light green */
  }

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const CTASubtext = styled.p`
  font-size: 0.875rem;
  color: #d1d5db;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const FloatingChatBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2563eb; /* Bright blue */
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1d4ed8;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

// Quotes Section
export const QuotesSection = styled.section`
  background-color: white;
  border-radius: 2rem 2rem 0 0;
  padding: 4rem 1rem;
  margin-top: -2rem; /* Overlap the dark hero */
  position: relative;
  z-index: 10;
`;

export const QuotesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1rem;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

export const QuoteCard = styled.div`
  background-color: #f1f5f9; /* Light grayish blue */
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 280px;
  min-height: 200px;
  flex: 0 0 auto;

  @media (min-width: 1024px) {
    min-width: unset;
  }
`;

export const QuoteIconWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: #2563eb; /* Bright blue */
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

export const QuoteText = styled.p`
  font-size: 1.05rem;
  color: #1e293b;
  font-weight: 500;
  line-height: 1.6;
  margin-top: 2.5rem; /* Space for the absolute icon */
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  flex: 1;
`;

export const QuoteAuthor = styled.div`
  font-weight: 800;
  font-size: 1.1rem;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  position: relative;
  z-index: 2;
`;

// Feature Grid Section
export const FeatureGridSection = styled.section`
  background-color: #121826;
  border-radius: 1.5rem;
  padding: 3rem 1.5rem;
  margin: 4rem auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 4rem;
    gap: 4rem;
  }
`;

export const FeatureGridLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const FeatureGridRight = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
`;

export const VSAIFeatureCard = styled.div`
  background-color: #1f2937;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const FeatureIcon = styled.div`
  color: #86efac;
  margin-bottom: 1rem;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const FeatureCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
`;

export const FeatureCardText = styled.p`
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.5;
  
  strong {
    color: white;
    font-weight: 700;
  }
`;

// How It Works Section
export const HowItWorksSection = styled.section`
  background-color: white;
  padding: 4rem 1rem;
  text-align: center;
`;

export const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const HowItWorksBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #bbf7d0; /* Light green */
  color: #111827; /* Dark black */
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  
  svg {
    width: 18px;
    height: 18px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const HowItWorksTitle = styled.h2`
  font-size: 2rem;
  color: #0f172a;
  font-weight: 400;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  strong {
    font-weight: 700;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HowItWorksSubtitle = styled.p`
  font-size: 1.1rem;
  color: #334155;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  strong {
    color: #0f172a;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const HowItWorksGrid = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  
  /* Hide scrollbar */
  scrollbar-width: none; 
  -ms-overflow-style: none;  
  &::-webkit-scrollbar { 
    display: none;  
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow-x: visible;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    gap: 1.5rem;
  }
`;

export const HowItWorksCard = styled.div`
  background-color: #f1f5f9;
  border-radius: 1.5rem;
  padding: 1.5rem;
  text-align: left;
  min-width: 85vw; /* Fills most of the screen, leaves a peek of the next card */
  flex: 0 0 auto;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  width: 90%;

  @media (min-width: 768px) {
    min-width: 350px;
  }

  @media (min-width: 1024px) {
    min-width: unset;
  }
`;

export const HowItWorksCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const HowItWorksCardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const HowItWorksStepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%; /* Circle */
  background-color: transparent;
  border: 1px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #0f172a;
  font-size: 1.1rem;
`;

export const HowItWorksDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #111827;
    background-color: transparent;
    cursor: pointer;
  }

  .dot.active {
    background-color: #111827;
  }

  @media (min-width: 1024px) {
    display: none; /* Hide dots on desktop */
  }
`;

export const HowItWorksCardText = styled.p`
  color: #475569;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex-grow: 1;
`;

export const HowItWorksImageWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    height: auto;
    aspect-ratio: 4/3;
  }
`;

export const HowItWorksOverlayBlack = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(4px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const HowItWorksOverlayGreen = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #bbf7d0;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

// Comparison Section
export const ComparisonSection = styled.section`
  background-color: white;
  padding: 4rem 1rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ComparisonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #dcfce7;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ComparisonTitle = styled.h2`
  font-size: 2.5rem;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 3rem;
  
  strong {
    font-weight: 800;
  }
`;

export const ComparisonGrid = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

export const ComparisonCardBlue = styled.div`
  background-color: #254bba; /* Cor azul aproximada do print */
  border-radius: 1.5rem;
  padding: 1.5rem 1rem;
  flex: 1;
  text-align: left;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const ComparisonCardRed = styled.div`
  background-color: #fff1f2; /* Fundo rosinha claro */
  border-radius: 1.5rem;
  padding: 1.5rem 1rem;
  flex: 1;
  text-align: left;
  color: #0f172a;
  position: relative;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const ComparisonCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2.5rem;
    text-align: left;
  }
`;

export const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

export const ComparisonItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    gap: 1rem;
    font-size: 1.05rem;
  }

  line-height: 1.4;

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 0.1rem;
  }
`;

export const ComparisonItemTitle = styled.strong`
  font-weight: 700;
`;

export const VsBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #111827; /* Fundo preto/escuro */
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  border: 4px solid white;
  z-index: 10;
`;

// FAQ Section
export const FAQSection = styled.section`
  background-color: white;
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const FAQLeft = styled.div`
  flex: 1;
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
    position: sticky;
    top: 2rem;
  }
`;

export const FAQBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #dcfce7;
  color: #166534;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const FAQTitle = styled.h2`
  font-size: 2.5rem;
  color: #0f172a;
  font-weight: 800;
  line-height: 1.2;
  
  span {
    display: block;
    font-weight: 400;
  }
`;

export const FAQRight = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
`;

export const FAQItem = styled.div`
  border-bottom: 1px solid #f1f5f9;
  padding: 1.5rem 0;
  
  &:first-child {
    border-top: 1px solid #f1f5f9;
  }
`;

export const FAQQuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const FAQQuestionText = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  padding-right: 1rem;
`;

export const FAQIconWrapper = styled.div<{ $isOpen: boolean }>`
  color: #0f172a;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const FAQAnswerWrapper = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  margin-top: ${props => props.$isOpen ? '1rem' : '0'};
`;

export const FAQAnswerText = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
`;

// Pre-Launch CTA Section
export const PreLaunchCTASection = styled.section`
  padding: 4rem 1rem;
  background-color: white;
`;

export const PreLaunchCTAContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8fafc;
  border-radius: 24px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4rem;
    gap: 4rem;
  }
`;

export const PreLaunchCTALeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreLaunchCTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;

  span {
    font-weight: 800;
  }

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
`;

export const PreLaunchCTADesc = styled.p`
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.6;

  span {
    font-weight: 700;
    color: #0f172a;
  }
`;

export const PreLaunchCTAButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  align-items: flex-start;
`;

export const PreLaunchCTAButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PreLaunchCTASubtext = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

export const PreLaunchCTARight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const PreLaunchCTAImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

// Products Section
export const ProductsSection = styled.section`
  padding: 4rem 0.5rem 3rem 0.5rem;
  background: white;

  @media (min-width: 768px) {
    padding: 6rem 2rem 4rem;
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

// Legacy FAQ Section
export const OldFAQSection = styled.section`
  padding: 2rem 1rem;
  background: #f8fafc;

  @media screen and(min-width:768px){
    padding: 6rem 2rem;
  background: #f8fafc;
  }
`;

export const OldFAQContainer = styled.div`
  width: 100%;
  margin: 0 auto;

 @media (min-width:768px){
  width: 80% !important;
 }
`;

export const OldFAQTitle = styled.h2`
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

export const OldFAQItem = styled.div`
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

export const OldFAQQuestion = styled.button`
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

export const OldFAQAnswer = styled.div`
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
