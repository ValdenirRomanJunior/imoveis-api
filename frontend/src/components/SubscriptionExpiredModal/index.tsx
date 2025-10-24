import React from 'react';
import { FiLock, FiCreditCard, FiEye } from 'react-icons/fi';
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  IconWrapper,
  ModalTitle,
  ModalBody,
  ModalText,
  ModalActions,
  PrimaryButton,
  SecondaryButton
} from './styles';

interface SubscriptionExpiredModalProps {
  isOpen?: boolean;
  onViewPlans: () => void;
  onComparePlans?: () => void;
}

const SubscriptionExpiredModal: React.FC<SubscriptionExpiredModalProps> = ({
  isOpen = true,
  onViewPlans,
  onComparePlans
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <IconWrapper>
              <FiLock size={48} />
            </IconWrapper>
            <ModalTitle>Assinatura Cancelada</ModalTitle>
          </ModalHeader>
          
          <ModalBody>
            <ModalText>
              Sua assinatura foi cancelada e o acesso aos recursos da plataforma 
              foi suspenso. Para continuar aproveitando todos os benefícios, 
              renove seu plano agora mesmo.
            </ModalText>
            
            <ModalText>
              <strong>Ao renovar sua assinatura, você terá acesso novamente a:</strong>
            </ModalText>
            
            <ul style={{ 
              textAlign: 'left', 
              margin: '16px 0', 
              paddingLeft: '20px',
              color: '#6b7280'
            }}>
              <li>Gestão completa de imóveis e clientes</li>
              <li>Site profissional personalizado</li>
              <li>Integração com WhatsApp</li>
              <li>Relatórios e análises detalhadas</li>
              <li>Suporte técnico prioritário</li>
            </ul>
            
            <ModalText>
              Não perca mais tempo! Renove agora e volte a usar todos os recursos 
              da nossa plataforma.
            </ModalText>
          </ModalBody>
          
          <ModalActions>
            <PrimaryButton onClick={onViewPlans}>
              <FiCreditCard size={18} />
              Renovar Assinatura
            </PrimaryButton>
            
            {onComparePlans && (
              <SecondaryButton onClick={onComparePlans}>
                <FiEye size={18} />
                Comparar Planos
              </SecondaryButton>
            )}
          </ModalActions>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SubscriptionExpiredModal;