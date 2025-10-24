import { useEffect, useMemo, useState } from 'react';
import useAuth from './useAuth';
import api from '../utils/requests';

export interface SubscriptionStatus {
  isActive: boolean;
  isExpired: boolean;
  planType: string;
  endDate: Date | null;
  isTrialActive: boolean;
}

const useSubscriptionStatus = (): SubscriptionStatus => {
  const { user } = useAuth();
  const [now, setNow] = useState<Date>(new Date());
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  // Atualiza o "agora" periodicamente para refletir mudanças de tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 5000); // recalcula a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  // Busca dados da assinatura atual
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await api.get('/plans/current');
        const data = response.data || {};
        setSubscriptionData(data);
      } catch (err) {
        console.error('Erro ao buscar status da assinatura:', err);
        // Em caso de erro, mantém estado atual
      }
    };
    
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user?.id]);

  return useMemo(() => {
    // Se não há usuário ou dados da assinatura, não considera como expirado
    // (pode estar carregando ou ser um usuário novo)
    if (!user || !subscriptionData) {
      return {
        isActive: false,
        isExpired: false, // ✅ Não expirado quando não há dados
        planType: 'FREE',
        endDate: null,
        isTrialActive: false
      };
    }

    const {
      planType = 'FREE',
      planEndDate,
      isTrialActive = false,
      isPlanActive = false,
      hasHadSubscription = false
    } = subscriptionData;

    // Se tem plano ativo (pago), considera como ativo
    if (isPlanActive) {
      return {
        isActive: true,
        isExpired: false,
        planType,
        endDate: planEndDate ? new Date(planEndDate) : null,
        isTrialActive
      };
    }

    // Se está em trial ativo, verifica se não expirou
    if (isTrialActive && planEndDate) {
      const endDate = new Date(planEndDate);
      const timeDiff = endDate.getTime() - now.getTime();
      const isExpired = timeDiff <= 0;
      
      return {
        isActive: !isExpired,
        isExpired,
        planType,
        endDate,
        isTrialActive: true
      };
    }

    // Plano FREE sem trial = sem acesso apenas se já teve assinatura antes
    // Para usuários novos, não deve mostrar modal de assinatura expirada
    
    return {
      isActive: false,
      isExpired: hasHadSubscription, // ✅ Só expirado se já teve assinatura antes
      planType,
      endDate: planEndDate ? new Date(planEndDate) : null,
      isTrialActive: false
    };
  }, [user, subscriptionData, now]);
};

export default useSubscriptionStatus;