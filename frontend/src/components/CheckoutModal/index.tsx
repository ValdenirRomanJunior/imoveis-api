import React, { useState } from 'react';
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
  RadioGroup,
  RadioOption,
  RadioInput,
  RadioLabel,
  SubmitButton, 
  ErrorMessage,
  SuccessMessage,
  LoadingSpinner
} from './styles';
import api from '../../utils/requests';

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

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan, onSuccess }) => {
  const [billingType, setBillingType] = useState<string>('CREDIT_CARD');
  const [cycle, setCycle] = useState<string>('MONTHLY');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const billingTypes = [
    { value: 'CREDIT_CARD', label: 'Cartão de Crédito' },
    { value: 'BOLETO', label: 'Boleto Bancário' },
    { value: 'PIX', label: 'PIX' }
  ];

  const cycles = [
    { value: 'MONTHLY', label: 'Mensal' },
    { value: 'QUARTERLY', label: 'Trimestral' },
    { value: 'SEMIANNUALLY', label: 'Semestral' },
    { value: 'YEARLY', label: 'Anual' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plan) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/asaas/checkout', {
        planCode: plan.code,
        billingType,
        cycle
      });

      if (response.data.success) {
        // Redirecionar para o checkout pronto do ASAAS
        window.location.href = response.data.checkoutUrl;
      } else {
        setError(response.data.message || 'Erro ao criar checkout');
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

  const getCyclePrice = (basePrice: number, cycleValue: string) => {
    switch (cycleValue) {
      case 'QUARTERLY':
        return basePrice * 3 * 0.95; // 5% desconto
      case 'SEMIANNUALLY':
        return basePrice * 6 * 0.90; // 10% desconto
      case 'YEARLY':
        return basePrice * 12 * 0.85; // 15% desconto
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

  if (!isOpen || !plan) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Checkout - {plan.name}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <PlanInfo>
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
              {formatPrice(getCyclePrice(plan.price, cycle))}
              {cycle === 'MONTHLY' && '/mês'}
              {cycle === 'QUARTERLY' && '/trimestre'}
              {cycle === 'SEMIANNUALLY' && '/semestre'}
              {cycle === 'YEARLY' && '/ano'}
            </PlanPrice>
          </PlanInfo>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Ciclo de Cobrança</Label>
              <Select 
                value={cycle} 
                onChange={(e) => setCycle(e.target.value)}
                disabled={loading}
              >
                {cycles.map((cycleOption) => (
                  <option key={cycleOption.value} value={cycleOption.value}>
                    {cycleOption.label}
                    {cycleOption.value === 'QUARTERLY' && ' (5% desconto)'}
                    {cycleOption.value === 'SEMIANNUALLY' && ' (10% desconto)'}
                    {cycleOption.value === 'YEARLY' && ' (15% desconto)'}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Forma de Pagamento</Label>
              <RadioGroup>
                {billingTypes.map((type) => (
                  <RadioOption key={type.value}>
                    <RadioInput
                      type="radio"
                      name="billingType"
                      value={type.value}
                      checked={billingType === type.value}
                      onChange={(e) => setBillingType(e.target.value)}
                      disabled={loading}
                    />
                    <RadioLabel>{type.label}</RadioLabel>
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner />
                  Processando...
                </>
              ) : (
                `Assinar por ${formatPrice(getCyclePrice(plan.price, cycle))}`
              )}
            </SubmitButton>
          </form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CheckoutModal;