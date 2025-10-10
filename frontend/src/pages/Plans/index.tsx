import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiRocketLaunch, HiSparkles } from 'react-icons/hi2';
import { FiArrowLeft } from 'react-icons/fi';
import { MdOutlineScience } from 'react-icons/md';
import api from '../../utils/requests';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import BarTop from '../../components/Bartop';
import CheckoutModal from '../../components/CheckoutModal';
import {
  PlansContainer,
  PlansBackground,
  PlansHeader,
  BackButton,
  Title,
  Subtitle,
  PricingToggleContainer,
  PricingToggle,
  PricingToggleButton,
  EconomyBadge,
  EconomyArrow,
  PricingGrid,
  PricingCard,
  PricingIcon,
  PricingPlanName,
  PricingDescription,
  PricingPrice,
  PricingCurrency,
  PricingAmount,
  PricingPeriod,
  PricingFeatures,
  PricingFeature,
  PricingNote,
  PricingButton,
  LoadingContainer,
  ErrorMessage
} from './styles';

interface Plan {
  code: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
}

interface CurrentPlan {
  planType: string;
  planName: string;
  planDescription: string;
  planPrice: number;
  planStartDate: string;
  planEndDate: string;
  isTrialActive: boolean;
  isPlanActive: boolean;
  isInTrialPeriod: boolean;
}

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annual'>('monthly');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { user } = useAuth();

  // Preços dos planos
  const planPrices = {
    lite: {
      monthly: 99.00,
      annual: 89.10 // 10% de desconto
    },
    pro: {
      monthly: 239.00,
      annual: 215.10 // 10% de desconto
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchCurrentPlan();
  }, []);

  // Função para obter o preço baseado no plano selecionado
  const getPlanPrice = (planName: string) => {
    const planKey = planName.toLowerCase() as keyof typeof planPrices;
    if (planPrices[planKey]) {
      return planPrices[planKey][pricingPlan];
    }
    return null; // Para planos que não têm preços dinâmicos (como Teste)
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/plans/available');
      setPlans(response.data);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      setError('Erro ao carregar planos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      const response = await api.get('/plans/current');
      if (response.data.planType) {
        setCurrentPlan(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar plano atual:', error);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Tem certeza que deseja cancelar sua assinatura? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setLoadingCancel(true);
      await api.post('/stripe/cancel-subscription');
      alert('Assinatura cancelada com sucesso!');
      // Recarregar informações do plano atual
      fetchCurrentPlan();
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      alert('Erro ao cancelar assinatura. Tente novamente.');
    } finally {
      setLoadingCancel(false);
    }
  };

  const handleSelectPlan = (planCode: string) => {
    const plan = plans.find(p => p.code === planCode);
    if (plan && !plan.isTrial) {
      setSelectedPlan(plan);
      setCheckoutModalOpen(true);
    }
  };

  const handleCheckoutSuccess = () => {
    // Recarregar planos ou redirecionar para página de sucesso
    fetchPlans();
    fetchCurrentPlan();
    alert('Assinatura realizada com sucesso!');
  };

  const getPlanIcon = (planCode: string) => {
    // Converter para string para garantir compatibilidade
    const code = String(planCode);
    
    switch (code) {
      case '1': // Teste
        return <MdOutlineScience />;
      case '2': // Lite
        return <HiHome />;
      case '3': // Pro
        return <HiRocketLaunch />;
      default:
        return <HiSparkles />;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <PlansBackground>
        <Header />
        <BarTop />
        <PlansContainer>
          <LoadingContainer>
            <Loading />
            <p>Carregando planos...</p>
          </LoadingContainer>
        </PlansContainer>
      </PlansBackground>
    );
  }

  if (error) {
    return (
      <PlansBackground>
        <Header />
        <BarTop />
        <PlansContainer>
          <ErrorMessage>
            <p>{error}</p>
            <button onClick={fetchPlans}>Tentar novamente</button>
          </ErrorMessage>
        </PlansContainer>
      </PlansBackground>
    );
  }

  return (
    <PlansBackground>
      <Header />
      <BarTop />
      <PlansContainer>
        <PlansHeader>
          <Title>Escolha seu Plano</Title>
        </PlansHeader>

        {/* Card do Plano Atual */}
        {currentPlan && (
          <div style={{ maxWidth: '600px', margin: '0 auto 3rem', padding: '0 1rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>
              Plano Atual
            </h2>
            <PricingCard className="current-plan">
              <PricingIcon>
                {getPlanIcon(currentPlan.planType)}
              </PricingIcon>
              
              <PricingPlanName>{currentPlan.planName}</PricingPlanName>
              
              <PricingDescription>
                {currentPlan.planDescription}
              </PricingDescription>
              
              <PricingPrice>
                <PricingCurrency>R$</PricingCurrency>
                <PricingAmount>
                  {formatPrice(currentPlan.planPrice)}
                </PricingAmount>
                <PricingPeriod>/mês</PricingPeriod>
              </PricingPrice>

              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                  <strong>Status:</strong> {currentPlan.isPlanActive ? 'Ativo' : 'Inativo'}
                </p>
                {currentPlan.isTrialActive && (
                  <p style={{ margin: '0.5rem 0', color: '#f59e0b' }}>
                    <strong>Período de Teste</strong> - Expira em: {formatDate(currentPlan.planEndDate)}
                  </p>
                )}
                {!currentPlan.isTrialActive && (
                  <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                    <strong>Válido até:</strong> {formatDate(currentPlan.planEndDate)}
                  </p>
                )}
              </div>

              {/* Botão de Cancelar Assinatura - apenas para planos pagos ativos */}
              {currentPlan.isPlanActive && !currentPlan.isTrialActive && (
                <PricingButton 
                  onClick={handleCancelSubscription}
                  disabled={loadingCancel}
                  style={{ 
                    background: '#dc3545', 
                    color: 'white', 
                    border: 'none',
                    marginBottom: '1rem'
                  }}
                >
                  {loadingCancel ? 'Cancelando...' : 'Cancelar Assinatura'}
                </PricingButton>
              )}
            </PricingCard>
          </div>
        )}
        
        {/* Toggle de Preços */}
        <PricingToggleContainer>
          <PricingToggle>
            <PricingToggleButton 
              active={pricingPlan === 'annual'} 
              onClick={() => setPricingPlan('annual')}
            >
              Anual
            </PricingToggleButton>
            <PricingToggleButton 
              active={pricingPlan === 'monthly'} 
              onClick={() => setPricingPlan('monthly')}
            >
              Mensal
            </PricingToggleButton>
          </PricingToggle>
          <EconomyBadge>
            Economize até 10%
            <EconomyArrow />
          </EconomyBadge>
        </PricingToggleContainer>
        
        <PricingGrid>
        {plans.map((plan) => (
          <PricingCard key={plan.code} className={plan.code === '2' ? 'popular' : ''}>
            <PricingIcon>
              {getPlanIcon(plan.code)}
            </PricingIcon>
            
            <PricingPlanName>{plan.name}</PricingPlanName>
            
            <PricingDescription>
              {plan.description}
            </PricingDescription>
            
            <PricingPrice>
              <PricingCurrency>R$</PricingCurrency>
              <PricingAmount>
                {getPlanPrice(plan.name) ? formatPrice(getPlanPrice(plan.name)!) : formatPrice(plan.price)}
              </PricingAmount>
              <PricingPeriod>/mês</PricingPeriod>
            </PricingPrice>
            
            <PricingFeatures>
              {plan.name === 'Teste' && (
                <>
              <PricingFeature>1 usuário</PricingFeature>
                  <PricingFeature>Site profissional e personalizável</PricingFeature>
                  <PricingFeature>Gestão de imóveis e clientes</PricingFeature>
                  <PricingFeature>Editor do site</PricingFeature>
                  <PricingFeature>Site seguro com SSL</PricingFeature>
                  <PricingFeature>Whatsapp integrado</PricingFeature>
                  <PricingFeature>Até 200 imóveis</PricingFeature>
                </>
              )}
              
              {plan.name === 'Lite' && (
                <>
                  <PricingFeature>1 usuário</PricingFeature>
                  <PricingFeature>Site profissional e personalizável</PricingFeature>
                  <PricingFeature>Gestão de imóveis e clientes</PricingFeature>
                  <PricingFeature>Editor do site</PricingFeature>
                  <PricingFeature>Site seguro com SSL</PricingFeature>
                  <PricingFeature>Whatsapp integrado</PricingFeature>
                  <PricingFeature>Até 200 imóveis</PricingFeature>
                </>
              )}
              
              {plan.name=== 'Pro' && (
                <>
                  <PricingFeature style={{fontWeight:'bold'}}>1 usuário</PricingFeature>
                  <PricingFeature>Site profissional e personalizável</PricingFeature>
                  <PricingFeature>Gestão de imóveis e clientes</PricingFeature>
                  <PricingFeature>Editor do site</PricingFeature>
                  <PricingFeature>Site seguro com SSL</PricingFeature>
                  <PricingFeature>Whatsapp integrado</PricingFeature>
                  <PricingFeature style={{fontWeight:'bold'}}>Imóveis ilimitados</PricingFeature>
                </>
              )}
            </PricingFeatures>
            
            {plan.isTrial && (
              <PricingNote>Período de teste gratuito</PricingNote>
            )}
            
            <PricingButton 
              className={plan.code === 'PRO' ? 'primary' : ''}
              onClick={() => handleSelectPlan(plan.code)}
              disabled={plan.isTrial}
            >
              {plan.isTrial ? 'Plano Atual' : 'Selecionar Plano'}
            </PricingButton>
          </PricingCard>
        ))}
      </PricingGrid>
      
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        plan={selectedPlan}
        onSuccess={handleCheckoutSuccess}
      />
      </PlansContainer>
    </PlansBackground>
  );
};

export default Plans;