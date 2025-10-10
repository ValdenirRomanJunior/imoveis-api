import React, { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import {
  BlockingOverlay,
  BannerContainer,
  BannerContent,
  BannerText,
  UpgradeButton,
} from './styles';

interface TrialWarningBannerProps {
  daysRemaining: number;
  onViewPlans: () => void;
}

const TrialWarningBanner: React.FC<TrialWarningBannerProps> = ({
  daysRemaining,
  onViewPlans
}) => {
  // Controle de visibilidade do banner (padrão: aberto)
  const [isOpen, setIsOpen] = useState(true);

  // Bloqueia/desbloqueia scroll do body conforme visibilidade
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow;
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Permite controle via console através de eventos customizados
  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    window.addEventListener('trialBanner:close', handleClose);
    window.addEventListener('trialBanner:open', handleOpen);

    return () => {
      window.removeEventListener('trialBanner:close', handleClose);
      window.removeEventListener('trialBanner:open', handleOpen);
    };
  }, []);
  // Banner permanece até ser fechado via comando do console

  const getBannerType = () => {
    if (daysRemaining <= 3) return 'critical';
    if (daysRemaining <= 7) return 'warning';
    return 'info';
  };

  const getMessage = () => {
    if (daysRemaining === 0) {
      return 'Seu período de teste expira hoje!';
    } else if (daysRemaining === 1) {
      return 'Seu período de teste expira amanhã!';
    } else if (daysRemaining <= 3) {
      return `Seu período de teste expira em ${daysRemaining} dias!`;
    } else if (daysRemaining <= 7) {
      return `Seu período de teste expira em ${daysRemaining} dias.`;
    } else {
      return `Você tem ${daysRemaining} dias restantes no seu período de teste.`;
    }
  };

  if (!isOpen) return null;

  return (
    <BlockingOverlay>
      <BannerContainer type={getBannerType()}>
        <BannerContent>
          <FiClock size={20} />
          <BannerText>
            {getMessage()} Assine um plano para continuar usando todos os recursos.
          </BannerText>
          <UpgradeButton onClick={onViewPlans}>
            Ver Planos
          </UpgradeButton>
        </BannerContent>
      </BannerContainer>
    </BlockingOverlay>
  );
};

export default TrialWarningBanner;