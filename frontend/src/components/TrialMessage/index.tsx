import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import api from '../../utils/requests';
import {
  TrialMessageContainer,
  TrialMessageContent,
  TrialIcon,
  TrialText,
  TrialLink
} from './styles';

interface PlanInfo {
  planEndDate: string;
  isTrialActive: boolean;
  isPlanActive: boolean;
}

const TrialMessage: React.FC = () => {
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Função para calcular dias restantes
  const calculateDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Função para buscar informações do plano atual
  const fetchPlanInfo = async () => {
    try {
      setLoading(true);
      const response = await api.get('/plans/current');
      
      if (response.data && response.data.isTrialActive) {
        setPlanInfo(response.data);
        const days = calculateDaysRemaining(response.data.planEndDate);
        setDaysRemaining(days);
      }
    } catch (error) {
      console.error('Erro ao buscar informações do plano:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanInfo();
  }, []);

  // Não renderizar se não estiver carregando, não tiver informações do plano ou não estiver em período de teste
  if (loading || !planInfo || !planInfo.isTrialActive) {
    return null;
  }

  return (
    <TrialMessageContainer>
      <TrialMessageContent>
        <TrialIcon>
          <FaGift />
        </TrialIcon>
        <TrialText>
          Faltam {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} para o fim do período de testes
        </TrialText>
        <TrialLink as={Link} to="/plans">
          Assinar agora
        </TrialLink>
      </TrialMessageContent>
    </TrialMessageContainer>
  );
};

export default TrialMessage;