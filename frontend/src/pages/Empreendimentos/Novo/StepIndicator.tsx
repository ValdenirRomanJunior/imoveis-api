import { DotLine, StepIndicatorWrap, StepsRow } from './styles';

interface Props {
  step: 1 | 2 | 3;
}

const StepIndicator = ({ step }: Props) => {
  return (
    <StepIndicatorWrap>
      <StepsRow>
        <p>Passo 1: Dados do empreendimento</p>
        <p>Passo 2: Escolha o modelo</p>
        <p>Passo 3: Preview e publicar</p>
      </StepsRow>
      <DotLine>
        <span className={`dot ${step >= 1 ? 'active' : ''}`} />
        <span className={`line ${step >= 2 ? 'active' : ''}`} />
        <span className={`dot ${step >= 2 ? 'active' : ''}`} />
        <span className={`line ${step >= 3 ? 'active' : ''}`} />
        <span className={`dot ${step >= 3 ? 'active' : ''}`} />
      </DotLine>
    </StepIndicatorWrap>
  );
};

export default StepIndicator;
