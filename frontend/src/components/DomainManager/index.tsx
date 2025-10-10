import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGlobe, FiCheck, FiX, FiExternalLink } from 'react-icons/fi';
import { DomainContainer } from './styles';

interface DomainInfo {
  subdomain: string;
  customDomain: string | null;
  companyName: string;
}

interface DomainManagerProps {
  accountId: number;
}

const DomainManager: React.FC<DomainManagerProps> = ({ accountId }) => {
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [customDomain, setCustomDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<any>(null);

  useEffect(() => {
    loadDomainInfo();
  }, [accountId]);

  const loadDomainInfo = async () => {
    try {
      const response = await axios.get(`/api/domains/info/${accountId}`);
      if (response.data.success) {
        setDomainInfo(response.data);
        setCustomDomain(response.data.customDomain || '');
      }
    } catch (error) {
      console.error('Erro ao carregar informações do domínio:', error);
    }
  };

  const handleAddCustomDomain = async () => {
    if (!customDomain.trim()) {
      setMessage({ type: 'error', text: 'Por favor, insira um domínio válido' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(`/api/domains/custom/${accountId}`, {
        domain: customDomain.trim()
      });

      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Domínio personalizado adicionado com sucesso! Agora você precisa configurar o DNS.' 
        });
        loadDomainInfo();
      } else {
        setMessage({ type: 'error', text: response.data.message });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao adicionar domínio personalizado' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomain = async () => {
    if (!domainInfo?.customDomain) return;

    setVerifying(true);
    setMessage(null);

    try {
      const response = await axios.post(`/api/domains/verify/${accountId}`, {
        domain: domainInfo.customDomain
      });

      setVerificationStatus(response.data);
      
      if (response.data.verified) {
        setMessage({ 
          type: 'success', 
          text: 'Domínio verificado com sucesso! Seu site já está disponível no domínio personalizado.' 
        });
      } else {
        setMessage({ 
          type: 'info', 
          text: 'Domínio ainda não verificado. Verifique as configurações de DNS.' 
        });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao verificar domínio' 
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleRemoveCustomDomain = async () => {
    if (!domainInfo?.customDomain) return;

    if (!window.confirm('Tem certeza que deseja remover o domínio personalizado?')) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.delete(`/api/domains/custom/${accountId}`, {
        data: { domain: domainInfo.customDomain }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Domínio personalizado removido com sucesso!' });
        setCustomDomain('');
        loadDomainInfo();
      } else {
        setMessage({ type: 'error', text: response.data.message });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao remover domínio personalizado' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!domainInfo) {
    return (
      <DomainContainer>
        <div className="domain-card">
          <div className="domain-header">
            <h4><FiGlobe />Gerenciar Domínios</h4>
          </div>
          <div className="alert alert-info">
            <p>Carregando informações do domínio...</p>
          </div>
        </div>
      </DomainContainer>
    );
  }

  return (
    <DomainContainer>
      <div className="domain-card">
        <div className="domain-header">
          <h4><FiGlobe />Gerenciar Domínios</h4>
        </div>
        <div>
          {message && (
            <div className={`alert alert-${message.type === 'error' ? 'danger' : message.type === 'success' ? 'success' : 'info'}`}>
              {message.text}
            </div>
          )}

          {/* Subdomínio Automático */}
          <div className="domain-section">
            <h5>Subdomínio Automático</h5>
            <div className="domain-info">
              <span className="badge bg-primary">Ativo</span>
              <strong>{domainInfo.subdomain}</strong>
              <a 
                href={`https://${domainInfo.subdomain}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FiExternalLink />
              </a>
            </div>
            <small style={{color: '#6c757d'}}>
              Este subdomínio foi criado automaticamente quando sua conta foi registrada.
            </small>
          </div>

          <hr className="divider" />

          {/* Domínio Personalizado */}
          <div>
            <h5>Domínio Personalizado</h5>
            
            {!domainInfo.customDomain ? (
              <div>
                <div className="form-group">
                  <label>Adicionar Domínio Personalizado</label>
                  <input
                    type="text"
                    placeholder="exemplo: meusite.com.br"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    disabled={loading}
                  />
                  <div className="form-text">
                    Digite seu domínio personalizado (sem http:// ou https://)
                  </div>
                </div>
                
                <div className="button-group">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleAddCustomDomain}
                    disabled={loading || !customDomain.trim()}
                  >
                    {loading ? (
                      <><div className="spinner-border"></div>Adicionando...</>
                    ) : (
                      'Adicionar Domínio'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="domain-info">
                  <span 
                    className={`badge ${verificationStatus?.verified ? 'bg-success' : 'bg-warning'}`}
                  >
                    {verificationStatus?.verified ? (
                      <><FiCheck />Verificado</>
                    ) : (
                      <><FiX />Pendente</>
                    )}
                  </span>
                  <strong>{domainInfo.customDomain}</strong>
                  {verificationStatus?.verified && (
                    <a 
                      href={`https://${domainInfo.customDomain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>

                {!verificationStatus?.verified && (
                  <div className="dns-instructions">
                    <strong>Configuração DNS Necessária:</strong><br />
                    Para que seu domínio funcione, adicione um registro CNAME apontando para:<br />
                    <code>cname.vercel-dns.com</code>
                  </div>
                )}

                <div className="button-group">
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={handleVerifyDomain}
                    disabled={verifying}
                  >
                    {verifying ? (
                      <><div className="spinner-border"></div>Verificando...</>
                    ) : (
                      'Verificar Domínio'
                    )}
                  </button>
                  
                  <button 
                    className="btn btn-outline-danger" 
                    onClick={handleRemoveCustomDomain}
                    disabled={loading}
                  >
                    Remover Domínio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DomainContainer>
  );
};

export default DomainManager;