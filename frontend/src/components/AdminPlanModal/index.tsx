import React, { useState, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Select,
  Button,
  ButtonGroup,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage
} from './styles';

interface Plan {
  code: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
}

interface AdminPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userEmail: string;
  currentPlan?: string;
  onSuccess: () => void;
}

const AdminPlanModal: React.FC<AdminPlanModalProps> = ({
  isOpen,
  onClose,
  userId,
  userEmail,
  currentPlan,
  onSuccess
}) => {
  const [action, setAction] = useState<'renew' | 'change' | 'trial'>('renew');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [duration, setDuration] = useState<string>('30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentPlanInfo, setCurrentPlanInfo] = useState<any>(null);
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);

  // Buscar planos disponíveis do sistema
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenString = token ? JSON.parse(token) : '';
        
        const response = await fetch('https://standi-api-dd146fec77bd.herokuapp.com/plans/available', {
          headers: {
            'Authorization': tokenString
          }
        });
        const plans = await response.json();
        setAvailablePlans(plans);
      } catch (error) {
        console.error('Erro ao buscar planos:', error);
      }
    };

    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  // Buscar informações do plano atual do usuário
  useEffect(() => {
    const fetchCurrentPlanInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenString = token ? JSON.parse(token) : '';
        
        // Primeiro buscar o usuário para obter o accountId
        const userResponse = await fetch(`https://standi-api-dd146fec77bd.herokuapp.com/admin/stats/users/${userId}/details`, {
          headers: {
            'Authorization': tokenString
          }
        });
        const userDetails = await userResponse.json();
        
        if (userDetails.accountId) {
          // Agora buscar as informações do plano usando o accountId
          const planResponse = await fetch(`https://standi-api-dd146fec77bd.herokuapp.com/plans/account/${userDetails.accountId}`, {
            headers: {
              'Authorization': tokenString
            }
          });
          const planInfo = await planResponse.json();
          setCurrentPlanInfo(planInfo);
        }
      } catch (error) {
        console.error('Erro ao buscar informações do plano:', error);
      }
    };

    if (isOpen && userId) {
      fetchCurrentPlanInfo();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(currentPlan || 'LITE');
      setError('');
      setSuccess('');
      setShowActionModal(false);
    }
  }, [isOpen, currentPlan]);

  const handleActionSelect = (selectedAction: 'renew' | 'change' | 'trial') => {
    setAction(selectedAction);
    setShowActionModal(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    // Validações específicas por ação
    if (action === 'trial') {
      // Para estender teste, usar duração fixa de 7 dias
      setDuration('7');
    } else if (!selectedPlan) {
      setError('Por favor, selecione um plano');
      return;
    }

    if (!duration) {
      setError('Por favor, informe a duração');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let endpoint = '';
      let payload = {};

      switch (action) {
        case 'renew':
          endpoint = `/admin/stats/users/${userId}/renew-plan`;
          payload = {
            planType: selectedPlan,
            durationDays: parseInt(duration)
          };
          break;
        case 'change':
          endpoint = `/admin/stats/users/${userId}/change-plan`;
          payload = {
            planType: selectedPlan,
            durationDays: parseInt(duration)
          };
          break;
        case 'trial':
          endpoint = `/admin/stats/users/${userId}/extend-trial`;
          payload = {
            durationDays: 7 // Fixo em 7 dias para estender teste
          };
          break;
      }

      const response = await fetch(`https://standi-api-dd146fec77bd.herokuapp.com/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(localStorage.getItem('token') || '""')
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccess('Operação realizada com sucesso!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(result.message || 'Erro ao processar solicitação');
      }

    } catch (err: any) {
      console.error('Erro ao processar solicitação:', err);
      setError('Erro ao processar solicitação');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!isOpen) return null;

  // Modal de seleção de ação
  if (!showActionModal) {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Gerenciar Plano do Usuário</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
            <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
              <strong>Usuário:</strong> {userEmail}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '15px', color: '#333' }}>Selecione uma ação:</h4>
              
              <ButtonGroup style={{ flexDirection: 'column', gap: '10px' }}>
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => handleActionSelect('renew')}
                  style={{ padding: '15px', textAlign: 'left' }}
                >
                  ✅ Renovar Plano
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Renovar o plano atual do usuário
                  </div>
                </Button>
                
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => handleActionSelect('change')}
                  style={{ padding: '15px', textAlign: 'left' }}
                >
                  ✅ Alterar Plano
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Alterar para um plano diferente
                  </div>
                </Button>
                
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => handleActionSelect('trial')}
                  style={{ padding: '15px', textAlign: 'left' }}
                >
                  ✅ Estender Teste
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Adicionar +7 dias ao período de teste
                  </div>
                </Button>
              </ButtonGroup>
            </div>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  // Modal específico para cada ação
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {action === 'renew' && 'Renovar Plano'}
            {action === 'change' && 'Alterar Plano'}
            {action === 'trial' && 'Estender Período de Teste'}
          </ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <strong>Usuário:</strong> {userEmail}
          </div>

          {/* Pop-up para Renovar Plano */}
          {action === 'renew' && currentPlanInfo && (
            <div>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{ marginBottom: '10px', color: '#333' }}>Plano Atual</h4>
                <p><strong>Plano:</strong> {currentPlanInfo.planName || 'Nenhum plano'}</p>
                <p><strong>Status:</strong> {currentPlanInfo.planStatus || 'N/A'}</p>
                <p><strong>Início:</strong> {formatDate(currentPlanInfo.planStartDate)}</p>
                <p><strong>Vencimento:</strong> {formatDate(currentPlanInfo.planEndDate)}</p>
              </div>

              <FormGroup>
                <Label>Duração da Renovação</Label>
                <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="30">30 dias</option>
                  <option value="90">90 dias</option>
                  <option value="180">180 dias</option>
                  <option value="365">1 ano</option>
                </Select>
              </FormGroup>
            </div>
          )}

          {/* Pop-up para Alterar Plano */}
          {action === 'change' && (
            <div>
              <FormGroup>
                <Label>Selecionar Novo Plano</Label>
                <Select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                  <option value="">Selecione um plano</option>
                  {availablePlans.map(plan => (
                    <option key={plan.code} value={plan.code}>
                      {plan.name} - {formatPrice(plan.price)} 
                      {plan.isTrial ? ' (Teste)' : ''}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              {selectedPlan && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  marginBottom: '15px',
                  border: '1px solid #e9ecef'
                }}>
                  {availablePlans.find(p => p.code === selectedPlan) && (
                    <div>
                      <h4 style={{ marginBottom: '10px', color: '#333' }}>
                        {availablePlans.find(p => p.code === selectedPlan)?.name}
                      </h4>
                      <p>{availablePlans.find(p => p.code === selectedPlan)?.description}</p>
                      <p><strong>Preço:</strong> {formatPrice(availablePlans.find(p => p.code === selectedPlan)?.price || 0)}</p>
                    </div>
                  )}
                </div>
              )}

              <FormGroup>
                <Label>Duração</Label>
                <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="30">30 dias</option>
                  <option value="90">90 dias</option>
                  <option value="180">180 dias</option>
                  <option value="365">1 ano</option>
                </Select>
              </FormGroup>
            </div>
          )}

          {/* Pop-up para Estender Teste */}
          {action === 'trial' && (
            <div>
              <div style={{ 
                backgroundColor: '#fff3cd', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                border: '1px solid #ffeaa7',
                textAlign: 'center'
              }}>
                <h4 style={{ marginBottom: '15px', color: '#856404' }}>
                  Estender Período de Teste
                </h4>
                <p style={{ fontSize: '16px', marginBottom: '10px' }}>
                  Deseja aumentar o período de teste para <strong>+7 dias</strong>?
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Esta ação adicionará 7 dias ao período de teste atual do usuário.
                </p>
              </div>
            </div>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={() => setShowActionModal(false)}>
              Voltar
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Confirmar'}
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AdminPlanModal;