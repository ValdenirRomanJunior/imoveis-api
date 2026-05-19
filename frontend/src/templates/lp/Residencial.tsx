import { FormEvent, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../utils/requests';
import { Lancamento, DEFAULT_LP_SECTIONS } from '../../pages/Empreendimentos/storage';
import { MapPin, CheckCircle2, BedDouble, Car, Maximize, Phone, Building2, Calendar, ShieldCheck, ChevronLeft, ChevronRight, Home, Gem, Plus, Minus } from 'lucide-react';
import PlantaImg from '../../assets/images/planta.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Wrapper = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap');
  
  font-family: "Belfast Grotesk", sans-serif;
  color: #2d3748;
  background: #f8fafc;
  scroll-behavior: smooth;
  border-radius: inherit;
  
  * {
    box-sizing: border-box;
  }
`;

const Hero = styled.section<{ bgImage: string, $alignment?: 'left' | 'center' }>`
  position: relative;
  min-height: 85vh;
  padding: 160px 0 0 0; /* Espaço pro header e infobar em baixo */
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$alignment === 'center' ? 'center' : 'flex-start'};
  text-align: ${props => props.$alignment === 'center' ? 'center' : 'left'};
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    /* Fundo mais claro, permitindo ver melhor a foto de fundo */
    background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%);
  }

  @media (max-width: 768px) {
    padding: 100px 0 0 0;
    min-height: 100vh;
    
    &::before {
      background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 60%, #1a202c 100%);
    }
  }
`;

const HeroInner = styled.div<{ $alignment?: 'left' | 'center' }>`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-items: ${props => props.$alignment === 'center' ? 'center' : 'flex-start'};

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const HeroContent = styled.div<{ $alignment?: 'left' | 'center' }>`
  max-width: 800px;
  padding: 0 20px;
  margin-top: -60px; /* Puxa o conteúdo um pouco mais para cima no desktop */
  margin-bottom: 50px; /* Aproximei a barra de informações do botão */
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$alignment === 'center' ? 'center' : 'flex-start'};

  .hero-logo {
    max-height: 48px;
    margin-bottom: 30px;
    object-fit: contain;
    filter: brightness(0) invert(1); /* Força a logo a ficar branca para melhor contraste no fundo escuro */
  }

  .pre-headline {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.9rem;
    margin-bottom: 20px;
    color: #ffffff;
    font-weight: 600;
  }

  h1 {
    font-family: "Belfast Grotesk", sans-serif;
    font-size: 4.5rem;
    font-weight: 600;
    margin-bottom: 30px;
    line-height: 1.05;
    letter-spacing: -1.5px;
    text-shadow: none; /* Mais clean sem sombra pesada */
  }

  p {
    font-size: 1.25rem;
    font-weight: 300;
    margin-bottom: 40px;
    opacity: 0.85;
    max-width: 600px;
  }

  a {
    display: inline-block;
    background: var(--cor-primaria, #000000);
    color: #ffffff;
    padding: 12px 28px; /* Reduzido o padding vertical e horizontal */
    border-radius: 4px;
    font-size: 0.95rem; /* Fonte levemente menor */
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    width: 200px;
    text-align: center;
   

    &:hover {
      opacity: 0.85; /* Leve transparência */
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    margin-top: -40px; /* Puxa levemente para cima no mobile também */
    margin-bottom: 30px; /* Descola um pouco da barra de informações embaixo */
    
    .pre-headline {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    
    h1 { 
      font-size: 2.4rem; 
      letter-spacing: -1px; 
      margin-bottom: 20px;
    }
    
    p { 
      display: none; /* Esconde o parágrafo no mobile igual a referência */
    }
    
    a {
      display: inline-block; /* Volta para o comportamento de bloco que respeita a largura do texto */
      width: 80%; /* Remove os 100% de largura no mobile */
      text-align: center;
      padding: 12px 32px; /* Botão mais fino no mobile também */
      font-size: 1rem;
      border-radius: 4px;
    }
  }
`;

const HeroInfoBar = styled.div<{ $alignment?: 'left' | 'center', $bgColor?: string }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Apenas 3 colunas agora */
  background: ${props => props.$bgColor || 'transparent'}; /* Fundo customizável */
  border-radius: ${props => props.$alignment === 'center' ? '16px' : '0 16px 16px 40px'}; /* Borda aba esquerda */
  padding: 40px 60px;
  gap: 40px;
  text-align: left;
  max-width: 800px;
  box-shadow: none;
  margin-bottom: 40px; /* Empurra o bloco todo um pouco mais pra cima na tela */
  align-self: ${props => props.$alignment === 'center' ? 'center' : 'flex-start'};

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .icon {
      color: var(--cor-primaria, #000000); /* Dourado luxuoso */
      margin-bottom: 8px;
    }

    .label {
      font-size: 0.85rem;
      text-transform: capitalize;
      letter-spacing: 0px;
      color: #a1a1aa;
      font-weight: 400;
    }

    .value {
      font-size: 1.25rem;
      font-weight: 500;
      color: #ffffff;
      font-family: "Belfast Grotesk", sans-serif;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Coluna única no celular */
    border-radius: 0; /* Tira borda pra colar nas laterais */
    padding: 32px 24px;
    gap: 15px;
    margin: 0; /* Ocupa a tela toda sem margem */
    max-width: 100%;
    background: ${props => props.$bgColor || 'transparent'}; /* Fundo customizável */

    .info-item {
      flex-direction: row;
      align-items: center;
      gap: 16px;
      
      .icon {
        margin-bottom: 0;
      }
      
      .label {
        font-size: 0.9rem;
      }
      
      .value {
        font-size: 1.05rem;
      }
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: start;

  /* Resolve o problema de colapso do slick-carousel dentro do CSS Grid */
  & > div:first-child {
    min-width: 0;
    width: 100%;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  padding: 80px 0;
  border-bottom: 1px solid #e2e8f0;
`;

const SectionDark = styled(Section)`
  background: #1a202c;
  color: white;
  border-bottom: none;
`;

const SectionTitle = styled.h2`
  font-family: "Belfast Grotesk", sans-serif;
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--cor-primaria, #000000);
  }
`;

const TextContent = styled.div`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 40px;
  white-space: pre-line;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);

  svg {
    color: var(--cor-primaria, #000000);
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #1a202c;
  }

  p {
    color: #718096;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;

  span {
    background: white;
    border: 1px solid #e2e8f0;
    color: #2d3748;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.95rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
`;

const StickySidebar = styled.div`
  position: sticky;
  top: 40px;
`;

const FormCard = styled.form`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border: 1px solid #edf2f7;

  h3 {
    font-family: "Belfast Grotesk", sans-serif;
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #1a202c;
  }

  p {
    color: #718096;
    margin-bottom: 25px;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .input-group {
    margin-bottom: 20px;

    input, select, textarea {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s;
      background: #f8fafc;
      color: #2d3748;

      &:focus {
        outline: none;
        border-color: var(--cor-primaria, #000000);
        background: white;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      }
    }
  }

  button {
    width: 100%;
    background: #000000;
    color: white;
    padding: 16px;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 10px;

    &:hover {
      opacity: 0.85; /* Leve transparência */
      transform: translateY(-2px);
    }
  }

  .msg {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #1f883d;
    text-align: center;
    font-weight: 500;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .radio-label {
    display: flex;
    align-items: center;
    padding: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    color: #4a5568;
    font-size: 0.95rem;
    
    &:hover {
      background: #f8fafc;
    }
    
    &.selected {
        border-color: var(--cor-primaria, #000000);
        background: rgba(0, 0, 0, 0.05);
        color: #1a202c;
        font-weight: 500;
      }

    input {
      display: none;
    }
  }

  .step-success {
    text-align: center;
    padding: 20px 0;
    
    svg { margin-bottom: 20px; }
    h3 { margin-bottom: 10px; }
    p { margin-bottom: 0; }
  }
`;

// === NOVOS ESTILOS: PARCEIROS (Estilo Puerto Madero) ===
const PartnerSliderWrapper = styled.div`
  margin-bottom: 100px;
  width: 100%;
  display: block;
  
  .slick-slider {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    width: 100%;
  }

  .slick-slide {
    div {
      outline: none;
    }
  }

  .slick-dots {
    bottom: 25px;
    right: 50px;
    width: auto;
    text-align: right;
    
    li {
      margin: 0 4px;
      width: 24px;
      height: 4px;
      
      button {
        width: 24px;
        height: 4px;
        padding: 0;
        
        &:before {
          content: '';
          width: 24px;
          height: 2px;
          background: white;
          opacity: 0.3;
          transition: all 0.3s;
        }
      }
      
      &.slick-active button:before {
        opacity: 1;
        height: 3px;
      }
    }
  }

  @media (max-width: 768px) {
    .slick-dots {
      right: 0;
      width: 100%;
      text-align: center;
      bottom: 15px;
    }
  }
`;

const PartnerCard = styled.div`
  display: flex;
  flex-direction: row;
  background: #091f2c; /* Cor escura elegante semelhante a referência */
  height: 480px;
  width: 100%;

  .image-col {
    flex: 1;
    min-width: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      display: block;
    }
  }

  .text-col {
    flex: 1;
    min-width: 0;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    text-align: right;
    color: white;

    .role-name {
      font-family: "Belfast Grotesk", sans-serif;
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: #e2e8f0;
      font-weight: 600;
    }

    .desc {
      font-size: 1.15rem;
      line-height: 1.8;
      color: #cbd5e1;
      max-width: 420px;
      font-weight: 300;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    
    .image-col {
      height: 300px;
    }
    
    .text-col {
      padding: 40px 20px 80px 20px;
      align-items: center;
      text-align: center;
    }
  }
`;

const PartnerArrowBtn = styled.button`
  position: absolute;
  bottom: 50px;
  z-index: 2;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: white;
    background: rgba(255,255,255,0.15);
  }

  &.prev {
    right: 95px;
  }
  &.next {
    right: 50px;
  }

  @media (max-width: 768px) {
    bottom: 35px;
    &.prev { right: calc(50% + 5px); }
    &.next { left: calc(50% + 5px); right: auto; }
  }
`;

const PartnerNextArrow = (props: any) => (
  <PartnerArrowBtn className="next" onClick={props.onClick}>
    <ChevronRight size={18} />
  </PartnerArrowBtn>
);

const PartnerPrevArrow = (props: any) => (
  <PartnerArrowBtn className="prev" onClick={props.onClick}>
    <ChevronLeft size={18} />
  </PartnerArrowBtn>
);

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 80px;
`;

const AccordionItem = styled.div`
  background: white;
  border: 1px solid #edf2f7;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);

  &.active {
    border-color: #c5a880;
    box-shadow: 0 10px 20px rgba(197,168,128,0.1);
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Belfast Grotesk", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  text-align: left;
  transition: color 0.3s;

  &:hover {
    color: #c5a880;
  }

  .icon {
    color: #c5a880;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => (props.isOpen ? '1000px' : '0')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background: #fafafa;
  
  .content-inner {
    padding: 0 30px 30px 30px;
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 20px 20px 20px;
    }
  }

  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin: 0;
  }
`;

// ============================================

const CustomArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2d3748;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background: white;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: #c5a880;
  }

  &.prev { left: 20px; }
  &.next { right: 20px; }
`;

const CarouselWrapper = styled.div`
  margin: 0 auto 80px auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  position: relative;
  
  /* Ocupa 100% da largura do container pai */
  width: 100%;
  display: block;

  .slick-slider {
    width: 100%;
    margin: 0;
  }

  .slick-slide {
    img {
      width: 100%;
      height: 500px; /* Altura generosa para imagens cobrirem a área */
      object-fit: cover;
      object-position: center;
      display: block;
      margin: 0 auto;
    }
  }

  .slick-dots {
    bottom: 20px;
    li button:before {
      font-size: 14px;
      color: white;
      opacity: 0.5;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }
    li.slick-active button:before {
      color: white;
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .slick-slide img {
      height: 450px;
    }
  }

  @media (max-width: 768px) {
    width: 100%; /* No mobile também ocupa tudo do padding */
    border-radius: 8px;
    
    .slick-slide img {
      height: 350px; /* Altura proporcional no mobile */
    }
    
    ${CustomArrow} {
      width: 36px;
      height: 36px;
      &.prev { left: 10px; }
      &.next { right: 10px; }
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  border: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0,0,0,0.05);
  }

  .icon {
    color: #c5a880;
    flex-shrink: 0;
    background: rgba(197, 168, 128, 0.1);
    padding: 10px;
    border-radius: 50%;
    display: flex;
  }

  p {
    font-weight: 500;
    color: #2d3748;
    line-height: 1.4;
    font-size: 1.05rem;
    margin: 0;
  }
`;

const TipologiasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 80px;
`;

const TipologiaCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #edf2f7;
  display: flex;
  gap: 30px;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    border-color: #cbd5e1;
  }

  .planta-img {
    width: 240px;
    height: 180px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 10px;
    background: #ffffff;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h4 {
      font-family: "Belfast Grotesk", sans-serif;
      font-size: 1.25rem;
      color: #1a202c;
      font-weight: 600;
      margin: 0;
    }

    .specs {
      display: flex;
      gap: 24px;
      color: #64748b;
      font-size: 1rem;

      span {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #c5a880;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    .planta-img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }

    .content-wrapper {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .info {
      gap: 15px;
      
      .specs {
        flex-wrap: wrap;
        gap: 15px;
      }
    }
  }
`;

const MapContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  margin-bottom: 24px;
  border: 1px solid #edf2f7;
`;

const Footer = styled.footer`
  background: #1a202c;
  color: white;
  padding: 80px 20px;
  text-align: center;

  h2 {
    font-family: "Belfast Grotesk", sans-serif;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    color: #a0aec0;
    margin-bottom: 30px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

interface Props {
  lancamento: Lancamento;
}

const Residencial = ({ lancamento }: Props) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // --- MULTISTEP FORM STATE ---
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    tipologia: '',
    intencao: '',
    whatsapp: '',
    mensagem: ''
  });

  // --- COMPORTAMENTO (ANALYTICS) ---
  // 1. Criação do "Fingerprint" da Sessão (Frontend) - Gerado exatamente ao abrir a página
  const [sessionId] = useState(() => {
    if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) return (crypto as any).randomUUID();
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  });

  const [behavior, setBehavior] = useState({
    startTime: 0,
    maxScroll: 0,
    interactions: [] as string[]
  });

  // Scroll to top on mount for a better preview experience + Init Tracking
  useEffect(() => {
    window.scrollTo(0, 0);
    setBehavior(prev => ({ ...prev, startTime: Date.now() }));

    const handleScroll = () => {
      const scrollPx = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = Math.round((scrollPx / (docHeight - winHeight)) * 100);
      
      setBehavior(prev => {
        if (scrollPercent > prev.maxScroll) {
          return { ...prev, maxScroll: scrollPercent };
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackInteraction = (action: string) => {
    setBehavior(prev => {
      if (!prev.interactions.includes(action)) {
        return { ...prev, interactions: [...prev.interactions, action] };
      }
      return prev;
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(prev => prev + 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timeOnPage = Math.floor((Date.now() - behavior.startTime) / 1000);

    const payload = {
      sessionId: sessionId, // Usa o Fingerprint gerado na abertura da página
      dadosPessoais: formData,
      dadosComportamentais: {
        tempoPaginaSegundos: timeOnPage,
        scrollDepthPercent: behavior.maxScroll,
        interacoes: behavior.interactions
      }
    };

    // --- SIMULAÇÃO DE LEAD SCORING (MOTOR DO CRM BACKEND) ---
    let score = 0;
    
    // Pontuação por Intenção
    if (formData.intencao === 'À vista (Com desconto)') score += 30;
    if (formData.intencao === 'Financiamento Bancário') score += 10;
    if (formData.intencao === 'Investimento / Revenda') score += 20;
    
    // Pontuação Comportamental
    if (timeOnPage > 60) score += 15;
    if (behavior.maxScroll > 50) score += 10;
    if (behavior.interactions.includes('view_gallery')) score += 5;
    if (behavior.interactions.includes('view_floorplan')) score += 10;
    if (behavior.interactions.includes('view_proximidades')) score += 5;

    const temperatura = score >= 50 ? 'Quente 🔥' : score >= 25 ? 'Morno 🌤️' : 'Frio ❄️';

    console.log("=========================================");
    console.log("🚀 PAYLOAD ENVIADO AO CRM:", JSON.stringify(payload, null, 2));
    console.log(`📊 LEAD SCORE: ${score} pontos (${temperatura})`);
    console.log("=========================================");

    setFormStep(4); // Vai para a tela de Sucesso
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <CustomArrow className="next" onClick={onClick}>
        <ChevronRight size={24} />
      </CustomArrow>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <CustomArrow className="prev" onClick={onClick}>
        <ChevronLeft size={24} />
      </CustomArrow>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true,
    adaptiveHeight: false
  };

  const partnerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <PartnerNextArrow />,
    prevArrow: <PartnerPrevArrow />,
    fade: true,
  };

  const parceirosList = lancamento.briefing.parceiros && lancamento.briefing.parceiros.length > 0 
    ? lancamento.briefing.parceiros 
    : [
    {
      id: 'p1',
      papel: 'INTERIORES',
      nome: 'TATY IRIÊ',
      descricao: 'Interiores assinados por Taty Iriê, referência no Sul do Brasil. Ambientes sofisticados e acolhedores, com equilíbrio entre estética, funcionalidade e sensibilidade contemporânea.',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p2',
      papel: 'ARQUITETURA',
      nome: 'STUDIO HAUS',
      descricao: 'Projetos arquitetônicos que desafiam o comum, integrando a natureza ao concreto de forma harmônica e sustentável. Uma assinatura única e marcante.',
      foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const proximidadesList = lancamento.briefing.proximidades && lancamento.briefing.proximidades.length > 0 
    ? lancamento.briefing.proximidades 
    : [
    {
      id: 'prox1',
      titulo: 'Shopping Iguatemi',
      descricao: 'A apenas 5 minutos de caminhada, o principal centro de compras e gastronomia da cidade, oferecendo conveniência e lazer completo para sua família.',
      foto: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prox2',
      titulo: 'Parque Campolim',
      descricao: 'Um oásis verde a poucos metros do seu novo lar. Perfeito para caminhadas matinais, esportes ao ar livre ou momentos de relaxamento aos finais de semana.',
      foto: 'https://images.unsplash.com/photo-1496851473196-e26508c21494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prox3',
      titulo: 'Hospitais e Clínicas',
      descricao: 'Localização estratégica com fácil acesso aos melhores centros médicos, clínicas e hospitais da região, garantindo tranquilidade e segurança.',
      foto: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const toggleAccordion = (index: number) => {
    if (openAccordion !== index) {
      trackInteraction('view_proximidades');
    }
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const mapsEmbed = useMemo(() => {
    if (lancamento.conteudoGerado.mapaLocalizacao) {
      return lancamento.conteudoGerado.mapaLocalizacao;
    }
    const query = encodeURIComponent(lancamento.briefing.enderecoCompleto || `${lancamento.briefing.bairro}, ${lancamento.briefing.cidade}`);
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }, [lancamento.briefing.bairro, lancamento.briefing.cidade, lancamento.briefing.enderecoCompleto, lancamento.conteudoGerado.mapaLocalizacao]);



  const heroBg = lancamento.briefing.heroBg || lancamento.briefing.fotos[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  // Use TODAS as fotos na galeria se houver mais de uma, para o carousel ficar mais rico
  const galeriaFotos = (lancamento.briefing.fotos && lancamento.briefing.fotos.length > 0) ? lancamento.briefing.fotos : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687931-cebf0746e48e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ];

  // ==========================================
  // DADOS DA BARRA DE INFO (HERO INFO BAR)
  // ==========================================
  const infoBarData = useMemo(() => {
    const tipologias = lancamento.briefing.tipologias || [];
    
    // Calcula Quartos/Suítes
    let dormsText = "Sob consulta";
    if (tipologias.length > 0) {
      const quartos = tipologias.map(t => parseInt(t.quartos.toString().replace(/\D/g,'')) || 0).filter(n => n > 0);
      if (quartos.length > 0) {
        const minQ = Math.min(...quartos);
        const maxQ = Math.max(...quartos);
        dormsText = minQ === maxQ ? `${maxQ} suítes` : `De ${minQ} a ${maxQ} suítes`;
      }
    }

    // Calcula Área
    let areaText = "Sob consulta";
    if (tipologias.length > 0) {
      const areas = tipologias.map(t => parseInt(t.area.toString().replace(/\D/g,'')) || 0).filter(n => n > 0);
      if (areas.length > 0) {
        const minA = Math.min(...areas);
        const maxA = Math.max(...areas);
        areaText = minA === maxA ? `${maxA} m²` : `De ${minA} a ${maxA} m²`;
      }
    }

    return {
      localizacao: lancamento.briefing.bairro || lancamento.briefing.cidade,
      dormsText,
      areaText,
      // Fallback luxuoso para preço
      precoText: "A partir de R$ 400 mil"
    };
  }, [lancamento]);

  // Usa a logo do briefing, ou um ícone padrão SVG de prédios/construtora como fallback elegante
  const logoUrl = lancamento.briefing.logo || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"><rect width="24" height="24" x="0" y="18" fill="white"/><rect width="24" height="24" x="28" y="18" fill="white"/><text x="65" y="38" font-family="Arial" font-size="24" font-weight="bold" fill="white" letter-spacing="2">CONSTRUTORA</text></svg>';

  const renderSectionById = (id: string) => {
    switch (id) {
      case 'sobre': return (
        <Section key="sobre" style={{ marginBottom: '80px' }}>
          <SectionTitle>O Empreendimento</SectionTitle>
          <TextContent>
            {lancamento.conteudoGerado.descricaoEmpreendimento}
          </TextContent>
          
          <Badges>
              <span style={{ border: '1px solid #e2e8f0', color: '#4a5568' }}><Building2 size={18} color="var(--cor-primaria, #000000)" /> {lancamento.briefing.segmento}</span>
              <span style={{ border: '1px solid #e2e8f0', color: '#4a5568' }}><Calendar size={18} color="var(--cor-primaria, #000000)" /> {lancamento.briefing.fase}</span>
              <span style={{ border: '1px solid #e2e8f0', color: '#4a5568' }}><ShieldCheck size={18} color="var(--cor-primaria, #000000)" /> {lancamento.briefing.prazoEntrega || 'Prazo sob consulta'}</span>
            </Badges>
        </Section>
      );
      case 'galeria': return (
        <Section key="galeria" style={{ marginBottom: '80px', marginTop: '80px' }}>
          <SectionTitle>Galeria</SectionTitle>
          <CarouselWrapper 
            onMouseEnter={() => trackInteraction('view_gallery')} 
            onTouchStart={() => trackInteraction('view_gallery')}
          >
            <Slider {...sliderSettings}>
              {galeriaFotos.map((foto, idx) => (
                <div key={idx}>
                  <img src={foto} alt={`${lancamento.nome} galeria ${idx}`} />
                </div>
              ))}
            </Slider>
          </CarouselWrapper>
        </Section>
      );
      case 'tipologias': return (
        <Section key="tipologias" style={{ marginBottom: '80px', background: '#f8fafc' }}>
          <SectionTitle>Plantas e Tipologias</SectionTitle>
          <TipologiasList>
            {lancamento.briefing.tipologias.map((item) => (
              <TipologiaCard 
                key={item.id}
                onMouseEnter={() => trackInteraction('view_floorplan')}
                onTouchStart={() => trackInteraction('view_floorplan')}
                style={{ borderColor: '#e2e8f0' }}
              >
                <img 
                  src={PlantaImg} 
                  alt={`Planta ${item.nome}`} 
                  className="planta-img" 
                />
                <div className="content-wrapper">
                  <div className="info">
                    <h4>{item.nome}</h4>
                    <div className="specs" style={{ opacity: 0.8 }}>
                      <span><Maximize size={18} color="var(--cor-primaria, #000000)" /> {item.area} m²</span>
                      <span><BedDouble size={18} color="var(--cor-primaria, #000000)" /> {item.quartos} quartos</span>
                      <span><Car size={18} color="var(--cor-primaria, #000000)" /> {item.vagas} vagas</span>
                    </div>
                  </div>
                  <div className="price" style={{ color: 'var(--cor-primaria, #000000)' }}>
                    R$ {item.preco}
                  </div>
                </div>
              </TipologiaCard>
            ))}
          </TipologiasList>
        </Section>
      );
      case 'proximidades': return (
        <Section key="proximidades" style={{ marginBottom: '80px' }}>
          <SectionTitle>Nas Proximidades</SectionTitle>
          <TextContent>Tudo o que você precisa a poucos passos do {lancamento.nome}.</TextContent>
          
          <AccordionWrapper>
            {proximidadesList.map((item: any, index: number) => {
              const isOpen = openAccordion === index;
              return (
                <AccordionItem key={item.id} className={isOpen ? 'active' : ''} style={{ borderColor: isOpen ? 'var(--cor-primaria, #000000)' : '#edf2f7' }}>
                  <AccordionHeader onClick={() => toggleAccordion(index)}>
                    {item.titulo}
                    <span className="icon" style={{ color: 'var(--cor-primaria, #000000)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </AccordionHeader>
                  <AccordionContent isOpen={isOpen}>
                    <div className="content-inner">
                      <img src={item.foto} alt={item.titulo} />
                      <p style={{ opacity: 0.8 }}>{item.descricao}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionWrapper>
        </Section>
      );
      case 'assinaturas': return (
        <Section key="assinaturas" style={{ marginBottom: '80px', background: '#f8fafc' }}>
          <SectionTitle>Assinaturas</SectionTitle>
          <TextContent>Os talentos por trás de cada detalhe do {lancamento.nome}</TextContent>
          
          <PartnerSliderWrapper>
            <Slider {...partnerSliderSettings}>
              {parceirosList.map((parceiro: any) => (
                <div key={parceiro.id}>
                  <PartnerCard>
                    <div className="image-col">
                      <img src={parceiro.foto} alt={parceiro.nome} />
                    </div>
                    <div className="text-col">
                    <div className="role-name" style={{ color: 'var(--cor-primaria, #000000)' }}>{parceiro.papel} &ndash; {parceiro.nome}</div>
                    <p className="desc">{parceiro.descricao}</p>
                  </div>
                  </PartnerCard>
                </div>
              ))}
            </Slider>
          </PartnerSliderWrapper>
        </Section>
      );
      case 'diferenciais': return (
        <Section key="diferenciais" style={{ marginBottom: '80px' }}>
          <SectionTitle>Diferenciais Exclusivos</SectionTitle>
          <FeaturesGrid>
            {lancamento.conteudoGerado.bulletsDiferenciais.map((item, idx) => (
              <FeatureCard key={idx} style={{ borderColor: '#e2e8f0' }}>
                <div className="icon" style={{ color: 'var(--cor-primaria, #000000)', background: 'rgba(0,0,0,0.05)' }}>
                  <CheckCircle2 size={24} />
                </div>
                <p>{item}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Section>
      );
      case 'localizacao': return (
        <Section key="localizacao" style={{ marginBottom: '80px' }}>
          <SectionTitle>Localização Privilegiada</SectionTitle>
          <MapContainer>
            <iframe
              title="mapa-empreendimento"
              src={mapsEmbed}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
          <TextContent style={{ fontSize: '1rem', marginTop: '15px' }}>
            <MapPin size={18} style={{ display: 'inline', marginRight: '8px', color: 'var(--cor-primaria, #000000)' }} />
            {lancamento.conteudoGerado.textoLocalizacao}
          </TextContent>
        </Section>
      );
      case 'footer': return (
        <SectionDark key="footer" as="footer" style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--cor-secundaria)', opacity: 0.95 }}>
          <h2 style={{ marginBottom: '20px' }}>{lancamento.conteudoGerado.footerTexto || lancamento.nome}</h2>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Phone size={20} style={{ color: 'var(--cor-primaria, #000000)' }} /> Central de Atendimento: {lancamento.briefing.whatsappResponsavel}
          </p>
          <div style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '40px', whiteSpace: 'pre-line' }}>
            {lancamento.conteudoGerado.footerDisclaimer}
          </div>
        </SectionDark>
      );
      default: return null;
    }
  };

  const renderForm = () => (
    <StickySidebar id="lead-form">
      <FormCard onSubmit={formStep === 3 ? handleFinalSubmit : handleNextStep}>
        {formStep === 1 && (
          <div className="step-content">
            <h3>Fale com um Especialista</h3>
            <p>Descubra as condições exclusivas do {lancamento.nome}.</p>
            <div className="input-group">
              <input type="text" placeholder="Seu nome completo" required 
                value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div className="input-group">
              <select required value={formData.tipologia} onChange={e => setFormData({...formData, tipologia: e.target.value})}>
                <option value="" disabled>Qual tipologia mais te interessa?</option>
                {lancamento.briefing.tipologias.map(t => (
                  <option key={t.id} value={t.nome}>{t.nome}</option>
                ))}
                <option value="Ainda não sei">Ainda não tenho certeza</option>
              </select>
            </div>
            <button type="submit">Continuar</button>
          </div>
        )}

        {formStep === 2 && (
          <div className="step-content">
            <h3>Quase lá, {formData.nome.split(' ')[0]}</h3>
            <p>Como você planeja seu investimento?</p>
            <div className="input-group radio-group">
              {['À vista (Com desconto)', 'Financiamento Bancário', 'Investimento / Revenda'].map(op => (
                <label key={op} className={`radio-label ${formData.intencao === op ? 'selected' : ''}`}>
                  <input type="radio" name="intencao" value={op} required
                    checked={formData.intencao === op}
                    onChange={e => setFormData({...formData, intencao: e.target.value})} />
                  {op}
                </label>
              ))}
            </div>
            <button type="submit">Próxima etapa</button>
          </div>
        )}

        {formStep === 3 && (
          <div className="step-content">
            <h3>Fale com nossa equipe</h3>
            <p>Deixe seu WhatsApp e uma mensagem para continuarmos o atendimento.</p>
            <div className="input-group">
              <input type="tel" placeholder="Seu WhatsApp (com DDD)" required 
                value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
            </div>
            <div className="input-group">
              <textarea placeholder="Sua mensagem (opcional)" rows={3} style={{ resize: 'vertical' }}
                value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})} />
            </div>
            <button type="submit">Falar com Especialista</button>
          </div>
        )}

        {formStep === 4 && (
          <div className="step-success">
            <CheckCircle2 size={48} color="#c5a880" />
            <h3>Tudo certo!</h3>
            <p>Nossa equipe premium já recebeu seu contato e um especialista entrará em contato em breve.</p>
            <p style={{fontSize: '0.8rem', color: '#a0aec0', marginTop: '15px'}}>
              (Simulação CRM: Abra o console F12 para ver o Payload Inteligente e o Lead Score)
            </p>
          </div>
        )}
      </FormCard>
    </StickySidebar>
  );

  const renderHero = () => {
    const alignment = (lancamento.conteudoGerado.heroAlignment as 'left' | 'center') || 'left';
    return (
      <Hero key="hero" bgImage={heroBg} $alignment={alignment}>
        <HeroInner $alignment={alignment}>
          <HeroContent $alignment={alignment}>
            {/* Logo da construtora/empreendimento */}
            <img 
              src={logoUrl} 
              alt="Logo Construtora" 
              className="hero-logo" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            
            <div className="pre-headline">{lancamento.conteudoGerado.sloganCurto || lancamento.nome}</div>
            <h1>{lancamento.conteudoGerado.headline}</h1>
            <p>{lancamento.conteudoGerado.subheadline}</p>
            <a href="#lead-form">{lancamento.conteudoGerado.ctaPrincipal || 'Conheça'}</a>
          </HeroContent>

          {/* NOVA BARRA DE INFORMAÇÕES RÁPIDAS (HERO) */}
          <HeroInfoBar $alignment={alignment} $bgColor={lancamento.conteudoGerado.infobarBgColor}>
            <div className="info-item">
              <MapPin className="icon" size={24} />
              <div>
                <div className="label">Localização</div>
                <div className="value">{lancamento.conteudoGerado.infobarLocalizacao || infoBarData.localizacao}</div>
              </div>
            </div>
            <div className="info-item">
              <BedDouble className="icon" size={24} />
              <div>
                <div className="label">Dorms</div>
                <div className="value">{lancamento.conteudoGerado.infobarDorms || infoBarData.dormsText}</div>
              </div>
            </div>
            <div className="info-item">
              <Maximize className="icon" size={24} />
              <div>
                <div className="label">Residências de</div>
                <div className="value">{lancamento.conteudoGerado.infobarArea || infoBarData.areaText}</div>
              </div>
            </div>
          </HeroInfoBar>
        </HeroInner>
      </Hero>
    );
  };

  const renderBlocks = () => {
    const lpSections = lancamento.lpConfig?.sections || DEFAULT_LP_SECTIONS;
    const sortedSections = [...lpSections].sort((a, b) => a.order - b.order);

    let elements: any[] = [];
    let currentGroup: any[] = [];
    let hasRenderedSidebar = false;

    const flushGroup = () => {
      if (currentGroup.length > 0) {
        const shouldRenderSidebar = !hasRenderedSidebar;
        if (shouldRenderSidebar) {
          hasRenderedSidebar = true;
        }
        elements.push(
          <Container key={`group-${elements.length}`}>
            <TwoColumns>
              <div>{currentGroup}</div>
              {shouldRenderSidebar && renderForm()}
            </TwoColumns>
          </Container>
        );
        currentGroup = [];
      }
    };

    sortedSections.forEach(section => {
      if (!section.visible) return;

      if (section.id === 'hero') {
        flushGroup();
        elements.push(renderHero());
      } else if (section.id === 'footer') {
        flushGroup();
        elements.push(renderSectionById(section.id));
      } else {
        currentGroup.push(renderSectionById(section.id));
      }
    });

    flushGroup();

    // In case no sections rendered the sidebar, we still need it
    if (!hasRenderedSidebar) {
      elements.push(
        <Container key={`group-${elements.length}`}>
          <TwoColumns>
            <div />
            {renderForm()}
          </TwoColumns>
        </Container>
      );
    }

    return elements;
  };

  return (
    <Wrapper style={{ 
      '--cor-primaria': lancamento.conteudoGerado.primaryColor || '#afab2c',
      '--cor-secundaria': lancamento.conteudoGerado.secondaryColor || '#000000'
    } as React.CSSProperties}>
      {lancamento.conteudoGerado.facebookPixel && (
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${lancamento.conteudoGerado.facebookPixel}');
          fbq('track', 'PageView');
        `}} />
      )}
      {lancamento.conteudoGerado.googleAnalytics && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${lancamento.conteudoGerado.googleAnalytics}`}></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${lancamento.conteudoGerado.googleAnalytics}');
          `}} />
        </>
      )}

      {renderBlocks()}
    </Wrapper>
  );
};

export default Residencial;
