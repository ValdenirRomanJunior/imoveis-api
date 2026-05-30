import { Link, useNavigate, useParams } from 'react-router-dom';
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
    setNewPageName(`Página ${empreendimento?.nome || ''}`);
    setNewPageFase('Lançamento');
    setNewPagePadrao('Médio Padrão');
    setIsModalOpen(true);
  };

  const handleConfirmCreatePage = async () => {
    if (empreendimento && id) {
      try {
        const defaultData = createDefaultLancamentoObject(id, empreendimento.nome);
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
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '12px' }}>standi.com.br/p/{item.slug}</p>
                        <button 
                          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(`https://standi.com.br/p/${item.slug}`); alert('Link copiado!'); }}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button 
                        onClick={() => navigate(`/empreendimentos/${id}/pagina/${item.id}/editar`)}
                        style={{ width: '100%', background: '#fff', border: '1px solid #eaeaea', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#111', transition: 'all 0.2s' }}
                      >
                        ✏️ Editar página
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
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600, color: '#111' }}>Criar Nova Página</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#444', marginBottom: '8px' }}>Nome da Página</label>
              <input 
                type="text" 
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="Ex: Campanha de Lançamento"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#444', marginBottom: '8px' }}>Fase do Empreendimento</label>
              <select 
                value={newPageFase}
                onChange={(e) => setNewPageFase(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff', outline: 'none' }}
              >
                <option value="Breve Lançamento">Pré-Lançamento (Breve Lançamento)</option>
                <option value="Lançamento">Lançamento</option>
                <option value="Em Obras">Em Obras</option>
                <option value="Pronto para Morar">Pronto para Morar</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#444', marginBottom: '8px' }}>Padrão (Segmento)</label>
              <select 
                value={newPagePadrao}
                onChange={(e) => setNewPagePadrao(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff', outline: 'none' }}
              >
                <option value="Econômico / MCMV">Econômico / MCMV</option>
                <option value="Médio Padrão">Médio Padrão</option>
                <option value="Alto Padrão">Alto Padrão</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #eaeaea', background: '#fff', color: '#666', cursor: 'pointer', fontWeight: 500 }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmCreatePage}
                disabled={!newPageName.trim()}
                style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: newPageName.trim() ? '#000' : '#ccc', color: '#fff', cursor: newPageName.trim() ? 'pointer' : 'not-allowed', fontWeight: 500 }}
              >
                Criar Página
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpreendimentoDetalhe;
