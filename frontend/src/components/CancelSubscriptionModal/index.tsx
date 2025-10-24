import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../utils/requests';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subscription: {
    id: string;
    value: string;
    cycle: string;
    nextDueDate: string;
    status: string;
  };
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #dc3545;
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const WarningMessage = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 20px;
  color: #856404;
`;

const SubscriptionInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #666;
`;

const InfoValue = styled.span`
  color: #333;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  color: #721c24;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  color: #155724;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #5a6268;
          }
        `;
      default:
        return `
          background-color: #007bff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0056b3;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  subscription
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return 'Erro na data';
    }
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return numericPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getCycleLabel = (cycle: string) => {
    switch (cycle) {
      case 'MONTHLY':
        return 'Mensal';
      case 'QUARTERLY':
        return 'Trimestral';
      case 'SEMIANNUALLY':
        return 'Semestral';
      case 'YEARLY':
        return 'Anual';
      default:
        return cycle;
    }
  };

  const handleCancel = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            console.log('Cancelando assinatura via API...');
            const response = await api.post('/stripe/cancel-subscription');
            
            if (response.data.success) {
                setSuccess('Assinatura cancelada com sucesso!');
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 2000);
            } else {
                setError(response.data.message || 'Erro ao cancelar assinatura');
            }
        } catch (error: any) {
            console.error('Erro ao cancelar assinatura:', error);
            setError(
                error.response?.data?.message || 
                'Erro ao cancelar assinatura. Tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Cancelar Assinatura</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <WarningMessage>
            <strong>Atenção!</strong> Esta ação não pode ser desfeita. Ao cancelar sua assinatura, 
            você perderá o acesso aos recursos premium no final do período atual de cobrança.
          </WarningMessage>

          <SubscriptionInfo>
            <InfoRow>
              <InfoLabel>Valor:</InfoLabel>
              <InfoValue>{formatPrice(subscription.value)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Ciclo:</InfoLabel>
              <InfoValue>{getCycleLabel(subscription.cycle)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Próximo Vencimento:</InfoLabel>
              <InfoValue>{formatDate(subscription.nextDueDate)}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Status:</InfoLabel>
              <InfoValue>{subscription.status}</InfoValue>
            </InfoRow>
          </SubscriptionInfo>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ButtonGroup>
            <Button 
              variant="secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Manter Assinatura
            </Button>
            <Button 
              variant="danger" 
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  Cancelando...
                </>
              ) : (
                'Confirmar Cancelamento'
              )}
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CancelSubscriptionModal;