import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';
import Header from '../../../components/Header';
import { Lancamento, createDefaultLancamentoObject } from '../storage';
import { fetchEmpreendimentoById, fetchPaginasByEmpreendimento, createPaginaApi } from '../api';
import { useState, useEffect } from 'react';

const statusLabel: Record<Lancamento['status'], string> = {
  PUBLICADA: 'Publicada',
  RASCUNHO: 'Rascunho',
  GERANDO: 'Gerando...',
};

const EmpreendimentoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [empreendimento, setEmpreendimento] = useState<any>(null);
  const [paginas, setPaginas] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal de Criação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [newPageTemplate, setNewPageTemplate] = useState('residencial');
  const [newPageName, setNewPageName] = useState('');
  const [newPageFase, setNewPageFase] = useState('Lançamento');
  const [newPagePadrao, setNewPagePadrao] = useState('Médio Padrão');

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const empData = await fetchEmpreendimentoById(id);
      setEmpreendimento(empData);
      const pgsData = await fetchPaginasByEmpreendimento(id);
      setPaginas(pgsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCreatePageClick = () => {
    setModalStep(1);
    setNewPageTemplate('residencial');
    setNewPageName(`${empreendimento?.nome || ''} — Pré-lançamento`);
    setNewPageFase('Pré-lançamento');
    setNewPagePadrao('Médio Padrão');
    setIsModalOpen(true);
  };

  const handleFaseChange = (fase: string) => {
    setNewPageFase(fase);
    setNewPageName(`${empreendimento?.nome || ''} — ${fase}`);
  };

  const handleConfirmCreatePage = async () => {
    if (empreendimento && id) {
      try {
        const defaultData = createDefaultLancamentoObject(id, empreendimento.nome, newPageTemplate as 'residencial' | 'mcmv' | 'premium');
        defaultData.nome = newPageName;
        if (defaultData.briefing) {
          defaultData.briefing.fase = newPageFase;
          defaultData.briefing.segmento = newPagePadrao;
        }
        
        const novaPagina = await createPaginaApi(id, defaultData);
        setIsModalOpen(false);
        navigate(`/empreendimentos/${id}/pagina/${novaPagina.id}/editar`);
      } catch (err) {
        alert('Erro ao criar página');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '"Inter", sans-serif', flex: 1 }}>
        {loading ? (
          <p style={{ color: '#666' }}>Carregando...</p>
        ) : !empreendimento ? (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eaeaea', textAlign: 'center' }}>
            <h3 style={{ color: '#111' }}>Empreendimento não encontrado</h3>
            <Link to="/empreendimentos" style={{ color: '#000', textDecoration: 'underline' }}>Voltar</Link>
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <Link to="/empreendimentos" style={{ textDecoration: 'none', color: '#666', fontSize: '14px', zIndex: 1 }}>← Voltar</Link>
              <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '16px', fontWeight: 500, color: '#111', margin: 0, fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{empreendimento.nome}</h1>
              <button 
                onClick={handleCreatePageClick}
                style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, zIndex: 1 }}
              >
                + Criar Página
              </button>
            </div>

            {/* Cards de Métricas Gerais do Empreendimento */}
            {(() => {
              const totalLeads = paginas.reduce((acc, p) => acc + (p.leads || 0), 0);
              const criadaEm = empreendimento.createdAt ? new Date(empreendimento.createdAt).toLocaleDateString('pt-BR') : 'N/D';
              const paginasAtivas = paginas.filter(p => p.status === 'PUBLICADA').length;

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Total de Leads</span>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e' }}>{totalLeads}</span>
                  </div>
                  <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Campanha criada em</span>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginTop: 'auto' }}>{criadaEm}</span>
                  </div>
                  <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Páginas Ativas</span>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#3b82f6' }}>{paginasAtivas}</span>
                  </div>
                </div>
              );
            })()}

            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>
              Páginas ({paginas.length})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))', gap: '20px' }}>
              {paginas.map((item) => {
                const heroImage = item.briefing?.heroBg || (item.briefing?.fotos && item.briefing.fotos[0]) || 'https://via.placeholder.com/400x200/113bb5/ffffff?text=Empreendimento';
                const leads = item.leads || 0;
                const padrao = item.briefing?.segmento || 'N/D';
                const criadaEm = item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : 'N/D';
                
                return (
                <div key={item.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  
                  {/* Topo com Imagem e Título sobreposto */}
                  <div style={{ 
                    position: 'relative',
                    width: '100%', 
                    height: '140px', 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '12px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ 
                        padding: '3px 10px', 
                        borderRadius: '999px', 
                        fontSize: '11px', 
                        fontWeight: 600,
                        background: item.status === 'PUBLICADA' ? 'rgba(21, 128, 61, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                        color: item.status === 'PUBLICADA' ? '#4ade80' : '#fff',
                        border: `1px solid ${item.status === 'PUBLICADA' ? '#22c55e' : 'rgba(255,255,255,0.4)'}`,
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.status === 'PUBLICADA' ? '#4ade80' : '#fff' }} />
                        {item.status === 'PUBLICADA' ? 'No ar' : 'Rascunho'}
                      </span>
                    </div>
                    
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 2px 0', color: '#fff' }}>{item.nome}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '12px' }}>{item.tenantSlug || 'imobiliaria'}.standi.com.br/lp/{item.slug}</p>
                        <button 
                          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(`https://${item.tenantSlug || 'imobiliaria'}.standi.com.br/lp/${item.slug}`); alert('Link copiado!'); }}
                          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'background 0.2s' }}
                          title="Copiar link"
                        >
                          <span style={{ fontSize: '10px', color: '#fff' }}>🔗 Copiar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div style={{ padding: '16px' }}>
                    
                    {/* 3 Métricas */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>{padrao}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Padrão</div>
                      </div>
                      <div style={{ flex: 1, borderLeft: '1px solid #eaeaea', borderRight: '1px solid #eaeaea' }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#22c55e' }}>{leads}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Leads</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>{criadaEm}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Criada em</div>
                      </div>
                    </div>

                    <div style={{ height: '1px', background: '#eaeaea', marginBottom: '12px' }} />

                    {/* Fases e Qualificação */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#444' }}>Fase do lançamento</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ display: 'flex', gap: '3px' }}>
                            <div style={{ width: '10px', height: '3px', borderRadius: '1.5px', background: '#eab308' }} />
                            <div style={{ width: '10px', height: '3px', borderRadius: '1.5px', background: '#3b82f6' }} />
                            <div style={{ width: '10px', height: '3px', borderRadius: '1.5px', background: '#cbd5e1' }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>Lançamento</span>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', color: '#444', lineHeight: 1.2 }}>Leads<br/>qualificados</span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{Math.floor(leads * 0.35)}/{leads}</span>
                        </div>
                        <div style={{ width: '100%', height: '5px', background: '#f1f5f9', borderRadius: '2.5px', overflow: 'hidden' }}>
                          <div style={{ width: '35%', height: '100%', background: '#22c55e', borderRadius: '2.5px' }} />
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                        Último lead há 14 min · Origem: Instagram
                      </div>
                    </div>

                    <div style={{ height: '1px', background: '#eaeaea', marginBottom: '16px' }} />

                    {/* Botões de Ação */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button 
                        onClick={() => window.open(`/${item.tenantSlug || 'imobiliaria'}/lp/${item.slug}`, '_blank')}
                        style={{ width: '100%', background: '#fff', border: '1px solid #eaeaea', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#111', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                      >
                        <FiEye /> Visualizar
                      </button>
                      <button 
                        onClick={() => navigate(`/empreendimentos/${id}/pagina/${item.id}/editar`)}
                        style={{ width: '100%', background: '#111', border: '1px solid #111', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#fff', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        ✏️ Editar
                      </button>
                    </div>

                  </div>
                </div>
                );
              })}
            </div>

            {paginas.length === 0 && (
              <div 
                onClick={handleCreatePageClick}
                style={{ background: '#fff', border: '1px dashed #eaeaea', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', marginTop: '24px', color: '#666' }}
              >
                ✨ Nenhuma página criada para este empreendimento — clique aqui para criar a primeira
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de Criação de Página */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '540px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: '"Inter", sans-serif' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#65a30d', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#65a30d' }} />
              Módulo de Lançamento
            </div>
            
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', margin: '0 0 6px 0' }}>
              {modalStep === 1 ? 'Escolha o template' : 'Criar página para este empreendimento'}
            </h2>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              {modalStep === 1 
                ? 'Selecione o estilo visual que melhor se adapta ao seu empreendimento.' 
                : 'Escolha a fase do lançamento. Cada fase tem estrutura, copy e conversão otimizados para o momento certo.'}
            </p>

            {modalStep === 1 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                  <div 
                    onClick={() => setNewPageTemplate('residencial')}
                    style={{ 
                      border: newPageTemplate === 'residencial' ? '2px solid #65a30d' : '1px solid #eaeaea',
                      backgroundColor: newPageTemplate === 'residencial' ? '#f7fee7' : '#fff',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ width: '100%', height: '120px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', color: newPageTemplate === 'residencial' ? '#3f6212' : '#111' }}>Residencial Padrão</h3>
                    <p style={{ fontSize: '11px', color: newPageTemplate === 'residencial' ? '#4d7c0f' : '#666', margin: 0, lineHeight: 1.4 }}>Ideal para empreendimentos MCMV e médio padrão. Foco em conversão rápida e clareza.</p>
                  </div>

                  <div 
                    onClick={() => setNewPageTemplate('premium')}
                    style={{ 
                      border: newPageTemplate === 'premium' ? '2px solid #65a30d' : '1px solid #eaeaea',
                      backgroundColor: newPageTemplate === 'premium' ? '#f7fee7' : '#fff',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ width: '100%', height: '120px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '12px', backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px 0', color: newPageTemplate === 'premium' ? '#3f6212' : '#111' }}>Premium</h3>
                    <p style={{ fontSize: '11px', color: newPageTemplate === 'premium' ? '#4d7c0f' : '#666', margin: 0, lineHeight: 1.4 }}>Design sofisticado, ideal para alto padrão. Valoriza as imagens e o conceito do projeto.</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff', color: '#111', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => setModalStep(2)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#111', color: '#fff', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}
                  >
                    Continuar →
                  </button>
                </div>
              </>
            ) : (
              <>
            {/* Fases */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Pré-lançamento', 'Lançamento', 'Pós-lançamento'].map(fase => {
                  const isSelected = newPageFase === fase;
                  const desc = fase === 'Pré-lançamento' ? 'Capte interesse antes de abrir' : fase === 'Lançamento' ? 'LP completa para conversão ativa' : 'Feche as unidades restantes';
                  
                  let Icon = FiEye;
                  if (fase === 'Lançamento') Icon = IoRocketOutline;
                  if (fase === 'Pós-lançamento') Icon = MdOutlineTimer;

                  return (
                    <div 
                      key={fase}
                      onClick={() => handleFaseChange(fase)}
                      style={{ 
                        border: isSelected ? '1px solid #65a30d' : '1px solid #e5e7eb',
                        backgroundColor: isSelected ? '#f7fee7' : '#fff',
                        borderRadius: '8px',
                        padding: '12px 8px',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        right: '8px', 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        border: isSelected ? '3.5px solid #65a30d' : '1px solid #ccc',
                        backgroundColor: '#fff'
                      }} />
                      <div style={{ fontSize: '18px', marginBottom: '4px', opacity: isSelected ? 1 : 0.4, color: isSelected ? '#3f6212' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon />
                      </div>
                      <div style={{ fontWeight: 500, color: isSelected ? '#3f6212' : '#111', fontSize: '12px', marginBottom: '2px' }}>{fase}</div>
                      <div style={{ fontSize: '10px', color: isSelected ? '#4d7c0f' : '#9ca3af', lineHeight: 1.2 }}>{desc}</div>
                    </div>
                  )
                })}
              </div>

              {/* Info Box */}
              <div style={{ marginTop: '10px', backgroundColor: '#f7fee7', border: '1px solid #d9f99d', borderRadius: '6px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ color: '#65a30d', fontSize: '14px', display: 'flex', alignItems: 'center', marginTop: '1px' }}>
                  {newPageFase === 'Pré-lançamento' && <FiEye />}
                  {newPageFase === 'Lançamento' && <IoRocketOutline />}
                  {newPageFase === 'Pós-lançamento' && <MdOutlineTimer />}
                </div>
                <p style={{ margin: 0, fontSize: '11px', color: '#3f6212', lineHeight: 1.4 }}>
                  {newPageFase === 'Pré-lançamento' && <>Página de captação de interesse com teaser do empreendimento. Leads entram no CRM com tag <strong>Pré-lançamento</strong> e recebem WhatsApp de boas-vindas com prioridade de acesso.</>}
                  {newPageFase === 'Lançamento' && <>Página completa com galeria, plantas e formulário otimizado. Leads entram no CRM com tag <strong>Lançamento</strong> e recebem fluxo de vendas ativo.</>}
                  {newPageFase === 'Pós-lançamento' && <>Página focada em escassez e últimas unidades. Leads entram no CRM com tag <strong>Estoque</strong> para fechamento rápido.</>}
                </p>
              </div>
            </div>

            {/* Nome da Página */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#111', marginBottom: '4px' }}>
                Nome da página
              </label>
              <input 
                type="text" 
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', color: '#111', outline: 'none' }}
              />
            </div>

            {/* Padrão */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#111', marginBottom: '6px' }}>
                Padrão do empreendimento
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Popular', 'Médio', 'Alto Padrão'].map(padrao => {
                  const mappedValue = padrao === 'Popular' ? 'Econômico / MCMV' : padrao === 'Médio' ? 'Médio Padrão' : 'Alto Padrão';
                  const isSelected = newPagePadrao === mappedValue;
                  const desc = padrao === 'Popular' ? 'Até R$350k' : padrao === 'Médio' ? 'R$350k–800k' : 'Acima R$800k';
                  return (
                    <div 
                      key={padrao}
                      onClick={() => setNewPagePadrao(mappedValue)}
                      style={{ 
                        border: isSelected ? '1px solid #65a30d' : '1px solid #e5e7eb',
                        backgroundColor: isSelected ? '#f7fee7' : '#fff',
                        borderRadius: '6px',
                        padding: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 500, color: isSelected ? '#3f6212' : '#111', fontSize: '12px', marginBottom: '2px' }}>{padrao}</div>
                      <div style={{ fontSize: '10px', color: isSelected ? '#65a30d' : '#9ca3af' }}>{desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px' }}>✓</span> WhatsApp e CRM configurados automaticamente
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => alert('Visualização do modelo indisponível no momento.')}
                  style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontWeight: 500, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FiEye /> Visualizar página
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff', color: '#111', cursor: 'pointer', fontWeight: 500, fontSize: '12px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmCreatePage}
                  disabled={!newPageName.trim()}
                  style={{ 
                    padding: '6px 16px', 
                    borderRadius: '6px', 
                    border: newPageName.trim() ? '1px solid #d1d5db' : '1px solid transparent', 
                    background: newPageName.trim() ? '#fff' : '#f3f4f6', 
                    color: newPageName.trim() ? '#111' : '#9ca3af', 
                    cursor: newPageName.trim() ? 'pointer' : 'not-allowed', 
                    fontWeight: 500, 
                    fontSize: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    boxShadow: newPageName.trim() ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { if(newPageName.trim()) e.currentTarget.style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { if(newPageName.trim()) e.currentTarget.style.backgroundColor = '#fff' }}
                >
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '1.5px solid currentColor', borderRadius: '2px', opacity: 0.8 }}></span>
                  Criar Página
                </button>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpreendimentoDetalhe;
