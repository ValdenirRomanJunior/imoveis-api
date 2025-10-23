import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalHeader, 
  ModalTitle, 
  CloseButton, 
  ModalBody, 
  PlanInfo,
  PlanName,
  PlanPrice,
  FormGroup, 
  Label, 
  Select,
  SubmitButton, 
  ErrorMessage,
  SuccessMessage,
  LoadingSpinner
} from './styles';
import api from '../../utils/requests';

// Inicializar Stripe com a chave pública de produção
const stripePromise = loadStripe('pk_live_51SEuVEJlRuVndWwzHix67RZKcXoKQJYbfKPXQc6W2igaZpz6Cna3xEThwVEBE2KhkWbawYUny8BW9lfoJEVOgwID00CSE8Tn8L');

// Valores reais dos planos (alinhados com o backend)
const realPlanPrices: { [key: string]: number } = {
  'Lite': 87.00,
  'Pro': 239.00,
  'LITE': 87.00,
  'PRO': 239.00
};

// Função para obter o preço real do plano
const getRealPlanPrice = (planName: string, fallbackPrice?: number): number => {
  return realPlanPrices[planName] || fallbackPrice || 0;
};

const getCyclePrice = (basePrice: number, cycleValue: string) => {
  switch (cycleValue) {
    case 'YEARLY':
      return basePrice * 12 * 0.90; // 10% desconto anual
    default:
      return basePrice;
  }
};

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

interface Plan {
  code: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onSuccess: () => void;
}

// Componente interno do formulário de checkout
const CheckoutForm: React.FC<{
  plan: Plan;
  cycle: string;
  onSuccess: () => void;
  onClose: () => void;
}> = ({ plan, cycle, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe não foi carregado corretamente.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Criar sessão de checkout no backend
      const checkoutResponse = await api.post('/stripe/create-checkout-session', {
        planCode: plan.code,
        cycle: cycle
      });

      if (checkoutResponse.data.success && checkoutResponse.data.url) {
        // Redirecionar para a URL do Stripe Checkout
        setSuccess('Redirecionando para o checkout...');
        window.location.href = checkoutResponse.data.url;
        onClose(); // Fechar o modal após redirecionar
      } else if (checkoutResponse.data.sessionId) {
        // Fallback: usar sessionId se disponível
        const checkoutUrl = `https://checkout.stripe.com/pay/${checkoutResponse.data.sessionId}`;
        setSuccess('Redirecionando para o checkout...');
        window.location.href = checkoutUrl;
        onClose();
      } else {
        setError(checkoutResponse.data.message || 'Erro ao criar sessão de checkout.');
      }
    } catch (error: any) {
      console.error('Erro ao criar checkout:', error);
      setError(
        error.response?.data?.message || 
        'Erro ao processar pagamento. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PlanInfo>
        <PlanName>{plan.name}</PlanName>
        <PlanPrice>
          {formatPrice(getCyclePrice(getRealPlanPrice(plan.name, plan.price), cycle))}
          {cycle === 'MONTHLY' && '/mês'}
          {cycle === 'YEARLY' && '/ano'}
        </PlanPrice>
      </PlanInfo>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <form onSubmit={handleSubmit}>
        <SubmitButton type="submit" disabled={loading || !stripe}>
          {loading ? (
            <>
              <LoadingSpinner />
              Processando...
            </>
          ) : (
            `Pagar com Stripe - ${formatPrice(getCyclePrice(getRealPlanPrice(plan.name, plan.price), cycle))}`
          )}
        </SubmitButton>
      </form>
    </>
  );
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan, onSuccess }) => {
  const [cycle, setCycle] = useState<string>('MONTHLY');

  const cycles = [
    { value: 'MONTHLY', label: 'Mensal' },
    { value: 'YEARLY', label: 'Anual' }
  ];

  if (!isOpen || !plan) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Checkout - {plan.name}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>Ciclo de Cobrança</Label>
            <Select 
              value={cycle} 
              onChange={(e) => setCycle(e.target.value)}
            >
              {cycles.map((cycleOption) => (
                <option key={cycleOption.value} value={cycleOption.value}>
                  {cycleOption.label}
                  {cycleOption.value === 'YEARLY' && ' (10% desconto)'}
                </option>
              ))}
            </Select>
          </FormGroup>

          <Elements stripe={stripePromise}>
            <CheckoutForm 
              plan={plan} 
              cycle={cycle} 
              onSuccess={onSuccess} 
              onClose={onClose} 
            />
          </Elements>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CheckoutModal;