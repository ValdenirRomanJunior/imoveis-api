import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import {
  Container,
  Header,
  Title,
  Subtitle,
  PricingToggle,
  ToggleButton,
  PlansContainer,
  PlanCard,
  PlanHeader,
  PlanName,
  PlanPrice,
  PlanPeriod,
  PlanDescription,
  FeaturesList,
  Feature,
  ContactButton,
  Footer
} from './styles';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const PlansPublic: React.FC = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans: Plan[] = [
    {
      id: 'teste',
      name: 'Teste',
      description: 'Experimente gratuitamente por 7 dias',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Até 10 imóveis cadastrados',
        'Site básico personalizado',
        'Suporte por email',
        'Dashboard básico',
        'Sem taxa de setup'
      ]
    },
    {
      id: 'lite',
      name: 'Lite',
      description: 'Ideal para corretores iniciantes',
      monthlyPrice: 97,
      yearlyPrice: 970,
      popular: true,
      features: [
        'Até 100 imóveis cadastrados',
        'Site completo personalizado',
        'Suporte prioritário',
        'Dashboard avançado',
        'Integração com redes sociais',
        'Relatórios básicos'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Para imobiliárias e corretores profissionais',
      monthlyPrice: 197,
      yearlyPrice: 1970,
      features: [
        'Imóveis ilimitados',
        'Site premium personalizado',
        'Suporte 24/7',
        'Dashboard completo',
        'Integração com portais',
        'Relatórios avançados',
        'CRM integrado',
        'API personalizada'
      ]
    }
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuito';
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  const getPrice = (plan: Plan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const handleContact = (planName: string) => {
    const message = `Olá! Tenho interesse no plano ${planName} do Standi. Gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container>
      <Header>
        <MdAttachMoney size={48} />
        <Title>Planos Standi</Title>
        <Subtitle>
          Escolha o plano ideal para o seu negócio imobiliário
        </Subtitle>
      </Header>

      <PricingToggle>
        <ToggleButton 
          active={!isYearly} 
          onClick={() => setIsYearly(false)}
        >
          Mensal
        </ToggleButton>
        <ToggleButton 
          active={isYearly} 
          onClick={() => setIsYearly(true)}
        >
          Anual (2 meses grátis)
        </ToggleButton>
      </PricingToggle>

      <PlansContainer>
        {plans.map((plan) => (
          <PlanCard key={plan.id} popular={plan.popular}>
            {plan.popular && <div className="popular-badge">Mais Popular</div>}
            
            <PlanHeader>
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                {formatPrice(getPrice(plan))}
                {getPrice(plan) > 0 && (
                  <PlanPeriod>
                    /{isYearly ? 'ano' : 'mês'}
                  </PlanPeriod>
                )}
              </PlanPrice>
              <PlanDescription>{plan.description}</PlanDescription>
            </PlanHeader>

            <FeaturesList>
              {plan.features.map((feature, index) => (
                <Feature key={index}>
                  <FaCheck />
                  <span>{feature}</span>
                </Feature>
              ))}
            </FeaturesList>

            <ContactButton 
              onClick={() => handleContact(plan.name)}
              popular={plan.popular}
            >
              <FaWhatsapp />
              Entrar em Contato
            </ContactButton>
          </PlanCard>
        ))}
      </PlansContainer>

      <Footer>
        <p>
          Todos os planos incluem suporte técnico e atualizações gratuitas.
          <br />
          Entre em contato para planos personalizados para grandes imobiliárias.
        </p>
        <button onClick={() => navigate('/signin')}>
          Já tem uma conta? Faça login
        </button>
      </Footer>
    </Container>
  );
};

export default PlansPublic;