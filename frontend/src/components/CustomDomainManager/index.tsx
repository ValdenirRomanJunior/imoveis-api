import React, { useState } from 'react';
import { CustomDomainContainer, DomainInput, DomainButton, DomainInfo, InstructionsBox } from './styles';
import useAuth from '../../hooks/useAuth';

interface CustomDomainManagerProps {
  accountId: string;
}

const CustomDomainManager: React.FC<CustomDomainManagerProps> = ({ accountId }) => {
  const [customDomain, setCustomDomain] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSaveDomain = () => {
    if (!customDomain.trim()) {
      setError('Por favor, insira um domínio válido');
      return;
    }

    setError('');
    setMessage('Domínio salvo! Configure o DNS conforme as instruções abaixo.');
  };

  return (
    <CustomDomainContainer>
      <h3>Domínio Personalizado</h3>
      
      <DomainInfo>
        <p><strong>Subdomínio padrão:</strong> {user?.slug}.app.standi.com.br</p>
      </DomainInfo>

      <div className="domain-input-section">
        <DomainInput
          type="text"
          placeholder="exemplo: www.minhaImobiliaria.com.br"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
        />
        <DomainButton onClick={handleSaveDomain}>
          Salvar Domínio
        </DomainButton>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {customDomain && (
        <InstructionsBox>
          <h4>Instruções para configurar seu domínio:</h4>
          <ol>
            <li>Acesse o painel de controle do seu provedor de DNS</li>
            <li>Crie um registro CNAME com as seguintes informações:</li>
            <ul>
              <li><strong>Nome/Host:</strong> www</li>
              <li><strong>Valor/Destino:</strong> {user?.slug}.app.standi.com.br</li>
            </ul>
            <li>Aguarde a propagação do DNS (pode levar até 24 horas)</li>
            <li>Após a propagação, seu site estará disponível em {customDomain}</li>
          </ol>
        </InstructionsBox>
      )}
    </CustomDomainContainer>
  );
};

export default CustomDomainManager;