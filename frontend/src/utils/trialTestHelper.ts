// Helper para testar diferentes cenários de trial
// Este arquivo é apenas para desenvolvimento e testes

export const createTestUser = (scenario: 'active' | 'warning' | 'critical' | 'expired') => {
  const now = new Date();
  let endDate: Date;

  switch (scenario) {
    case 'active':
      // Trial com 15 dias restantes
      endDate = new Date(now.getTime() + (15 * 24 * 60 * 60 * 1000));
      break;
    case 'warning':
      // Trial com 5 dias restantes (warning)
      endDate = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000));
      break;
    case 'critical':
      // Trial com 2 dias restantes (critical)
      endDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000));
      break;
    case 'expired':
      // Trial expirado há 1 dia
      endDate = new Date(now.getTime() - (1 * 24 * 60 * 60 * 1000));
      break;
    default:
      endDate = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
  }

  return {
    id: 'test-user-id',
    slug: 'Usuario Teste',
    email: 'teste@exemplo.com',
    lastName: 'Sobrenome',
    endDate: endDate.toISOString(),
    perfis: ['TENANT']
  };
};

// Função para simular diferentes cenários no localStorage
export const setTrialScenario = (scenario: 'active' | 'warning' | 'critical' | 'expired') => {
  const testUser = createTestUser(scenario);
  localStorage.setItem('user', JSON.stringify(testUser));
  
  console.log(`🧪 Cenário de teste configurado: ${scenario}`);
  console.log(`📅 Data de término: ${testUser.endDate}`);
  console.log('🔄 Recarregue a página para ver as mudanças');
};

// Função para definir expiração em minutos (ex.: 2 minutos)
export const setTrialMinutes = (minutes: number) => {
  const now = new Date();
  const endDate = new Date(now.getTime() + minutes * 60 * 1000);
  const testUser = {
    id: 'test-user-id',
    slug: 'Usuario Teste',
    email: 'teste@exemplo.com',
    lastName: 'Sobrenome',
    endDate: endDate.toISOString(),
    perfis: ['TENANT']
  };

  localStorage.setItem('user', JSON.stringify(testUser));

  console.log(`🧪 Trial configurado para expirar em ${minutes} minuto(s).`);
  console.log(`📅 Data de término: ${testUser.endDate}`);
  console.log('🔄 Recarregue a página para aplicar e aguarde a expiração.');
};

// Função para restaurar o usuário original
export const restoreOriginalUser = () => {
  // Remove o usuário de teste
  localStorage.removeItem('user');
  console.log('✅ Usuário de teste removido. Faça login novamente para restaurar o usuário original.');
};

// Controle do banner via console (eventos customizados)
export const closeTrialBanner = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('trialBanner:close'));
    console.log('🛑 Banner de trial fechado manualmente via console.');
  }
};

export const openTrialBanner = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('trialBanner:open'));
    console.log('✅ Banner de trial reaberto manualmente via console.');
  }
};

// Override: Forçar trial expirado até remover manualmente
export const forceTrialExpired = () => {
  localStorage.setItem('trial_force_expired', 'true');
  console.log('🛑 Trial forçado para EXPIRADO (override ativo).');
  console.log('🔄 Recarregue a página para aplicar o bloqueio.');
};

export const restoreTrialNormal = () => {
  localStorage.removeItem('trial_force_expired');
  console.log('✅ Override removido. Trial volta ao comportamento normal.');
  console.log('🔄 Recarregue a página para liberar o acesso.');
};

// Adiciona funções globais para facilitar o teste no console do navegador
if (typeof window !== 'undefined') {
  (window as any).setTrialScenario = setTrialScenario;
  (window as any).setTrialMinutes = setTrialMinutes;
  (window as any).restoreOriginalUser = restoreOriginalUser;
  (window as any).closeTrialBanner = closeTrialBanner;
  (window as any).openTrialBanner = openTrialBanner;
  (window as any).forceTrialExpired = forceTrialExpired;
  (window as any).restoreTrialNormal = restoreTrialNormal;
  
  console.log('🧪 Funções de teste disponíveis:');
  console.log('- setTrialScenario("active") - Trial com 15 dias');
  console.log('- setTrialScenario("warning") - Trial com 5 dias (warning)');
  console.log('- setTrialScenario("critical") - Trial com 2 dias (critical)');
  console.log('- setTrialScenario("expired") - Trial expirado');
  console.log('- setTrialMinutes(2) - Trial expira em 2 minutos');
  console.log('- restoreOriginalUser() - Remove usuário de teste');
  console.log('- closeTrialBanner() - Fecha o banner de trial manualmente');
  console.log('- openTrialBanner() - Reabre o banner de trial manualmente');
  console.log('- forceTrialExpired() - Força o trial como expirado (bloqueio)');
  console.log('- restoreTrialNormal() - Remove override e volta ao normal');
}