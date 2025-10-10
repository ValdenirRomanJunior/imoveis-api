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

interface TrialExpiredModalProps {
  isOpen?: boolean;
  onViewPlans: () => void;
  onComparePlans?: () => void;
}

const TrialExpiredModal: React.FC<TrialExpiredModalProps> = ({
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
            <ModalTitle>Período de Teste Expirado</ModalTitle>
          </ModalHeader>
          
          <ModalBody>
            <ModalText>
              Seu período de teste gratuito chegou ao fim. Para continuar aproveitando 
              todos os recursos da nossa plataforma, escolha um plano que melhor se 
              adapta às suas necessidades.
            </ModalText>
            
            <ModalText>
              <strong>Com um plano ativo, você terá acesso a:</strong>
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
          </ModalBody>
          
          <ModalActions>
            <PrimaryButton onClick={onViewPlans}>
              <FiCreditCard size={18} />
              Ver Planos e Assinar
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

export default TrialExpiredModal;