import React, { useState, useEffect } from 'react';
import bannerPadrao from '../../assets/images/banner-padrao-desktop.png';
import axios from 'axios';
import { FiSave, FiExternalLink, FiGlobe, FiCheck, FiX } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { phone } from '../Site/masks';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineKey,
  AiOutlineCalculator,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineFileText,
  AiOutlineDollar,
  AiOutlineBank,
  AiOutlineShop,
  AiOutlineCar,
  AiOutlineGift
} from 'react-icons/ai';
import { FaKey, FaCalculator, FaHandshake, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { HiHome, HiKey, HiCalculator, HiHeart, HiSearch, HiDocumentText } from 'react-icons/hi';
import { MdRealEstateAgent, MdAttachMoney, MdBusiness, MdLocationOn, MdSecurity } from 'react-icons/md';
import api from '../../utils/requests';
import {
  TemaEditContainer,
  EditorPanel,
  PreviewPanel,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Textarea,
  ColorInput,
  Button,
  FileInput,
  SaveButton,
  TabContainer,
  Tab,
  TabContent,
  DomainSection,
  DomainCard,
  DomainInputContainer,
  DomainInput,
  DomainButton
} from './styles';
import Header from '../../components/Header';

interface MenuLink {
  label: string;
  url: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

interface AgenciaFeature {
  title: string;
  description: string;
}

interface AgenciaConfig {
  features: AgenciaFeature[];
  images: string[];
}

interface ThemeConfig {
  id?: number;
  name: string;
  mainColor: string;
  logo: string;
  logoSize: string;
  menuLinks: MenuLink[];
  phone: string;
  bannerImage: string;
  bannerImage2?: string;
  bannerImage3?: string;
  bannerOverlayOpacity?: number;
  bannerColor: string;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerTitleSize: number;
  agencia?: AgenciaConfig;
  announceImage?: string;
  announceBackground?: string;
  announceText?: string;
  contactTitle: string;
  contactImage: string;
  agentPhoto: string;
  agentQuote: string;
  agentName: string;
  footerLogo: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  footerText: string;
  textColor: string;
  buttonColor: string;
  footerBackgroundColor: string;
  h2Color: string;
  h3Color: string;
  privacyPolicy: string;
  aboutUs: string;
  email?: string;
  address?: string;
  mapIframe?: string;
  customDomain: string;
  facebookPixel: string;
  seoKeywords: string;
  siteTitle: string;
  favicon?: string;
  tenantId: number;
}

const TemaEdit: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('header');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success'|'error'>('success');
  
  // Estados para arquivos selecionados (não enviados ainda)
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);
  const [selectedBannerFile2, setSelectedBannerFile2] = useState<File | null>(null);
  const [selectedBannerFile3, setSelectedBannerFile3] = useState<File | null>(null);
  const [selectedAgentPhotoFile, setSelectedAgentPhotoFile] = useState<File | null>(null);
  const [selectedAnnounceImageFile, setSelectedAnnounceImageFile] = useState<File | null>(null);
  const [selectedFooterLogoFile, setSelectedFooterLogoFile] = useState<File | null>(null);
  
  // Estados para gerenciamento de domínio
  const [domainInfo, setDomainInfo] = useState<any>(null);
  const [customDomain, setCustomDomain] = useState('');
  const [domainLoading, setDomainLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [domainMessage, setDomainMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<any>(null);
  const [showDnsModal, setShowDnsModal] = useState(false);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    name: 'Tema Padrão',
    mainColor: '#007bff',
    logo: '',
    logoSize: 'media',
    menuLinks: [{ label: 'Início', url: '/' }, { label: 'Imóveis', url: '/imoveis' }, { label: 'Contato', url: '/contato' }],
    phone: '(85) 9999-6895',
    bannerImage: '',
    bannerImage2: '',
    bannerImage3: '',
    bannerOverlayOpacity: 50,
    bannerColor: '#000000',
    bannerTitle: 'Sempre entregando o imóvel do seu sonho.',
    bannerTitleColor: '#ffffff',
    bannerTitleSize: 48,
    agencia: {
      features: [
        { title: 'Propriedades de Ampla Variedade', description: 'De apartamentos aconchegantes a vilas de luxo, temos opções para todos os estilos de vida..' },
        { title: 'Corretores de Confiança', description: 'Nossa equipe de profissionais dedica-se a encontrar a melhor oferta para vocês.' },
        { title: 'Processo transparente', description: 'Sem taxas ocultas ou surpresas. Acompanhamos você em cada etapa.' }
      ],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    contactTitle: 'Entre em contato conosco',
    announceImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    announceBackground: '#000000',
    announceText: 'Escolha a imobiliária especialista no mercado há mais de 70 anos e tenha a maior segurança e rentabilidade do mercado.',
    contactImage: '',
    agentPhoto: '',
    agentQuote: 'Mais de 10 anos ajudando pessoas a encontrar o lar dos seus sonhos.',
    agentName: 'João Silva',
    email: 'contato@empresa.com.br',
    address: 'Av. Paulista, 1100\nSão Paulo, SP - 01310-100',
    mapIframe: '',
    footerLogo: '',
    socialLinks: {
      facebook: '#',
      instagram: '#',
      whatsapp: '#',
      youtube: '',
      linkedin: '',
      twitter: ''
    },
    footerText: '© 2024 Imobiliária. Todos os direitos reservados.',
    textColor: '#2563eb',
    buttonColor: '#64748b',
    footerBackgroundColor: '#333333',
    h2Color: '#1f2937',
    h3Color: '#374151',
    privacyPolicy: 'Sua privacidade é importante para nós. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.',
    aboutUs: 'Somos uma imobiliária comprometida em oferecer os melhores serviços para nossos clientes, com transparência e qualidade.',
    customDomain: '',
    facebookPixel: '',
    seoKeywords: '',
    siteTitle: 'Imobiliária - Encontre seu imóvel',
    tenantId: 1
  });

  useEffect(() => {
    loadThemeConfig();
  }, []);

  // Função para salvar preview temporário
  const savePreviewConfig = async () => {
    try {
      // Salvar configurações temporárias no localStorage para preview
      const previewData = {
        ...themeConfig,
        menuLinks: JSON.stringify(themeConfig.menuLinks),
        agencia: JSON.stringify(themeConfig.agencia),
        socialLinks: JSON.stringify(themeConfig.socialLinks),
        isPreview: true,
        timestamp: Date.now()
      };
      
      localStorage.setItem(`theme-preview-${user?.accountId || 'default'}`, JSON.stringify(previewData));
      
      // Forçar atualização do iframe
      setPreviewKey(prev => prev + 1);
    } catch (error) {
      console.error('Error saving preview config:', error);
    }
  };

  // Atualizar preview em tempo real quando themeConfig mudar
  useEffect(() => {
    if (!loading) {
      // Debounce para evitar muitas atualizações
      const timeoutId = setTimeout(() => {
        savePreviewConfig();
      }, 500); // Aguarda 500ms após a última mudança

      return () => clearTimeout(timeoutId);
    }
  }, [themeConfig, loading, user?.accountId]);

  const loadThemeConfig = async () => {
    try {
      // Use accountId from authenticated user instead of fixed tenant ID
      const accountId = user?.account?.id;
      if (!accountId) {
        console.error('User accountId not available');
        return;
      }
      
      const response = await api.get(`/api/themes/account-id/${accountId}`);
      const data = response.data;
      
      console.log('TemaEdit - Response completa da API:', response.data);
      console.log('TemaEdit - favicon recebido:', data.favicon);
      
      // Parse JSON strings from backend
      const defaultAgencia: AgenciaConfig = {
        features: [
          { title: 'Propriedades de Ampla Variedade', description: 'De apartamentos aconchegantes a vilas de luxo, temos opções para todos os estilos de vida..' },
          { title: 'Corretores de Confiança', description: 'Nossa equipe de profissionais dedica-se a encontrar a melhor oferta para vocês.' },
          { title: 'Processo transparente', description: 'Sem taxas ocultas ou surpresas. Acompanhamos você em cada etapa.' }
        ],
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      };
      
      let parsedAgencia = defaultAgencia;
      if (data.agencia) {
        try {
          parsedAgencia = typeof data.agencia === 'string' ? JSON.parse(data.agencia) : data.agencia;
        } catch (e) {
          console.error('Error parsing agencia', e);
        }
      }
      
      const parsedSocialLinks = typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks || '{}') : (data.socialLinks || {});
      
      const parsedData = {
        ...data,
        tenantId: data.tenantId, // Ensure tenantId is included for saving
        menuLinks: typeof data.menuLinks === 'string' ? JSON.parse(data.menuLinks || '[]') : data.menuLinks || [],
        agencia: parsedAgencia,
        socialLinks: {
          facebook: parsedSocialLinks.facebook || '#',
          instagram: parsedSocialLinks.instagram || '#',
          whatsapp: parsedSocialLinks.whatsapp || '#',
          youtube: parsedSocialLinks.youtube || '',
          linkedin: parsedSocialLinks.linkedin || '',
          twitter: parsedSocialLinks.twitter || ''
        },
        siteTitle: data.siteTitle || 'Imobiliária - Encontre seu imóvel',
        facebookPixel: data.facebookPixel || '',
        seoKeywords: data.seoKeywords || ''
      };
      
      setThemeConfig(parsedData);
      loadDomainInfo(); // Carregar informações de domínio junto com o tema
    } catch (error) {
      console.error('Error loading theme config:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar URL do subdomínio
  const getSubdomainUrl = (companySlug: string) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const accountId = user?.account?.id || user?.id || '';

    // Normaliza o slug para subdomínio: espaços -> hífen e remoção de inválidos
    const base = (companySlug || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$|/g, '');

    const subdomain = accountId ? `${base}-${accountId}` : base;
    
    if (isLocalhost) {
      // Em desenvolvimento, usar parâmetro de query
      return `${window.location.origin}/?subdomain=${subdomain}`;
    } else {
      // Em produção, usar subdomínio
      return `https://${subdomain}.standi.com.br`;
    }
  };

  // Funções para gerenciamento de domínio
  const loadDomainInfo = async () => {
    const accountId = user?.account?.id || user?.id;
    if (!accountId) return;
    
    try {
      setDomainLoading(true);
      const response = await api.get(`/api/domains/info/${accountId}`);
      setDomainInfo(response.data);
    } catch (error) {
      console.error('Erro ao carregar informações de domínio:', error);
    } finally {
      setDomainLoading(false);
    }
  };

  const addCustomDomain = async () => {
    const accountId = user?.account?.id || user?.id;
    if (!customDomain.trim() || !accountId) return;
    
    try {
      setDomainLoading(true);
      setDomainMessage(null);
      
      const response = await api.post(`/api/domains/custom/${accountId}`, {
        domain: customDomain.trim()
      });
      
      setDomainMessage({ type: 'success', text: 'Domínio personalizado adicionado com sucesso!' });
      setCustomDomain('');
      loadDomainInfo();
    } catch (error: any) {
      setDomainMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao adicionar domínio personalizado' 
      });
    } finally {
      setDomainLoading(false);
    }
  };

  const verifyDomain = async (domain: string) => {
    const accountId = user?.account?.id || user?.id;
    if (!accountId) return;
    
    try {
      setVerifying(true);
      setDomainMessage(null);
      
      const response = await api.post(`/api/domains/verify/${accountId}`, {
        domain
      });
      
      setVerificationStatus(response.data);
      
      if (response.data.verified) {
        setDomainMessage({ type: 'success', text: 'Domínio verificado com sucesso!' });
        loadDomainInfo();
      } else {
        setDomainMessage({ type: 'error', text: 'Falha na verificação do domínio. Verifique as configurações DNS.' });
      }
    } catch (error: any) {
      setDomainMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao verificar domínio' 
      });
    } finally {
      setVerifying(false);
    }
  };

  const removeCustomDomain = async (domain: string) => {
    const accountId = user?.account?.id || user?.id;
    if (!accountId) return;
    
    try {
      setDomainLoading(true);
      setDomainMessage(null);
      
      await api.delete(`/api/domains/custom/${accountId}`, {
        data: { domain }
      });
      
      setDomainMessage({ type: 'success', text: 'Domínio personalizado removido com sucesso!' });
      loadDomainInfo();
    } catch (error: any) {
      setDomainMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao remover domínio personalizado' 
      });
    } finally {
      setDomainLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    if (section === 'socialLinks') {
      setThemeConfig(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [field]: value
        }
      }));
    } else {
      setThemeConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleDirectChange = (field: string, value: any) => {
    setThemeConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgenciaFeatureChange = (index: number, field: string, value: string) => {
    if (!themeConfig.agencia) return;
    const newFeatures = [...themeConfig.agencia.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setThemeConfig(prev => ({ ...prev, agencia: { ...prev.agencia!, features: newFeatures } }));
  };

  const handleAgenciaImageUpload = async (file: File | undefined, index: number) => {
    if (!file || !themeConfig.agencia) return;
    try {
      setSaving(true);
      setToastMessage('Fazendo upload da imagem da Agência...');
      setToastVisible(true);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const accountId = user?.account?.id;
      const response = await api.post(`/api/themes/upload-banner/${accountId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newImages = [...themeConfig.agencia.images];
      newImages[index] = response.data;
      setThemeConfig(prev => ({ ...prev, agencia: { ...prev.agencia!, images: newImages } }));
      
      setToastType('success');
      setToastMessage('Upload concluído!');
    } catch (error) {
      console.error('Error uploading agencia image:', error);
      setToastType('error');
      setToastMessage('Erro no upload.');
    } finally {
      setSaving(false);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  const handleRemoveAgenciaImage = (index: number) => {
    if (!themeConfig.agencia) return;
    const newImages = [...themeConfig.agencia.images];
    newImages.splice(index, 1);
    setThemeConfig(prev => ({ ...prev, agencia: { ...prev.agencia!, images: newImages } }));
  };

  const handleAddAgenciaImage = () => {
    if (!themeConfig.agencia) return;
    if (themeConfig.agencia.images.length >= 5) {
      setToastType('error');
      setToastMessage('Máximo de 5 imagens permitidas.');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    const newImages = [...themeConfig.agencia.images, ''];
    setThemeConfig(prev => ({ ...prev, agencia: { ...prev.agencia!, images: newImages } }));
  };

  const handleMenuLinkChange = (index: number, field: string, value: string) => {
    const newMenuLinks = [...themeConfig.menuLinks];
    newMenuLinks[index] = { ...newMenuLinks[index], [field]: value };
    setThemeConfig(prev => ({ ...prev, menuLinks: newMenuLinks }));
  };

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return;
    
    // Validate that the file is PNG
    if (!file.type.includes('png')) {
      alert('Apenas arquivos PNG são permitidos para a logo.');
      return;
    }
    
    // Armazenar arquivo localmente para envio posterior
    setSelectedLogoFile(file);
    
    // Criar URL temporária para preview
    const tempUrl = URL.createObjectURL(file);
    handleDirectChange('logo', tempUrl);
    
    alert('Logo selecionada! Clique em "Salvar" para fazer o upload.');
  };

  const handleBannerUpload = (file: File | undefined, index: number = 1) => {
    if (!file) return;
    
    // Armazenar arquivo localmente para envio posterior
    if (index === 1) setSelectedBannerFile(file);
    else if (index === 2) setSelectedBannerFile2(file);
    else if (index === 3) setSelectedBannerFile3(file);
    
    // Criar URL temporária para preview
    const tempUrl = URL.createObjectURL(file);
    const fieldName = index === 1 ? 'bannerImage' : index === 2 ? 'bannerImage2' : 'bannerImage3';
    handleDirectChange(fieldName, tempUrl);
    
    alert(`Banner ${index} selecionado! Clique em "Salvar" para fazer o upload.`);
  };

  const handleAgentPhotoUpload = (file: File | undefined) => {
    if (!file) return;
    
    // Armazenar arquivo localmente para envio posterior
    setSelectedAgentPhotoFile(file);
    
    // Criar URL temporária para preview
    const tempUrl = URL.createObjectURL(file);
    handleDirectChange('agentPhoto', tempUrl);
    
    alert('Foto do corretor selecionada! Clique em "Salvar" para fazer o upload.');
  };

  const handleAnnounceImageUpload = (file: File | undefined) => {
    if (!file) return;
    
    setSelectedAnnounceImageFile(file);
    const tempUrl = URL.createObjectURL(file);
    handleDirectChange('announceImage', tempUrl);
    
    alert('Imagem de anúncio selecionada! Clique em "Salvar" para fazer o upload.');
  };

  const handleFooterLogoUpload = (file: File | undefined) => {
    if (!file) return;
    
    // Validate that the file is PNG
    if (!file.type.includes('png')) {
      alert('Apenas arquivos PNG são permitidos para a logo do rodapé.');
      return;
    }
    
    setSelectedFooterLogoFile(file);
    const tempUrl = URL.createObjectURL(file);
    handleDirectChange('footerLogo', tempUrl);
    
    alert('Logo do rodapé selecionada! Clique em "Salvar" para fazer o upload.');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log('Iniciando salvamento do tema...');
      console.log('ThemeConfig atual:', themeConfig);
      console.log('User accountId:', user?.account?.id);
      console.log('socialLinks.whatsapp antes do salvamento:', themeConfig.socialLinks.whatsapp);
      
      const accountId = user?.account?.id;
      if (!accountId) {
        setToastType('error');
        setToastMessage('Erro: ID da conta não encontrado. Faça login novamente.');
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 4000);
        return;
      }
      
      // Upload das imagens selecionadas primeiro
      let logoUrl = themeConfig.logo;
      let bannerUrl = themeConfig.bannerImage;
      let bannerUrl2 = themeConfig.bannerImage2;
      let bannerUrl3 = themeConfig.bannerImage3;
      let agentPhotoUrl = themeConfig.agentPhoto;
      let announceImageUrl = themeConfig.announceImage;
      let footerLogoUrl = themeConfig.footerLogo;
      
      // Upload da logo se foi selecion
      if (selectedLogoFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedLogoFile);
          
          const response = await api.post(`/api/themes/upload-logo/${accountId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          logoUrl = response.data;
          setSelectedLogoFile(null); // Limpar arquivo selecionado
          console.log('Logo enviada com sucesso! Favicon gerado automaticamente.');
        } catch (error) {
          console.error('Error uploading logo:', error);
          setToastType('error');
          setToastMessage('Erro ao fazer upload da logo. Salvamento cancelado.');
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 4000);
          return;
        }
      }
      
      // Upload do banner se foi selecionado
      if (selectedBannerFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedBannerFile);
          
          const response = await api.post(`/api/themes/upload-banner/${accountId}` , formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          bannerUrl = response.data;
          setSelectedBannerFile(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading banner 1:', error);
        }
      }

      if (selectedBannerFile2) {
        try {
          const formData = new FormData();
          formData.append('file', selectedBannerFile2);
          
          const response = await api.post(`/api/themes/upload-banner/${accountId}` , formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          bannerUrl2 = response.data;
          setSelectedBannerFile2(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading banner 2:', error);
        }
      }

      if (selectedBannerFile3) {
        try {
          const formData = new FormData();
          formData.append('file', selectedBannerFile3);
          
          const response = await api.post(`/api/themes/upload-banner/${accountId}` , formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          bannerUrl3 = response.data;
          setSelectedBannerFile3(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading banner 3:', error);
        }
      }
      
      // Upload da foto do corretor se foi selecionada
      if (selectedAgentPhotoFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedAgentPhotoFile);
          
          const response = await api.post(`/api/themes/upload-agent-photo/${accountId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          agentPhotoUrl = response.data;
          setSelectedAgentPhotoFile(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading agent photo:', error);
          setToastType('error');
          setToastMessage('Erro ao fazer upload da foto do corretor. Salvamento cancelado.');
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 4000);
          return;
        }
      }

      // Upload da imagem do anúncio se foi selecionada
      if (selectedAnnounceImageFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedAnnounceImageFile);
          
          const response = await api.post(`/api/themes/upload-banner/${accountId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          announceImageUrl = response.data;
          setSelectedAnnounceImageFile(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading announce image:', error);
          setToastType('error');
          setToastMessage('Erro ao fazer upload da imagem de anúncio. Salvamento cancelado.');
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 4000);
          return;
        }
      }

      // Upload da logo do footer se foi selecionada
      if (selectedFooterLogoFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFooterLogoFile);
          
          const response = await api.post('/paginas/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          footerLogoUrl = response.data.url;
          setSelectedFooterLogoFile(null); // Limpar arquivo selecionado
        } catch (error) {
          console.error('Error uploading footer logo:', error);
          setToastType('error');
          setToastMessage('Erro ao fazer upload da logo do rodapé. Salvamento cancelado.');
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 4000);
          return;
        }
      }
      
      // Convert arrays and objects to JSON strings for backend
      const dataToSave = {
        ...themeConfig,
        logo: logoUrl,
        bannerImage: bannerUrl,
        bannerImage2: bannerUrl2,
        bannerImage3: bannerUrl3,
        agentPhoto: agentPhotoUrl,
        announceImage: announceImageUrl,
        footerLogo: footerLogoUrl,
        favicon: themeConfig.favicon,
        menuLinks: JSON.stringify(themeConfig.menuLinks),
        agencia: JSON.stringify(themeConfig.agencia),
        socialLinks: JSON.stringify(themeConfig.socialLinks)
      };
      
      console.log('Dados a serem salvos:', dataToSave);
      console.log('socialLinks JSON string:', dataToSave.socialLinks);
      
      // Use account-specific endpoint for saving
      const response = await api.post(`/api/themes/save-by-account/${accountId}`, dataToSave);
      console.log('Resposta do salvamento:', response.data);
      
      // Update local state with saved theme data
      const savedTheme = response.data;
      setThemeConfig(prevConfig => ({
        ...prevConfig,
        id: savedTheme.id,
        tenantId: savedTheme.tenantId,
        logo: logoUrl,
        bannerImage: bannerUrl,
        bannerImage2: bannerUrl2,
        bannerImage3: bannerUrl3,
        agentPhoto: agentPhotoUrl,
        announceImage: announceImageUrl,
        footerLogo: footerLogoUrl
      }));
      
      // Update preview after saving
      setPreviewKey(prev => prev + 1);
      
      let successMessage = 'Tema salvo com sucesso!';
      if (selectedLogoFile || selectedBannerFile || selectedAgentPhotoFile) {
        successMessage += ' Todas as imagens foram enviadas.';
        if (selectedLogoFile) {
          successMessage += ' Favicon gerado automaticamente a partir da logo.';
        }
      }
      
      setToastType('success');
      setToastMessage(successMessage);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
      console.log('Tema salvo com sucesso!');
    } catch (error) {
      console.error('Error saving theme:', error);
      setToastType('error');
      setToastMessage('Erro ao salvar tema. Tente novamente.');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <TemaEditContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Carregando configurações do tema...</p>
        </div>
      </TemaEditContainer>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'header':
        return (
          <TabContent>
            <FormGroup>
              <Label>Logo</Label>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                Ao fazer upload da logo, o sistema gerará automaticamente um favicon personalizado para seu site.
              </p>
              {themeConfig.logo ? (
                <div style={{ marginBottom: '10px' }}>
                  <img src={themeConfig.logo} alt="Logo" style={{ maxWidth: '200px', maxHeight: '100px' }} />
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('logo', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center', marginBottom: '10px' }}>
                  ImóveisLogo
                </div>
              )}
              <FileInput 
                type="file" 
                accept="image/png" 
                onChange={(e) => handleLogoUpload(e.target.files?.[0])}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tamanho da Logo</Label>
              <select 
                value={themeConfig.logoSize}
                onChange={(e) => handleDirectChange('logoSize', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="pequena">Pequena</option>
                <option value="media">Média</option>
                <option value="grande">Grande</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label>Telefone do Header</Label>
              <Input
                value={themeConfig.phone || ''}
                onChange={(e) => handleDirectChange('phone', e.target.value)}
                onKeyUp={(e) => phone(e)}
                placeholder="Ex: (11) 99999-9999"
              />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>Aparecerá ao lado do ícone de telefone no menu do site.</small>
            </FormGroup>
            <FormGroup>
              <Label>Menu (Fixo)</Label>
              <div style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Comprar imóvel</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Alugar imóvel</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Lançamentos</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Sobre Nós</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Suporte ao cliente</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Fale conosco</p>
                <small style={{ color: '#6c757d', fontSize: '12px' }}>Os links do menu são fixos e não podem ser editados</small>
              </div>
            </FormGroup>
          </TabContent>
        );
      
      case 'banner':
        return (
          <TabContent>
            <FormGroup>
              <Label>Título do Banner</Label>
              <Input
                value={themeConfig.bannerTitle}
                onChange={(e) => handleDirectChange('bannerTitle', e.target.value)}
                placeholder="Título do banner"
                maxLength={50}
              />
            </FormGroup>
            <FormGroup>
              <Label>Cor do Título</Label>
              <ColorInput
                type="color"
                value={themeConfig.bannerTitleColor}
                onChange={(e) => handleDirectChange('bannerTitleColor', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tamanho do Título: {themeConfig.bannerTitleSize || 48}px</Label>
              <input
                type="range"
                min="24"
                max="72"
                value={themeConfig.bannerTitleSize || 48}
                onChange={(e) => handleDirectChange('bannerTitleSize', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#e2e8f0',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Imagem de Fundo 1</Label>
              <div style={{ marginBottom: '10px' }}>
                <img src={themeConfig.bannerImage || bannerPadrao} alt="Banner 1" style={{ maxWidth: '300px', maxHeight: '150px' }} />
                {themeConfig.bannerImage && (
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('bannerImage', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                )}
              </div>
              <FileInput 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                onChange={(e) => handleBannerUpload(e.target.files?.[0], 1)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Imagem de Fundo 2</Label>
              <div style={{ marginBottom: '10px' }}>
                <img src={themeConfig.bannerImage2 || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Banner 2" style={{ maxWidth: '300px', maxHeight: '150px' }} />
                {themeConfig.bannerImage2 && (
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('bannerImage2', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                )}
              </div>
              <FileInput 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                onChange={(e) => handleBannerUpload(e.target.files?.[0], 2)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Imagem de Fundo 3</Label>
              <div style={{ marginBottom: '10px' }}>
                <img src={themeConfig.bannerImage3 || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} alt="Banner 3" style={{ maxWidth: '300px', maxHeight: '150px' }} />
                {themeConfig.bannerImage3 && (
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('bannerImage3', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                )}
              </div>
              <FileInput 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                onChange={(e) => handleBannerUpload(e.target.files?.[0], 3)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Cor do Overlay</Label>
              <ColorInput
                type="color"
                value={themeConfig.bannerColor || '#000000'}
                onChange={(e) => handleDirectChange('bannerColor', e.target.value)}
              />
              <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '4px' }}>Cor da película sobre as imagens.</small>
            </FormGroup>

            <FormGroup>
              <Label>Intensidade do Overlay: {themeConfig.bannerOverlayOpacity ?? 50}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={themeConfig.bannerOverlayOpacity ?? 50}
                onChange={(e) => handleDirectChange('bannerOverlayOpacity', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#e2e8f0',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
              <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '4px' }}>Controla a transparência da película (0 = invisível, 100 = cor sólida).</small>
            </FormGroup>
          </TabContent>
        );
      
      case 'agencia':
        return (
          <TabContent>
            <h3 style={{ marginBottom: '15px' }}>Porque escolher a Camaleon? (Agência)</h3>
            
            {/* Imagens (Slide) */}
            <div style={{ marginBottom: '30px' }}>
              <Label>Imagens do Slide (1 a 5 fotos)</Label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                {themeConfig.agencia?.images.map((imgUrl, index) => (
                  <div key={index} style={{ position: 'relative', width: '120px', height: '120px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    {imgUrl ? (
                      <>
                        <img src={imgUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => handleRemoveAgenciaImage(index)}
                          style={{ position: 'absolute', top: '5px', right: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                        >
                          X
                        </button>
                      </>
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                        <span style={{ fontSize: '12px', color: '#666', textAlign: 'center', padding: '5px' }}>Sem imagem</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleAgenciaImageUpload(e.target.files?.[0], index)}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                  </div>
                ))}
                
                {(themeConfig.agencia?.images.length || 0) < 5 && (
                  <button
                    type="button"
                    onClick={handleAddAgenciaImage}
                    style={{ width: '120px', height: '120px', border: '2px dashed #007bff', borderRadius: '8px', background: 'transparent', color: '#007bff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span style={{ fontSize: '24px' }}>+</span>
                    <span style={{ fontSize: '12px', marginTop: '5px' }}>Adicionar</span>
                  </button>
                )}
              </div>
              <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                Clique nas caixas para alterar a imagem ou clique no botão + para adicionar (máximo 5).
              </small>
            </div>

            {/* Textos */}
            <div>
              <Label>Textos dos Diferenciais (Obrigatórios)</Label>
              {themeConfig.agencia?.features.map((feature, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
                  <FormGroup style={{ marginBottom: '10px' }}>
                    <Label>Título {index + 1}</Label>
                    <Input
                      value={feature.title}
                      onChange={(e) => handleAgenciaFeatureChange(index, 'title', e.target.value)}
                      placeholder="Ex: Corretores de Confiança"
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: '0' }}>
                    <Label>Descrição {index + 1}</Label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => handleAgenciaFeatureChange(index, 'description', e.target.value)}
                      placeholder="Descrição do diferencial"
                      rows={2}
                    />
                  </FormGroup>
                </div>
              ))}
            </div>
          </TabContent>
        );
      
      case 'announce':
        return (
          <TabContent>
            <h3 style={{ marginBottom: '15px' }}>Anuncie seu Imóvel</h3>
            <FormGroup>
              <Label>Cor de Fundo (Background)</Label>
              <ColorInput
                type="color"
                value={themeConfig.announceBackground || '#000000'}
                onChange={(e) => handleDirectChange('announceBackground', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Texto Principal</Label>
              <Textarea
                value={themeConfig.announceText || ''}
                onChange={(e) => handleDirectChange('announceText', e.target.value)}
                placeholder="Ex: Escolha a imobiliária especialista..."
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <Label>Imagem de Destaque</Label>
              <div style={{ marginBottom: '10px' }}>
                <img src={themeConfig.announceImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} alt="Imagem Anúncio" style={{ maxWidth: '300px', maxHeight: '150px' }} />
                {themeConfig.announceImage && (
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('announceImage', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                )}
              </div>
              <FileInput 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleAnnounceImageUpload(e.target.files?.[0])}
              />
            </FormGroup>
          </TabContent>
        );

      case 'contact':
        return (
          <TabContent>
            <h3 style={{ marginBottom: '15px' }}>Seção de Contato</h3>
            
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>1. Informações Principais</h4>
              <FormGroup>
                <Label>Título do Contato</Label>
                <Input
                  value={themeConfig.contactTitle}
                  onChange={(e) => handleDirectChange('contactTitle', e.target.value)}
                  placeholder="Ex: Fale conosco"
                />
              </FormGroup>
              <FormGroup>
                <Label>Mensagem / Subtítulo</Label>
                <Textarea
                  value={themeConfig.agentQuote}
                  onChange={(e) => handleDirectChange('agentQuote', e.target.value)}
                  placeholder="Ex: Estamos aqui para ajudar. Envie sua mensagem..."
                  rows={2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Nome de Exibição do Corretor / Atendente</Label>
                <Input
                  value={themeConfig.agentName}
                  onChange={(e) => handleDirectChange('agentName', e.target.value)}
                  placeholder="Ex: João Silva"
                />
              </FormGroup>
              <FormGroup>
                <Label>Foto do Corretor / Atendimento</Label>
                <div style={{ marginBottom: '10px' }}>
                  <img src={themeConfig.agentPhoto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'} alt="Foto Contato" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                  {themeConfig.agentPhoto && (
                    <button 
                      type="button" 
                      onClick={() => handleDirectChange('agentPhoto', '')}
                      style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Remover
                    </button>
                  )}
                </div>
                <FileInput 
                  type="file" 
                  accept="image/png,image/jpeg,image/jpg" 
                  onChange={(e) => handleAgentPhotoUpload(e.target.files?.[0])}
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>Aparecerá no bloco de perfil ao lado do formulário.</small>
              </FormGroup>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>2. Dados de Contato</h4>
              <FormGroup>
                <Label>E-mail</Label>
                <Input
                  value={themeConfig.email || ''}
                  onChange={(e) => handleDirectChange('email', e.target.value)}
                  placeholder="ex: contato@imobiliaria.com.br"
                />
              </FormGroup>
              <FormGroup>
                <Label>Endereço</Label>
                <Textarea
                  value={themeConfig.address || ''}
                  onChange={(e) => handleDirectChange('address', e.target.value)}
                  placeholder="ex: Av. Paulista, 1100 - São Paulo, SP"
                  rows={2}
                />
                <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                  Usado também para gerar o mapa automaticamente caso o Iframe do Mapa esteja vazio.
                </small>
              </FormGroup>
            </div>

            <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>3. Mapa Personalizado (Google Maps)</h4>
              <FormGroup>
                <Label>Código Iframe do Mapa (Opcional)</Label>
                <Textarea
                  value={themeConfig.mapIframe || ''}
                  onChange={(e) => handleDirectChange('mapIframe', e.target.value)}
                  placeholder='Ex: <iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
                  rows={4}
                />
                <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                  Vá no Google Maps, pesquise seu endereço, clique em "Compartilhar", depois em "Incorporar um mapa", copie o código HTML e cole aqui.
                  Se deixar vazio, geraremos um mapa automaticamente usando o endereço acima.
                </small>
              </FormGroup>
            </div>
          </TabContent>
        );
      
      case 'footer':
        return (
          <TabContent>
            <h3 style={{ marginBottom: '15px' }}>Seção do Rodapé (Footer)</h3>
            
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>1. Cores e Logo</h4>
              <FormGroup>
                <Label>Cor de Fundo do Footer</Label>
                <ColorInput
                  type="color"
                  value={themeConfig.footerBackgroundColor || '#1C1C38'}
                  onChange={(e) => handleDirectChange('footerBackgroundColor', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Logo do Footer</Label>
                <div style={{ marginBottom: '10px' }}>
                  {themeConfig.footerLogo ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={themeConfig.footerLogo} alt="Logo Footer" style={{ maxWidth: '200px', maxHeight: '100px', background: themeConfig.footerBackgroundColor || '#1C1C38', padding: '10px', borderRadius: '4px' }} />
                      <button 
                        type="button" 
                        onClick={() => handleDirectChange('footerLogo', '')}
                        style={{ position: 'absolute', top: -5, right: -10, background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center', marginBottom: '10px' }}>
                      Usando a logo principal do site
                    </div>
                  )}
                </div>
                <FileInput 
                  type="file" 
                  accept="image/png" 
                  onChange={(e) => handleFooterLogoUpload(e.target.files?.[0])}
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>Envie uma imagem PNG com fundo transparente. Recomendado para contraste caso o fundo do rodapé seja escuro.</small>
              </FormGroup>
            </div>

            <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: '#495057' }}>2. Redes Sociais</h4>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Deixe o campo vazio para não exibir o ícone no site.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label>Facebook</Label>
                  <Input
                    value={themeConfig.socialLinks.facebook || ''}
                    onChange={(e) => handleInputChange('socialLinks', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label>Instagram</Label>
                  <Input
                    value={themeConfig.socialLinks.instagram || ''}
                    onChange={(e) => handleInputChange('socialLinks', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label>LinkedIn</Label>
                  <Input
                    value={themeConfig.socialLinks.linkedin || ''}
                    onChange={(e) => handleInputChange('socialLinks', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/..."
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label>YouTube</Label>
                  <Input
                    value={themeConfig.socialLinks.youtube || ''}
                    onChange={(e) => handleInputChange('socialLinks', 'youtube', e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label>Twitter (X)</Label>
                  <Input
                    value={themeConfig.socialLinks.twitter || ''}
                    onChange={(e) => handleInputChange('socialLinks', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </FormGroup>
              </div>
            </div>
          </TabContent>
        );
      
      case 'colors':
        return (
          <TabContent>
            <FormGroup style={{display: 'none'}}>
              <Label>Cor Principal</Label>
              <ColorInput
                type="color"
                value={themeConfig.mainColor}
                onChange={(e) => handleDirectChange('mainColor', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
                  <Label>Cor de Texto Geral</Label>
                  <ColorInput
                    type="color"
                    value={themeConfig.textColor}
                    onChange={(e) => handleDirectChange('textColor', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Cor de Botões/Ícones</Label>
                  <ColorInput
                    type="color"
                    value={themeConfig.buttonColor}
                    onChange={(e) => handleDirectChange('buttonColor', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Cor dos Títulos H2</Label>
                  <ColorInput
                    type="color"
                    value={themeConfig.h2Color}
                    onChange={(e) => handleDirectChange('h2Color', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Cor dos Títulos H3</Label>
                  <ColorInput
                    type="color"
                    value={themeConfig.h3Color}
                    onChange={(e) => handleDirectChange('h3Color', e.target.value)}
                  />
                </FormGroup>

          </TabContent>
        );
      
      case 'configuracoes':
        return (
          <TabContent>
            {/* Seção de Domínio */}
            <DomainSection>
              <SectionTitle style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <FiGlobe /> Configuração de Domínio
              </SectionTitle>
              
              {/* Subdomínio Automático */}
              <DomainCard style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Subdomínio Automático</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b' }}>
                  Seu site está disponível automaticamente em:
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}>
                  {user?.account?.domain || domainInfo?.subdomain || `${user?.slug || 'seu-slug'}${user?.accountId || ''}.standi.com.br`}
                  <FiExternalLink 
                    style={{ cursor: 'pointer', color: '#3b82f6' }}
                    onClick={() => window.open(getSubdomainUrl(user?.slug || ''), '_blank')}
                  />
                </div>
              </DomainCard>

              {/* Domínio Personalizado */}
              <DomainCard>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Domínio Personalizado</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748b' }}>
                  Configure seu próprio domínio para acessar o site
                </p>
                
                {/* Lista de domínios personalizados */}
                {domainInfo?.customDomains && domainInfo.customDomains.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    {domainInfo.customDomains.map((domain: any, index: number) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{domain.domain}</span>
                          <span style={{
                            padding: '2px 6px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            backgroundColor: domain.verified ? '#dcfce7' : '#fef3c7',
                            color: domain.verified ? '#166534' : '#92400e'
                          }}>
                            {domain.verified ? 'Verificado' : 'Pendente'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {!domain.verified && (
                            <Button
                              onClick={() => verifyDomain(domain.domain)}
                              disabled={verifying}
                              style={{ 
                                padding: '4px 8px', 
                                fontSize: '12px',
                                backgroundColor: '#3b82f6',
                                color: 'white'
                              }}
                            >
                              {verifying ? 'Verificando...' : 'Verificar'}
                            </Button>
                          )}
                          <Button
                            onClick={() => removeCustomDomain(domain.domain)}
                            disabled={domainLoading}
                            style={{ 
                              padding: '4px 8px', 
                              fontSize: '12px',
                              backgroundColor: '#ef4444',
                              color: 'white'
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Adicionar novo domínio */}
                <DomainInputContainer>
                  <DomainInput
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="Ex: www.minhaImobiliaria.com.br"
                  />
                  <DomainButton
                    onClick={addCustomDomain}
                    disabled={domainLoading || !customDomain.trim()}
                  >
                    {domainLoading ? 'Adicionando...' : 'Adicionar'}
                  </DomainButton>
                </DomainInputContainer>
                
                {/* Mensagens */}
                {domainMessage && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    backgroundColor: domainMessage.type === 'success' ? '#dcfce7' : '#fef2f2',
                    color: domainMessage.type === 'success' ? '#166534' : '#dc2626',
                    border: `1px solid ${domainMessage.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                    marginBottom: '12px'
                  }}>
                    {domainMessage.text}
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <small style={{ color: '#6c757d', fontSize: '12px' }}>
                    Após adicionar um domínio personalizado, você precisará configurar os registros DNS.
                  </small>
                  <button
                    onClick={() => setShowDnsModal(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      fontSize: '12px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: '0',
                      margin: '0'
                    }}
                  >
                    Clique Aqui
                  </button>
                </div>
              </DomainCard>
            </DomainSection>

            {/* Outras configurações */}
            <FormGroup>
              <Label>Título do Site (tag title)</Label>
              <Input
                value={themeConfig.siteTitle}
                onChange={(e) => handleDirectChange('siteTitle', e.target.value)}
                placeholder="Ex: Imobiliária X - Encontre seu imóvel"
              />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                Define o texto da tag &lt;title&gt; mostrado no navegador (importante para SEO)
              </small>
            </FormGroup>
            <FormGroup>
              <Label>Pixel do Facebook</Label>
              <Input
                value={themeConfig.facebookPixel}
                onChange={(e) => handleDirectChange('facebookPixel', e.target.value)}
                placeholder="Ex: 1234567890123456"
              />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                ID do Pixel do Facebook para rastreamento de conversões e remarketing
              </small>
            </FormGroup>
            <FormGroup>
              <Label>Palavras-chave para SEO</Label>
              <Textarea
                value={themeConfig.seoKeywords}
                onChange={(e) => handleDirectChange('seoKeywords', e.target.value)}
                placeholder="Ex: imóveis, apartamentos, casas, venda, locação, imobiliária"
                style={{
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                Palavras-chave separadas por vírgula que descrevem seu negócio (importante para SEO)
              </small>
            </FormGroup>
          </TabContent>
        );
      
      case 'texts':
        return (
          <TabContent>
            <FormGroup>
              <Label>Política de Privacidade</Label>
              <textarea
                value={themeConfig.privacyPolicy}
                onChange={(e) => handleDirectChange('privacyPolicy', e.target.value)}
                placeholder="Digite o texto da política de privacidade..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Sobre Nós</Label>
              <textarea
                value={themeConfig.aboutUs}
                onChange={(e) => handleDirectChange('aboutUs', e.target.value)}
                placeholder="Digite o texto sobre a empresa..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </FormGroup>
          </TabContent>
        );
      
      default:
        return null;
    }
  };

  return (
  
       <>
         <Header />
         {/* Toast abaixo do Header */}
         <div
           style={{
             position: 'fixed',
             top: '76px',
             left: '60%',
             transform: toastVisible ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, -6px) scale(0.98)',
             zIndex: 9999,
             background: toastType === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
             border: `1px solid ${toastType === 'success' ? '#10b981' : '#ef4444'}`,
             color: toastType === 'success' ? '#065f46' : '#b91c1c',
             padding: '12px 18px',
             borderRadius: '10px',
             boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
             opacity: toastVisible ? 1 : 0,
             transition: 'opacity 300ms ease, transform 300ms ease',
             pointerEvents: 'none',
             fontWeight: 600,
             minWidth: '240px',
             textAlign: 'center'
           }}
         >
           {toastMessage}
         </div>
         <TemaEditContainer>

      <EditorPanel>
        <SectionTitle>Editor de Tema</SectionTitle>

        <TabContainer>
          <Tab
            active={activeTab === 'header'}
            onClick={() => setActiveTab('header')}
          >
            Header
          </Tab>
          <Tab
            active={activeTab === 'banner'}
            onClick={() => setActiveTab('banner')}
          >
            Banner
          </Tab>
          <Tab
            active={activeTab === 'agencia'}
            onClick={() => setActiveTab('agencia')}
          >
            Agência
          </Tab>
          <Tab
            active={activeTab === 'announce'}
            onClick={() => setActiveTab('announce')}
          >
            Anúncio
          </Tab>
          <Tab
            active={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
          >
            Contato
          </Tab>
          <Tab
            active={activeTab === 'footer'}
            onClick={() => setActiveTab('footer')}
          >
            Footer
          </Tab>
          <Tab
            active={activeTab === 'colors'}
            onClick={() => setActiveTab('colors')}
          >
            Cores
          </Tab>
          <Tab
            active={activeTab === 'configuracoes'}
            onClick={() => setActiveTab('configuracoes')}
          >
            Configurações
          </Tab>
          <Tab
            active={activeTab === 'texts'}
            onClick={() => setActiveTab('texts')}
          >
            Textos
          </Tab>
        </TabContainer>

        {renderTabContent()}

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <SaveButton onClick={handleSave} disabled={saving}>
            <FiSave size={16} />
            {saving ? 'Salvando...' : 'Salvar'}
          </SaveButton>
          
          <SaveButton 
            onClick={() => window.open(getSubdomainUrl(user?.slug || ''), '_blank')}
            style={{ 
              backgroundColor: '#10b981', 
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            <FiExternalLink size={16} />
            Ver Meu Site
          </SaveButton>
        </div>
      </EditorPanel>

      <PreviewPanel>
        <SectionTitle>Preview em Tempo Real</SectionTitle>
        <div style={{
          height: 'calc(100vh - 120px)',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}>
          <iframe
            key={previewKey}
            src={`/site/${user?.slug || 'imobiliariaTeste'}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            title="Preview do Tema" />
        </div>
        <div style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => window.open(getSubdomainUrl(user?.slug || 'imobiliariaTeste'), '_blank')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            🔗 Abrir em Nova Aba
          </button>
        </div>
      </PreviewPanel>
    </TemaEditContainer>

    {/* Modal de Instruções DNS */}
    {showDnsModal && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0, color: '#1f2937' }}>Configuração de Registros DNS</h3>
            <button
              onClick={() => setShowDnsModal(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '16px' }}>
              Para configurar seu domínio personalizado, siga estas instruções:
            </p>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>1. Acesse o painel do seu provedor de DNS</h4>
              <p style={{ marginBottom: '0', fontSize: '14px', color: '#6b7280' }}>
                Entre no painel de controle onde você registrou seu domínio (ex: Registro.br, GoDaddy, Hostinger, etc.)
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>2. Crie os seguintes registros DNS:</h4>
              
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '12px'
              }}>
                <strong>Registro CNAME para www:</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', marginTop: '8px' }}>
                  <div>Nome/Host: <strong>www</strong></div>
                  <div>Valor/Destino: <strong>{user?.account?.domain || `${user?.slug || 'seu-slug'}${user?.accountId || ''}.standi.com.br`}</strong></div>
                  <div>TTL: <strong>3600</strong> (ou deixe o padrão)</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '16px'
              }}>
                <strong>Registro A para domínio raiz (opcional):</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', marginTop: '8px' }}>
                  <div>Nome/Host: <strong>@</strong> (ou deixe vazio)</div>
                  <div>Valor/Destino: <strong>76.76.19.61</strong></div>
                  <div>TTL: <strong>3600</strong> (ou deixe o padrão)</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>3. Aguarde a propagação</h4>
              <p style={{ marginBottom: '0', fontSize: '14px', color: '#6b7280' }}>
                A propagação DNS pode levar de 15 minutos até 24 horas. Durante este período, seu domínio pode não funcionar corretamente.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>4. Teste seu domínio</h4>
              <p style={{ marginBottom: '0', fontSize: '14px', color: '#6b7280' }}>
                Após a propagação, acesse seu domínio personalizado para verificar se está funcionando corretamente.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '16px'
            }}>
              <strong style={{ color: '#92400e' }}>⚠️ Importante:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#92400e' }}>
                Certifique-se de que seu domínio esteja apontando corretamente antes de remover configurações antigas.
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => setShowDnsModal(false)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default TemaEdit;