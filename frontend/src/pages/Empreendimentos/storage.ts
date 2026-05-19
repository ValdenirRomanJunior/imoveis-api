export type LancamentoStatus = 'PUBLICADA' | 'RASCUNHO' | 'GERANDO';

export interface Tipologia {
  id: string;
  nome: string;
  area: number | '';
  quartos: number | '';
  vagas: number | '';
  preco: number | '';
  plantaImg?: string;
}

export interface ConteudoGerado {
  headline: string;
  subheadline: string;
  descricaoEmpreendimento: string;
  bulletsDiferenciais: string[];
  textoLocalizacao: string;
  mapaLocalizacao?: string;
  ctaPrincipal: string;
  ctaSecundario: string;
  metaTitle: string;
  metaDescription: string;
  sloganCurto: string;
  footerTexto?: string;
  footerDisclaimer?: string;
  facebookPixel?: string;
  googleAnalytics?: string;
  heroAlignment?: 'left' | 'center';
  primaryColor?: string;
  secondaryColor?: string;
  infobarLocalizacao?: string;
  infobarDorms?: string;
  infobarArea?: string;
  infobarBgColor?: string;
}

export interface Parceiro {
  id: string;
  papel: string;
  nome: string;
  descricao: string;
  foto: string;
}

export interface Proximidade {
  id: string;
  titulo: string;
  descricao: string;
  foto: string;
}

export interface BriefingData {
  nomeEmpreendimento: string;
  cidade: string;
  bairro: string;
  enderecoCompleto: string;
  segmento: string;
  fase: string;
  prazoEntrega: string;
  prazoEntregaRaw?: string;
  formasPagamento: string;
  tipologias: Tipologia[];
  diferenciais: string[];
  whatsappResponsavel: string;
  fotos: string[];
  parceiros?: Parceiro[];
  proximidades?: Proximidade[];
  logo?: string;
  heroBg?: string;
}

export interface Empreendimento {
  id: string;
  nome: string;
  slug: string;
  createdAt: string;
}

export interface LpSection {
  id: string; // 'hero', 'sobre', 'tipologias', 'proximidades', 'galeria', 'assinaturas', 'diferenciais', 'localizacao'
  visible: boolean;
  order: number;
}

export interface LpConfig {
  sections: LpSection[];
}

export const DEFAULT_LP_SECTIONS: LpSection[] = [
  { id: 'hero', visible: true, order: 0 },
  { id: 'sobre', visible: true, order: 1 },
  { id: 'tipologias', visible: true, order: 2 },
  { id: 'proximidades', visible: true, order: 3 },
  { id: 'galeria', visible: true, order: 4 },
  { id: 'assinaturas', visible: true, order: 5 },
  { id: 'diferenciais', visible: true, order: 6 },
  { id: 'localizacao', visible: true, order: 7 },
  { id: 'footer', visible: true, order: 8 }
];

export interface Lancamento {
  id: string;
  empreendimentoId: string;
  nome: string;
  slug: string;
  status: LancamentoStatus;
  leads: number;
  templateId: 'residencial' | 'mcmv';
  tenantSlug: string;
  briefing: BriefingData;
  conteudoGerado: ConteudoGerado;
  lpConfig?: LpConfig;
  createdAt: string;
}

const STORAGE_KEY_EMPREENDIMENTOS = 'standi_empreendimentos_list';
const STORAGE_KEY = 'standi_lancamentos_items';

export const getEmpreendimentos = (): Empreendimento[] => {
  const raw = localStorage.getItem(STORAGE_KEY_EMPREENDIMENTOS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Empreendimento[];
  } catch {
    return [];
  }
};

export const saveEmpreendimentos = (items: Empreendimento[]): void => {
  localStorage.setItem(STORAGE_KEY_EMPREENDIMENTOS, JSON.stringify(items));
};

export const createEmpreendimento = (nome: string): Empreendimento => {
  const list = getEmpreendimentos();
  const novo: Empreendimento = {
    id: `${Date.now()}`,
    nome,
    slug: toSlug(nome),
    createdAt: new Date().toISOString(),
  };
  list.unshift(novo);
  saveEmpreendimentos(list);
  return novo;
};

export const findEmpreendimentoById = (id: string): Empreendimento | undefined =>
  getEmpreendimentos().find((item) => item.id === id);

const defaultConteudo = (nome: string, cidade: string, bairro: string): ConteudoGerado => ({
  headline: `${nome}: o seu novo jeito de morar`,
  subheadline: `Conforto, praticidade e localização estratégica em ${cidade}`,
  descricaoEmpreendimento: `${nome} foi pensado para quem busca qualidade de vida em ${bairro}, com plantas inteligentes e excelente potencial de valorização.`,
  bulletsDiferenciais: [
    'Localização privilegiada',
    'Plantas funcionais',
    'Acabamento de qualidade',
    'Lazer para toda a família',
    'Segurança e conveniência',
    'Ótimo custo-benefício',
  ],
  textoLocalizacao: `Em ${bairro}, ${cidade}, com fácil acesso aos principais pontos da cidade.`,
  mapaLocalizacao: `https://maps.google.com/maps?q=${encodeURIComponent(`${bairro}, ${cidade}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  ctaPrincipal: 'Quero saber mais',
  ctaSecundario: 'Agendar atendimento',
  metaTitle: `${nome} | Lançamento imobiliário`,
  metaDescription: `Conheça o ${nome} em ${cidade}. Tipologias exclusivas, localização estratégica e condições especiais.`,
  sloganCurto: `${nome}: viva o melhor de ${cidade}.`,
  footerTexto: `${nome}`,
  footerDisclaimer: 'Imagens meramente ilustrativas. As condições podem ser alteradas sem aviso prévio.',
  facebookPixel: '',
  googleAnalytics: '',
  heroAlignment: 'left',
  primaryColor: '#afab2c',
  secondaryColor: '#000000'
});

export const toSlug = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const getLancamentos = (): Lancamento[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Lancamento[];
  } catch {
    return [];
  }
};

export const saveLancamentos = (items: Lancamento[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const upsertLancamento = (item: Lancamento): void => {
  const list = getLancamentos();
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx >= 0) {
    list[idx] = item;
  } else {
    list.unshift(item);
  }
  saveLancamentos(list);
};

export const findLancamentoById = (id: string): Lancamento | undefined =>
  getLancamentos().find((item) => item.id === id);

export const findLancamentoBySlug = (slug: string): Lancamento | undefined =>
  getLancamentos().find((item) => item.slug === slug);

export const createLancamentoFromBriefing = (
  empreendimentoId: string,
  briefing: BriefingData,
  templateId: 'residencial' | 'mcmv',
  tenantSlug = 'imobiliaria'
): Lancamento => {
  const nome = briefing.nomeEmpreendimento || 'Novo Lançamento';
  const slug = toSlug(nome);

  return {
    id: `${Date.now()}`,
    empreendimentoId,
    nome,
    slug,
    status: 'RASCUNHO',
    leads: 0,
    templateId,
    tenantSlug,
    briefing,
    conteudoGerado: defaultConteudo(nome, briefing.cidade, briefing.bairro),
    createdAt: new Date().toISOString(),
  };
};

export const createDefaultLancamentoObject = (empreendimentoId: string, nomeEmpreendimento: string): Partial<Lancamento> => {
  const briefing: BriefingData = {
    nomeEmpreendimento,
    cidade: 'Cidade',
    bairro: 'Bairro',
    enderecoCompleto: 'Endereço completo',
    segmento: 'Médio Padrão',
    fase: 'Lançamento',
    prazoEntrega: 'Dezembro de 2026',
    formasPagamento: 'Consulte condições',
    tipologias: [
      { id: 't1', nome: '2 dormitórios', area: 60, quartos: 2, vagas: 1, preco: 350000 }
    ],
    diferenciais: ['Área de lazer', 'Segurança 24h'],
    whatsappResponsavel: '(00) 00000-0000',
    fotos: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687931-cebf0746e48e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        parceiros: [
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
        ],
        proximidades: [
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
    ],
    heroBg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    logo: ''
  };

  const novoLancamento: Partial<Lancamento> = {
    nome: 'Nova Página',
    slug: toSlug(`Nova Página ${Date.now()}`),
    status: 'RASCUNHO',
    templateId: 'residencial',
    briefing,
    conteudoGerado: defaultConteudo('Nova Página', briefing.cidade, briefing.bairro),
    lpConfig: { sections: [...DEFAULT_LP_SECTIONS] }
  };
  
  return novoLancamento;
};

export const getMockLancamentos = (): Lancamento[] => {
  const existing = getLancamentos();
  // Se houver algum mock antigo SEM as novas plantas (ou se for o antigo mockup estático) vamos forçar recarregar
  const hasOldMocksWithoutPlanta = existing.some(l => 
    l.id === '1001' || l.id === '1002' // IDS dos mocks hardcoded
  ) && existing.some(l => 
    l.briefing.tipologias.some(t => t.plantaImg?.includes('freepik') || t.plantaImg?.includes('unsplash') || !t.plantaImg) || !l.briefing.proximidades || !l.briefing.parceiros // Força update para pegar a imagem local, proximidades e parceiros
  );

  if (hasOldMocksWithoutPlanta) {
    // Clear specifically the old hardcoded mocks from localstorage to recreate them fresh
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_EMPREENDIMENTOS);
    return getMockLancamentos(); // call again recursively, now the storage is empty, it will recreate them below
  }
  
  if (existing.length > 0) return existing;

  const mockEmpreendimentos: Empreendimento[] = [
    { id: 'emp1', nome: 'Origem Jardins', slug: 'origem-jardins', createdAt: new Date().toISOString() },
    { id: 'emp2', nome: 'Vila Nova', slug: 'vila-nova', createdAt: new Date().toISOString() },
  ];
  saveEmpreendimentos(mockEmpreendimentos);

  const mock: Lancamento[] = [
    {
      id: '1001',
      empreendimentoId: 'emp1',
      nome: 'Origem Jardins - Página Principal',
      slug: 'origem-jardins',
      status: 'PUBLICADA',
      leads: 47,
      templateId: 'residencial',
      tenantSlug: 'imobiliaria',
      createdAt: new Date().toISOString(),
      briefing: {
        nomeEmpreendimento: 'Origem Jardins',
        cidade: 'Curitiba',
        bairro: 'Água Verde',
        enderecoCompleto: 'Rua Exemplo, 100',
        segmento: 'Médio Padrão',
        fase: 'Lançamento',
        prazoEntrega: 'Dezembro de 2027',
        formasPagamento: 'Entrada + financiamento',
        tipologias: [
          { id: 't1', nome: '2 dormitórios', area: 62, quartos: 2, vagas: 1, preco: 420000, plantaImg: '/planta.png' },
          { id: 't2', nome: '3 dormitórios', area: 84, quartos: 3, vagas: 2, preco: 590000, plantaImg: '/planta.png' },
        ],
        diferenciais: ['Piscina', 'Academia', 'Pet Place'],
        whatsappResponsavel: '(41) 99999-9999',
        fotos: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687931-cebf0746e48e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        parceiros: [
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
        ],
        proximidades: [
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
        ],
      },
      conteudoGerado: defaultConteudo('Origem Jardins', 'Curitiba', 'Água Verde'),
      lpConfig: { sections: [...DEFAULT_LP_SECTIONS] },
    },
    {
      id: '1002',
      empreendimentoId: 'emp2',
      nome: 'Vila Nova - Rascunho',
      slug: 'vila-nova',
      status: 'RASCUNHO',
      leads: 0,
      templateId: 'residencial',
      tenantSlug: 'imobiliaria',
      createdAt: new Date().toISOString(),
      briefing: {
        nomeEmpreendimento: 'Vila Nova',
        cidade: 'Curitiba',
        bairro: 'Portão',
        enderecoCompleto: 'Av. Exemplo, 300',
        segmento: 'Padrão/MCMV',
        fase: 'Pré-lançamento',
        prazoEntrega: 'Julho de 2028',
        formasPagamento: 'Subsídio + financiamento',
        tipologias: [{ id: 't3', nome: '2 dormitórios', area: 48, quartos: 2, vagas: 1, preco: 265000, plantaImg: '/planta.png' }],
        diferenciais: ['Condomínio fechado', 'Playground'],
        whatsappResponsavel: '(41) 98888-7777',
        fotos: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        parceiros: [
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
        ],
        proximidades: [
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
        ],
      },
      conteudoGerado: defaultConteudo('Vila Nova', 'Curitiba', 'Portão'),
      lpConfig: { sections: [...DEFAULT_LP_SECTIONS] },
    },
  ];

  saveLancamentos(mock);
  return mock;
};
