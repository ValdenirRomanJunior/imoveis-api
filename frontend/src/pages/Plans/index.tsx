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
      monthly: 87.00,
      annual: 78.30 // 10% de desconto
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
          <PricingCard 
            key={plan.code} 
            className={plan.code === '2' ? 'popular' : ''}
            style={plan.name === 'Pro' ? { display: 'none' } : {}}
          >
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
                 <PricingFeature>Imóveis ilimitados</PricingFeature>
                  <PricingFeature>Tudo liberado</PricingFeature>
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
                  <PricingFeature>Imóveis ilimitados</PricingFeature>
                  <PricingFeature>Tudo liberado</PricingFeature>
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