import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import { 
  EditorContainer, 
  SidebarEditor, 
  EditorHeader, 
  SaveButton, 
  EditorTabs, 
  TabBtn, 
  EditorContent, 
  FormGroup, 
  PreviewArea, 
  PreviewWrapper,
  EditorTopBar
} from './styles';
import { Lancamento, ConteudoGerado, DEFAULT_LP_SECTIONS, LpSection, LpConfig } from '../storage';
import { fetchPaginaById, updatePaginaApi, uploadImagemApi } from '../api';
import Residencial from '../../../templates/lp/Residencial';
import PremiumTemplate, { premiumDefaultConfig } from '../../../templates/lp/Premium';
import { Eye, EyeOff, GripVertical, ChevronUp, ChevronDown, ChevronRight, Upload, Monitor, Smartphone, X, ExternalLink, HelpCircle, CheckCircle2 } from 'lucide-react';
import styled from 'styled-components';

const AccordionBlock = styled.div<{ $isOpen: boolean, $visible: boolean }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  opacity: ${props => props.$visible ? 1 : 0.6};
  transition: all 0.3s ease;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8fafc;
  cursor: pointer;
  
  .info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    color: #1a202c;
    text-transform: capitalize;

    svg.toggle-icon {
      transition: transform 0.3s;
    }
  }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: #718096;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
      
      &:hover {
        background: #e2e8f0;
        color: #1a202c;
      }
    }
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  background: #ffffff;
`;

const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;

  &:hover {
    border-color: #0066ff;
    background: #f0f7ff;
  }

  svg {
    color: #0066ff;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 500;
  }

  input {
    display: none;
  }
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;

  .img-wrap {
    position: relative;
    padding-top: 100%;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e2e8f0;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    button {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 10px;

      &:hover {
        background: rgba(220, 38, 38, 0.9);
      }
    }
  }
`;

const EditorLP = () => {
  const { id, paginaId } = useParams<{ id: string, paginaId: string }>();
  const navigate = useNavigate();
  
  const [lancamento, setLancamento] = useState<Lancamento | null>(null);
  const [conteudo, setConteudo] = useState<ConteudoGerado | null>(null);
  const [briefing, setBriefing] = useState<any>(null);
  const [lpConfig, setLpConfig] = useState<LpConfig>({ sections: DEFAULT_LP_SECTIONS });
  const [premiumConfig, setPremiumConfig] = useState<any>(premiumDefaultConfig);
  const [activeTab, setActiveTab] = useState<'conteudo' | 'seo' | 'pixel'>('conteudo');
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openSubSectionId, setOpenSubSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const loadData = async () => {
    if (!paginaId) return;
    try {
      setLoading(true);
      const found = await fetchPaginaById(paginaId);
      if (found) {
        setLancamento(found);
        setConteudo(found.conteudoGerado);
        setBriefing(found.briefing);
        setLpConfig(found.lpConfig || { sections: [...DEFAULT_LP_SECTIONS] });
        if (found.premiumConfig) {
          setPremiumConfig(found.premiumConfig);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar página');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [paginaId]);

  const handleSave = async () => {
    if (lancamento && conteudo && briefing && paginaId) {
      try {
        setSaving(true);
        const updated = { ...lancamento, conteudoGerado: conteudo, briefing, lpConfig, premiumConfig };
        await updatePaginaApi(paginaId, updated);
        alert('Página salva com sucesso!');
        navigate(`/empreendimentos/${id}`);
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar página');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleChange = (field: keyof ConteudoGerado, value: string | string[]) => {
    if (conteudo) {
      if (field === 'mapaLocalizacao' && typeof value === 'string' && value.includes('<iframe')) {
        // Extrai o link src do iframe caso o usuário cole o código do iframe inteiro
        const match = value.match(/src="([^"]+)"/);
        if (match && match[1]) {
          setConteudo({ ...conteudo, [field]: match[1] });
          return;
        }
      }
      setConteudo({ ...conteudo, [field]: value });
    }
  };

  const handleBriefingChange = (field: string, value: any) => {
    if (briefing) {
      setBriefing({ ...briefing, [field]: value });
    }
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setLpConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s)
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    setLpConfig(prev => {
      const newSections = [...prev.sections];
      if (direction === 'up' && index > 0) {
        const temp = newSections[index - 1];
        newSections[index - 1] = newSections[index];
        newSections[index] = temp;
      } else if (direction === 'down' && index < newSections.length - 1) {
        const temp = newSections[index + 1];
        newSections[index + 1] = newSections[index];
        newSections[index] = temp;
      }
      
      // Update order property
      newSections.forEach((s, i) => s.order = i);
      
      return { ...prev, sections: newSections };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'heroBg') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImagemApi(file);
        handleBriefingChange(field, url);
      } catch (err) {
        console.error(err);
        alert('Erro ao fazer upload da imagem');
      }
    }
  };

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentFotos = briefing?.fotos || [];
      const slotsAvailable = 10 - currentFotos.length;
      const filesToProcess = files.slice(0, slotsAvailable);

      if (files.length > slotsAvailable) {
        alert(`Você pode adicionar no máximo 10 fotos. Apenas as primeiras ${slotsAvailable} foram processadas.`);
      }

      try {
        const promises = filesToProcess.map(file => uploadImagemApi(file));
        const urls = await Promise.all(promises);
        handleBriefingChange('fotos', [...currentFotos, ...urls]);
      } catch (err) {
        console.error(err);
        alert('Erro ao fazer upload das imagens');
      }
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    if (briefing?.fotos) {
      const newFotos = briefing.fotos.filter((_: any, idx: number) => idx !== indexToRemove);
      handleBriefingChange('fotos', newFotos);
    }
  };

  const parceirosDefault = [
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

  const addParceiro = () => {
    const current = briefing?.parceiros && briefing.parceiros.length > 0 ? briefing.parceiros : parceirosDefault;
    if (current.length >= 3) return;
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      papel: 'NOVO PAPEL',
      nome: 'Nome do Parceiro',
      descricao: 'Descrição do parceiro...',
      foto: ''
    };
    handleBriefingChange('parceiros', [...current, newItem]);
  };

  const removeParceiro = (indexToRemove: number) => {
    const current = briefing?.parceiros && briefing.parceiros.length > 0 ? briefing.parceiros : parceirosDefault;
    const newParceiros = current.filter((_: any, idx: number) => idx !== indexToRemove);
    handleBriefingChange('parceiros', newParceiros);
  };

  const updateParceiro = (index: number, field: string, value: string) => {
    const current = briefing?.parceiros && briefing.parceiros.length > 0 ? briefing.parceiros : parceirosDefault;
    const newParceiros = [...current];
    newParceiros[index] = { ...newParceiros[index], [field]: value };
    handleBriefingChange('parceiros', newParceiros);
  };

  const handleParceiroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImagemApi(file);
        updateParceiro(index, 'foto', url);
      } catch (err) {
        console.error(err);
        alert('Erro ao fazer upload da imagem');
      }
    }
  };

  const proximidadesDefault = [
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

  const addProximidade = () => {
    const current = briefing?.proximidades && briefing.proximidades.length > 0 ? briefing.proximidades : proximidadesDefault;
    if (current.length >= 6) return;
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      titulo: 'Novo Local',
      descricao: 'Descrição do local',
      foto: ''
    };
    handleBriefingChange('proximidades', [...current, newItem]);
  };

  const removeProximidade = (indexToRemove: number) => {
    const current = briefing?.proximidades && briefing.proximidades.length > 0 ? briefing.proximidades : proximidadesDefault;
    const newProximidades = current.filter((_: any, idx: number) => idx !== indexToRemove);
    handleBriefingChange('proximidades', newProximidades);
  };

  const updateProximidade = (index: number, field: string, value: string) => {
    const current = briefing?.proximidades && briefing.proximidades.length > 0 ? briefing.proximidades : proximidadesDefault;
    const newProximidades = [...current];
    newProximidades[index] = { ...newProximidades[index], [field]: value };
    handleBriefingChange('proximidades', newProximidades);
  };

  const addTipologia = () => {
    const current = briefing?.tipologias || [];
    if (current.length >= 3) return;
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      nome: 'Nova Planta',
      area: 50,
      quartos: 2,
      vagas: 1,
      preco: 250000,
      plantaImg: ''
    };
    handleBriefingChange('tipologias', [...current, newItem]);
  };

  const removeTipologia = (indexToRemove: number) => {
    const current = briefing?.tipologias || [];
    const newTipologias = current.filter((_: any, idx: number) => idx !== indexToRemove);
    handleBriefingChange('tipologias', newTipologias);
  };

  const updateTipologia = (index: number, field: string, value: any) => {
    const current = briefing?.tipologias || [];
    const newTipologias = [...current];
    newTipologias[index] = { ...newTipologias[index], [field]: value };
    handleBriefingChange('tipologias', newTipologias);
  };

  const handleTipologiaImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImagemApi(file);
        updateTipologia(index, 'plantaImg', url);
      } catch (err) {
        console.error(err);
        alert('Erro ao fazer upload da imagem da planta');
      }
    }
  };

  const addDiferencial = () => {
    const current = conteudo?.bulletsDiferenciais || [];
    handleChange('bulletsDiferenciais', [...current, 'Novo Diferencial']);
  };

  const removeDiferencial = (indexToRemove: number) => {
    if (conteudo?.bulletsDiferenciais) {
      const newDiferenciais = conteudo.bulletsDiferenciais.filter((_, idx) => idx !== indexToRemove);
      handleChange('bulletsDiferenciais', newDiferenciais);
    }
  };

  const updateDiferencial = (index: number, value: string) => {
    if (conteudo?.bulletsDiferenciais) {
      const newDiferenciais = [...conteudo.bulletsDiferenciais];
      newDiferenciais[index] = value;
      handleChange('bulletsDiferenciais', newDiferenciais);
    }
  };

  const handleProximidadeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImagemApi(file);
        updateProximidade(index, 'foto', url);
      } catch (err) {
        console.error(err);
        alert('Erro ao fazer upload da imagem');
      }
    }
  };

  const proximidadesToRender = briefing?.proximidades && briefing.proximidades.length > 0 
    ? briefing.proximidades 
    : proximidadesDefault;

  const parceirosToRender = briefing?.parceiros && briefing.parceiros.length > 0
    ? briefing.parceiros
    : parceirosDefault;

  if (!lancamento || !conteudo || !briefing) {
    return <div>Carregando editor...</div>;
  }

  return (
    <>
      <div style={{ display: 'none' }}>
        <Header />
      </div>
      
      <EditorTopBar>
        <div className="left-section">
          <button className="close-btn" onClick={() => navigate(`/empreendimentos/${id}`)}>
            <X size={20} />
          </button>
          <span className="title">Editar layout</span>
          <span className="status-badge">Layout atual</span>
        </div>

        <div className="center-section">
          <button 
            className={previewMode === 'mobile' ? 'active' : ''} 
            onClick={() => setPreviewMode('mobile')}
          >
            <Smartphone size={16} /> Celulares
          </button>
          <button 
            className={previewMode === 'desktop' ? 'active' : ''} 
            onClick={() => setPreviewMode('desktop')}
          >
            <Monitor size={16} /> Computadores
          </button>
        </div>

        <div className="right-section">
          <a href="#" className="action-link">
            <HelpCircle size={16} /> Ajuda
          </a>
          <a href={`/${lancamento.tenantSlug}/lp/${lancamento.slug}`} target="_blank" rel="noopener noreferrer" className="action-link">
            <ExternalLink size={16} /> Ver loja
          </a>
        </div>
      </EditorTopBar>

      <EditorContainer>
        {/* Editor Sidebar */}
        <SidebarEditor>
          <EditorHeader>
            <h2>Editor de Página</h2>
            <SaveButton onClick={handleSave}>Salvar</SaveButton>
          </EditorHeader>

          <EditorTabs>
            <TabBtn $active={activeTab === 'conteudo'} onClick={() => setActiveTab('conteudo')}>Conteúdo</TabBtn>
            <TabBtn $active={activeTab === 'seo'} onClick={() => setActiveTab('seo')}>SEO</TabBtn>
            <TabBtn $active={activeTab === 'pixel'} onClick={() => setActiveTab('pixel')}>Pixel</TabBtn>
          </EditorTabs>

          <EditorContent>
            {activeTab === 'conteudo' && lancamento.templateId !== 'premium' && (
              <>
                <p style={{ marginBottom: '20px', color: '#718096', fontSize: '0.95rem' }}>
                  Organize e edite os blocos da sua Landing Page.
                </p>
                {lpConfig.sections.map((section, index) => (
                  <AccordionBlock key={section.id} $isOpen={openSectionId === section.id} $visible={section.visible}>
                    <AccordionHeader onClick={() => setOpenSectionId(openSectionId === section.id ? null : section.id)}>
                      <div className="info">
                        <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === section.id ? 'rotate(90deg)' : 'rotate(0)' }} />
                        {section.id}
                      </div>
                      <div className="actions" onClick={e => e.stopPropagation()}>
                        <button onClick={() => toggleSectionVisibility(section.id)} title={section.visible ? 'Ocultar' : 'Mostrar'}>
                          {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button onClick={() => moveSection(index, 'up')} disabled={index === 0} style={{ opacity: index === 0 ? 0.3 : 1 }}>
                          <ChevronUp size={18} />
                        </button>
                        <button onClick={() => moveSection(index, 'down')} disabled={index === lpConfig.sections.length - 1} style={{ opacity: index === lpConfig.sections.length - 1 ? 0.3 : 1 }}>
                          <ChevronDown size={18} />
                        </button>
                      </div>
                    </AccordionHeader>

                    <AccordionContent $isOpen={openSectionId === section.id}>
                      {section.id === 'hero' && (
                        <>
                          <FormGroup>
                            <label>Alinhamento do Conteúdo</label>
                            <select 
                              value={conteudo.heroAlignment || 'left'} 
                              onChange={e => handleChange('heroAlignment', e.target.value)}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px', backgroundColor: 'white' }}
                            >
                              <option value="left">Esquerdo (Padrão)</option>
                              <option value="center">Centralizado</option>
                            </select>
                          </FormGroup>
                          <FormGroup>
                            <label>Slogan Curto / Pré-headline</label>
                            <input 
                              value={conteudo.sloganCurto} 
                              onChange={e => handleChange('sloganCurto', e.target.value)} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Título Principal (Headline)</label>
                            <input 
                              value={conteudo.headline} 
                              onChange={e => handleChange('headline', e.target.value)} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Subtítulo</label>
                            <textarea 
                              value={conteudo.subheadline} 
                              onChange={e => handleChange('subheadline', e.target.value)} 
                              style={{ height: '80px' }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Botão Principal (CTA)</label>
                            <input 
                              value={conteudo.ctaPrincipal} 
                              onChange={e => handleChange('ctaPrincipal', e.target.value)} 
                            />
                          </FormGroup>

                          <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Logo (Upload)</label>
                            {briefing.logo ? (
                              <div style={{ position: 'relative', marginBottom: '16px' }}>
                                <img src={briefing.logo} alt="Logo" style={{ width: '100%', height: '80px', objectFit: 'contain', background: '#1a202c', borderRadius: '8px', padding: '10px' }} />
                                <button onClick={() => handleBriefingChange('logo', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                              </div>
                            ) : (
                              <UploadBox>
                                <Upload size={24} />
                                <span>Clique para enviar a logo</span>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                              </UploadBox>
                            )}
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Capa / Background (Upload)</label>
                            {briefing.heroBg ? (
                              <div style={{ position: 'relative' }}>
                                <img src={briefing.heroBg} alt="Background" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                                <button onClick={() => handleBriefingChange('heroBg', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                              </div>
                            ) : (
                              <UploadBox>
                                <Upload size={24} />
                                <span>Clique para enviar a capa</span>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroBg')} />
                              </UploadBox>
                            )}
                          </div>
                          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                            <h4 style={{ fontSize: '1rem', color: '#1a202c', marginBottom: '12px' }}>Informações da Barra (InfoBar)</h4>
                            <FormGroup>
                              <label>Cor de Fundo (Ex: transparent, #000000, rgba(0,0,0,0.5))</label>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                  type="color" 
                                  value={conteudo.infobarBgColor && conteudo.infobarBgColor.startsWith('#') ? conteudo.infobarBgColor : '#000000'} 
                                  onChange={e => handleChange('infobarBgColor', e.target.value)} 
                                  style={{ width: '50px', height: '42px', padding: '0', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                                />
                                <input 
                                  type="text" 
                                  value={conteudo.infobarBgColor || ''} 
                                  onChange={e => handleChange('infobarBgColor', e.target.value)} 
                                  placeholder="transparent"
                                  style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px' }}
                                />
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <label>Localização (Padrão: Bairro/Cidade)</label>
                              <input 
                                value={conteudo.infobarLocalizacao || ''} 
                                onChange={e => handleChange('infobarLocalizacao', e.target.value)} 
                                placeholder={`Ex: ${briefing.bairro || briefing.cidade}`}
                              />
                            </FormGroup>
                            <FormGroup>
                              <label>Dorms (Padrão: Cálculo Automático)</label>
                              <input 
                                value={conteudo.infobarDorms || ''} 
                                onChange={e => handleChange('infobarDorms', e.target.value)} 
                                placeholder="Ex: De 2 a 3 suítes"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label>Residências de (Padrão: Cálculo Automático)</label>
                              <input 
                                value={conteudo.infobarArea || ''} 
                                onChange={e => handleChange('infobarArea', e.target.value)} 
                                placeholder="Ex: De 60 a 84 m²"
                              />
                            </FormGroup>
                          </div>
                        </>
                      )}

                      {section.id === 'sobre' && (
                        <>
                          <FormGroup>
                            <label>Descrição do Empreendimento</label>
                            <textarea 
                              value={conteudo.descricaoEmpreendimento} 
                              onChange={e => handleChange('descricaoEmpreendimento', e.target.value)} 
                              style={{ height: '150px' }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Padrão do Imóvel</label>
                            <select 
                              value={briefing.segmento} 
                              onChange={e => handleBriefingChange('segmento', e.target.value)}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px', backgroundColor: 'white', marginBottom: '8px' }}
                            >
                              <option value="Medio padrao">Médio padrão</option>
                              <option value="Alto Padrao">Alto Padrão</option>
                              <option value="MCMV">MCMV</option>
                            </select>
                          </FormGroup>
                          <FormGroup>
                            <label>Fase da Obra</label>
                            <select 
                              value={briefing.fase} 
                              onChange={e => handleBriefingChange('fase', e.target.value)}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px', backgroundColor: 'white', marginBottom: '8px' }}
                            >
                              <option value="Lançamento">Lançamento</option>
                              <option value="Pré-lançamento">Pré-lançamento</option>
                              <option value="Em obras">Em obras</option>
                              <option value="Finalizado">Finalizado</option>
                            </select>
                          </FormGroup>
                          <FormGroup>
                            <label>Data de Finalização (Mês/Ano)</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <select 
                                value={briefing.prazoEntregaRaw?.split('-')[1] || ''} 
                                onChange={e => {
                                  const month = e.target.value;
                                  const year = briefing.prazoEntregaRaw?.split('-')[0] || new Date().getFullYear().toString();
                                  if (month) {
                                    handleBriefingChange('prazoEntregaRaw', `${year}-${month}`);
                                    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                                    handleBriefingChange('prazoEntrega', `${meses[parseInt(month, 10) - 1]} de ${year}`);
                                  } else {
                                    handleBriefingChange('prazoEntregaRaw', '');
                                    handleBriefingChange('prazoEntrega', '');
                                  }
                                }}
                                style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px', backgroundColor: 'white' }}
                              >
                                <option value="">Mês</option>
                                <option value="01">Janeiro</option>
                                <option value="02">Fevereiro</option>
                                <option value="03">Março</option>
                                <option value="04">Abril</option>
                                <option value="05">Maio</option>
                                <option value="06">Junho</option>
                                <option value="07">Julho</option>
                                <option value="08">Agosto</option>
                                <option value="09">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                              </select>
                              
                              <select 
                                value={briefing.prazoEntregaRaw?.split('-')[0] || ''} 
                                onChange={e => {
                                  const year = e.target.value;
                                  const month = briefing.prazoEntregaRaw?.split('-')[1] || '01';
                                  if (year) {
                                    handleBriefingChange('prazoEntregaRaw', `${year}-${month}`);
                                    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                                    handleBriefingChange('prazoEntrega', `${meses[parseInt(month, 10) - 1]} de ${year}`);
                                  } else {
                                    handleBriefingChange('prazoEntregaRaw', '');
                                    handleBriefingChange('prazoEntrega', '');
                                  }
                                }}
                                style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5da', borderRadius: '6px', backgroundColor: 'white' }}
                              >
                                <option value="">Ano</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                              </select>
                            </div>
                            {briefing.prazoEntrega && !briefing.prazoEntregaRaw && (
                              <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px', display: 'block' }}>
                                Atual: {briefing.prazoEntrega} (Selecione acima para atualizar)
                              </span>
                            )}
                          </FormGroup>
                        </>
                      )}

                      {section.id === 'galeria' && (
                        <div>
                          <UploadBox>
                            <Upload size={24} />
                            <span>Enviar fotos da galeria (Máx 10)</span>
                            <input type="file" accept="image/*" multiple onChange={handleMultipleImageUpload} disabled={(briefing?.fotos?.length || 0) >= 10} />
                          </UploadBox>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{(briefing?.fotos?.length || 0)}/10 fotos enviadas</span>
                          
                          {briefing?.fotos && briefing.fotos.length > 0 && (
                            <ImagePreviewGrid>
                              {briefing.fotos.map((foto: string, i: number) => (
                                <div key={i} className="img-wrap">
                                  <img src={foto} alt={`Preview ${i}`} />
                                  <button onClick={() => removeGalleryImage(i)}>×</button>
                                </div>
                              ))}
                            </ImagePreviewGrid>
                          )}
                        </div>
                      )}

                      {section.id === 'diferenciais' && (
                        <div>
                          {conteudo.bulletsDiferenciais.map((diferencial, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                              <div style={{ flex: 1 }}>
                                <input 
                                  value={diferencial} 
                                  onChange={e => updateDiferencial(i, e.target.value)} 
                                  placeholder="Digite o diferencial"
                                />
                              </div>
                              <button 
                                onClick={() => removeDiferencial(i)} 
                                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '8px' }}
                                title="Remover Diferencial"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={addDiferencial} 
                            style={{ width: '100%', padding: '12px', background: '#f8fafc', color: '#0f172a', border: '1px dashed #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, marginTop: '8px' }}
                          >
                            + Adicionar Diferencial
                          </button>
                        </div>
                      )}

                      {section.id === 'proximidades' && (
                        <div>
                          {proximidadesToRender.map((prox: any, i: number) => (
                            <div key={prox.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <strong style={{ fontSize: '0.9rem', color: '#1a202c' }}>Item {i + 1}</strong>
                                <button onClick={() => removeProximidade(i)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>Remover</button>
                              </div>
                              <FormGroup>
                                <label>Título</label>
                                <input value={prox.titulo} onChange={e => updateProximidade(i, 'titulo', e.target.value)} />
                              </FormGroup>
                              <FormGroup>
                                <label>Descrição</label>
                                <input value={prox.descricao} onChange={e => updateProximidade(i, 'descricao', e.target.value)} />
                              </FormGroup>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Foto</label>
                                {prox.foto ? (
                                  <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                                    <img src={prox.foto} alt={prox.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                    <button onClick={() => updateProximidade(i, 'foto', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                                  </div>
                                ) : (
                                  <UploadBox style={{ padding: '12px', marginBottom: 0 }}>
                                    <Upload size={20} />
                                    <span>Enviar foto</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleProximidadeImageUpload(e, i)} />
                                  </UploadBox>
                                )}
                              </div>
                            </div>
                          ))}
                          {proximidadesToRender.length < 6 && (
                            <button onClick={addProximidade} style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              + Adicionar Item (Máx 6)
                            </button>
                          )}
                        </div>
                      )}

                      {section.id === 'localizacao' && (
                        <>
                          <FormGroup>
                            <label>Texto de Localização</label>
                            <textarea 
                              value={conteudo.textoLocalizacao} 
                              onChange={e => handleChange('textoLocalizacao', e.target.value)} 
                              style={{ height: '80px' }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>URL do Google Maps (Embed)</label>
                            <input 
                              value={conteudo.mapaLocalizacao || ''} 
                              onChange={e => handleChange('mapaLocalizacao', e.target.value)} 
                              placeholder="Cole o link ou iframe do Google Maps aqui"
                            />
                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                              Para obter o link, vá ao Google Maps, pesquise o local, clique em "Compartilhar" e depois em "Incorporar um mapa". Copie apenas o link dentro do atributo <code>src="..."</code> ou cole o código <code>&lt;iframe&gt;</code> inteiro que o sistema extrairá automaticamente o link.
                            </p>
                          </FormGroup>
                        </>
                      )}

                      {section.id === 'footer' && (
                        <>
                          <FormGroup>
                            <label>Texto Principal do Rodapé</label>
                            <input 
                              value={conteudo.footerTexto || ''} 
                              onChange={e => handleChange('footerTexto', e.target.value)} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Telefone / WhatsApp (Briefing)</label>
                            <input 
                              value={briefing.whatsappResponsavel || ''} 
                              onChange={e => handleBriefingChange('whatsappResponsavel', e.target.value)} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Texto Legal / Disclaimer</label>
                            <textarea 
                              value={conteudo.footerDisclaimer || ''} 
                              onChange={e => handleChange('footerDisclaimer', e.target.value)} 
                              style={{ height: '80px' }}
                            />
                          </FormGroup>
                        </>
                      )}

                      {section.id === 'assinaturas' && (
                        <div>
                          {parceirosToRender.map((parceiro: any, i: number) => (
                            <div key={parceiro.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <strong style={{ fontSize: '0.9rem', color: '#1a202c' }}>Parceiro {i + 1}</strong>
                                <button onClick={() => removeParceiro(i)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>Remover</button>
                              </div>
                              <FormGroup>
                                <label>Papel / Área de atuação</label>
                                <input value={parceiro.papel} onChange={e => updateParceiro(i, 'papel', e.target.value)} placeholder="Ex: ARQUITETURA" />
                              </FormGroup>
                              <FormGroup>
                                <label>Nome</label>
                                <input value={parceiro.nome} onChange={e => updateParceiro(i, 'nome', e.target.value)} placeholder="Ex: STUDIO HAUS" />
                              </FormGroup>
                              <FormGroup>
                                <label>Descrição</label>
                                <textarea 
                                  value={parceiro.descricao} 
                                  onChange={e => updateParceiro(i, 'descricao', e.target.value)} 
                                  style={{ height: '80px' }}
                                />
                              </FormGroup>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Foto</label>
                                {parceiro.foto ? (
                                  <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                                    <img src={parceiro.foto} alt={parceiro.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                    <button onClick={() => updateParceiro(i, 'foto', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                                  </div>
                                ) : (
                                  <UploadBox style={{ padding: '12px', marginBottom: 0 }}>
                                    <Upload size={20} />
                                    <span>Enviar foto</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleParceiroImageUpload(e, i)} />
                                  </UploadBox>
                                )}
                              </div>
                            </div>
                          ))}
                          {parceirosToRender.length < 3 && (
                            <button onClick={addParceiro} style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              + Adicionar Parceiro (Máx 3)
                            </button>
                          )}
                        </div>
                      )}

                      {section.id === 'tipologias' && (
                        <div>
                          <p style={{ fontSize: '0.9rem', color: '#718096', margin: '0 0 16px 0' }}>
                            Gerencie as opções de plantas do empreendimento.
                          </p>
                          {(briefing.tipologias || []).map((tipologia: any, i: number) => (
                            <div key={tipologia.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <strong style={{ fontSize: '0.9rem', color: '#1a202c' }}>Planta {i + 1}</strong>
                                <button onClick={() => removeTipologia(i)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>Remover</button>
                              </div>
                              <FormGroup>
                                <label>Nome / Título da Planta</label>
                                <input value={tipologia.nome} onChange={e => updateTipologia(i, 'nome', e.target.value)} placeholder="Ex: 2 Dormitórios com Suíte" />
                              </FormGroup>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <FormGroup>
                                  <label>Área (m²)</label>
                                  <input type="number" value={tipologia.area} onChange={e => updateTipologia(i, 'area', Number(e.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                  <label>Quartos</label>
                                  <input type="number" value={tipologia.quartos} onChange={e => updateTipologia(i, 'quartos', Number(e.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                  <label>Vagas</label>
                                  <input type="number" value={tipologia.vagas} onChange={e => updateTipologia(i, 'vagas', Number(e.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                  <label>Preço (R$)</label>
                                  <input type="number" value={tipologia.preco} onChange={e => updateTipologia(i, 'preco', Number(e.target.value))} />
                                </FormGroup>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Imagem da Planta</label>
                                {tipologia.plantaImg ? (
                                  <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                                    <img src={tipologia.plantaImg} alt={tipologia.nome} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                    <button onClick={() => updateTipologia(i, 'plantaImg', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                                  </div>
                                ) : (
                                  <UploadBox style={{ padding: '12px', marginBottom: 0 }}>
                                    <Upload size={20} />
                                    <span>Enviar Imagem</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleTipologiaImageUpload(e, i)} />
                                  </UploadBox>
                                )}
                              </div>
                            </div>
                          ))}
                          {(briefing.tipologias || []).length < 3 && (
                            <button onClick={addTipologia} style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                              + Adicionar Planta (Máx 3)
                            </button>
                          )}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionBlock>
                ))}

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #e2e8f0' }}>
                  <h3 style={{ marginBottom: '20px', color: '#1a202c', fontSize: '1.2rem' }}>Cores Globais</h3>
                  <FormGroup>
                    <label>Cor Primária (Botões e Ícones da Hero e Form)</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input 
                        type="color"
                        value={conteudo.primaryColor || '#afab2c'} 
                        onChange={e => handleChange('primaryColor', e.target.value)} 
                        style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text"
                        value={conteudo.primaryColor || '#afab2c'} 
                        onChange={e => handleChange('primaryColor', e.target.value)}
                        style={{ flex: 1, fontFamily: 'monospace' }}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <label>Cor Secundária (Fundo do Footer e InfoBar da Hero)</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input 
                        type="color"
                        value={conteudo.secondaryColor || '#000000'} 
                        onChange={e => handleChange('secondaryColor', e.target.value)} 
                        style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text"
                        value={conteudo.secondaryColor || '#000000'} 
                        onChange={e => handleChange('secondaryColor', e.target.value)}
                        style={{ flex: 1, fontFamily: 'monospace' }}
                      />
                    </div>
                  </FormGroup>
                </div>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #e2e8f0' }}>
                  <h3 style={{ marginBottom: '20px', color: '#1a202c', fontSize: '1.2rem' }}>Formulário de Captação</h3>
                  <p style={{ marginBottom: '20px', color: '#718096', fontSize: '0.95rem' }}>
                    Gerencie as etapas do formulário de captação de leads.
                  </p>
                  {(lpConfig.formSteps || []).map((step, index) => (
                    <div key={step.id} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <strong style={{ fontSize: '0.95rem', color: '#1a202c' }}>Etapa {index + 1}: {step.tipo === 'dados_iniciais' ? 'Dados Iniciais' : step.tipo === 'multipla_escolha' ? 'Múltipla Escolha' : step.tipo === 'dados_contato' ? 'Contato (WhatsApp)' : 'Texto'}</strong>
                      </div>

                      {step.tipo !== 'dados_iniciais' && step.tipo !== 'multipla_escolha' && (
                        <>
                          <FormGroup>
                            <label>Título (Pergunta)</label>
                            <input 
                              value={step.titulo} 
                              onChange={e => {
                                const newSteps = [...(lpConfig.formSteps || [])];
                                newSteps[index].titulo = e.target.value;
                                setLpConfig({ ...lpConfig, formSteps: newSteps });
                              }} 
                            />
                          </FormGroup>

                          <FormGroup>
                            <label>Subtítulo (Opcional)</label>
                            <input 
                              value={step.subtitulo || ''} 
                              onChange={e => {
                                const newSteps = [...(lpConfig.formSteps || [])];
                                newSteps[index].subtitulo = e.target.value;
                                setLpConfig({ ...lpConfig, formSteps: newSteps });
                              }} 
                            />
                          </FormGroup>
                        </>
                      )}

                      {step.tipo === 'multipla_escolha' && (
                        <>
                          <FormGroup>
                            <label>Título (Fixo)</label>
                            <input 
                              value={step.titulo} 
                              disabled
                              style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label>Subtítulo (Fixo)</label>
                            <input 
                              value={step.subtitulo || ''} 
                              disabled
                              style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                            />
                          </FormGroup>
                        </>
                      )}

                      {step.tipo === 'dados_iniciais' && (
                        <>
                          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                            Nesta etapa, o usuário preencherá seu Nome e a Tipologia de interesse. Estes campos são fixos e não editáveis.
                          </p>
                          <FormGroup>
                            <label>Campo Nome (Fixo)</label>
                            <input 
                              value={step.inputPlaceholder || 'Seu nome completo'} 
                              disabled
                              style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Campo Tipologia (Fixo)</label>
                            <input 
                              value={step.selectLabel || 'Qual tipologia mais te interessa?'} 
                              disabled
                              style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                            />
                          </FormGroup>
                        </>
                      )}

                      {step.tipo === 'dados_contato' && (
                        <FormGroup>
                          <label>Texto do campo WhatsApp</label>
                          <input 
                            value={step.inputPlaceholder || 'Seu WhatsApp (com DDD)'} 
                            onChange={e => {
                              const newSteps = [...(lpConfig.formSteps || [])];
                              newSteps[index].inputPlaceholder = e.target.value;
                              setLpConfig({ ...lpConfig, formSteps: newSteps });
                            }} 
                          />
                        </FormGroup>
                      )}

                      {step.tipo === 'multipla_escolha' && (
                        <div style={{ marginTop: '16px', padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                            As opções de resposta desta etapa são fixas para garantir que a inteligência de qualificação de leads (Lead Scoring) funcione corretamente.
                          </p>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Opções de Resposta (Fixo)</label>
                          {(step.opcoes || []).map((opcao, optIndex) => (
                            <div key={optIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                              <input 
                                value={opcao.label} 
                                disabled
                                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'conteudo' && lancamento.templateId === 'premium' && (
              <>
                <p style={{ marginBottom: '20px', color: '#718096', fontSize: '0.95rem' }}>
                  Organize e edite os blocos do template Premium.
                </p>
                
                <AccordionBlock $isOpen={openSectionId === 'premium-hero'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-hero' ? null : 'premium-hero')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-hero' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Hero
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-hero'}>
                    <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setOpenSubSectionId(openSubSectionId === 'hero-texts' ? null : 'hero-texts')}
                        style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Textos</span>
                        <ChevronDown size={16} style={{ transform: openSubSectionId === 'hero-texts' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                      </div>
                      {openSubSectionId === 'hero-texts' && (
                        <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                  onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showTitle: !premiumConfig.hero.visibility.showTitle}}})}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showTitle ? '#0ea5e9' : '#94a3b8' }}
                                >
                                  {premiumConfig.hero.visibility.showTitle ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <label style={{ margin: 0 }}>Título Principal</label>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                                <input 
                                  type="range" 
                                  min="24" max="120" 
                                  value={premiumConfig.hero.styles?.titleFontSize || 72}
                                  onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, styles: {...premiumConfig.hero.styles, titleFontSize: Number(e.target.value)}}})}
                                  style={{ width: '60px', accentColor: '#0ea5e9' }}
                                />
                                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                              </div>
                            </div>
                            <textarea 
                              value={premiumConfig.hero.content.title} 
                              onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, title: e.target.value}}})} 
                              style={{ height: '80px' }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                  onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showSubtitle: !premiumConfig.hero.visibility.showSubtitle}}})}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showSubtitle ? '#0ea5e9' : '#94a3b8' }}
                                >
                                  {premiumConfig.hero.visibility.showSubtitle ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <label style={{ margin: 0 }}>Subtítulo</label>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                                <input 
                                  type="range" 
                                  min="10" max="40" 
                                  value={premiumConfig.hero.styles?.subtitleFontSize || 14}
                                  onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, styles: {...premiumConfig.hero.styles, subtitleFontSize: Number(e.target.value)}}})}
                                  style={{ width: '60px', accentColor: '#0ea5e9' }}
                                />
                                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                              </div>
                            </div>
                            <input 
                              value={premiumConfig.hero.content.subtitle} 
                              onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, subtitle: e.target.value}}})} 
                            />
                          </FormGroup>
                          <FormGroup style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                  onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showDescription: !premiumConfig.hero.visibility.showDescription}}})}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showDescription ? '#0ea5e9' : '#94a3b8' }}
                                >
                                  {premiumConfig.hero.visibility.showDescription ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <label style={{ margin: 0 }}>Descrição</label>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                                <input 
                                  type="range" 
                                  min="12" max="36" 
                                  value={premiumConfig.hero.styles?.descriptionFontSize || 18}
                                  onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, styles: {...premiumConfig.hero.styles, descriptionFontSize: Number(e.target.value)}}})}
                                  style={{ width: '60px', accentColor: '#0ea5e9' }}
                                />
                                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>A</span>
                              </div>
                            </div>
                            <textarea 
                              value={premiumConfig.hero.content.description} 
                              onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, description: e.target.value}}})} 
                              style={{ height: '80px' }}
                            />
                          </FormGroup>
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setOpenSubSectionId(openSubSectionId === 'hero-info' ? null : 'hero-info')}
                        style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Informações</span>
                        <ChevronDown size={16} style={{ transform: openSubSectionId === 'hero-info' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                      </div>
                      {openSubSectionId === 'hero-info' && (
                        <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <button 
                                onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showFeature1: premiumConfig.hero.visibility.showFeature1 === false ? true : false}}})}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showFeature1 !== false ? '#0ea5e9' : '#94a3b8' }}
                              >
                                {premiumConfig.hero.visibility.showFeature1 !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <label style={{ margin: 0 }}>Metragem</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input 
                                value={premiumConfig.hero.content.features[0]?.text || ''} 
                                onChange={e => {
                                  const newFeatures = [...premiumConfig.hero.content.features];
                                  if (newFeatures[0]) newFeatures[0].text = e.target.value;
                                  setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, features: newFeatures}}});
                                }} 
                                style={{ borderRight: 'none', borderRadius: '4px 0 0 4px' }}
                              />
                              <div style={{ padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderLeft: 'none', borderRadius: '0 4px 4px 0', height: '38px', display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                                m²
                              </div>
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <button 
                                onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showFeature2: premiumConfig.hero.visibility.showFeature2 === false ? true : false}}})}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showFeature2 !== false ? '#0ea5e9' : '#94a3b8' }}
                              >
                                {premiumConfig.hero.visibility.showFeature2 !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <label style={{ margin: 0 }}>Metragem Cobertura</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input 
                                value={premiumConfig.hero.content.features[1]?.text || ''} 
                                onChange={e => {
                                  const newFeatures = [...premiumConfig.hero.content.features];
                                  if (newFeatures[1]) newFeatures[1].text = e.target.value;
                                  setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, features: newFeatures}}});
                                }} 
                                style={{ borderRight: 'none', borderRadius: '4px 0 0 4px' }}
                              />
                              <div style={{ padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderLeft: 'none', borderRadius: '0 4px 4px 0', height: '38px', display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                m² Cobertura
                              </div>
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <button 
                                onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showFeature3: premiumConfig.hero.visibility.showFeature3 === false ? true : false}}})}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showFeature3 !== false ? '#0ea5e9' : '#94a3b8' }}
                              >
                                {premiumConfig.hero.visibility.showFeature3 !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <label style={{ margin: 0 }}>Pré-lançamento</label>
                            </div>
                            <input 
                              value={premiumConfig.hero.content.features[2]?.text || ''} 
                              onChange={e => {
                                const newFeatures = [...premiumConfig.hero.content.features];
                                if (newFeatures[2]) newFeatures[2].text = e.target.value;
                                setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, features: newFeatures}}});
                              }} 
                            />
                          </FormGroup>
                          <FormGroup style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <button 
                                onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showDelivery: premiumConfig.hero.visibility.showDelivery === false ? true : false}}})}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.hero.visibility.showDelivery !== false ? '#0ea5e9' : '#94a3b8' }}
                              >
                                {premiumConfig.hero.visibility.showDelivery !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <label style={{ margin: 0 }}>Entrega</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ padding: '0 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '4px 0 0 4px', height: '38px', display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                                Entrega:
                              </div>
                              <input 
                                value={premiumConfig.hero.content.delivery} 
                                onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, content: {...premiumConfig.hero.content, delivery: e.target.value}}})} 
                                style={{ borderRadius: '0 4px 4px 0' }}
                              />
                            </div>
                          </FormGroup>
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setOpenSubSectionId(openSubSectionId === 'hero-bg' ? null : 'hero-bg')}
                        style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Imagem de Fundo</span>
                        <ChevronDown size={16} style={{ transform: openSubSectionId === 'hero-bg' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                      </div>
                      {openSubSectionId === 'hero-bg' && (
                        <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                          <FormGroup>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <label style={{ margin: 0 }}>Intensidade do Escurecimento (Overlay)</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>Claro</span>
                                <input 
                                  type="range" 
                                  min="0" max="100" 
                                  value={
                                    (() => {
                                      const match = premiumConfig.hero.overlayColor.match(/rgba?\([^,]+,\s*[^,]+,\s*[^,]+,\s*([\d.]+)\)/);
                                      return match ? Math.round(Number(match[1]) * 100) : 65;
                                    })()
                                  }
                                  onChange={e => {
                                    const opacity = Number(e.target.value) / 100;
                                    setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, overlayColor: `rgba(0, 0, 0, ${opacity})`}});
                                  }}
                                  style={{ width: '80px', accentColor: '#0ea5e9' }}
                                />
                                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>Escuro</span>
                              </div>
                            </div>
                          </FormGroup>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#24292e', marginBottom: '8px' }}>Background Desktop (Upload)</label>
                            {premiumConfig.hero.bgImage.bgDesktop ? (
                              <div style={{ position: 'relative' }}>
                                <img src={premiumConfig.hero.bgImage.bgDesktop} alt="Background" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                                <button onClick={() => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, bgImage: {...premiumConfig.hero.bgImage, bgDesktop: ''}}})} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                              </div>
                            ) : (
                              <UploadBox>
                                <Upload size={24} />
                                <span>Clique para enviar a capa</span>
                                <input type="file" accept="image/*" onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    try {
                                      const url = await uploadImagemApi(file);
                                      setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, bgImage: {...premiumConfig.hero.bgImage, bgDesktop: url}}});
                                    } catch (err) {
                                      console.error(err);
                                      alert('Erro ao fazer upload da imagem');
                                    }
                                  }
                                }} />
                              </UploadBox>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                      <h4 style={{ fontSize: '1rem', color: '#1a202c', marginBottom: '12px' }}>Configurações de Exibição</h4>
                      
                      {/* Top Bar Config */}
                      <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          onClick={() => setOpenSubSectionId(openSubSectionId === 'topbar' ? null : 'topbar')}
                          style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Contador da Barra Superior</span>
                          <ChevronDown size={16} style={{ transform: openSubSectionId === 'topbar' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                        </div>
                        {openSubSectionId === 'topbar' && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                              <input 
                                type="checkbox"
                                checked={premiumConfig.hero.visibility.showTopBar} 
                                onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showTopBar: e.target.checked}}})} 
                                style={{ width: 'auto' }}
                              />
                              <label style={{ margin: 0 }}>Habilitar Barra Superior</label>
                            </FormGroup>
                            <FormGroup>
                              <label>Data Alvo do Contador (Ex: 2026-12-31T23:59:59)</label>
                              <input 
                                type="datetime-local"
                                value={premiumConfig.hero.countdownTarget?.slice(0, 16) || ''} 
                                onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, countdownTarget: e.target.value + ':00'}})} 
                              />
                            </FormGroup>
                          </div>
                        )}
                      </div>

                      {/* Right Countdown Config */}
                      <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          onClick={() => setOpenSubSectionId(openSubSectionId === 'right-countdown' ? null : 'right-countdown')}
                          style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Contador Regressivo (Direita)</span>
                          <ChevronDown size={16} style={{ transform: openSubSectionId === 'right-countdown' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                        </div>
                        {openSubSectionId === 'right-countdown' && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                              <input 
                                type="checkbox"
                                checked={premiumConfig.hero.visibility.showCountdown} 
                                onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showCountdown: e.target.checked}}})} 
                                style={{ width: 'auto' }}
                              />
                              <label style={{ margin: 0 }}>Habilitar Contador Direito</label>
                            </FormGroup>
                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                              A data alvo deste contador é a mesma configurada na Barra Superior.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Floating Buttons Config */}
                      <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          onClick={() => setOpenSubSectionId(openSubSectionId === 'floating-buttons' ? null : 'floating-buttons')}
                          style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Botões Flutuantes (Registrar / WhatsApp)</span>
                          <ChevronDown size={16} style={{ transform: openSubSectionId === 'floating-buttons' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                        </div>
                        {openSubSectionId === 'floating-buttons' && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={premiumConfig.hero.visibility.showFloatingWhatsapp} 
                                onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showFloatingWhatsapp: e.target.checked}}})} 
                                style={{ width: 'auto' }}
                              />
                              <label style={{ margin: 0 }}>Habilitar Botões Flutuantes</label>
                            </FormGroup>
                          </div>
                        )}
                      </div>

                      {/* Schedule Visit Card (Simple Checkbox as requested) */}
                      <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                        <input 
                          type="checkbox"
                          checked={premiumConfig.hero.visibility.showScheduleVisit} 
                          onChange={e => setPremiumConfig({...premiumConfig, hero: {...premiumConfig.hero, visibility: {...premiumConfig.hero.visibility, showScheduleVisit: e.target.checked}}})} 
                          style={{ width: 'auto' }}
                        />
                        <label style={{ margin: 0 }}>Mostrar Card "Agendar Visita"?</label>
                      </FormGroup>
                    </div>
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-detalhes'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-detalhes' ? null : 'premium-detalhes')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-detalhes' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Detalhes (Highlights)
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-detalhes'}>
                    <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <input 
                        type="checkbox"
                        checked={premiumConfig.highlights.visibility.show} 
                        onChange={e => setPremiumConfig({...premiumConfig, highlights: {...premiumConfig.highlights, visibility: {...premiumConfig.highlights.visibility, show: e.target.checked}}})} 
                        style={{ width: 'auto' }}
                      />
                      <label style={{ margin: 0, fontWeight: 600 }}>Exibir barra de destaques?</label>
                    </FormGroup>

                    {[0, 1, 2, 3].map((index) => {
                      const visibilityKey = `showItem${index + 1}` as keyof typeof premiumConfig.highlights.visibility;
                      const item = premiumConfig.highlights.items[index];
                      if (!item) return null;

                      return (
                        <div key={index} style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                          <div 
                            onClick={() => setOpenSubSectionId(openSubSectionId === `detalhes-item-${index}` ? null : `detalhes-item-${index}`)}
                            style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                          >
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Bloco {index + 1}</span>
                            <ChevronDown size={16} style={{ transform: openSubSectionId === `detalhes-item-${index}` ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                          </div>
                          {openSubSectionId === `detalhes-item-${index}` && (
                            <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                              <FormGroup>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <button 
                                    onClick={() => setPremiumConfig({...premiumConfig, highlights: {...premiumConfig.highlights, visibility: {...premiumConfig.highlights.visibility, [visibilityKey]: premiumConfig.highlights.visibility[visibilityKey] === false ? true : false}}})}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: premiumConfig.highlights.visibility[visibilityKey] !== false ? '#0ea5e9' : '#94a3b8' }}
                                  >
                                    {premiumConfig.highlights.visibility[visibilityKey] !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                                  </button>
                                  <label style={{ margin: 0 }}>Valor (em destaque)</label>
                                </div>
                                <input 
                                  value={item.value} 
                                  onChange={e => {
                                    const newItems = [...premiumConfig.highlights.items];
                                    newItems[index] = { ...newItems[index], value: e.target.value };
                                    setPremiumConfig({...premiumConfig, highlights: {...premiumConfig.highlights, items: newItems}});
                                  }} 
                                />
                              </FormGroup>
                              <FormGroup style={{ marginBottom: 0 }}>
                                <label>Rótulo (Label menor)</label>
                                <input 
                                  value={item.label} 
                                  onChange={e => {
                                    const newItems = [...premiumConfig.highlights.items];
                                    newItems[index] = { ...newItems[index], label: e.target.value };
                                    setPremiumConfig({...premiumConfig, highlights: {...premiumConfig.highlights, items: newItems}});
                                  }} 
                                />
                              </FormGroup>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-conceito'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-conceito' ? null : 'premium-conceito')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-conceito' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Conceito
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-conceito'}>
                    <FormGroup>
                      <label>Tag (ex: O CONCEITO)</label>
                      <input 
                        value={premiumConfig.concept.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico dourado)</label>
                      <textarea 
                        value={premiumConfig.concept.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, title: e.target.value}})} 
                        style={{ height: '80px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Texto em Destaque (Cinza)</label>
                      <textarea 
                        value={premiumConfig.concept.highlightText} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, highlightText: e.target.value}})} 
                        style={{ height: '100px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Texto Principal (Escuro)</label>
                      <textarea 
                        value={premiumConfig.concept.mainText} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, mainText: e.target.value}})} 
                        style={{ height: '80px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Texto Secundário (Escuro)</label>
                      <textarea 
                        value={premiumConfig.concept.secondaryText} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, secondaryText: e.target.value}})} 
                        style={{ height: '80px' }}
                      />
                    </FormGroup>

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '20px', marginBottom: '12px' }}>Lista de Diferenciais</h4>
                    {premiumConfig.concept.listItems.map((item: any, index: number) => (
                      <FormGroup key={index} style={{ marginBottom: '8px' }}>
                        <input 
                          value={item.text} 
                          onChange={e => {
                            const newList = [...premiumConfig.concept.listItems];
                            newList[index].text = e.target.value;
                            setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, listItems: newList}});
                          }} 
                          placeholder={`Item ${index + 1}`}
                        />
                      </FormGroup>
                    ))}

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '20px', marginBottom: '12px' }}>Imagem da Seção</h4>
                    <div>
                      {premiumConfig.concept.imageBlock.url ? (
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                          <img src={premiumConfig.concept.imageBlock.url} alt="Concept" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                          <button onClick={() => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, imageBlock: {...premiumConfig.concept.imageBlock, url: ''}}})} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                        </div>
                      ) : (
                        <UploadBox style={{ marginBottom: '16px' }}>
                          <Upload size={24} />
                          <span>Clique para enviar a imagem</span>
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const url = await uploadImagemApi(file);
                                setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, imageBlock: {...premiumConfig.concept.imageBlock, url}}});
                              } catch (err) {
                                console.error(err);
                                alert('Erro ao fazer upload da imagem');
                              }
                            }
                          }} />
                        </UploadBox>
                      )}
                    </div>
                    
                    <FormGroup>
                      <label>Título sobre a Imagem</label>
                      <input 
                        value={premiumConfig.concept.imageBlock.cardTitle} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, imageBlock: {...premiumConfig.concept.imageBlock, cardTitle: e.target.value}}})} 
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>Subtítulo sobre a Imagem</label>
                      <input 
                        value={premiumConfig.concept.imageBlock.cardSubtitle} 
                        onChange={e => setPremiumConfig({...premiumConfig, concept: {...premiumConfig.concept, imageBlock: {...premiumConfig.concept.imageBlock, cardSubtitle: e.target.value}}})} 
                      />
                    </FormGroup>
                    
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-video'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-video' ? null : 'premium-video')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-video' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Vídeo
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-video'}>
                    <FormGroup>
                      <label>Tag</label>
                      <input 
                        value={premiumConfig.video.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico dourado)</label>
                      <textarea 
                        value={premiumConfig.video.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Subtítulo</label>
                      <textarea 
                        value={premiumConfig.video.subtitle} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, subtitle: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>ID do Vídeo do YouTube</label>
                      <input 
                        value={premiumConfig.video.videoId} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, videoId: e.target.value}})} 
                        placeholder="Ex: DzK8X-t5BYY"
                      />
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Copie apenas o código após "v=" no link do YouTube.
                      </span>
                    </FormGroup>

                    <FormGroup>
                      <label>Texto sobre o Vídeo</label>
                      <input 
                        value={premiumConfig.video.actionText} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, actionText: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup style={{ marginBottom: 0 }}>
                      <label>Texto do Botão de Ação</label>
                      <input 
                        value={premiumConfig.video.buttonText} 
                        onChange={e => setPremiumConfig({...premiumConfig, video: {...premiumConfig.video, buttonText: e.target.value}})} 
                      />
                    </FormGroup>
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-galeria'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-galeria' ? null : 'premium-galeria')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-galeria' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Galeria de Imagens
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-galeria'}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                      Adicione imagens para compor o mosaico/grid da galeria. O layout se adapta automaticamente à quantidade de fotos.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
                      {premiumConfig.gallery.map((image: any, index: number) => (
                        <div key={index} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '1/1' }}>
                          <img src={image.url} alt={image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            onClick={() => {
                              const newGallery = [...premiumConfig.gallery];
                              newGallery.splice(index, 1);
                              setPremiumConfig({...premiumConfig, gallery: newGallery});
                            }} 
                            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Remover imagem"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      
                      <UploadBox style={{ padding: '10px', height: '100%', minHeight: '100px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Upload size={20} />
                        <span style={{ fontSize: '0.75rem', marginTop: '8px' }}>Adicionar</span>
                        <input type="file" accept="image/*" multiple onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0) {
                            try {
                              const urls = await Promise.all(files.map(file => uploadImagemApi(file)));
                              const newImages = urls.map(url => ({ url, alt: 'Imagem da galeria' }));
                              setPremiumConfig({...premiumConfig, gallery: [...premiumConfig.gallery, ...newImages]});
                            } catch (err) {
                              console.error(err);
                              alert('Erro ao fazer upload das imagens');
                            }
                          }
                        }} />
                      </UploadBox>
                    </div>
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-tipologias'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-tipologias' ? null : 'premium-tipologias')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-tipologias' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Tipologias
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-tipologias'}>
                    <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setOpenSubSectionId(openSubSectionId === 'tipologias-plantas' ? null : 'tipologias-plantas')}
                        style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Plantas</span>
                        <ChevronDown size={16} style={{ transform: openSubSectionId === 'tipologias-plantas' ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                      </div>
                      {openSubSectionId === 'tipologias-plantas' && (
                        <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                          <FormGroup>
                            <label>Tag (ex: PLANTAS OFICIAIS)</label>
                            <input 
                              value={premiumConfig.floorPlans.tag} 
                              onChange={e => setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tag: e.target.value}})} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Título (use &lt;em&gt; para itálico)</label>
                            <textarea 
                              value={premiumConfig.floorPlans.title} 
                              onChange={e => setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, title: e.target.value}})} 
                              style={{ height: '60px' }}
                            />
                          </FormGroup>

                          <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Tipos de Planta</h4>
                          
                          {premiumConfig.floorPlans.tabs.map((tab: any, tabIndex: number) => (
                            <div key={tabIndex} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', marginBottom: '12px', background: '#f8fafc', position: 'relative' }}>
                              <button 
                                onClick={() => {
                                  const newTabs = [...premiumConfig.floorPlans.tabs];
                                  newTabs.splice(tabIndex, 1);
                                  setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tabs: newTabs}});
                                }}
                                style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                              >
                                <X size={16} />
                              </button>
                              
                              <FormGroup>
                                <label>Nome da Aba (ex: APARTAMENTO TIPO)</label>
                                <input 
                                  value={tab.label} 
                                  onChange={e => {
                                    const newTabs = [...premiumConfig.floorPlans.tabs];
                                    newTabs[tabIndex] = { ...newTabs[tabIndex], label: e.target.value };
                                    setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tabs: newTabs}});
                                  }} 
                                />
                              </FormGroup>
                              
                              <FormGroup>
                                <label>Tema do Cabeçalho</label>
                                <select 
                                  value={tab.headerTheme} 
                                  onChange={e => {
                                    const newTabs = [...premiumConfig.floorPlans.tabs];
                                    newTabs[tabIndex] = { ...newTabs[tabIndex], headerTheme: e.target.value as 'light' | 'dark' };
                                    setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tabs: newTabs}});
                                  }}
                                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                >
                                  <option value="light">Claro (Borda Dourada)</option>
                                  <option value="dark">Escuro</option>
                                </select>
                              </FormGroup>

                              <h5 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>Imagens das Plantas (máx 3)</h5>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                {tab.plans.map((plan: any, planIndex: number) => (
                                  <div key={planIndex} style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    {plan.image ? (
                                      <>
                                        <img src={plan.image} alt={plan.name} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                                        <button 
                                          onClick={() => {
                                            const newTabs = [...premiumConfig.floorPlans.tabs];
                                            newTabs[tabIndex].plans.splice(planIndex, 1);
                                            setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tabs: newTabs}});
                                          }}
                                          style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                                        >×</button>
                                      </>
                                    ) : null}
                                  </div>
                                ))}
                                {tab.plans.length < 3 && (
                                  <UploadBox style={{ padding: '4px', height: '80px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Upload size={16} />
                                    <span style={{ fontSize: '0.65rem', marginTop: '4px', textAlign: 'center' }}>Add</span>
                                    <input type="file" accept="image/*" onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const url = await uploadImagemApi(file);
                                          const newTabs = [...premiumConfig.floorPlans.tabs];
                                          newTabs[tabIndex].plans.push({ image: url, name: `Planta ${newTabs[tabIndex].plans.length + 1}` });
                                          setPremiumConfig({...premiumConfig, floorPlans: {...premiumConfig.floorPlans, tabs: newTabs}});
                                        } catch (err) {
                                          console.error(err);
                                          alert('Erro ao upload');
                                        }
                                      }
                                    }} />
                                  </UploadBox>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {premiumConfig.floorPlans.tabs.length < 2 && (
                            <button 
                              onClick={() => {
                                setPremiumConfig({
                                  ...premiumConfig, 
                                  floorPlans: {
                                    ...premiumConfig.floorPlans, 
                                    tabs: [
                                      ...premiumConfig.floorPlans.tabs, 
                                      {
                                        id: `tipo-${Date.now()}`,
                                        label: 'NOVO TIPO',
                                        headerTheme: 'light',
                                        specs: [
                                          { value: '0m²', label: 'ÁREA' },
                                          { value: '0 suítes', label: 'SUÍTES' },
                                          { value: '0 vagas', label: 'VAGAS' },
                                          { value: 'Padrão', label: 'PÉ-DIREITO' }
                                        ],
                                        plans: []
                                      }
                                    ]
                                  }
                                });
                              }}
                              style={{ width: '100%', padding: '10px', background: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '6px', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                            >
                              + Criar Tipo
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div 
                        onClick={() => setOpenSubSectionId(openSubSectionId === 'tipologias-cards' ? null : 'tipologias-cards')}
                        style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tipologias (Cards)</span>
                        <ChevronDown size={16} style={{ transform: openSubSectionId === 'tipologias-cards' ? 'rotate(180deg)' : 'rotate(0)' }} />
                      </div>
                      {openSubSectionId === 'tipologias-cards' && (
                        <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                          <FormGroup>
                            <label>Tag</label>
                            <input 
                              value={premiumConfig.typologies.tag} 
                              onChange={e => setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, tag: e.target.value}})} 
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Título</label>
                            <textarea 
                              value={premiumConfig.typologies.title} 
                              onChange={e => setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, title: e.target.value}})} 
                              style={{ height: '60px' }}
                            />
                          </FormGroup>

                          <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Cards de Tipologia</h4>
                          
                          {premiumConfig.typologies.cards.map((card: any, cardIndex: number) => (
                            <div key={cardIndex} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', marginBottom: '12px', background: '#f8fafc', position: 'relative' }}>
                              <button 
                                onClick={() => {
                                  const newCards = [...premiumConfig.typologies.cards];
                                  newCards.splice(cardIndex, 1);
                                  setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                }}
                                style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                              >
                                <X size={16} />
                              </button>
                              
                              <FormGroup>
                                <label>Título do Card</label>
                                <input 
                                  value={card.title} 
                                  onChange={e => {
                                    const newCards = [...premiumConfig.typologies.cards];
                                    newCards[cardIndex] = { ...newCards[cardIndex], title: e.target.value };
                                    setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                  }} 
                                />
                              </FormGroup>

                              <FormGroup>
                                <label>Tamanho (ex: 246 a 279 m²)</label>
                                <input 
                                  value={card.size} 
                                  onChange={e => {
                                    const newCards = [...premiumConfig.typologies.cards];
                                    newCards[cardIndex] = { ...newCards[cardIndex], size: e.target.value };
                                    setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                  }} 
                                />
                              </FormGroup>

                              <FormGroup>
                                <label>Descrição</label>
                                <textarea 
                                  value={card.description} 
                                  onChange={e => {
                                    const newCards = [...premiumConfig.typologies.cards];
                                    newCards[cardIndex] = { ...newCards[cardIndex], description: e.target.value };
                                    setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                  }} 
                                  style={{ height: '60px' }}
                                />
                              </FormGroup>

                              <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input 
                                  type="checkbox"
                                  checked={card.highlight} 
                                  onChange={e => {
                                    const newCards = [...premiumConfig.typologies.cards];
                                    newCards[cardIndex] = { ...newCards[cardIndex], highlight: e.target.checked };
                                    setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                  }} 
                                  style={{ width: 'auto' }}
                                />
                                <label style={{ margin: 0 }}>Destacar este card? (Fundo dourado)</label>
                              </FormGroup>

                              <h5 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>Imagem do Card</h5>
                              <div>
                                {card.image ? (
                                  <div style={{ position: 'relative', marginBottom: '16px' }}>
                                    <img src={card.image} alt="Tipologia" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <button onClick={() => {
                                      const newCards = [...premiumConfig.typologies.cards];
                                      newCards[cardIndex] = { ...newCards[cardIndex], image: '' };
                                      setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                    }} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                                  </div>
                                ) : (
                                  <UploadBox style={{ marginBottom: '16px' }}>
                                    <Upload size={24} />
                                    <span>Enviar imagem</span>
                                    <input type="file" accept="image/*" onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        try {
                                          const url = await uploadImagemApi(file);
                                          const newCards = [...premiumConfig.typologies.cards];
                                          newCards[cardIndex] = { ...newCards[cardIndex], image: url };
                                          setPremiumConfig({...premiumConfig, typologies: {...premiumConfig.typologies, cards: newCards}});
                                        } catch (err) {
                                          console.error(err);
                                          alert('Erro ao fazer upload da imagem');
                                        }
                                      }
                                    }} />
                                  </UploadBox>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <button 
                            onClick={() => {
                              setPremiumConfig({
                                ...premiumConfig, 
                                typologies: {
                                  ...premiumConfig.typologies, 
                                  cards: [
                                    ...premiumConfig.typologies.cards, 
                                    {
                                      title: 'Nova Tipologia',
                                      size: '0 m²',
                                      description: 'Descrição da tipologia.',
                                      image: '',
                                      features: ['Característica 1', 'Característica 2'],
                                      highlight: false
                                    }
                                  ]
                                }
                              });
                            }}
                            style={{ width: '100%', padding: '10px', background: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '6px', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                          >
                            + Adicionar Tipologia
                          </button>
                        </div>
                      )}
                    </div>

                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-lazer'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-lazer' ? null : 'premium-lazer')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-lazer' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Lazer & Bem-estar
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-lazer'}>
                    <FormGroup>
                      <label>Tag (ex: LAZER & BEM-ESTAR)</label>
                      <input 
                        value={premiumConfig.leisure.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, leisure: {...premiumConfig.leisure, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico)</label>
                      <textarea 
                        value={premiumConfig.leisure.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, leisure: {...premiumConfig.leisure, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Itens de Lazer (Máx: 8)</h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px' }}>
                      Selecione até 8 opções pré-definidas para compor os blocos da página.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '16px' }}>
                      {[
                        { icon: 'droplet', text: 'Piscina Coberta com Raia' },
                        { icon: 'waves', text: 'Piscina Externa' },
                        { icon: 'heart-pulse', text: 'Spa & Wellness Center' },
                        { icon: 'trophy', text: 'Quadra de Tênis Oficial' },
                        { icon: 'dumbbell', text: 'Academia de Alto Padrão' },
                        { icon: 'shield-check', text: 'Portaria Blindada 24h' },
                        { icon: 'lock', text: 'Hall Privativo por Unidade' },
                        { icon: 'cpu', text: 'Automação Inteligente' },
                        { icon: 'utensils', text: 'Espaço Gourmet' },
                        { icon: 'building2', text: 'Salão de Festas' },
                        { icon: 'shopping-bag', text: 'Mini Mercado' },
                        { icon: 'tree-pine', text: 'Praça Privativa' },
                      ].map((preset, idx) => {
                        const isSelected = premiumConfig.leisure.items.some((item: any) => item.text === preset.text);
                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              padding: '10px 12px', 
                              border: `1px solid ${isSelected ? '#0ea5e9' : '#e2e8f0'}`, 
                              borderRadius: '6px', 
                              background: isSelected ? '#f0f9ff' : '#fff',
                              opacity: !isSelected && premiumConfig.leisure.items.length >= 8 ? 0.5 : 1,
                              cursor: (!isSelected && premiumConfig.leisure.items.length >= 8) ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => {
                              let newItems = [...premiumConfig.leisure.items];
                              if (isSelected) {
                                newItems = newItems.filter(item => item.text !== preset.text);
                              } else {
                                if (newItems.length < 8) {
                                  newItems.push(preset);
                                } else {
                                  return; // Limite de 8 atingido
                                }
                              }
                              setPremiumConfig({...premiumConfig, leisure: {...premiumConfig.leisure, items: newItems}});
                            }}
                          >
                            <span style={{ fontSize: '0.85rem', color: isSelected ? '#0369a1' : '#475569', fontWeight: isSelected ? 600 : 400 }}>
                              {preset.text}
                            </span>
                            <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `1px solid ${isSelected ? '#0ea5e9' : '#cbd5e1'}`, background: isSelected ? '#0ea5e9' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {isSelected && <CheckCircle2 size={12} color="#fff" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div style={{ padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.8rem', color: '#475569', textAlign: 'center' }}>
                      <strong>{premiumConfig.leisure.items.length}</strong> de 8 itens selecionados
                    </div>
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-reasons'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-reasons' ? null : 'premium-reasons')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-reasons' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Por Que O Empreendimento
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-reasons'}>
                    <FormGroup>
                      <label>Tag (ex: POR QUE O SAINT CLAIRE)</label>
                      <input 
                        value={premiumConfig.reasons.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, reasons: {...premiumConfig.reasons, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico)</label>
                      <textarea 
                        value={premiumConfig.reasons.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, reasons: {...premiumConfig.reasons, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Razões (4 itens)</h4>
                    
                    {premiumConfig.reasons.items.map((item: any, index: number) => (
                      <div key={index} style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          onClick={() => setOpenSubSectionId(openSubSectionId === `reasons-item-${index}` ? null : `reasons-item-${index}`)}
                          style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Razão {index + 1}</span>
                          <ChevronDown size={16} style={{ transform: openSubSectionId === `reasons-item-${index}` ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                        </div>
                        {openSubSectionId === `reasons-item-${index}` && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <FormGroup>
                              <label>Título</label>
                              <input 
                                value={item.title} 
                                onChange={e => {
                                  const newItems = [...premiumConfig.reasons.items];
                                  newItems[index] = { ...newItems[index], title: e.target.value };
                                  setPremiumConfig({...premiumConfig, reasons: {...premiumConfig.reasons, items: newItems}});
                                }} 
                              />
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <label>Descrição</label>
                              <textarea 
                                value={item.description} 
                                onChange={e => {
                                  const newItems = [...premiumConfig.reasons.items];
                                  newItems[index] = { ...newItems[index], description: e.target.value };
                                  setPremiumConfig({...premiumConfig, reasons: {...premiumConfig.reasons, items: newItems}});
                                }} 
                                style={{ height: '80px' }}
                              />
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-banner'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-banner' ? null : 'premium-banner')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-banner' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Banner
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-banner'}>
                    <FormGroup>
                      <label>Tag</label>
                      <input 
                        value={premiumConfig.club.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, club: {...premiumConfig.club, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico)</label>
                      <textarea 
                        value={premiumConfig.club.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, club: {...premiumConfig.club, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Imagem de Fundo</h4>
                    <div>
                      {premiumConfig.club.image ? (
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                          <img src={premiumConfig.club.image} alt="Banner" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                          <button onClick={() => setPremiumConfig({...premiumConfig, club: {...premiumConfig.club, image: ''}})} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220,38,38,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                        </div>
                      ) : (
                        <UploadBox style={{ marginBottom: '16px' }}>
                          <Upload size={24} />
                          <span>Enviar imagem do banner</span>
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const url = await uploadImagemApi(file);
                                setPremiumConfig({...premiumConfig, club: {...premiumConfig.club, image: url}});
                              } catch (err) {
                                console.error(err);
                                alert('Erro ao fazer upload da imagem');
                              }
                            }
                          }} />
                        </UploadBox>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-location'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-location' ? null : 'premium-location')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-location' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Localização
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-location'}>
                    <FormGroup>
                      <label>Tag</label>
                      <input 
                        value={premiumConfig.location.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título (use &lt;em&gt; para itálico)</label>
                      <textarea 
                        value={premiumConfig.location.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>Link de Rota do Botão (Google Maps)</label>
                      <input 
                        value={premiumConfig.location.mapLink} 
                        onChange={e => setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, mapLink: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Código de Incorporação (iframe src)</label>
                      <textarea 
                        value={premiumConfig.location.mapEmbedUrl} 
                        onChange={e => setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, mapEmbedUrl: e.target.value}})} 
                        style={{ height: '80px' }}
                        placeholder="Cole aqui a URL que fica dentro do src do iframe do Google Maps"
                      />
                    </FormGroup>

                    <h4 style={{ fontSize: '0.9rem', color: '#1a202c', marginTop: '16px', marginBottom: '12px' }}>Pontos de Interesse</h4>
                    
                    {premiumConfig.location.pointsOfInterest.map((poi: any, index: number) => (
                      <div key={index} style={{ marginBottom: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          onClick={() => setOpenSubSectionId(openSubSectionId === `poi-item-${index}` ? null : `poi-item-${index}`)}
                          style={{ padding: '10px 12px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ponto {index + 1} ({poi.name})</span>
                          <ChevronDown size={16} style={{ transform: openSubSectionId === `poi-item-${index}` ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
                        </div>
                        {openSubSectionId === `poi-item-${index}` && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                            <FormGroup>
                              <label>Nome do Local</label>
                              <input 
                                value={poi.name} 
                                onChange={e => {
                                  const newPois = [...premiumConfig.location.pointsOfInterest];
                                  newPois[index] = { ...newPois[index], name: e.target.value };
                                  setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, pointsOfInterest: newPois}});
                                }} 
                              />
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <label>Tempo Estimado</label>
                              <input 
                                value={poi.time} 
                                onChange={e => {
                                  const newPois = [...premiumConfig.location.pointsOfInterest];
                                  newPois[index] = { ...newPois[index], time: e.target.value };
                                  setPremiumConfig({...premiumConfig, location: {...premiumConfig.location, pointsOfInterest: newPois}});
                                }} 
                              />
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionBlock>

                <AccordionBlock $isOpen={openSectionId === 'premium-analysis'} $visible={true}>
                  <AccordionHeader onClick={() => setOpenSectionId(openSectionId === 'premium-analysis' ? null : 'premium-analysis')}>
                    <div className="info">
                      <ChevronRight size={18} className="toggle-icon" style={{ transform: openSectionId === 'premium-analysis' ? 'rotate(90deg)' : 'rotate(0)' }} />
                      Análise de Mercado
                    </div>
                  </AccordionHeader>
                  <AccordionContent $isOpen={openSectionId === 'premium-analysis'}>
                    <FormGroup>
                      <label>Tag (ex: ANÁLISE DE MERCADO)</label>
                      <input 
                        value={premiumConfig.analysis.tag} 
                        onChange={e => setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, tag: e.target.value}})} 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Título Principal</label>
                      <textarea 
                        value={premiumConfig.analysis.title} 
                        onChange={e => setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, title: e.target.value}})} 
                        style={{ height: '60px' }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label>Subtítulo / Descrição</label>
                      <textarea 
                        value={premiumConfig.analysis.subtitle} 
                        onChange={e => setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, subtitle: e.target.value}})} 
                        style={{ height: '80px' }}
                      />
                    </FormGroup>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '0.9rem', color: '#1a202c', margin: 0 }}>Comparativos ({premiumConfig.analysis.rows.length}/4)</h4>
                      {premiumConfig.analysis.rows.length < 4 && (
                        <button 
                          onClick={() => {
                            const newRows = [...premiumConfig.analysis.rows, {
                              isHighlight: false, name: 'Novo Concorrente', description: '', brand: '', location: '', units: '', size: '', ticket: '', vgv: ''
                            }];
                            setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                          }}
                          style={{ background: 'transparent', border: 'none', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          + Adicionar
                        </button>
                      )}
                    </div>

                    {premiumConfig.analysis.rows.map((row: any, index: number) => (
                      <div key={index} style={{ marginBottom: '8px', border: `1px solid ${row.isHighlight ? '#d4af37' : '#e2e8f0'}`, borderRadius: '6px', overflow: 'hidden' }}>
                        <div 
                          style={{ padding: '10px 12px', background: row.isHighlight ? '#fffbeb' : '#f8fafc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
                        >
                          <div onClick={() => setOpenSubSectionId(openSubSectionId === `analysis-row-${index}` ? null : `analysis-row-${index}`)} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: row.isHighlight ? '#b48608' : '#1a202c' }}>
                              {row.isHighlight ? '⭐ ' : ''}{row.name || `Empreendimento ${index + 1}`}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {premiumConfig.analysis.rows.length > 1 && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newRows = premiumConfig.analysis.rows.filter((_: any, i: number) => i !== index);
                                  setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                }}
                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                title="Remover"
                              >
                                <X size={14} />
                              </button>
                            )}
                            <ChevronDown size={16} onClick={() => setOpenSubSectionId(openSubSectionId === `analysis-row-${index}` ? null : `analysis-row-${index}`)} style={{ transform: openSubSectionId === `analysis-row-${index}` ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s', color: '#64748b' }} />
                          </div>
                        </div>
                        
                        {openSubSectionId === `analysis-row-${index}` && (
                          <div style={{ padding: '12px', background: '#fff', borderTop: `1px solid ${row.isHighlight ? '#fde68a' : '#e2e8f0'}` }}>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: '#f8fafc', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                              <input 
                                type="checkbox" 
                                id={`highlight-${index}`}
                                checked={row.isHighlight}
                                onChange={e => {
                                  const newRows = [...premiumConfig.analysis.rows];
                                  newRows[index] = { ...newRows[index], isHighlight: e.target.checked };
                                  setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                }}
                              />
                              <label htmlFor={`highlight-${index}`} style={{ fontSize: '0.85rem', color: '#475569', margin: 0, fontWeight: 600, cursor: 'pointer' }}>
                                Destacar este empreendimento? (Fundo Dourado)
                              </label>
                            </div>

                            {row.isHighlight && (
                              <FormGroup>
                                <label>Tag de Destaque (ex: VOCÊ ESTÁ AQUI)</label>
                                <input 
                                  value={row.tag || ''} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], tag: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              <FormGroup>
                                <label>Nome</label>
                                <input 
                                  value={row.name} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], name: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                              <FormGroup>
                                <label>Descrição Adicional</label>
                                <input 
                                  value={row.description} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], description: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              <FormGroup>
                                <label>Marca</label>
                                <input 
                                  value={row.brand} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], brand: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                              <FormGroup>
                                <label>Localização</label>
                                <input 
                                  value={row.location} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], location: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              <FormGroup>
                                <label>Unidades</label>
                                <input 
                                  value={row.units} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], units: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                              <FormGroup>
                                <label>Metragem</label>
                                <input 
                                  value={row.size} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], size: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: 0 }}>
                              <FormGroup style={{ marginBottom: 0 }}>
                                <label>Ticket Médio</label>
                                <input 
                                  value={row.ticket} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], ticket: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                              <FormGroup style={{ marginBottom: 0 }}>
                                <label>VGV Estimado</label>
                                <input 
                                  value={row.vgv} 
                                  onChange={e => {
                                    const newRows = [...premiumConfig.analysis.rows];
                                    newRows[index] = { ...newRows[index], vgv: e.target.value };
                                    setPremiumConfig({...premiumConfig, analysis: {...premiumConfig.analysis, rows: newRows}});
                                  }} 
                                />
                              </FormGroup>
                            </div>

                          </div>
                        )}
                      </div>
                    ))}

                  </AccordionContent>
                </AccordionBlock>
              </>
            )}

            {activeTab === 'seo' && (
              <>
                <FormGroup>
                  <label>Meta Title</label>
                  <input 
                    value={conteudo.metaTitle} 
                    onChange={e => handleChange('metaTitle', e.target.value)} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>Meta Description</label>
                  <textarea 
                    value={conteudo.metaDescription} 
                    onChange={e => handleChange('metaDescription', e.target.value)} 
                  />
                </FormGroup>
              </>
            )}

            {activeTab === 'pixel' && (
              <>
                <p style={{ marginBottom: '20px', color: '#718096', fontSize: '0.95rem' }}>
                  Insira apenas o ID dos seus pixels de rastreamento. Os scripts serão gerados automaticamente.
                </p>
                <FormGroup>
                  <label>Facebook Pixel (ID)</label>
                  <input 
                    value={conteudo.facebookPixel || ''} 
                    onChange={e => handleChange('facebookPixel', e.target.value)} 
                    placeholder="Ex: 123456789012345"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>Google Analytics (Measurement ID)</label>
                  <input 
                    value={conteudo.googleAnalytics || ''} 
                    onChange={e => handleChange('googleAnalytics', e.target.value)} 
                    placeholder="Ex: G-XXXXXXXXXX"
                  />
                </FormGroup>
              </>
            )}
          </EditorContent>
        </SidebarEditor>

        {/* Live Preview Area */}
        <PreviewArea style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: '#fff', padding: '6px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <button 
              onClick={() => setPreviewMode('desktop')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: previewMode === 'desktop' ? '#111' : 'transparent', color: previewMode === 'desktop' ? '#fff' : '#666', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}
            >
              <Monitor size={16} /> Desktop
            </button>
            <button 
              onClick={() => setPreviewMode('mobile')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: previewMode === 'mobile' ? '#111' : 'transparent', color: previewMode === 'mobile' ? '#fff' : '#666', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}
            >
              <Smartphone size={16} /> Mobile
            </button>
          </div>

          <PreviewWrapper style={{ 
            maxWidth: previewMode === 'desktop' ? '1200px' : '375px', 
            transition: 'max-width 0.3s ease',
            height: previewMode === 'mobile' ? '812px' : 'auto',
            overflowX: 'hidden',
            overflowY: previewMode === 'mobile' ? 'auto' : 'hidden',
            border: previewMode === 'mobile' ? '12px solid #111' : 'none',
            borderRadius: previewMode === 'mobile' ? '32px' : '8px',
            position: 'relative'
          }}>
            {lancamento.templateId === 'premium' ? (
              <PremiumTemplate config={premiumConfig} />
            ) : (
              <Residencial 
                lancamento={{ ...lancamento, conteudoGerado: conteudo, briefing, lpConfig }} 
              />
            )}
          </PreviewWrapper>
        </PreviewArea>

      </EditorContainer>
    </>
  );
};

export default EditorLP;