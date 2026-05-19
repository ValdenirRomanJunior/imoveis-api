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
  PreviewWrapper 
} from './styles';
import { Lancamento, ConteudoGerado, DEFAULT_LP_SECTIONS, LpSection, LpConfig } from '../storage';
import { fetchPaginaById, updatePaginaApi, uploadImagemApi } from '../api';
import Residencial from '../../../templates/lp/Residencial';
import { Eye, EyeOff, GripVertical, ChevronUp, ChevronDown, ChevronRight, Upload } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'conteudo' | 'seo' | 'pixel'>('conteudo');
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        const updated = { ...lancamento, conteudoGerado: conteudo, briefing, lpConfig };
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
      <Header />
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
            {activeTab === 'conteudo' && (
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

                      {['tipologias'].includes(section.id) && (
                        <p style={{ fontSize: '0.9rem', color: '#718096', margin: 0 }}>
                          Os dados deste bloco são alimentados diretamente pelo Briefing do Imóvel.
                        </p>
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
        <PreviewArea>
          <PreviewWrapper>
             <Residencial 
               lancamento={{ ...lancamento, conteudoGerado: conteudo, briefing, lpConfig }} 
             />
          </PreviewWrapper>
        </PreviewArea>

      </EditorContainer>
    </>
  );
};

export default EditorLP;