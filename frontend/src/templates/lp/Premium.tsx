import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Calendar, Mail, ArrowRight, Clock, Diamond, Building, Palette, Award, Gem, User, PlayCircle, CheckCircle2, Droplet, Waves, HeartPulse, Trophy, Dumbbell, ShieldCheck, Lock, Cpu } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import bgDesktop from '../../assets/images/bg-premium.png';

// Importando as fontes necessárias
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

// --- Configuração Mock (Simulando o futuro EditorV2) ---
const mockConfig = {
  hero: {
    // Opções de layout: 'center' | 'left' | 'right' | 'split'
    layout: 'split',
    bgImage: {bgDesktop},
    overlayColor: 'rgba(0, 0, 0, 0.65)',
    theme: {
      primary: 'rgb(201, 163, 71)', // Cor dourada do print
      textLight: '#E2E8F0',
      textWhite: '#FFFFFF',
    },
    content: {
      tags: ['CYRELA', 'JARDIM EUROPA', 'SÃO PAULO'],
      title: 'Capri Cyrela by Dolce & Gabbana —\nApartamento de Luxo em São Paulo',
      subtitle: 'LIFESTYLE BY DOLCE&GABBANA CASA',
      description: 'A primeira branded residence da Dolce&Gabbana Casa na América Latina. 62 unidades de ultra alto padrão no Jardim Europa, São Paulo.',
      features: [
        { text: '246–279 M²', highlight: false },
        { text: 'ATÉ 591 M² COBERTURA', highlight: false },
        { text: 'PRÉ-LANÇAMENTO 2026', highlight: true }
      ],
      delivery: 'ENTREGA: MAR/2029',
    },
    visibility: {
      showTopBar: true,
      showCountdown: true,
      showScheduleVisit: true,
      showFloatingWhatsapp: true,
    }
  },
  concept: {
    tag: 'O CONCEITO',
    title: 'Uma <em>branded residence</em>\nsem precedentes',
    highlightText: 'O Capri Cyrela by Dolce & Gabbana é o mais sofisticado lançamento de imóvel de luxo em São Paulo. Desenvolvido em parceria com a grife italiana Dolce & Gabbana Casa, o empreendimento une arquitetura exclusiva, materiais nobres e um endereço privilegiado na capital paulista. Para quem busca apartamento de alto padrão em São Paulo com design de grife, o Capri é único. Preços a partir de R$ 10.000.000. Entre em contato com a TAB House para condições especiais.',
    mainText: 'O Capri Lifestyle by Dolce&Gabbana Casa nasce como o primeiro empreendimento residencial do Brasil — e da América Latina — a integrar a identidade artística e cultural da Dolce&Gabbana Casa em cada detalhe de seus espaços.',
    secondaryText: 'Torre única com apenas 62 unidades, localizada na Rua Joaquim Antunes, no Jardim Europa. Arquitetura contemporânea autoral, interiores com identidade exclusiva D&G e integração total com o verde do bairro mais exclusivo de São Paulo.',
    listItems: [
      { icon: 'building', text: '62 unidades — torre única, exclusividade máxima' },
      { icon: 'palette', text: 'Interiores assinados Dolce&Gabbana Casa — Carretto Siciliano, Blu Mediterrâneo' },
      { icon: 'medal', text: 'Cyrela × D&G Casa — 1ª parceria na América Latina' }
    ],
    imageBlock: {
      url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      cardTitle: 'Jardim Europa',
      cardSubtitle: 'Rua Joaquim Antunes · SP'
    },
    form: {
      headerTag: 'ACESSO EXCLUSIVO',
      headerTitle: 'Registrar Interesse no Capri',
      fields: [
        { label: 'NOME COMPLETO *', placeholder: 'Seu nome', type: 'text' },
        { label: 'E-MAIL *', placeholder: 'seu@email.com', type: 'email' },
        { label: 'WHATSAPP *', placeholder: '(11) 99999-9999', type: 'tel' }
      ],
      textarea: { label: 'MENSAGEM', placeholder: 'Conte-nos mais sobre o que procura...' },
      buttonText: 'REGISTRAR INTERESSE NO CAPRI',
      socialProof: '103 pessoas já demonstraram interesse',
      privacyText: 'Ao enviar, você concorda com nossa Política de Privacidade'
    }
  },
  video: {
    tag: 'CONHEÇA O PROJETO',
    title: 'Veja o Jardim da Hípica\n<em>em movimento</em>',
    subtitle: 'Descubra todos os detalhes deste lançamento exclusivo da Lavvi no coração de Santo Amaro',
    videoId: 'o08o1L7_G4E', // ID fake do youtube para o embed
    actionText: 'Vídeo oficial do empreendimento',
    buttonText: 'REGISTRAR INTERESSE'
  },
  gallery: [
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Ambiente 1' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Ambiente 2' },
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Ambiente 3' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Ambiente 4' },
    { url: 'https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Ambiente 5' },
    { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Ambiente 6' },
    { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'Ambiente 7' }
  ],
  floorPlans: {
    tag: 'PLANTAS OFICIAIS',
    title: 'Espaços projetados\n<em>para o ultra luxo</em>',
    tabs: [
      {
        id: 'tipo',
        label: 'APARTAMENTO TIPO · 246–279 M²',
        headerTheme: 'light', // Fundo claro, borda dourada, texto dourado para as specs
        specs: [
          { value: '246m² a 279m²', label: 'ÁREA' },
          { value: '4 suítes', label: 'SUÍTES' },
          { value: '3 vagas cobertas', label: 'VAGAS' },
          { value: 'Duplo nas salas', label: 'PÉ-DIREITO' }
        ],
        plans: [
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/tipo-planta-01.png', name: 'Tipo — Planta 01' },
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/tipo-planta-02.png', name: 'Tipo — Planta 02' },
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/tipo-planta-03.png', name: 'Tipo — Planta 03' }
        ]
      },
      {
        id: 'cobertura',
        label: 'COBERTURA DUPLEX · ATÉ 591 M²',
        headerTheme: 'dark', // Fundo preto, texto dourado para as specs
        specs: [
          { value: 'até ~591m²', label: 'ÁREA TOTAL' },
          { value: '4 suítes', label: 'SUÍTES' },
          { value: '5 vagas cobertas', label: 'VAGAS' },
          { value: 'Duplex + terraço', label: 'NÍVEL' }
        ],
        plans: [
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/cobertura-planta-01.png', name: 'Cobertura — Planta 01' },
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/cobertura-planta-02.png', name: 'Cobertura — Planta 02' },
          { image: 'https://www.cyrela.com.br/arquivos/imoveis/sao-paulo/jardins/capri/planta/cobertura-planta-03.png', name: 'Cobertura — Planta 03' }
        ]
      }
    ]
  },
  typologies: {
    tag: 'T I P O L O G I A S',
    title: 'Dois formatos de\n<em>vida extraordinária</em>',
    cards: [
      {
        theme: 'light',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: '246–279 M²',
        badgeBg: '#FFFFFF',
        badgeColor: '#1A202C',
        title: 'Apartamento Tipo',
        subtitle: '4 SUÍTES · 3 VAGAS',
        description: 'Residência de alto padrão com 4 suítes e ambientes integrados de alto desempenho estético. Living generoso com varanda panorâmica, cozinha gourmet e interiores com identidade Dolce&Gabbana Casa.',
        features: [
          '4 suítes — master com closet assinado',
          'Living integrado com varanda panorâmica',
          'Cozinha gourmet com ilha italiana',
          'Acabamentos Signature D&G Casa',
          '3 vagas cobertas'
        ],
        buttonText: 'Solicitar informações'
      },
      {
        theme: 'dark',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: 'ATÉ ~591 M²',
        badgeBg: 'rgb(201, 163, 71)',
        badgeColor: '#110E0A',
        badgeRight: 'COBERTURA DUPLEX',
        title: 'Cobertura Duplex',
        subtitle: '4 SUÍTES · 5 VAGAS · TERRAÇO PRIVATIVO',
        description: 'A expressão máxima do Capri. Dois pavimentos de monumentalidade italiana com terraço panorâmico privativo, piscina e coleção artística exclusiva Dolce&Gabbana Casa.',
        features: [
          '4 suítes com closets e acabamentos D&G',
          'Terraço duplex com piscina privativa',
          'Home theater e adega climatizada',
          'Coleção artística exclusiva D&G Casa',
          '5 vagas cobertas — acesso privativo'
        ],
        buttonText: 'Solicitar informações'
      }
    ]
  },
  highlights: [
    { value: '246–591m²', label: 'METRAGENS' },
    { value: '62', label: 'UNIDADES EXCLUSIVAS' },
    { value: 'D&G Casa', label: '1ª PARCERIA LAT. AMÉRICA' },
    { value: 'Mar/2029', label: 'PREVISÃO DE ENTREGA' }
  ],
  leisure: {
    tag: 'LAZER & BEM-ESTAR',
    title: 'Experiências sensoriais\n<em>além do convencional</em>',
    items: [
      { icon: 'droplet', text: 'Piscina Coberta com Raia' },
      { icon: 'waves', text: 'Piscina Externa' },
      { icon: 'heart-pulse', text: 'Spa & Wellness Center' },
      { icon: 'trophy', text: 'Quadra de Tênis Oficial' },
      { icon: 'dumbbell', text: 'Academia de Alto Padrão' },
      { icon: 'shield-check', text: 'Portaria Blindada 24h' },
      { icon: 'lock', text: 'Hall Privativo por Unidade' },
      { icon: 'cpu', text: 'Automação Inteligente' }
    ]
  }
};

// --- Styled Components ---

const TopBar = styled.div`
  width: 100%;
  background: #110E0A; /* Cor de fundo marrom muito escuro/quase preto da imagem */
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TopBarDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${mockConfig.hero.theme.primary};
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.25rem;
`;

const TopBarText = styled.span`
  color: ${mockConfig.hero.theme.primary};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const TopBarTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TopBarTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const TopBarTimeNumber = styled.div`
  background: transparent;
  border: 1px solid rgba(201, 163, 71, 0.3); /* Borda sutil dourada */
  color: ${mockConfig.hero.theme.primary};
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  border-radius: 2px;
  min-width: 38px;
  text-align: center;
`;

const TopBarTimeLabel = styled.span`
  font-size: 0.45rem;
  color: ${mockConfig.hero.theme.primary};
  letter-spacing: 0.1em;
  opacity: 0.8;
`;

const TopBarSeparator = styled.span`
  color: ${mockConfig.hero.theme.primary};
  font-weight: 400;
  margin-bottom: 0.75rem;
  opacity: 0.6;
`;

const TopBarButton = styled.button`
  background: ${mockConfig.hero.theme.primary};
  color: #110E0A;
  border: none;
  padding: 0.6rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(215, 180, 95);
  }
`;

const HeroWrapper = styled.section<{ $bgImage: string, $overlay: string }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 60px; /* Compensa a altura do TopBar fixed */
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: ${mockConfig.hero.theme.textWhite};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }
`;

const ContentContainer = styled.div<{ $layout: string }>`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 9rem;
  display: flex;
  flex-direction: ${props => props.$layout === 'center' ? 'column' : 'row'};
  justify-content: ${props => {
    if (props.$layout === 'center') return 'center';
    if (props.$layout === 'right') return 'flex-end';
    if (props.$layout === 'split') return 'space-between';
    return 'flex-start';
  }};
  align-items: ${props => props.$layout === 'center' ? 'center' : 'center'};
  text-align: ${props => props.$layout === 'center' ? 'center' : 'left'};
  gap: 4rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 6rem 2rem;
    align-items: flex-start;
    text-align: left;
  }
`;

const LeftBlock = styled.div<{ $layout: string }>`
  flex: 1;
  max-width: ${props => props.$layout === 'center' ? '800px' : '700px'};
`;

const Breadcrumbs = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: inherit;
`;

const BreadcrumbItem = styled.span`
  color: ${mockConfig.hero.theme.primary};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 4.5rem;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.h3`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #A0AEC0;
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${mockConfig.hero.theme.textLight};
  margin: 0 0 2.5rem 0;
  max-width: 600px;
`;

const FeaturesRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: inherit;
`;

const FeatureTag = styled.div<{ $highlight?: boolean }>`
  border: 1px solid ${props => props.$highlight ? mockConfig.hero.theme.primary : 'rgba(255,255,255,0.2)'};
  background: ${props => props.$highlight ? mockConfig.hero.theme.primary : 'transparent'};
  color: ${props => props.$highlight ? '#1A202C' : '#FFFFFF'};
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 2px;
`;

const DeliveryTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #E2E8F0;
  border-radius: 2px;
`;

const RightBlock = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const EventText = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #A0AEC0;
  text-transform: uppercase;
`;

const TimerBoxes = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const TimeNumber = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border-radius: 2px;
  backdrop-filter: blur(4px);
`;

const TimeLabel = styled.span`
  font-size: 0.55rem;
  color: #A0AEC0;
  letter-spacing: 0.1em;
`;

const TimeSeparator = styled.span`
  color: rgba(255,255,255,0.3);
  font-weight: 300;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  background: ${mockConfig.hero.theme.primary};
  color: #1A202C;
  border: none;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(215, 180, 95);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: rgba(0,0,0,0.3);
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.3);
  }
`;

const FloatingSchedule = styled.div`
  position: fixed;
  bottom: 2%;
  left: 1%;
  background: #000000;
  border: 1px solid ${mockConfig.hero.theme.primary};
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: #111111;
  }

  .icon-wrapper {
    background: ${mockConfig.hero.theme.primary};
    color: #000;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    
    span.mini {
      font-size: 0.65rem;
      color: ${mockConfig.hero.theme.primary};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      
    }
    
    span.main {
      font-size: 0.9rem;
      font-weight: 500;
      color: #FFF;
    }
  }
`;

const FloatingWhatsappGroup = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 1000;
`;

const PillConsultar = styled.div`
  background: ${mockConfig.hero.theme.primary};
  color: #1A202C;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  
  .dot {
    width: 6px;
    height: 6px;
    background: #1A202C;
    border-radius: 50%;
  }
`;

const WhatsappCircle = styled.div`
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HighlightsBar = styled.div`
  width: 100%;
  background-color: rgb(26, 14, 2);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-bottom: 1px solid #ffffff1a;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  border-right: 1px solid #ffffff1a;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  /* Em telas menores onde quebra a linha, precisamos ajustar as bordas */
  @media (max-width: 992px) {
    &:nth-child(2n) {
      border-right: none;
    }
    border-bottom: 1px solid #ffffff1a;
    
    &:nth-last-child(-n+2) {
      border-bottom: none;
    }
  }

  @media (max-width: 576px) {
    border-right: none !important;
    border-bottom: 1px solid #ffffff1a;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const HighlightValue = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: rgb(201, 163, 71);
  margin-bottom: 0.5rem;
`;

const HighlightLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
`;

// --- Seção Conceito ---

const ConceptSection = styled.section`
  width: 100%;
  background-color: rgb(250, 245, 236);
  padding: 6rem 2rem;
  font-family: 'Inter', sans-serif;
  color: #1A202C;
`;

const ConceptContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ConceptLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConceptTag = styled.span`
  color: rgb(201, 163, 71);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const ConceptTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1A202C;
  margin: 0 0 3rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HighlightParagraph = styled.div`
  border-left: 2px solid rgb(201, 163, 71);
  padding-left: 1.5rem;
  margin-bottom: 2rem;
  
  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #4A5568;
    text-align: justify;
  }
`;

const MainParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2D3748;
  margin: 0 0 2rem 0;
`;

const SecondaryParagraph = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4A5568;
  margin: 0 0 3rem 0;
`;

const ConceptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ConceptListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .icon-box {
    color: rgb(201, 163, 71);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #4A5568;
  }
`;

const ConceptFormWrapper = styled.div`
  position: relative;
`;

const ConceptFormSticky = styled.div`
  position: sticky;
  top: 6rem;
  z-index: 10;
`;

const ConceptFormCard = styled.div`
  background: #110E0A;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  background: rgb(201, 163, 71);
  padding: 1.1rem;
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;

  .header-icon {
    margin-top: 0.2rem;
    background: #b38310;
    padding:10px;
    width: 40px;
    height: 40px;
  }
  
  .header-texts {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    span {
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 400;
    }
    
    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #110E0A;
    }
  }
`;

const FormBody = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  input, textarea {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.7rem 1rem;
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    border-radius: 2px;
    transition: border-color 0.3s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
      outline: none;
      border-color: rgb(201, 163, 71);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const FormSubmitButton = styled.button`
  background: rgb(201, 163, 71);
  color: #ffffffff;
  border: none;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 2px;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(215, 180, 95);
  }
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.6rem;

  .social-proof {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .avatars {
      display: flex;
      
      .avatar {
        width: 24px;
        height: 24px;
        background: rgb(201, 163, 71);
        border-radius: 50%;
        border: 2px solid #110E0A;
        margin-left: -8px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child { margin-left: 0; }
      }
    }

    span {
      font-size: 0.75rem;
      color: rgb(201, 163, 71);
      font-weight: 500;
    }
  }

  .privacy {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.2);
    text-align: center;
  }
`;

const ConceptImageCard = styled.div`
  margin-top: 2rem;
  position: relative;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 270px;
  }

  .image-info-box {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(17, 14, 10, 0.95);
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-top-left-radius: 2px;

    span.title {
      color: rgb(201, 163, 71);
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem;
      font-weight: 600;
    }

    span.subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.05em;
    }
  }
`;

// --- Seção Conheça o Projeto (Vídeo) ---

const VideoSection = styled.section`
  width: 100%;
  background-color: rgb(10, 10, 10);
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const VideoTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 0 4rem 0;
  line-height: 1.6;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  position: relative;
  padding-bottom: 30.25%; /* Mantém a proporção widescreen, ajuste se necessário */
  height: 500px;
  background: #000;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    height: 300px;
    padding-bottom: 56.25%; /* 16:9 padrão no mobile */
  }
`;

const VideoActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const VideoActionText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
`;

const VideoActionButton = styled.button`
  background: transparent;
  color: rgb(201, 163, 71);
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

// --- Seção Galeria (Mosaico) ---

const GallerySection = styled.section`
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(200px, auto);
  width: 100%;

  @media (min-width: 993px) {
    /* 
      Desktop Layout: 7 imagens
      3 em cima (ocupando 4 colunas cada = 12 colunas)
      4 em baixo (ocupando 3 colunas cada = 12 colunas)
    */
    & > div:nth-child(1),
    & > div:nth-child(2),
    & > div:nth-child(3) {
      grid-column: span 4;
      height: 350px;
    }
    
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      grid-column: span 3;
      height: 300px;
    }
  }

  @media (max-width: 992px) {
    /* Tablet: 2 colunas */
    grid-template-columns: repeat(2, 1fr);
    
    & > div {
      grid-column: span 1 !important;
      height: 250px !important;
    }
    
    /* A última imagem ocupa as duas colunas se for ímpar */
    & > div:last-child:nth-child(odd) {
      grid-column: span 2 !important;
    }
  }

  @media (max-width: 576px) {
    /* Mobile: 1 coluna */
    grid-template-columns: 1fr;
    
    & > div {
      grid-column: span 1 !important;
      height: 250px !important;
    }
  }
`;

const GalleryItemWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit; /* Garante que respeita a altura da grid */
`;

const GalleryItem = styled.div<{ $bgImage: string }>`
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease, filter 0.3s ease;
  cursor: pointer;

  /* Efeito de zoom no hover sem vazar da div */
  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
`;

// --- Seção Plantas Oficiais ---

const FloorPlansSection = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FloorPlansTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const FloorPlansTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1A202C;
  margin: 0 0 4rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FloorPlansContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1px;
  background: rgba(0,0,0,0.05);
  padding: 1px;
  margin-bottom: 3rem;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#110E0A' : '#F7F7F7'};
  color: ${props => props.$active ? 'rgb(201, 163, 71)' : '#4A5568'};
  border: none;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#110E0A' : '#E2E8F0'};
  }
`;

const SpecsBar = styled.div<{ $theme: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 2rem;
  margin-bottom: 3rem;
  background: ${props => props.$theme === 'dark' ? '#110E0A' : 'rgb(250, 245, 236)'};
  border: ${props => props.$theme === 'dark' ? 'none' : '1px solid rgba(201, 163, 71, 0.3)'};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const SpecValue = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 600;
`;

const SpecLabel = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
`;

const PlansGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PlanImageWrapper = styled.div`
  width: 100%;
  background: rgb(250, 245, 236);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1; /* Mantém quadrado */
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PlanName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4A5568;
`;

const ClickToEnlarge = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #A0AEC0;
`;

// --- Seção Tipologias ---

const TypologiesSection = styled.section`
  width: 100%;
  background-color: rgb(250, 245, 236);
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TypologiesTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const TypologiesTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1A202C;
  margin: 0 0 4rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TypologiesGrid = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const TypologyCard = styled.div<{ $theme: string }>`
  background-color: ${props => props.$theme === 'dark' ? '#110E0A' : '#FFFFFF'};
  color: ${props => props.$theme === 'dark' ? '#FFFFFF' : '#1A202C'};
  display: flex;
  flex-direction: column;
  text-align: left;
  border: ${props => props.$theme === 'dark' ? 'none' : '1px solid rgba(0,0,0,0.05)'};
`;

const TypologyImageWrapper = styled.div`
  width: 100%;
  height: 270px;
  position: relative;
    padding: 0 2rem 0 2rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  
  }
`;

const TypologyBadge = styled.div<{ $bg?: string, $color?: string }>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: ${props => props.$bg || '#FFFFFF'};
  color: ${props => props.$color || '#1A202C'};
  padding: 0.5rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const TypologyBadgeRight = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #110E0A;
  color: #FFFFFF;
  padding: 0.5rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: 1px solid rgba(255,255,255,0.2);
`;

const TypologyContent = styled.div`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TypologyCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.25rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
`;

const TypologyCardSubtitle = styled.span<{ $theme: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${props => props.$theme === 'dark' ? 'rgb(201, 163, 71)' : '#A0AEC0'};
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const TypologyDescription = styled.p<{ $theme: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.$theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#4A5568'};
  margin: 0 0 2rem 0;
`;

const TypologyFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-grow: 1;
`;

const TypologyFeatureItem = styled.div<{ $theme: string }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    color: ${props => props.$theme === 'dark' ? 'rgb(201, 163, 71)' : 'rgb(201, 163, 71)'};
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: ${props => props.$theme === 'dark' ? 'rgba(255,255,255,0.9)' : '#2D3748'};
  }
`;

const TypologyButton = styled.button<{ $theme: string }>`
  background: transparent;
  color: rgb(201, 163, 71);
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;
  align-self: flex-start;

  &:hover {
    opacity: 0.8;
  }
`;

// --- Seção Lazer ---

const LeisureSection = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LeisureTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const LeisureTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1A202C;
  margin: 0 0 4rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LeisureGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const LeisureCard = styled.div`
  background-color: rgb(250, 245, 236);
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 2px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
`;

const LeisureIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(201, 163, 71);
`;

const LeisureCardText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4A5568;
  font-weight: 500;
  line-height: 1.4;
`;

// --- Componente Principal ---

export default function PremiumTemplate() {
  const { hero, highlights, concept, video, gallery, floorPlans } = mockConfig;
  const [activeTab, setActiveTab] = React.useState(floorPlans.tabs[0].id);

  // Encontra a aba ativa atual
  const currentTab = floorPlans.tabs.find(tab => tab.id === activeTab) || floorPlans.tabs[0];

  return (
    <>
      <GlobalFonts />
      {hero.visibility.showTopBar && (
        <TopBar>
          <TopBarContent>
            <TopBarDot />
            <TopBarText>Pré-lançamento exclusivo • Evento em:</TopBarText>
          </TopBarContent>
          
          <TopBarTimerWrapper>
            <TopBarTimeBox><TopBarTimeNumber>00</TopBarTimeNumber><TopBarTimeLabel>DIAS</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>00</TopBarTimeNumber><TopBarTimeLabel>HRS</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>00</TopBarTimeNumber><TopBarTimeLabel>MIN</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>00</TopBarTimeNumber><TopBarTimeLabel>SEG</TopBarTimeLabel></TopBarTimeBox>
          </TopBarTimerWrapper>

          <TopBarButton>
            <ArrowRight size={14} />
            Garantir minha vaga
          </TopBarButton>
        </TopBar>
      )}

      <HeroWrapper $bgImage={hero.bgImage.bgDesktop} $overlay={hero.overlayColor}>
        <ContentContainer $layout={hero.layout}>
          
          {/* Lado Esquerdo / Conteúdo Principal */}
          <LeftBlock $layout={hero.layout}>
            <Breadcrumbs>
              {hero.content.tags.map((tag, idx) => (
                <BreadcrumbItem key={idx}>{tag}</BreadcrumbItem>
              ))}
            </Breadcrumbs>
            
            <Title>{hero.content.title}</Title>
            <Subtitle>{hero.content.subtitle}</Subtitle>
            <Description>{hero.content.description}</Description>
            
            <FeaturesRow>
              {hero.content.features.map((feature, idx) => (
                <FeatureTag key={idx} $highlight={feature.highlight}>
                  {feature.text}
                </FeatureTag>
              ))}
            </FeaturesRow>
            
            <DeliveryTag>
              <Calendar size={14} />
              {hero.content.delivery}
            </DeliveryTag>
          </LeftBlock>

          {/* Lado Direito / Ações e Formulário Flutuante */}
          {(hero.layout === 'split' || hero.layout === 'right') && (
            <RightBlock>
              {hero.visibility.showCountdown && (
                <CountdownWrapper>
                  <EventText>Evento em:</EventText>
                  <TimerBoxes>
                    <TimeBox><TimeNumber>00</TimeNumber><TimeLabel>DIAS</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>00</TimeNumber><TimeLabel>HRS</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>00</TimeNumber><TimeLabel>MIN</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>00</TimeNumber><TimeLabel>SEG</TimeLabel></TimeBox>
                  </TimerBoxes>
                </CountdownWrapper>
              )}

              <ActionButtons>
                <PrimaryButton>
                  <Mail size={18} />
                  Registrar Interesse
                </PrimaryButton>
                <SecondaryButton>
                  <FaWhatsapp size={18} color="#25D366" />
                  WhatsApp
                </SecondaryButton>
              </ActionButtons>
            </RightBlock>
          )}

        </ContentContainer>

        {/* Componentes Flutuantes Fixos */}
        {hero.visibility.showScheduleVisit && (
          <FloatingSchedule>
            <div className="icon-wrapper">
              <Calendar size={18} />
            </div>
            <div className="text-wrapper">
              <span className="mini">{hero.content.tags[0] || 'Cyrela'}</span>
              <span className="main">Agendar Visita</span>
            </div>
            <ArrowRight size={18} color={hero.theme.primary} />
          </FloatingSchedule>
        )}

        {hero.visibility.showFloatingWhatsapp && (
          <FloatingWhatsappGroup>
            <PillConsultar>
              <span className="dot"></span>
              Consultar Capri online
            </PillConsultar>
            <WhatsappCircle>
              <FaWhatsapp />
            </WhatsappCircle>
          </FloatingWhatsappGroup>
        )}

      </HeroWrapper>

      {/* Barra de Highlights Logo Abaixo da Hero */}
      <HighlightsBar>
        {highlights.map((item, idx) => (
          <HighlightCard key={idx}>
            <HighlightValue>{item.value}</HighlightValue>
            <HighlightLabel>{item.label}</HighlightLabel>
          </HighlightCard>
        ))}
      </HighlightsBar>

      {/* Seção Conceito */}
      <ConceptSection>
        <ConceptContainer>
          <ConceptLeft>
            <ConceptTag>{concept.tag}</ConceptTag>
            <ConceptTitle dangerouslySetInnerHTML={{ __html: concept.title }}></ConceptTitle>
            
            <HighlightParagraph>
              <p>{concept.highlightText}</p>
            </HighlightParagraph>

            <MainParagraph>{concept.mainText}</MainParagraph>
            <SecondaryParagraph>{concept.secondaryText}</SecondaryParagraph>

            <ConceptList>
              {concept.listItems.map((item, idx) => (
                <ConceptListItem key={idx}>
                  <div className="icon-box">
                    {item.icon === 'building' && <Building size={20} />}
                    {item.icon === 'palette' && <Palette size={20} />}
                    {item.icon === 'medal' && <Award size={20} />}
                  </div>
                  <p>{item.text}</p>
                </ConceptListItem>
              ))}
            </ConceptList>

            <ConceptImageCard>
              <img src={concept.imageBlock.url} alt="Imagem do Conceito" />
              <div className="image-info-box">
                <span className="title">{concept.imageBlock.cardTitle}</span>
                <span className="subtitle">{concept.imageBlock.cardSubtitle}</span>
              </div>
            </ConceptImageCard>
          </ConceptLeft>

          <ConceptFormWrapper>
            <ConceptFormSticky>
              <ConceptFormCard>
                <FormHeader>
                  <Gem size={20} className="header-icon" color="#110E0A" />
                  <div className="header-texts">
                    <span>{concept.form.headerTag}</span>
                    <h3>{concept.form.headerTitle}</h3>
                  </div>
                </FormHeader>

                <FormBody>
                  {concept.form.fields.map((field, idx) => (
                    <FormGroup key={idx}>
                      <label>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} />
                    </FormGroup>
                  ))}

                  <FormGroup>
                    <label>{concept.form.textarea.label}</label>
                    <textarea placeholder={concept.form.textarea.placeholder}></textarea>
                  </FormGroup>

                  <FormSubmitButton type="button">
                    {concept.form.buttonText}
                  </FormSubmitButton>

                  <FormFooter>
                    <div className="social-proof">
                      <div className="avatars">
                        <div className="avatar"><User size={14} color="#110E0A" /></div>
                        <div className="avatar"><User size={14} color="#110E0A" /></div>
                        <div className="avatar"><User size={14} color="#110E0A" /></div>
                      </div>
                      <span>{concept.form.socialProof}</span>
                    </div>
                    <a href="#" className="privacy">{concept.form.privacyText}</a>
                  </FormFooter>
                </FormBody>
              </ConceptFormCard>
            </ConceptFormSticky>
          </ConceptFormWrapper>
        </ConceptContainer>
      </ConceptSection>

      {/* Seção Conheça o Projeto (Vídeo) */}
      <VideoSection>
        <VideoTag>{video.tag}</VideoTag>
        <VideoTitle dangerouslySetInnerHTML={{ __html: video.title }}></VideoTitle>
        <VideoSubtitle>{video.subtitle}</VideoSubtitle>

        <VideoContainer>
          <iframe 
            src={`https://www.youtube.com/embed/${video.videoId}?controls=1&rel=0&showinfo=0&autohide=1`}
            title="Vídeo do Empreendimento"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoContainer>

        <VideoActionRow>
          <VideoActionText>
            <PlayCircle size={18} color="rgb(201, 163, 71)" />
            {video.actionText}
          </VideoActionText>
          
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>

          <VideoActionButton>
            {video.buttonText}
            <ArrowRight size={14} />
          </VideoActionButton>
        </VideoActionRow>
      </VideoSection>

      {/* Seção Galeria (Mosaico) */}
      <GallerySection>
        <GalleryGrid>
          {gallery.map((image, idx) => (
            <GalleryItemWrapper key={idx}>
              <GalleryItem $bgImage={image.url} title={image.alt} />
            </GalleryItemWrapper>
          ))}
        </GalleryGrid>
      </GallerySection>

      {/* Seção Plantas Oficiais */}
      <FloorPlansSection>
        <FloorPlansTag>{floorPlans.tag}</FloorPlansTag>
        <FloorPlansTitle dangerouslySetInnerHTML={{ __html: floorPlans.title }} />

        <FloorPlansContainer>
          {/* Botões das Abas */}
          <TabsWrapper>
            {floorPlans.tabs.map(tab => (
              <TabButton 
                key={tab.id} 
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabsWrapper>

          {/* Barra de Especificações Dinâmica */}
          <SpecsBar $theme={currentTab.headerTheme}>
            {currentTab.specs.map((spec, idx) => (
              <SpecItem key={idx}>
                <SpecValue>{spec.value}</SpecValue>
                <SpecLabel>{spec.label}</SpecLabel>
              </SpecItem>
            ))}
          </SpecsBar>

          {/* Grid de Plantas */}
          <PlansGrid>
            {currentTab.plans.map((plan, idx) => (
              <PlanCard key={idx}>
                <PlanImageWrapper>
                  <img src={plan.image} alt={plan.name} />
                </PlanImageWrapper>
                <PlanName>{plan.name}</PlanName>
              </PlanCard>
            ))}
          </PlansGrid>

          <ClickToEnlarge>Clique nas plantas para ampliar</ClickToEnlarge>
        </FloorPlansContainer>
      </FloorPlansSection>

      {/* Seção Tipologias */}
      <TypologiesSection>
        <TypologiesTag>{mockConfig.typologies.tag}</TypologiesTag>
        <TypologiesTitle dangerouslySetInnerHTML={{ __html: mockConfig.typologies.title }} />

        <TypologiesGrid>
          {mockConfig.typologies.cards.map((card, idx) => (
            <TypologyCard key={idx} $theme={card.theme}>
              <TypologyImageWrapper>
                <img src={card.image} alt={card.title} />
                {card.badge && <TypologyBadge $bg={card.badgeBg} $color={card.badgeColor}>{card.badge}</TypologyBadge>}
                {card.badgeRight && <TypologyBadgeRight>{card.badgeRight}</TypologyBadgeRight>}
              </TypologyImageWrapper>
              
              <TypologyContent>
                <TypologyCardTitle>{card.title}</TypologyCardTitle>
                <TypologyCardSubtitle $theme={card.theme}>{card.subtitle}</TypologyCardSubtitle>
                
                <TypologyDescription $theme={card.theme}>
                  {card.description}
                </TypologyDescription>
                
                <TypologyFeatures>
                  {card.features.map((feature, fIdx) => (
                    <TypologyFeatureItem key={fIdx} $theme={card.theme}>
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </TypologyFeatureItem>
                  ))}
                </TypologyFeatures>
                
                <TypologyButton $theme={card.theme}>
                  {card.buttonText}
                  <ArrowRight size={14} />
                </TypologyButton>
              </TypologyContent>
            </TypologyCard>
          ))}
        </TypologiesGrid>
      </TypologiesSection>

      {/* Seção Lazer */}
      <LeisureSection>
        <LeisureTag>{mockConfig.leisure.tag}</LeisureTag>
        <LeisureTitle dangerouslySetInnerHTML={{ __html: mockConfig.leisure.title }} />

        <LeisureGrid>
          {mockConfig.leisure.items.map((item, idx) => (
            <LeisureCard key={idx}>
              <LeisureIconWrapper>
                {item.icon === 'droplet' && <Droplet size={24} strokeWidth={1.5} />}
                {item.icon === 'waves' && <Waves size={24} strokeWidth={1.5} />}
                {item.icon === 'heart-pulse' && <HeartPulse size={24} strokeWidth={1.5} />}
                {item.icon === 'trophy' && <Trophy size={24} strokeWidth={1.5} />}
                {item.icon === 'dumbbell' && <Dumbbell size={24} strokeWidth={1.5} />}
                {item.icon === 'shield-check' && <ShieldCheck size={24} strokeWidth={1.5} />}
                {item.icon === 'lock' && <Lock size={24} strokeWidth={1.5} />}
                {item.icon === 'cpu' && <Cpu size={24} strokeWidth={1.5} />}
              </LeisureIconWrapper>
              <LeisureCardText>{item.text}</LeisureCardText>
            </LeisureCard>
          ))}
        </LeisureGrid>
      </LeisureSection>
    </>
  );
}

