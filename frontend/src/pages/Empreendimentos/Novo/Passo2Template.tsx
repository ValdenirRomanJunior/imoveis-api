import { useState } from 'react';
import { ActionsRow, PrimaryButton, SecondaryButton, TemplateCard, TemplateGrid } from './styles';

interface Props {
  templateId: 'residencial' | 'mcmv' | '';
  onSelect: (templateId: 'residencial' | 'mcmv') => void;
  onBack: () => void;
  onGenerate: () => void;
}

const Passo2Template = ({ templateId, onSelect, onBack, onGenerate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!templateId) {
      alert('Selecione um template para continuar.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onGenerate();
    }, 1800);
  };

  return (
    <>
      <TemplateGrid>
        <TemplateCard $selected={templateId === 'residencial'} onClick={() => onSelect('residencial')}>
          <div className="preview" />
          <h3>Residencial</h3>
          <p>Medio e Alto Padrao</p>
          <p>○ Selecionar</p>
        </TemplateCard>

        <TemplateCard $selected={templateId === 'mcmv'} onClick={() => onSelect('mcmv')}>
          <div className="preview" />
          <h3>MCMV</h3>
          <p>Casa Verde Amarela</p>
          <p>○ Selecionar</p>
        </TemplateCard>

        <TemplateCard type="button" $disabled>
          <div className="preview" />
          <h3>🔒 Em breve</h3>
          <p>Alto Padrao</p>
          <p>Luxo e Premium</p>
        </TemplateCard>
      </TemplateGrid>

      <ActionsRow>
        <SecondaryButton type="button" onClick={onBack}>
          ← Voltar
        </SecondaryButton>
        <PrimaryButton type="button" onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? 'Gerando sua LP... isso leva alguns segundos' : 'Gerar LP com IA ✨'}
        </PrimaryButton>
      </ActionsRow>
    </>
  );
};

export default Passo2Template;
