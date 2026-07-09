import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Calendar, Mail, ArrowRight, Clock, Diamond, Building, Palette, Award, Gem, User, PlayCircle, CheckCircle2, Droplet, Waves, HeartPulse, Trophy, Dumbbell, ShieldCheck, Lock, Cpu, MapPin, Crown, Utensils, ShoppingBag, Plane, Hospital, TreePine, GraduationCap, Building2, Train, Globe, TrendingUp, Key, UserCheck, BarChart3, FileText, Tag, CalendarDays, BarChart2, X, Sparkles, Settings } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import bgDesktop from '../../assets/images/bg-premium.png';
import planta1 from '../../assets/images/planta-1.png';
import planta2 from '../../assets/images/planta-2.png';
import planta3 from '../../assets/images/planta-3.png';
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
      title: 'Saint Claire by Dolce & Gabbana —\nApartamento de Luxo em São Paulo',
      subtitle: 'LIFESTYLE BY DOLCE&GABBANA CASA',
      description: 'A primeira branded residence da Dolce&Gabbana Casa na América Latina. 62 unidades de ultra alto padrão no Jardim Europa, São Paulo.',
      features: [
        { text: '246–279', highlight: false },
        { text: '591', highlight: false },
        { text: 'PRÉ-LANÇAMENTO 2026', highlight: true }
      ],
      delivery: 'MAR/2029',
    },
    visibility: {
      showTopBar: true,
      showCountdown: true,
      showScheduleVisit: true,
      showFloatingWhatsapp: true,
      showTitle: true,
      showSubtitle: true,
      showDescription: true,
      showFeature1: true,
      showFeature2: true,
      showFeature3: true,
      showDelivery: true,
    },
    styles: {
      titleFontSize: 72,
      subtitleFontSize: 14,
      descriptionFontSize: 18,
    },
    countdownTarget: '2026-12-31T23:59:59',
  },
  concept: {
    tag: 'O CONCEITO',
    title: 'Uma <em>branded residence</em>\nsem precedentes',
    highlightText: 'O Saint Claire by Dolce & Gabbana é o mais sofisticado lançamento de imóvel de luxo em São Paulo. Desenvolvido em parceria com a grife italiana Dolce & Gabbana Casa, o empreendimento une arquitetura exclusiva, materiais nobres e um endereço privilegiado na capital paulista. Para quem busca apartamento de alto padrão em São Paulo com design de grife, o Saint Claire é único. Preços a partir de R$ 10.000.000. Entre em contato com a TAB House para condições especiais.',
    mainText: 'O Saint Claire Lifestyle by Dolce&Gabbana Casa nasce como o primeiro empreendimento residencial do Brasil — e da América Latina — a integrar a identidade artística e cultural da Dolce&Gabbana Casa em cada detalhe de seus espaços.',
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
      headerTitle: 'Registrar Interesse no Saint Claire',
      fields: [
        { label: 'NOME COMPLETO *', placeholder: 'Seu nome', type: 'text' },
        { label: 'E-MAIL *', placeholder: 'seu@email.com', type: 'email' },
        { label: 'WHATSAPP *', placeholder: '(11) 99999-9999', type: 'tel' }
      ],
      textarea: { label: 'MENSAGEM', placeholder: 'Conte-nos mais sobre o que procura...' },
      buttonText: 'REGISTRAR INTERESSE NO SAINT CLAIRE',
      socialProof: '103 pessoas já demonstraram interesse',
      privacyText: 'Ao enviar, você concorda com nossa Política de Privacidade'
    }
  },
  video: {
    tag: 'CONHEÇA O PROJETO',
    title: 'Veja o Jardim da Hípica\n<em>em movimento</em>',
    subtitle: 'Descubra todos os detalhes deste lançamento exclusivo da Lavvi no coração de Santo Amaro',
    videoId: 'DzK8X-t5BYY',
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
          { image: planta1, name: 'Tipo — Planta 01' },
          { image: planta2, name: 'Tipo — Planta 02' },
          { image: planta3, name: 'Tipo — Planta 03' }
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
        description: 'A expressão máxima do Saint Claire. Dois pavimentos de monumentalidade italiana com terraço panorâmico privativo, piscina e coleção artística exclusiva Dolce&Gabbana Casa.',
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
  highlights: {
    visibility: {
      show: true,
      showItem1: true,
      showItem2: true,
      showItem3: true,
      showItem4: true,
    },
    items: [
      { value: '246–591m²', label: 'METRAGENS' },
      { value: '62', label: 'UNIDADES EXCLUSIVAS' },
      { value: 'D&G Casa', label: '1ª PARCERIA LAT. AMÉRICA' },
      { value: 'Mar/2029', label: 'PREVISÃO DE ENTREGA' }
    ]
  },
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
  },
  reasons: {
    tag: 'POR QUE O SAINT CLAIRE',
    title: 'Quatro razões para\n<em>investir agora</em>',
    items: [
      {
        icon: 'building',
        title: 'Cyrela',
        description: 'Uma das maiores incorporadoras do Brasil — 60 anos de excelência, mais de 100 prêmios e projetos que definiram o mercado imobiliário nacional.'
      },
      {
        icon: 'diamond',
        title: '1ª Parceria D&G Casa',
        description: 'Primeira branded residence da Dolce&Gabbana Casa na América Latina. Interiores exclusivos com os icônicos Signature Prints e o conceito Carretto Siciliano.'
      },
      {
        icon: 'map-pin',
        title: 'Jardim Europa',
        description: 'O metro quadrado mais valorizado de São Paulo. Endereço impossível de replicar — terrenos são raríssimos neste bairro fechado e preservado.'
      },
      {
        icon: 'crown',
        title: '62 Unidades',
        description: 'Torre única com apenas 62 unidades. Exclusividade máxima, baixa densidade e VGV estimado de R$ 700 milhões — ticket médio acima de R$ 10 milhões.'
      }
    ]
  },
  club: {
    tag: 'CLUBE EXCLUSIVO',
    title: 'Lazer completo em\n<em>clube privativo</em>',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Imagem placeholder simulando a piscina e palmeiras
  },
  location: {
    tag: 'LOCALIZAÇÃO PRIVILEGIADA',
    title: 'Rua Joaquim Antunes\n<em>Jardim Europa · São Paulo</em>',
    buttonText: 'ABRIR NO GOOGLE MAPS',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.8483134606553!2d-46.68341648440578!3d-23.573887067936173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57715f8a0063%3A0xc00c01cb3b320577!2sR.%20Joaquim%20Antunes%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
    mapLink: 'https://maps.google.com/?q=Rua+Joaquim+Antunes,Sao+Paulo',
    overlay: {
      tag: 'SAINT CLAIRE',
      title: 'Jardim Europa - São Paulo',
      subtitle: 'Rua Joaquim Antunes · Jardim Europa · SP'
    },
    poiTitle: 'O ENDEREÇO MAIS EXCLUSIVO DE SÃO PAULO',
    pointsOfInterest: [
      { icon: 'utensils', name: 'Melhores restaurantes', time: '5 min', color: '#E53E3E' },
      { icon: 'shopping-bag', name: 'JK Iguatemi & Iguatemi', time: '10 min', color: '#D69E2E' },
      { icon: 'plane', name: 'Aeroporto Congonhas', time: '15 min', color: '#4A5568' },
      { icon: 'hospital', name: 'Hospital Albert Einstein', time: '20 min', color: '#3182CE' },
      { icon: 'tree-pine', name: 'Parque do Ibirapuera', time: '10 min', color: '#38A169' },
      { icon: 'graduation-cap', name: 'Melhores colégios', time: '5 min', color: '#805AD5' },
      { icon: 'building-2', name: 'Cidade Jardim', time: '8 min', color: '#D69E2E' },
      { icon: 'train', name: 'Metrô Faria Lima', time: '12 min', color: '#4A5568' }
    ]
  },
  analysis: {
    tag: 'ANÁLISE DE MERCADO',
    title: 'O Saint Claire no topo do\n<em>mercado global de luxo</em>',
    subtitle: 'Comparativo com as principais branded residences do mundo. O Saint Claire compete diretamente\ncom projetos de R$ 700M+ em VGV.',
    headers: ['EMPREENDIMENTO', 'MARCA', 'LOCALIZAÇÃO', 'UNIDADES', 'METRAGEM', 'TICKET MÉDIO', 'VGV ESTIMADO'],
    rows: [
      {
        isHighlight: true,
        tag: 'VOCÊ ESTÁ AQUI',
        name: 'Saint Claire',
        description: '1ª D&G Casa Lat. América',
        brand: 'Dolce&Gabbana Casa\n+ Cyrela',
        location: 'Jardim Europa, SP',
        units: '62\ntorre única',
        size: '246–591m²',
        ticket: '> R$ 10M',
        vgv: '~R$ 700M'
      },
      {
        isHighlight: false,
        name: 'Armani Casa Residences',
        description: 'Armani / Casa',
        brand: 'Giorgio Armani',
        location: 'Sunny Isles, Miami',
        units: '308',
        size: '186–557m²',
        ticket: 'USD 3–7M',
        vgv: '~USD 1B'
      },
      {
        isHighlight: false,
        name: 'Pininfarina Residences',
        description: 'Pininfarina of Brazil',
        brand: 'Pininfarina Design',
        location: 'Brickell, Miami',
        units: '56',
        size: '120–525m²',
        ticket: 'USD 2–5M',
        vgv: '~USD 200M'
      },
      {
        isHighlight: false,
        name: 'Versace Palazzo',
        description: 'Versace Home',
        brand: 'Versace Home',
        location: 'Dubai Marina',
        units: '228',
        size: '90–480m²',
        ticket: 'USD 2–6M',
        vgv: '~USD 500M'
      }
    ],
    cards: [
      {
        icon: 'globe',
        title: 'Ineditismo absoluto',
        description: 'O Saint Claire é a ÚNICA branded residence da Dolce&Gabbana Casa em toda a América Latina. Não há similar no Brasil ou no continente — ativo irreproduzível.'
      },
      {
        icon: 'map-pin',
        title: 'Endereço impossível',
        description: 'Jardim Europa concentra o metro quadrado mais valorizado de SP. Terrenos neste bairro são raríssimos — nenhum concorrente pode replicar esta localização.'
      },
      {
        icon: 'trending-up',
        title: 'Proteção de patrimônio',
        description: 'Branded residences globalmente valorizam 20–30% acima de projetos convencionais similares. Combinado com a escassez de 62 unidades: ativo de preservação de capital.'
      }
    ]
  },
  bottomCountdown: {
    title: 'Apenas 62 unidades · Vagas limitadas para\napresentação privada',
    subtitle: 'Condições exclusivas para registros realizados antes do evento de\npré-lançamento',
    buttonText: 'REGISTRAR AGORA'
  },
  consultancy: {
    tag: 'SUA CONSULTORIA',
    title: 'Por que via TAB House?',
    cards: [
      {
        icon: 'key',
        title: 'Acesso Privilegiado',
        description: 'A TAB House tem relação direta com a Cyrela, garantindo acesso antecipado às melhores unidades e condições exclusivas.'
      },
      {
        icon: 'user-check',
        title: 'Consultor Dedicado',
        description: 'Você conta com um especialista em mercado de ultra alto padrão do início ao fim — da simulação à assinatura do contrato.'
      },
      {
        icon: 'bar-chart',
        title: 'Análise de Investimento',
        description: 'VGV estimado de R$700M, ticket médio acima de R$10M. Projeções e comparativos completos para a melhor decisão.'
      }
    ]
  },
  contact: {
    tag: 'ACESSO EXCLUSIVO',
    title: 'Registre seu\ninteresse no Saint Claire',
    description: 'Deixe seus dados e nossa equipe entrará em contato com informações exclusivas, tabela de preços e agendamento de apresentação privada.',
    benefits: [
      { icon: 'file-text', text: 'Material completo do empreendimento' },
      { icon: 'tag', text: 'Tabela de preços atualizada' },
      { icon: 'calendar', text: 'Apresentação privada agendada' },
      { icon: 'bar-chart-2', text: 'Análise de investimento gratuita' }
    ],
    whatsappText: 'Ou fale agora:',
    whatsappButton: 'Falar no WhatsApp',
    formButton: 'REGISTRAR INTERESSE NO SAINT CLAIRE',
    socialProof: '112 pessoas',
    socialProofSuffix: 'já demonstraram interesse'
  },
  exitPopup: {
    tag: 'APENAS 62 UNIDADES · PRÉ-LANÇAMENTO EXCLUSIVO',
    title: 'Espere! Não perca sua\noportunidade exclusiva',
    description: 'Deixe seu contato e receba informações exclusivas sobre o <strong>Saint Claire</strong>',
    socialProof: '115 pessoas',
    socialProofSuffix: 'já demonstraram interesse',
    buttonText: 'QUERO RECEBER INFORMAÇÕES EXCLUSIVAS',
    privacyText: 'Dados protegidos pela LGPD',
    cancelText: 'Não tenho interesse'
  },
  footer: {
    copyright: '© 2025 <strong>TAB House Imóveis</strong>. Todos os direitos reservados.',
    links: [
      { text: 'Política de Privacidade', href: '#' },
      { text: 'Termos de Uso', href: '#' }
    ],
    cookiesText: 'Cookies',
    poweredBy: 'Powered by Readdy'
  }
};

// --- Styled Components ---

const TopBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: #110E0A; /* Cor de fundo marrom muito escuro/quase preto da imagem */
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-family: 'Inter', sans-serif;
  position: sticky;
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
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
  /* padding-top removido pois o TopBar agora é sticky e ocupa espaço no fluxo */
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
  box-sizing: border-box;
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

const Title = styled.h1<{ $fontSize?: number }>`
  font-family: 'Cormorant Garamond', serif;
  font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : '4.5rem'};
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: ${props => props.$fontSize ? `${Math.max(props.$fontSize * 0.6, 24)}px` : '3rem'};
  }
`;

const Subtitle = styled.h3<{ $fontSize?: number }>`
  font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : '0.85rem'};
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #A0AEC0;
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
`;

const Description = styled.p<{ $fontSize?: number }>`
  font-size: ${props => props.$fontSize ? `${props.$fontSize}px` : '1.1rem'};
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
  position: absolute;
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
  position: absolute;
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
  padding: 5rem 2rem;
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
  padding: 1.6rem 1.5rem;
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
  background-color: rgba(246, 236, 215, 1);
  padding: 0.5rem;
`;

const LeisureCardText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4A5568;
  font-weight: 300;
  line-height: 1.4;
`;

// --- Seção Razões ---

const ReasonsSection = styled.section`
  width: 100%;
  background-color: rgb(250, 245, 236);
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ReasonsTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const ReasonsTitle = styled.h2`
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

const ReasonsGrid = styled.div`
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

const ReasonCard = styled.div`
  background-color: #FFFFFF;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 1.5rem;
  border-radius: 2px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.05);
  }
`;

const ReasonIconBox = styled.div`
  width: 42px;
  height: 42px;
  background-color: rgb(250, 245, 236);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(201, 163, 71);
  border-radius: 2px;
`;

const ReasonCardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1A202C;
  margin: 0;
`;

const ReasonCardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #718096;
  margin: 0;
`;

// --- Seção Clube Exclusivo (Banner) ---

const ClubBannerSection = styled.section<{ $bgImage: string }>`
  width: 100%;
  min-height: 80vh;
  position: relative;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  padding: 0 9rem;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    /* Gradiente escuro na esquerda para dar contraste ao texto, clareando pra direita */
    background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    padding: 0 2rem;
    justify-content: center;
    text-align: center;
    
    &::before {
      background: rgba(0,0,0,0.5); /* Overlay uniforme no mobile para garantir leitura */
    }
  }
`;

const ClubContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const ClubTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  display: block;
`;

const ClubTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.1;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

// --- Seção Localização ---

const LocationSection = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 8rem 0 0 0; /* Padding bottom 0 pois o mapa vai até o final */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocationHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const LocationTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const LocationTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #1A202C;
  margin: 0;
  white-space: pre-line;

  em {
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LocationButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(201, 163, 71, 0.4);
  background: transparent;
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(201, 163, 71, 0.05);
    border-color: rgb(201, 163, 71);
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background: #E2E8F0;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const MapOverlayCard = styled.div`
  position: absolute;
  top: 3rem;
  left: max(2rem, calc(50% - 600px)); /* Alinha com o grid de 1200px */
  background: #110E0A;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  z-index: 10;
  border-radius: 2px;
  max-width: 350px;

  @media (max-width: 768px) {
    top: auto;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
    max-width: none;
  }
`;

const OverlayHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  .icon-box {
    background: rgb(201, 163, 71);
    color: #110E0A;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
  }

  .texts {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .tag {
      color: rgb(201, 163, 71);
      font-family: 'Inter', sans-serif;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .title {
      color: #FFFFFF;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const OverlaySubtitle = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.4;
`;

const PoiSectionWrapper = styled.div`
  width: 100%;
  background-color: rgb(250, 245, 236);
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PoiSectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #A0AEC0;
  text-transform: uppercase;
  margin: 0 0 3rem 0;
  text-align: center;
`;

const PoiGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PoiCard = styled.div<{ $iconColor: string }>`
  background-color: #FFFFFF;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 2px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.05);
    border-color: ${props => props.$iconColor}20; /* Borda sutil na cor do ícone */
  }
`;

const PoiIconWrapper = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$color}10; /* Fundo com 10% de opacidade da cor */
  color: ${props => props.$color};
  border-radius: 4px;
  flex-shrink: 0;
`;

const PoiTextContent = styled.div<{ $timeColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .name {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #2D3748;
  }

  .time {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${props => props.$timeColor};
  }
`;

// --- Seção Análise de Mercado ---

const AnalysisSection = styled.section`
  width: 100%;
  background-color: #0A0A0A; /* Fundo preto/muito escuro */
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnalysisHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
`;

const AnalysisTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const AnalysisTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.1;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
    color: rgb(201, 163, 71);
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const AnalysisSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  max-width: 500px;
  white-space: pre-line;
  margin: 0;
`;

const AnalysisTableWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  overflow-x: auto; /* Permite scroll horizontal no mobile se necessário */
  
  /* Esconde a barra de rolagem mas mantém a funcionalidade */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;  
`;

const AnalysisTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px; /* Garante que a tabela não esmague demais no mobile */
`;

const AnalysisThead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const AnalysisTh = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;

  &:first-child {
    padding-left: 1.5rem;
  }
`;

const AnalysisTr = styled.tr<{ $isHighlight?: boolean }>`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s ease;

  ${props => props.$isHighlight && `
    border: 1px solid rgba(201, 163, 71, 0.3);
    background-color: rgba(201, 163, 71, 0.02);
  `}

  &:hover {
    background-color: ${props => props.$isHighlight ? 'rgba(201, 163, 71, 0.05)' : 'rgba(255, 255, 255, 0.02)'};
  }
`;

const AnalysisTd = styled.td<{ $isHighlight?: boolean }>`
  padding: 1.5rem 1rem;
  vertical-align: middle;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: ${props => props.$isHighlight ? 'rgb(201, 163, 71)' : 'rgba(255, 255, 255, 0.6)'};
  white-space: pre-line;

  &:first-child {
    padding-left: 1.5rem;
  }
`;

const HighlightTag = styled.div`
  display: inline-block;
  background-color: rgb(201, 163, 71);
  color: #110E0A;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  margin-bottom: 0.75rem;
`;

const EmpreendimentoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #FFFFFF;
  }

  .desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const AnalysisCardsGrid = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AnalysisCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;

  &:first-child {
    border-color: rgba(201, 163, 71, 0.3);
  }

  &:hover {
    border-color: rgba(201, 163, 71, 0.3);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const AnalysisCardIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(201, 163, 71, 0.1);
  color: rgb(201, 163, 71);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

const AnalysisCardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;

  /* Aplica a cor dourada ao título do primeiro card (conforme a imagem) */
  ${AnalysisCard}:first-child & {
    color: rgb(201, 163, 71);
  }
`;

const AnalysisCardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

// --- Seção Bottom Countdown Banner ---

const BottomBannerSection = styled.section`
  width: 100%;
  background-color: rgb(201, 163, 71);
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBannerContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const BannerIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #110E0A;
  border-radius: 2px;
  flex-shrink: 0;
`;

const BannerTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BannerTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #110E0A;
  margin: 0;
  white-space: pre-line;
`;

const BannerSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(17, 14, 10, 0.7);
  margin: 0;
  white-space: pre-line;
  line-height: 1.4;
`;

const BannerRightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const BannerTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BannerTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const BannerTimeNumber = styled.div`
  background: #110E0A;
  color: rgb(201, 163, 71);
  padding: 0.5rem 0.6rem;
  font-size: 1.1rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border-radius: 2px;
  min-width: 45px;
  text-align: center;
`;

const BannerTimeLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  color: rgba(17, 14, 10, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
`;

const BannerTimeSeparator = styled.span`
  color: rgba(17, 14, 10, 0.4);
  font-weight: 600;
  margin-bottom: 1.25rem;
`;

const BannerButton = styled.button`
  background: #110E0A;
  color: rgb(201, 163, 71);
  border: none;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

// --- Seção Consultoria TAB House ---

const ConsultancySection = styled.section`
  width: 100%;
  background-color: #FFFFFF; /* Fundo totalmente branco */
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConsultancyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;
`;

const ConsultancyTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const ConsultancyTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  color: #110E0A;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const ConsultancyGrid = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ConsultancyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #FFFFFF;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border-color: rgba(201, 163, 71, 0.2);
  }
`;

const ConsultancyIconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(201, 163, 71, 0.1);
  color: rgb(201, 163, 71);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-bottom: 1.5rem;
`;

const ConsultancyCardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #110E0A;
  margin: 0 0 1rem 0;
`;

const ConsultancyCardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(17, 14, 10, 0.6);
  margin: 0;
`;

// --- Seção Contato ---

const ContactSection = styled.section`
  width: 100%;
  background-color: #0A0A0A;
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;

  @media (max-width: 992px) {
    padding-right: 0;
  }
`;

const ContactTag = styled.span`
  color: rgb(201, 163, 71);
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.1;
  color: #FFFFFF;
  margin: 0 0 1.5rem 0;
  white-space: pre-line;

  em {
    font-style: italic;
    color: #FFFFFF;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const ContactDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2rem 0;
  max-width: 480px;
`;

const ContactBenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
`;

const ContactBenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BenefitIconBox = styled.div`
  width: 28px;
  height: 28px;
  background-color: rgba(201, 163, 71, 0.1);
  color: rgb(201, 163, 71);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
`;

const BenefitText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const WhatsappCallBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const WhatsappButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #25D366;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  text-decoration: none;
  width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1EBE5D;
    transform: translateY(-2px);
  }
`;

const ContactFormBox = styled.div`
  background-color: rgba(22, 22, 22, 1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1.7rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContactFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
  }

  input, textarea {
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 2px;
    padding: 0.7rem 1rem;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    transition: border-color 0.3s ease;
    background-color: rgba(255, 255, 255, 0.06);

    &:focus {
      outline: none;
      border-color: rgb(201, 163, 71);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ContactFormSubmitButton = styled.button`
  background-color: rgb(201, 163, 71);
  color: #110E0A;
  border: none;
  padding: 1.2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 0.7rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(215, 180, 90);
    transform: translateY(-2px);
  }
`;

const ContactFormSocialProof = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ContactAvatarsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgb(201, 163, 71);
    border: 2px solid #110E0A;
    margin-left: -8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #110E0A;

    &:first-child {
      margin-left: 0;
    }
  }

  .text {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    margin-left: 0.75rem;

    strong {
      color: rgb(201, 163, 71);
      font-weight: 600;
    }
  }
`;

const ContactFormPrivacy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  text-align: center;

  a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: underline;
    
    &:hover {
      color: #FFFFFF;
    }
  }
`;

// --- Exit Intent Popup ---

const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PopupContent = styled.div`
  background-color: #110E0A;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  z-index: 10;

  &:hover {
    color: #FFFFFF;
  }
`;

const PopupHeader = styled.div`
  padding: 3rem 3rem 2rem 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem 1.5rem 1.5rem;
  }
`;

const PopupIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(201, 163, 71, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;

  .icon {
    color: rgb(201, 163, 71);
  }

  .sparkle {
    position: absolute;
    top: -5px;
    right: -5px;
    color: rgb(201, 163, 71);
    background: #110E0A;
    border-radius: 50%;
  }
`;

const PopupTag = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgb(201, 163, 71);
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before, &::after {
    content: '';
    width: 4px;
    height: 4px;
    background-color: rgb(201, 163, 71);
    border-radius: 50%;
  }
`;

const PopupTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  white-space: pre-line;

  em {
    font-style: italic;
    color: rgb(201, 163, 71);
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const PopupDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 1.5rem 0;

  strong {
    color: #FFFFFF;
    font-weight: 600;
  }
`;

const PopupBody = styled.div`
  padding: 2rem 3rem 3rem 3rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const PopupFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PopupCheckboxGroup = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  margin-bottom: 1.5rem;

  input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    background: transparent;
    cursor: pointer;
    position: relative;
    margin-top: 2px;
    flex-shrink: 0;

    &:checked {
      background-color: rgb(201, 163, 71);
      border-color: rgb(201, 163, 71);

      &::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        width: 4px;
        height: 8px;
        border: solid #110E0A;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.4;

    a {
      color: rgb(201, 163, 71);
      text-decoration: underline;
      &:hover { color: #FFFFFF; }
    }
  }
`;

const PopupSubmitButton = styled.button`
  width: 100%;
  background-color: rgb(201, 163, 71);
  color: #110E0A;
  border: none;
  padding: 1.2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(215, 180, 90);
    transform: translateY(-2px);
  }
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  button {
    background: transparent;
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    text-decoration: underline;
    
    &:hover {
      color: #FFFFFF;
    }
  }
`;

// --- Rodapé (Footer) ---

const FooterSection = styled.footer`
  width: 100%;
  background-color: rgb(250, 245, 236);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  /* Garante que o rodapé não fique escondido atrás dos botões flutuantes em telas menores */
  @media (max-width: 768px) {
    padding-bottom: 5rem;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterCopyright = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(17, 14, 10, 0.6);

  strong {
    color: #110E0A;
    font-weight: 600;
  }
`;

const FooterLinksBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(17, 14, 10, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #110E0A;
  }
`;

const FooterCookies = styled.button`
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(17, 14, 10, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #110E0A;
  }
`;

const FooterPoweredBy = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(17, 14, 10, 0.4);
`;

// --- Componente Principal ---

export const premiumDefaultConfig = mockConfig;

export default function PremiumTemplate({ config = premiumDefaultConfig }: { config?: typeof premiumDefaultConfig }) {
  const { hero, highlights, concept, video, gallery, floorPlans, typologies, leisure, reasons, club, location, analysis, bottomCountdown, consultancy, contact, footer, exitPopup } = config;
  const [activeTab, setActiveTab] = React.useState(config.floorPlans.tabs[0].id);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(config.hero.countdownTarget || '2026-12-31T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [config.hero.countdownTarget]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeenPopup) {
        setShowExitPopup(true);
        setHasSeenPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasSeenPopup]);

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
            <TopBarTimeBox><TopBarTimeNumber>{String(timeLeft.days).padStart(2, '0')}</TopBarTimeNumber><TopBarTimeLabel>DIAS</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>{String(timeLeft.hours).padStart(2, '0')}</TopBarTimeNumber><TopBarTimeLabel>HRS</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>{String(timeLeft.minutes).padStart(2, '0')}</TopBarTimeNumber><TopBarTimeLabel>MIN</TopBarTimeLabel></TopBarTimeBox>
            <TopBarSeparator>:</TopBarSeparator>
            <TopBarTimeBox><TopBarTimeNumber>{String(timeLeft.seconds).padStart(2, '0')}</TopBarTimeNumber><TopBarTimeLabel>SEG</TopBarTimeLabel></TopBarTimeBox>
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
            
            {hero.visibility.showTitle && (
              <Title $fontSize={hero.styles?.titleFontSize}>{hero.content.title}</Title>
            )}
            {hero.visibility.showSubtitle && (
              <Subtitle $fontSize={hero.styles?.subtitleFontSize}>{hero.content.subtitle}</Subtitle>
            )}
            {hero.visibility.showDescription && (
              <Description $fontSize={hero.styles?.descriptionFontSize}>{hero.content.description}</Description>
            )}
            
            <FeaturesRow>
              {hero.visibility.showFeature1 !== false && hero.content.features[0] && (
                <FeatureTag $highlight={hero.content.features[0].highlight}>
                  {hero.content.features[0].text} M²
                </FeatureTag>
              )}
              {hero.visibility.showFeature2 !== false && hero.content.features[1] && (
                <FeatureTag $highlight={hero.content.features[1].highlight}>
                  ATÉ {hero.content.features[1].text} M² COBERTURA
                </FeatureTag>
              )}
              {hero.visibility.showFeature3 !== false && hero.content.features[2] && (
                <FeatureTag $highlight={hero.content.features[2].highlight}>
                  {hero.content.features[2].text}
                </FeatureTag>
              )}
            </FeaturesRow>
            
            {hero.visibility.showDelivery !== false && (
              <DeliveryTag>
                <Calendar size={14} />
                ENTREGA: {hero.content.delivery}
              </DeliveryTag>
            )}
          </LeftBlock>

          {/* Lado Direito / Ações e Formulário Flutuante */}
          {(hero.layout === 'split' || hero.layout === 'right') && (
            <RightBlock>
              {hero.visibility.showCountdown && (
                <CountdownWrapper>
                  <EventText>Evento em:</EventText>
                  <TimerBoxes>
                    <TimeBox><TimeNumber>{String(timeLeft.days).padStart(2, '0')}</TimeNumber><TimeLabel>DIAS</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>{String(timeLeft.hours).padStart(2, '0')}</TimeNumber><TimeLabel>HRS</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>{String(timeLeft.minutes).padStart(2, '0')}</TimeNumber><TimeLabel>MIN</TimeLabel></TimeBox>
                    <TimeSeparator>:</TimeSeparator>
                    <TimeBox><TimeNumber>{String(timeLeft.seconds).padStart(2, '0')}</TimeNumber><TimeLabel>SEG</TimeLabel></TimeBox>
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
              Consultar Saint Claire online
            </PillConsultar>
            <WhatsappCircle>
              <FaWhatsapp />
            </WhatsappCircle>
          </FloatingWhatsappGroup>
        )}

      </HeroWrapper>

      {/* Barra de Highlights Logo Abaixo da Hero */}
      {highlights.visibility.show && (
        <HighlightsBar>
          {highlights.visibility.showItem1 !== false && highlights.items[0] && (
            <HighlightCard>
              <HighlightValue>{highlights.items[0].value}</HighlightValue>
              <HighlightLabel>{highlights.items[0].label}</HighlightLabel>
            </HighlightCard>
          )}
          {highlights.visibility.showItem2 !== false && highlights.items[1] && (
            <HighlightCard>
              <HighlightValue>{highlights.items[1].value}</HighlightValue>
              <HighlightLabel>{highlights.items[1].label}</HighlightLabel>
            </HighlightCard>
          )}
          {highlights.visibility.showItem3 !== false && highlights.items[2] && (
            <HighlightCard>
              <HighlightValue>{highlights.items[2].value}</HighlightValue>
              <HighlightLabel>{highlights.items[2].label}</HighlightLabel>
            </HighlightCard>
          )}
          {highlights.visibility.showItem4 !== false && highlights.items[3] && (
            <HighlightCard>
              <HighlightValue>{highlights.items[3].value}</HighlightValue>
              <HighlightLabel>{highlights.items[3].label}</HighlightLabel>
            </HighlightCard>
          )}
        </HighlightsBar>
      )}

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

      {/* Seção Razões / Por Que Investir */}
      <ReasonsSection>
        <ReasonsTag>{mockConfig.reasons.tag}</ReasonsTag>
        <ReasonsTitle dangerouslySetInnerHTML={{ __html: mockConfig.reasons.title }} />

        <ReasonsGrid>
          {mockConfig.reasons.items.map((item, idx) => (
            <ReasonCard key={idx}>
              <ReasonIconBox>
                {item.icon === 'building' && <Building size={20} strokeWidth={1.5} />}
                {item.icon === 'diamond' && <Diamond size={20} strokeWidth={1.5} />}
                {item.icon === 'map-pin' && <MapPin size={20} strokeWidth={1.5} />}
                {item.icon === 'crown' && <Crown size={20} strokeWidth={1.5} />}
              </ReasonIconBox>
              <ReasonCardTitle>{item.title}</ReasonCardTitle>
              <ReasonCardDesc>{item.description}</ReasonCardDesc>
            </ReasonCard>
          ))}
        </ReasonsGrid>
      </ReasonsSection>

      {/* Seção Clube Exclusivo (Banner) */}
      <ClubBannerSection $bgImage={mockConfig.club.image}>
        <ClubContent>
          <ClubTag>{mockConfig.club.tag}</ClubTag>
          <ClubTitle dangerouslySetInnerHTML={{ __html: mockConfig.club.title }} />
        </ClubContent>
      </ClubBannerSection>

      {/* Seção Localização */}
      <LocationSection>
        <LocationHeader>
          <LocationTitleBox>
            <LocationTag>{mockConfig.location.tag}</LocationTag>
            <LocationTitle dangerouslySetInnerHTML={{ __html: mockConfig.location.title }} />
          </LocationTitleBox>
          <LocationButton href={mockConfig.location.mapLink} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} />
            {mockConfig.location.buttonText}
          </LocationButton>
        </LocationHeader>

        <MapContainer>
          <MapOverlayCard>
            <OverlayHeader>
              <div className="icon-box">
                <MapPin size={16} />
              </div>
              <div className="texts">
                <span className="tag">{mockConfig.location.overlay.tag}</span>
                <span className="title">{mockConfig.location.overlay.title}</span>
              </div>
            </OverlayHeader>
            <OverlaySubtitle>{mockConfig.location.overlay.subtitle}</OverlaySubtitle>
          </MapOverlayCard>

          <MapIframe 
            src={mockConfig.location.mapEmbedUrl}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>

        {/* Grid de Pontos de Interesse (PoI) */}
        <PoiSectionWrapper>
          <PoiSectionTitle>{mockConfig.location.poiTitle}</PoiSectionTitle>
          <PoiGrid>
            {mockConfig.location.pointsOfInterest.map((poi, idx) => (
              <PoiCard key={idx} $iconColor={poi.color}>
                <PoiIconWrapper $color={poi.color}>
                  {poi.icon === 'utensils' && <Utensils size={18} strokeWidth={2} />}
                  {poi.icon === 'shopping-bag' && <ShoppingBag size={18} strokeWidth={2} />}
                  {poi.icon === 'plane' && <Plane size={18} strokeWidth={2} />}
                  {poi.icon === 'hospital' && <Hospital size={18} strokeWidth={2} />}
                  {poi.icon === 'tree-pine' && <TreePine size={18} strokeWidth={2} />}
                  {poi.icon === 'graduation-cap' && <GraduationCap size={18} strokeWidth={2} />}
                  {poi.icon === 'building-2' && <Building2 size={18} strokeWidth={2} />}
                  {poi.icon === 'train' && <Train size={18} strokeWidth={2} />}
                </PoiIconWrapper>
                <PoiTextContent $timeColor={poi.color}>
                  <span className="name">{poi.name}</span>
                  <span className="time">{poi.time}</span>
                </PoiTextContent>
              </PoiCard>
            ))}
          </PoiGrid>
        </PoiSectionWrapper>
      </LocationSection>

      {/* Seção Análise de Mercado */}
      <AnalysisSection>
        <AnalysisHeader>
          <AnalysisTag>{mockConfig.analysis.tag}</AnalysisTag>
          <AnalysisTitle dangerouslySetInnerHTML={{ __html: mockConfig.analysis.title }} />
          <AnalysisSubtitle>{mockConfig.analysis.subtitle}</AnalysisSubtitle>
        </AnalysisHeader>

        <AnalysisTableWrapper>
          <AnalysisTable>
            <AnalysisThead>
              <tr>
                {mockConfig.analysis.headers.map((header, idx) => (
                  <AnalysisTh key={idx}>{header}</AnalysisTh>
                ))}
              </tr>
            </AnalysisThead>
            <tbody>
              {mockConfig.analysis.rows.map((row, idx) => (
                <AnalysisTr key={idx} $isHighlight={row.isHighlight}>
                  <AnalysisTd $isHighlight={row.isHighlight}>
                    {row.tag && <HighlightTag>{row.tag}</HighlightTag>}
                    <EmpreendimentoBox>
                      <span className="name">{row.name}</span>
                      <span className="desc">{row.description}</span>
                    </EmpreendimentoBox>
                  </AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.brand}</AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.location}</AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.units}</AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.size}</AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.ticket}</AnalysisTd>
                  <AnalysisTd $isHighlight={row.isHighlight}>{row.vgv}</AnalysisTd>
                </AnalysisTr>
              ))}
            </tbody>
          </AnalysisTable>
        </AnalysisTableWrapper>

        {/* Cards de Destaque da Análise */}
        <AnalysisCardsGrid>
          {mockConfig.analysis.cards.map((card, idx) => (
            <AnalysisCard key={idx}>
              <AnalysisCardIcon>
                {card.icon === 'globe' && <Globe size={20} strokeWidth={1.5} />}
                {card.icon === 'map-pin' && <MapPin size={20} strokeWidth={1.5} />}
                {card.icon === 'trending-up' && <TrendingUp size={20} strokeWidth={1.5} />}
              </AnalysisCardIcon>
              <AnalysisCardTitle>{card.title}</AnalysisCardTitle>
              <AnalysisCardDesc>{card.description}</AnalysisCardDesc>
            </AnalysisCard>
          ))}
        </AnalysisCardsGrid>
      </AnalysisSection>

      {/* Bottom Countdown Banner */}
      <BottomBannerSection>
        <BottomBannerContainer>
          <BannerLeftBox>
            <BannerIconWrapper>
              <Diamond size={20} strokeWidth={1.5} />
            </BannerIconWrapper>
            <BannerTextBox>
              <BannerTitle>{mockConfig.bottomCountdown.title}</BannerTitle>
              <BannerSubtitle>{mockConfig.bottomCountdown.subtitle}</BannerSubtitle>
            </BannerTextBox>
          </BannerLeftBox>

          <BannerRightBox>
            <BannerTimerWrapper>
              <BannerTimeBox><BannerTimeNumber>00</BannerTimeNumber><BannerTimeLabel>DIAS</BannerTimeLabel></BannerTimeBox>
              <BannerTimeSeparator>:</BannerTimeSeparator>
              <BannerTimeBox><BannerTimeNumber>00</BannerTimeNumber><BannerTimeLabel>HRS</BannerTimeLabel></BannerTimeBox>
              <BannerTimeSeparator>:</BannerTimeSeparator>
              <BannerTimeBox><BannerTimeNumber>00</BannerTimeNumber><BannerTimeLabel>MIN</BannerTimeLabel></BannerTimeBox>
              <BannerTimeSeparator>:</BannerTimeSeparator>
              <BannerTimeBox><BannerTimeNumber>00</BannerTimeNumber><BannerTimeLabel>SEG</BannerTimeLabel></BannerTimeBox>
            </BannerTimerWrapper>

            <BannerButton>
              {mockConfig.bottomCountdown.buttonText}
              <ArrowRight size={14} />
            </BannerButton>
          </BannerRightBox>
        </BottomBannerContainer>
      </BottomBannerSection>

      {/* Consultoria TAB House */}
      <ConsultancySection>
        <ConsultancyHeader>
          <ConsultancyTag>{mockConfig.consultancy.tag}</ConsultancyTag>
          <ConsultancyTitle>{mockConfig.consultancy.title}</ConsultancyTitle>
        </ConsultancyHeader>

        <ConsultancyGrid>
          {mockConfig.consultancy.cards.map((card, idx) => (
            <ConsultancyCard key={idx}>
              <ConsultancyIconBox>
                {card.icon === 'key' && <Key size={20} strokeWidth={1.5} />}
                {card.icon === 'user-check' && <UserCheck size={20} strokeWidth={1.5} />}
                {card.icon === 'bar-chart' && <BarChart3 size={20} strokeWidth={1.5} />}
              </ConsultancyIconBox>
              <ConsultancyCardTitle>{card.title}</ConsultancyCardTitle>
              <ConsultancyCardDesc>{card.description}</ConsultancyCardDesc>
            </ConsultancyCard>
          ))}
        </ConsultancyGrid>
      </ConsultancySection>

      {/* Seção Contato / Formulário */}
      <ContactSection>
        <ContactContainer>
          <ContactLeftBox>
            <ContactTag>{mockConfig.contact.tag}</ContactTag>
            <ContactTitle dangerouslySetInnerHTML={{ __html: mockConfig.contact.title.replace('\n', '<br/>').replace('Saint Claire', '<em>Saint Claire</em>') }} />
            <ContactDesc dangerouslySetInnerHTML={{ __html: mockConfig.contact.description }} />

            <ContactBenefitsList>
              {mockConfig.contact.benefits.map((benefit, idx) => (
                <ContactBenefitItem key={idx}>
                  <BenefitIconBox>
                    {benefit.icon === 'file-text' && <FileText size={16} />}
                    {benefit.icon === 'tag' && <Tag size={16} />}
                    {benefit.icon === 'calendar' && <CalendarDays size={16} />}
                    {benefit.icon === 'bar-chart-2' && <BarChart2 size={16} />}
                  </BenefitIconBox>
                  <BenefitText>{benefit.text}</BenefitText>
                </ContactBenefitItem>
              ))}
            </ContactBenefitsList>

            <WhatsappCallBox>
              <span>{mockConfig.contact.whatsappText}</span>
              <WhatsappButton href="#" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={20} />
                {mockConfig.contact.whatsappButton}
              </WhatsappButton>
            </WhatsappCallBox>
          </ContactLeftBox>

          <ContactFormBox>
            <ContactFormGroup>
              <label>Nome Completo *</label>
              <input type="text" placeholder="Seu nome" />
            </ContactFormGroup>
            <ContactFormGroup>
              <label>E-mail *</label>
              <input type="email" placeholder="seu@email.com" />
            </ContactFormGroup>
            <ContactFormGroup>
              <label>WhatsApp *</label>
              <input type="tel" placeholder="(11) 99999-9999" />
            </ContactFormGroup>
            <ContactFormGroup>
              <label>Mensagem</label>
              <textarea placeholder="Conte-nos mais sobre o que procura..."></textarea>
            </ContactFormGroup>
            
            <ContactFormSubmitButton>{mockConfig.contact.formButton}</ContactFormSubmitButton>
            
            <ContactFormSocialProof>
              <ContactAvatarsRow>
                <div className="avatar"><User size={12} /></div>
                <div className="avatar"><User size={12} /></div>
                <div className="avatar"><User size={12} /></div>
                <div className="text">
                  <strong>{mockConfig.contact.socialProof}</strong> {mockConfig.contact.socialProofSuffix}
                </div>
              </ContactAvatarsRow>
              <ContactFormPrivacy>
                Ao enviar, você concorda com nossa <a href="#">Política de Privacidade</a>
              </ContactFormPrivacy>
            </ContactFormSocialProof>
          </ContactFormBox>
        </ContactContainer>
      </ContactSection>

      {/* Footer / Rodapé */}
      <FooterSection>
        <FooterContainer>
          <FooterCopyright dangerouslySetInnerHTML={{ __html: mockConfig.footer.copyright }} />
          
          <FooterLinksBox>
            {mockConfig.footer.links.map((link, idx) => (
              <FooterLink key={idx} href={link.href}>{link.text}</FooterLink>
            ))}
            <FooterCookies>
              <Settings size={14} />
              {mockConfig.footer.cookiesText}
            </FooterCookies>
            <FooterPoweredBy>{mockConfig.footer.poweredBy}</FooterPoweredBy>
          </FooterLinksBox>
        </FooterContainer>
      </FooterSection>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <PopupOverlay onClick={() => setShowExitPopup(false)}>
          <PopupContent onClick={e => e.stopPropagation()}>
            <PopupCloseButton onClick={() => setShowExitPopup(false)}>
              <X size={20} strokeWidth={1.5} />
            </PopupCloseButton>

            <PopupHeader>
              <PopupIconWrapper>
                <Diamond size={24} strokeWidth={1.5} className="icon" />
                <Sparkles size={16} strokeWidth={2} className="sparkle" />
              </PopupIconWrapper>
              
              <PopupTag>{mockConfig.exitPopup.tag}</PopupTag>
              <PopupTitle dangerouslySetInnerHTML={{ __html: mockConfig.exitPopup.title.replace('\n', '<br/>') }} />
              <PopupDesc dangerouslySetInnerHTML={{ __html: mockConfig.exitPopup.description }} />
              
              <ContactAvatarsRow>
                <div className="avatar"><User size={12} /></div>
                <div className="avatar"><User size={12} /></div>
                <div className="avatar"><User size={12} /></div>
                <div className="avatar"><User size={12} /></div>
                <div className="text">
                  <strong>{mockConfig.exitPopup.socialProof}</strong> {mockConfig.exitPopup.socialProofSuffix}
                </div>
              </ContactAvatarsRow>
            </PopupHeader>

            <PopupBody>
              <PopupFormGrid>
                <ContactFormGroup>
                  <label>Nome *</label>
                  <input type="text" placeholder="Seu nome completo" />
                </ContactFormGroup>
                <ContactFormGroup>
                  <label>WhatsApp *</label>
                  <input type="tel" placeholder="(11) 99999-9999" />
                </ContactFormGroup>
              </PopupFormGrid>
              
              <ContactFormGroup style={{ marginBottom: '1.5rem' }}>
                <label>E-mail *</label>
                <input type="email" placeholder="seu@email.com" />
              </ContactFormGroup>

              <PopupCheckboxGroup>
                <input type="checkbox" defaultChecked />
                <span>Concordo com a <a href="#">Política de Privacidade</a> e autorizo contato da TAB House. *</span>
              </PopupCheckboxGroup>

              <PopupSubmitButton>
                <Sparkles size={16} strokeWidth={2} />
                {mockConfig.exitPopup.buttonText}
              </PopupSubmitButton>

              <PopupFooter>
                <span><Lock size={12} /> {mockConfig.exitPopup.privacyText}</span>
                <button onClick={() => setShowExitPopup(false)}>{mockConfig.exitPopup.cancelText}</button>
              </PopupFooter>
            </PopupBody>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
}

