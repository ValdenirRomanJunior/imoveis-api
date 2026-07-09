import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Residencial from '../../templates/lp/Residencial';
import PremiumTemplate from '../../templates/lp/Premium';
import { fetchPaginaBySlug } from '../Empreendimentos/api';
import { Lancamento } from '../Empreendimentos/storage';

const LancamentoPublico = () => {
  const { lancamentoSlug } = useParams<{ tenantSlug: string; lancamentoSlug: string }>();
  const [lancamento, setLancamento] = useState<Lancamento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!lancamentoSlug) return;
      try {
        const data = await fetchPaginaBySlug(lancamentoSlug);
        setLancamento(data);
      } catch (err) {
        console.error('Landing Page não encontrada', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [lancamentoSlug]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!lancamento) {
    return <div>Lancamento nao encontrado.</div>;
  }

  if (lancamento.templateId === 'premium') {
    return <PremiumTemplate config={lancamento.premiumConfig} />;
  }

  return <Residencial lancamento={lancamento} />;
};

export default LancamentoPublico;
