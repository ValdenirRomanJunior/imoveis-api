import React, { useState, useEffect } from 'react';
import { CustomDomainContainer, DomainInput, DomainButton, DomainInfo, InstructionsBox } from './styles';
import api from '../../utils/requests';
import useAuth from '../../hooks/useAuth';

interface CustomDomainManagerProps {
  accountId: string;
}

const CustomDomainManager: React.FC<CustomDomainManagerProps> = ({ accountId }) => {
  const [customDomain, setCustomDomain] = useState('');
  const [currentDomain, setCurrentDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadCurrentDomain();
  }, [accountId]);

  const loadCurrentDomain = async () => {
    try {
      const response = await api.get(`/api/accounts/custom-domain/${accountId}`);
      setCurrentDomain(response.data.customDomain || '');
    } catch (error) {
      console.error('Error loading custom domain:', error);
    }
  };

  const handleSaveDomain = async () => {
    if (!customDomain.trim()) {
      setError('Por favor, insira um domínio válido');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post(`/api/accounts/custom-domain/${accountId}`, {
        customDomain: customDomain.trim()
      });
      
      setCurrentDomain(customDomain.trim());
      setCustomDomain('');
      setMessage('Domínio personalizado configurado com sucesso!');
    } catch (error) {
      setError('Erro ao configurar domínio personalizado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDomain = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.delete(`/api/accounts/custom-domain/${accountId}`);
      setCurrentDomain('');
      setMessage('Domínio personalizado removido com sucesso!');
    } catch (error) {
      setError('Erro ao remover domínio personalizado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDomainContainer>
      <h3>Domínio Personalizado</h3>
      
      <DomainInfo>
        <p><strong>Subdomínio padrão:</strong> {user?.slug}.app.standi.com.br</p>
        {currentDomain && (
          <p><strong>Domínio personalizado:</strong> {currentDomain}</p>
        )}
      </DomainInfo>

      <div className="domain-input-section">
        <DomainInput
          type="text"
          placeholder="exemplo: www.minhaImobiliaria.com.br"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          disabled={loading}
        />
        <DomainButton onClick={handleSaveDomain} disabled={loading}>
          {loading ? 'Salvando...' : 'Configurar Domínio'}
        </DomainButton>
      </div>

      {currentDomain && (
        <DomainButton 
          onClick={handleRemoveDomain} 
          disabled={loading}
          className="remove-button"
        >
          {loading ? 'Removendo...' : 'Remover Domínio'}
        </DomainButton>
      )}

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