import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiRocketLaunch } from 'react-icons/hi2';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../utils/requests';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import BarTop from '../../components/Bartop';
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

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annual'>('monthly');
  const { user } = useAuth();

  // Preços dos planos
  const planPrices = {
    lite: {
      monthly: 99,
      annual: 89 // 10% de desconto
    },
    pro: {
      monthly: 239,
      annual: 215 // 10% de desconto
    }
  };

  useEffect(() => {
    fetchPlans();
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

  const handleSelectPlan = (planCode: string) => {
    // TODO: Implementar lógica de seleção de plano
    // Por enquanto, apenas mostra um alerta
    alert(`Plano ${planCode} selecionado! Integração com ASAAS será implementada em breve.`);
  };

  const getPlanIcon = (planCode: string) => {
    switch (planCode) {
      case 'LITE':
        return <HiHome />;
      case 'PRO':
        return <HiRocketLaunch />;
      default:
        return <HiHome />;
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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
                  <PricingFeature style={{fontWeight:'bold'}}>3 usuários</PricingFeature>
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
      </PlansContainer>
    </PlansBackground>
  );
};

export default Plans;