import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { Lancamento, createDefaultLancamentoObject } from '../storage';
import { fetchEmpreendimentoById, fetchPaginasByEmpreendimento, createPaginaApi } from '../api';
import { Badge, CardActions, CardGrid, EmptyState, HeaderRow, LancamentosPage, LaunchCard, PrimaryButton, SectionTitle } from '../styles';
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

  const handleCreatePage = async () => {
    if (empreendimento && id) {
      try {
        const defaultData = createDefaultLancamentoObject(id, empreendimento.nome);
        const novaPagina = await createPaginaApi(id, defaultData);
        navigate(`/empreendimentos/${id}/pagina/${novaPagina.id}/editar`);
      } catch (err) {
        alert('Erro ao criar página');
        console.error(err);
      }
    }
  };

  return (
    <>
      <Header />
      <LancamentosPage>
        {loading ? (
          <p>Carregando...</p>
        ) : !empreendimento ? (
          <LaunchCard>
            <h3>Empreendimento não encontrado</h3>
            <Link to="/empreendimentos">Voltar</Link>
          </LaunchCard>
        ) : (
          <>
            <HeaderRow>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <Link to="/empreendimentos" style={{textDecoration: 'none', color: '#666'}}>← Voltar</Link>
                <h1>{empreendimento.nome}</h1>
              </div>
              <PrimaryButton onClick={handleCreatePage}>+ Criar Página</PrimaryButton>
            </HeaderRow>

            <SectionTitle>Páginas ({paginas.length})</SectionTitle>

            <CardGrid>
              {paginas.map((item) => (
                <LaunchCard key={item.id}>
                  <h3>📄 {item.nome}</h3>
                  <Badge $status={item.status}>{statusLabel[item.status]}</Badge>
                  <p className="leads">{item.leads || 0} leads</p>

                  <CardActions>
                    {item.status === 'PUBLICADA' && (
                       <a href={`/${item.tenantSlug}/lp/${item.slug}`} target="_blank" rel="noopener noreferrer">Ver Online</a>
                    )}
                    <button onClick={() => navigate(`/empreendimentos/${id}/pagina/${item.id}/editar`)}>Editar</button>
                  </CardActions>
                </LaunchCard>
              ))}
            </CardGrid>

            {paginas.length === 0 && (
              <EmptyState onClick={handleCreatePage}>
                ✨ Nenhuma página criada para este empreendimento — clique aqui
              </EmptyState>
            )}
          </>
        )}
      </LancamentosPage>
    </>
  );
};

export default EmpreendimentoDetalhe;
