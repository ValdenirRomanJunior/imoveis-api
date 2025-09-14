import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
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
  FileInput,
  SaveButton,
  TabContainer,
  Tab,
  TabContent
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

interface ThemeConfig {
  id?: number;
  name: string;
  mainColor: string;
  logo: string;
  logoSize: string;
  menuLinks: MenuLink[];
  phone: string;
  bannerImage: string;
  bannerColor: string;
  bannerTitle: string;
  bannerTitleColor: string;
  bannerTitleSize: number;
  services: Service[];
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
  };
  footerText: string;
  textColor: string;
  buttonColor: string;
  footerBackgroundColor: string;
  h2Color: string;
  h3Color: string;
  privacyPolicy: string;
  aboutUs: string;
  customDomain: string;
  facebookPixel: string;
  seoKeywords: string;
  tenantId: number;
}

const TemaEdit: React.FC = () => {
  const [activeTab, setActiveTab] = useState('header');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    name: 'Tema Padrão',
    mainColor: '#007bff',
    logo: '',
    logoSize: 'media',
    menuLinks: [{ label: 'Início', url: '/' }, { label: 'Imóveis', url: '/imoveis' }, { label: 'Contato', url: '/contato' }],
    phone: '(85) 9999-6895',
    bannerImage: '',
    bannerColor: '#f8fafc',
    bannerTitle: 'Sempre entregando o imóvel do seu sonho.',
    bannerTitleColor: '#ffffff',
    bannerTitleSize: 48,
    services: [{ icon: 'home', title: 'Venda de Imóveis', description: 'Encontre o imóvel perfeito para você', active: true }, { icon: 'key', title: 'Locação', description: 'Alugue com segurança e praticidade', active: true }, { icon: 'calculator', title: 'Financiamento', description: 'Facilitamos seu financiamento imobiliário', active: true }],
    contactTitle: 'Entre em contato conosco',
    contactImage: '',
    agentPhoto: '',
    agentQuote: 'Mais de 10 anos ajudando pessoas a encontrar o lar dos seus sonhos.',
    agentName: 'João Silva',
    footerLogo: '',
    socialLinks: {
      facebook: '#',
      instagram: '#',
      whatsapp: '#'
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
    tenantId: 1
  });

  useEffect(() => {
    loadThemeConfig();
  }, []);

  // Update preview when theme config changes
  useEffect(() => {
    if (!loading) {
      const timeoutId = setTimeout(() => {
        setPreviewKey(prev => prev + 1);
      }, 500); // Debounce para evitar muitas atualizações
      
      return () => clearTimeout(timeoutId);
    }
  }, [themeConfig, loading]);

  const loadThemeConfig = async () => {
    try {
      // For now, using tenant ID 1. In a real app, this would come from auth context
      const response = await api.get('/api/themes/tenant/1');
      const data = response.data;
      
      // Parse JSON strings from backend
      const defaultServices = [
        { icon: 'home', title: 'Venda de Imóveis', description: 'Encontre o imóvel perfeito para você', active: true },
        { icon: 'key', title: 'Locação', description: 'Alugue com segurança e praticidade', active: true },
        { icon: 'calculator', title: 'Financiamento', description: 'Facilitamos seu financiamento imobiliário', active: true }
      ];
      
      const parsedServices = typeof data.services === 'string' ? JSON.parse(data.services || '[]') : data.services || [];
      
      const parsedData = {
        ...data,
        menuLinks: typeof data.menuLinks === 'string' ? JSON.parse(data.menuLinks || '[]') : data.menuLinks || [],
        services: parsedServices.length > 0 ? parsedServices : defaultServices,
        socialLinks: typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks || '{}') : data.socialLinks || {}
      };
      
      setThemeConfig(parsedData);
    } catch (error) {
      console.error('Error loading theme config:', error);
    } finally {
      setLoading(false);
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

  const handleServiceChange = (index: number, field: string, value: string | boolean) => {
    const newServices = [...themeConfig.services];
    if (field === 'active') {
      newServices[index] = { ...newServices[index], [field]: typeof value === 'string' ? value === 'true' : value };
    } else {
      newServices[index] = { ...newServices[index], [field]: value };
    }
    setThemeConfig(prev => ({ ...prev, services: newServices }));
  };

  const handleMenuLinkChange = (index: number, field: string, value: string) => {
    const newMenuLinks = [...themeConfig.menuLinks];
    newMenuLinks[index] = { ...newMenuLinks[index], [field]: value };
    setThemeConfig(prev => ({ ...prev, menuLinks: newMenuLinks }));
  };

  const handleLogoUpload = async (file: File | undefined) => {
    if (!file) return;
    
    // Validate that the file is PNG
    if (!file.type.includes('png')) {
      alert('Apenas arquivos PNG são permitidos para a logo.');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/api/themes/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update logo URL in theme config
      handleDirectChange('logo', response.data);
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Erro ao fazer upload da logo. Tente novamente.');
    }
  };

  const handleBannerUpload = async (file: File | undefined) => {
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/api/themes/upload-banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update banner URL in theme config
      handleDirectChange('bannerImage', response.data);
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Erro ao fazer upload do banner. Tente novamente.');
    }
  };

  const handleAgentPhotoUpload = async (file: File | undefined) => {
    if (!file) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/api/themes/upload-agent-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update agent photo URL in theme config
      handleDirectChange('agentPhoto', response.data);
      
      // Auto-save theme after successful upload
      await handleSave();
    } catch (error) {
      console.error('Error uploading agent photo:', error);
      alert('Erro ao fazer upload da foto do corretor. Tente novamente.');
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Convert arrays and objects to JSON strings for backend
      const dataToSave = {
        ...themeConfig,
        menuLinks: JSON.stringify(themeConfig.menuLinks),
        services: JSON.stringify(themeConfig.services),
        socialLinks: JSON.stringify(themeConfig.socialLinks)
      };
      
      if (themeConfig.id) {
        // Update existing theme
        await api.put(`/api/themes/${themeConfig.id}`, dataToSave);
      } else {
        // Create new theme
        await api.post('/api/themes', dataToSave);
      }
      
      // Update preview after saving
      setPreviewKey(prev => prev + 1);
      alert('Tema salvo com sucesso!');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Erro ao salvar tema. Tente novamente.');
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
              <Label>Telefone</Label>
              <Input
                value={themeConfig.phone}
                onChange={(e) => handleDirectChange('phone', e.target.value)}
                placeholder="Telefone"
              />
            </FormGroup>
            <FormGroup>
              <Label>Menu (Fixo)</Label>
              <div style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Início</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Imóveis</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Contato</p>
                <small style={{ color: '#6c757d' }}>Os links do menu são fixos e não podem ser editados</small>
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
              <Label>Cor de Fundo</Label>
              <ColorInput
                type="color"
                value={themeConfig.bannerColor}
                onChange={(e) => handleDirectChange('bannerColor', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Imagem de Fundo</Label>
              {themeConfig.bannerImage ? (
                <div style={{ marginBottom: '10px' }}>
                  <img src={themeConfig.bannerImage} alt="Banner" style={{ maxWidth: '300px', maxHeight: '150px' }} />
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('bannerImage', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div style={{ padding: '40px', border: '2px dashed #ccc', textAlign: 'center', marginBottom: '10px', backgroundColor: '#f8f9fa' }}>
                  Nenhuma imagem selecionada
                </div>
              )}
              <FileInput 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                onChange={(e) => handleBannerUpload(e.target.files?.[0])}
              />
            </FormGroup>
          </TabContent>
        );
      
      case 'services':
        return (
          <TabContent>
            {themeConfig.services.map((service, index) => (
              <FormGroup key={index}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <Label>Serviço {index + 1}</Label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={service.active}
                      onChange={(e) => handleServiceChange(index, 'active', e.target.checked)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '14px', color: service.active ? '#10b981' : '#6b7280' }}>
                      {service.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
                <Input
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  placeholder="Título do serviço"
                  disabled={!service.active}
                  style={{ opacity: service.active ? 1 : 0.6 }}
                />
                
                {/* Seletor de Ícones */}
                <div style={{ marginBottom: '15px' }}>
                  <Label>Ícone do Serviço</Label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(6, 1fr)', 
                    gap: '8px', 
                    marginTop: '8px',
                    opacity: service.active ? 1 : 0.6,
                    pointerEvents: service.active ? 'auto' : 'none'
                  }}>
                    {[
                      { key: 'home', icon: AiOutlineHome, label: 'Casa' },
                      { key: 'key', icon: AiOutlineKey, label: 'Chave' },
                      { key: 'calculator', icon: AiOutlineCalculator, label: 'Calculadora' },
                      { key: 'heart', icon: AiOutlineHeart, label: 'Coração' },
                      { key: 'search', icon: AiOutlineSearch, label: 'Busca' },
                      { key: 'dollar', icon: AiOutlineDollar, label: 'Dinheiro' },
                      { key: 'bank', icon: AiOutlineBank, label: 'Banco' },
                      { key: 'shop', icon: AiOutlineShop, label: 'Loja' },
                      { key: 'car', icon: AiOutlineCar, label: 'Carro' },
                      { key: 'fa-handshake', icon: FaHandshake, label: 'Aperto de mão' },
                      { key: 'fa-building', icon: FaBuilding, label: 'Prédio' },
                      { key: 'md-agent', icon: MdRealEstateAgent, label: 'Corretor' },
                      { key: 'md-money', icon: MdAttachMoney, label: 'Dinheiro' },
                      { key: 'md-business', icon: MdBusiness, label: 'Negócio' },
                      { key: 'md-location', icon: MdLocationOn, label: 'Localização' },
                      { key: 'md-security', icon: MdSecurity, label: 'Segurança' }
                    ].map(({ key, icon: IconComponent, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleServiceChange(index, 'icon', key)}
                        style={{
                          padding: '12px',
                          border: service.icon === key ? '2px solid #007bff' : '1px solid #ddd',
                          borderRadius: '8px',
                          background: service.icon === key ? '#f0f8ff' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10px',
                          transition: 'all 0.2s'
                        }}
                        title={label}
                      >
                        <IconComponent size={20} color={service.icon === key ? '#007bff' : '#666'} />
                        <span style={{ color: service.icon === key ? '#007bff' : '#666' }}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Textarea
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  placeholder="Descrição do serviço"
                  rows={3}
                  disabled={!service.active}
                  style={{ opacity: service.active ? 1 : 0.6 }}
                />
              </FormGroup>
            ))}
          </TabContent>
        );
      
      case 'contact':
        return (
          <TabContent>
            <FormGroup>
              <Label>Título do Contato</Label>
              <Input
                value={themeConfig.contactTitle}
                onChange={(e) => handleDirectChange('contactTitle', e.target.value)}
                placeholder="Título da seção de contato"
              />
            </FormGroup>
          </TabContent>
        );
      
      case 'agent':
        return (
          <TabContent>
            <FormGroup>
              <Label>Foto do Corretor</Label>
              {themeConfig.agentPhoto ? (
                <div style={{ marginBottom: '10px' }}>
                  <img src={themeConfig.agentPhoto} alt="Foto do Corretor" style={{ maxWidth: '200px', maxHeight: '100px' }} />
                  <button 
                    type="button" 
                    onClick={() => handleDirectChange('agentPhoto', '')}
                    style={{ marginLeft: '10px', padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center', marginBottom: '10px' }}>
                  Nenhuma foto selecionada
                </div>
              )}
              <FileInput 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                onChange={(e) => handleAgentPhotoUpload(e.target.files?.[0])}
              />
            </FormGroup>
            <FormGroup>
              <Label>Frase do Corretor</Label>
              <Textarea
                value={themeConfig.agentQuote}
                onChange={(e) => handleDirectChange('agentQuote', e.target.value)}
                placeholder="Frase do corretor"
                rows={3}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nome do Corretor</Label>
              <Input
                value={themeConfig.agentName}
                onChange={(e) => handleDirectChange('agentName', e.target.value)}
                placeholder="Nome do corretor"
              />
            </FormGroup>
          </TabContent>
        );
      
      case 'footer':
        return (
          <TabContent>
            <FormGroup>
              <Label>Logo do Footer</Label>
              <Input
                value={themeConfig.footerLogo}
                onChange={(e) => handleDirectChange('footerLogo', e.target.value)}
                placeholder="Logo do footer"
              />
            </FormGroup>
            <FormGroup>
              <Label>Facebook</Label>
              <Input
                value={themeConfig.socialLinks.facebook}
                onChange={(e) => handleInputChange('socialLinks', 'facebook', e.target.value)}
                placeholder="Link do Facebook"
              />
            </FormGroup>
            <FormGroup>
              <Label>Instagram</Label>
              <Input
                value={themeConfig.socialLinks.instagram}
                onChange={(e) => handleInputChange('socialLinks', 'instagram', e.target.value)}
                placeholder="Link do Instagram"
              />
            </FormGroup>
            <FormGroup>
              <Label>WhatsApp</Label>
              <Input
                value={themeConfig.socialLinks.whatsapp}
                onChange={(e) => handleInputChange('socialLinks', 'whatsapp', e.target.value)}
                placeholder="Link do WhatsApp"
              />
            </FormGroup>
            <FormGroup>
              <Label>Texto do Footer</Label>
              <Input
                value={themeConfig.footerText}
                onChange={(e) => handleDirectChange('footerText', e.target.value)}
                placeholder="Texto do footer"
              />
            </FormGroup>
            <FormGroup>
              <Label>Cor de Fundo do Footer</Label>
              <ColorInput
                type="color"
                value={themeConfig.footerBackgroundColor}
                onChange={(e) => handleDirectChange('footerBackgroundColor', e.target.value)}
              />
            </FormGroup>
          </TabContent>
        );
      
      case 'colors':
        return (
          <TabContent>
            <FormGroup>
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
            <FormGroup>
              <Label>Domínio Personalizado</Label>
              <Input
                value={themeConfig.customDomain}
                onChange={(e) => handleDirectChange('customDomain', e.target.value)}
                placeholder="Ex: www.minhaImobiliaria.com.br"
              />
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                Digite o domínio personalizado que será usado para acessar seu site
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
  
       <><Header /><TemaEditContainer>

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
            active={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
          >
            Serviços
          </Tab>
          <Tab
            active={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
          >
            Contato
          </Tab>
          <Tab
            active={activeTab === 'agent'}
            onClick={() => setActiveTab('agent')}
          >
            Corretor
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

        <SaveButton onClick={handleSave} disabled={saving}>
          <FiSave size={16} />
          {saving ? 'Salvando...' : 'Salvar'}
        </SaveButton>
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
            src="/site/imobiliariaTeste"
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
            onClick={() => window.open('/site/imobiliariaTeste', '_blank')}
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
    </TemaEditContainer></>
  );
};

export default TemaEdit;