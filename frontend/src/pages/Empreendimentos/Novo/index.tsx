import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import { ContentCard, NovoPage } from './styles';
import StepIndicator from './StepIndicator';
import Passo1Briefing from './Passo1Briefing';
import Passo2Template from './Passo2Template';
import Passo3Preview from './Passo3Preview';
import { BriefingData } from '../storage';

const emptyBriefing: BriefingData = {
  nomeEmpreendimento: '',
  cidade: '',
  bairro: '',
  enderecoCompleto: '',
  segmento: '',
  fase: '',
  prazoEntrega: '',
  formasPagamento: '',
  tipologias: [],
  diferenciais: [],
  whatsappResponsavel: '',
  fotos: [],
};

const NovoLancamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: empreendimentoId } = useParams<{ id: string }>();
  const [briefing, setBriefing] = useState<BriefingData>(emptyBriefing);
  const [templateId, setTemplateId] = useState<'residencial' | 'mcmv' | ''>('');

  const step = useMemo<1 | 2 | 3>(() => {
    if (location.pathname.endsWith('/template')) return 2;
    if (location.pathname.endsWith('/preview')) return 3;
    return 1;
  }, [location.pathname]);

  if (!empreendimentoId) {
    return <div>Empreendimento não encontrado.</div>;
  }

  return (
    <>
      <Header />
      <NovoPage>
        <StepIndicator step={step} />
        <ContentCard>
          {step === 1 && (
            <Passo1Briefing
              briefing={briefing}
              onChange={setBriefing}
              onNext={() => navigate(`/empreendimentos/${empreendimentoId}/nova-pagina/template`)}
            />
          )}

          {step === 2 && (
            <Passo2Template
              templateId={templateId}
              onSelect={setTemplateId}
              onBack={() => navigate(`/empreendimentos/${empreendimentoId}/nova-pagina/briefing`)}
              onGenerate={() => navigate(`/empreendimentos/${empreendimentoId}/nova-pagina/preview`)}
            />
          )}

          {step === 3 && (
            <Passo3Preview
              empreendimentoId={empreendimentoId}
              briefing={briefing}
              templateId={templateId}
              onBack={() => navigate(`/empreendimentos/${empreendimentoId}/nova-pagina/template`)}
            />
          )}
        </ContentCard>
      </NovoPage>
    </>
  );
};

export default NovoLancamento;
