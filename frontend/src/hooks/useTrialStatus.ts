import { useEffect, useMemo, useState } from 'react';
import useAuth from './useAuth';
import useSubscriptionStatus from './useSubscriptionStatus';

export interface TrialStatus {
  isActive: boolean;
  isExpired: boolean;
  daysRemaining: number;
  endDate: Date | null;
}

const useTrialStatus = (): TrialStatus => {
  const { user } = useAuth();
  const [now, setNow] = useState<Date>(new Date());
  const [planActive, setPlanActive] = useState<boolean>(false);
  const subscriptionStatus = useSubscriptionStatus();

  // Atualiza o "agora" periodicamente para refletir mudanças de tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 5000); // recalcula a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlanActive(!!subscriptionStatus.isActive);
  }, [subscriptionStatus.isActive]);

  return useMemo(() => {
    // Override de expiração via flag de debug (deve prevalecer mesmo sem usuário)
    const forceExpired = typeof window !== 'undefined'
      ? (localStorage.getItem('trial_force_expired') === 'true')
      : false;

    // Se não há usuário ou não há data de fim, considera como não ativo
    if (!user || !user.endDate) {
      return {
        isActive: false,
        isExpired: planActive ? false : forceExpired,
        daysRemaining: 0,
        endDate: null
      };
    }

    const endDate = new Date(user.endDate);
    const timeDiff = endDate.getTime() - now.getTime();
    const isExpired = planActive ? false : (forceExpired || timeDiff <= 0);
    const daysRemaining = isExpired ? 0 : Math.ceil(timeDiff / (1000 * 3600 * 24));
    const isActive = !isExpired;

    return {
      isActive,
      isExpired,
      daysRemaining: Math.max(0, daysRemaining),
      endDate
    };
  }, [user, now, planActive]);
};

export default useTrialStatus;