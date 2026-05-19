import { Link } from 'react-router-dom';
import { ActionsRow, PreviewBox, PrimaryButton, SecondaryButton, SuccessBox } from './styles';
import { BriefingData, createLancamentoFromBriefing, toSlug, upsertLancamento } from '../storage';
import { useState } from 'react';

interface Props {
  empreendimentoId: string;
  briefing: BriefingData;
  templateId: 'residencial' | 'mcmv' | '';
  onBack: () => void;
}

const Passo3Preview = ({ empreendimentoId, briefing, templateId, onBack }: Props) => {
  const [publishedUrl, setPublishedUrl] = useState('');

  const empreendimentoNome = briefing.nomeEmpreendimento || 'Novo lancamento';
  const slug = toSlug(empreendimentoNome);
  const previewUrl = `imobiliaria.standi.com.br/lp/${slug}`;

  const publish = () => {
    if (!templateId) {
      alert('Template nao selecionado.');
      return;
    }

    const lancamento = createLancamentoFromBriefing(empreendimentoId, briefing, templateId);
    lancamento.status = 'PUBLICADA';
    upsertLancamento(lancamento);
    setPublishedUrl(`https://${lancamento.tenantSlug}.standi.com.br/lp/${lancamento.slug}`);
  };

  return (
    <>
      <h2>Preview da LP — {empreendimentoNome}</h2>
      <p>URL: {previewUrl}</p>

      <PreviewBox>
        <h3>{empreendimentoNome}</h3>
        <p>{briefing.cidade} - {briefing.bairro}</p>
        <p style={{ marginTop: '12px' }}>
          Esta area representa o preview da LP gerada. No MVP, a publicacao cria a LP publica para a rota `/lp/{slug}`.
        </p>
      </PreviewBox>

      <ActionsRow>
        <SecondaryButton type="button" onClick={onBack}>
          ← Voltar
        </SecondaryButton>
        <PrimaryButton type="button" onClick={publish}>
          ✅ Publicar lancamento
        </PrimaryButton>
      </ActionsRow>

      {publishedUrl && (
        <SuccessBox>
          <strong>Lancamento publicado com sucesso!</strong>
          <p>URL publica: {publishedUrl}</p>
          <div className="buttons">
            <button type="button" onClick={() => navigator.clipboard.writeText(publishedUrl)}>
              Copiar URL
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(publishedUrl)}`} target="_blank" rel="noreferrer">
              Compartilhar no WhatsApp
            </a>
            <Link to="/leads">Ver leads no CRM</Link>
            <Link to={`/empreendimentos/${empreendimentoId}`}>Voltar para Empreendimento</Link>
          </div>
        </SuccessBox>
      )}
    </>
  );
};

export default Passo3Preview;
