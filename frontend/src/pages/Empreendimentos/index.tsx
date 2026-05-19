import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import {
  Badge,
  CardActions,
  CardGrid,
  EmptyState,
  HeaderRow,
  LancamentosPage,
  LaunchCard,
  PrimaryButton,
  SectionTitle,
} from './styles';
import { Empreendimento, toSlug } from './storage';
import { fetchEmpreendimentos, createEmpreendimentoApi } from './api';
import { useState, useEffect } from 'react';

const Empreendimentos = () => {
  const navigate = useNavigate();
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchEmpreendimentos();
      setEmpreendimentos(data);
    } catch (err) {
      console.error('Erro ao buscar empreendimentos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    const name = window.prompt('Nome do novo empreendimento:');
    if (name && name.trim()) {
      try {
        const slug = toSlug(name.trim());
        const novo = await createEmpreendimentoApi(name.trim(), slug);
        navigate(`/empreendimentos/${novo.id}`);
      } catch (err) {
        alert('Erro ao criar empreendimento. Tente novamente.');
        console.error(err);
      }
    }
  };

  return (
    <>
      <Header />
      <LancamentosPage>
        <HeaderRow>
          <h1>Empreendimentos</h1>
          <PrimaryButton onClick={handleCreate}>+ Criar Empreendimento</PrimaryButton>
        </HeaderRow>

        <SectionTitle>Seus empreendimentos ({empreendimentos.length})</SectionTitle>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <CardGrid>
              {empreendimentos.map((item) => (
                <LaunchCard key={item.id} onClick={() => navigate(`/empreendimentos/${item.id}`)} style={{ cursor: 'pointer' }}>
                  <h3>🏢 {item.nome}</h3>
                  <p className="leads">Criado em: {new Date(item.createdAt).toLocaleDateString()}</p>

                  <CardActions>
                    <Link to={`/empreendimentos/${item.id}`} onClick={(e) => e.stopPropagation()}>Ver Detalhes</Link>
                  </CardActions>
                </LaunchCard>
              ))}
            </CardGrid>

            {empreendimentos.length === 0 && (
              <EmptyState onClick={handleCreate}>
                ✨ Criar primeiro empreendimento — clique aqui
              </EmptyState>
            )}
          </>
        )}
      </LancamentosPage>
    </>
  );
};

export default Empreendimentos;
