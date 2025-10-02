import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  SuccessCard,
  SuccessIcon,
  Title,
  Subtitle,
  InfoSection,
  InfoItem,
  InfoLabel,
  InfoValue,
  CopyButton,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  LoadingSpinner
} from './styles';

interface UserData {
  id: number;
  slug: string;
  email: string;
  proprietario: string;
  lastName: string;
  phone: string;
  domain?: string;
}

const RegisterSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [copiedField, setCopiedField] = useState<string>('');

  useEffect(() => {
    const data = (location.state as any)?.userData as UserData;
    if (data) {
      setUserData(data);
    } else {
      // Se não há dados, redireciona para home
      navigate('/');
    }
  }, [location.state, navigate]);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const generateSubdomainUrl = (slug: string) => {
    return `https://${slug.toLowerCase().replace(/\s+/g, '-')}.standi.com.br`;
  };

  const generateSystemUrl = (slug: string) => {
    return `https://app.standi.com.br/${slug.toLowerCase().replace(/\s+/g, '-')}`;
  };

  if (!userData) {
    return (
      <Container>
        <LoadingSpinner>Carregando...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <SuccessCard>
        <SuccessIcon>✓</SuccessIcon>
        <Title>Conta Criada com Sucesso!</Title>
        <Subtitle>
          Parabéns! Sua conta foi criada e está pronta para uso. 
          Guarde essas informações importantes:
        </Subtitle>

        <InfoSection>
          <InfoItem>
            <InfoLabel>Nome da Imobiliária:</InfoLabel>
            <InfoValue>{userData.slug}</InfoValue>
          </InfoItem>

       

          <InfoItem>
            <InfoLabel>Email de Acesso:</InfoLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoValue>{userData.email}</InfoValue>
              <CopyButton 
                onClick={() => copyToClipboard(userData.email, 'email')}
                copied={copiedField === 'email'}
              >
                {copiedField === 'email' ? 'Copiado!' : 'Copiar'}
              </CopyButton>
            </div>
          </InfoItem>

        

          <InfoItem>
            <InfoLabel>URL do Subdomínio:</InfoLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoValue>{generateSubdomainUrl(userData.slug)}</InfoValue>
              <CopyButton 
                onClick={() => copyToClipboard(generateSubdomainUrl(userData.slug), 'subdomain')}
                copied={copiedField === 'subdomain'}
              >
                {copiedField === 'subdomain' ? 'Copiado!' : 'Copiar'}
              </CopyButton>
            </div>
          </InfoItem>

          <InfoItem>
            <InfoLabel>URL de Acesso ao Sistema:</InfoLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoValue>https://standi.com.br/login</InfoValue>
              <CopyButton 
                onClick={() => copyToClipboard(generateSystemUrl(userData.slug), 'system')}
                copied={copiedField === 'system'}
              >
                {copiedField === 'system' ? 'Copiado!' : 'Copiar'}
              </CopyButton>
            </div>
          </InfoItem>

          <InfoItem>
            <InfoLabel>ID da Conta:</InfoLabel>
            <InfoValue>#{userData.id}</InfoValue>
          </InfoItem>
        </InfoSection>

        <ActionButtons>
          <PrimaryButton 
            onClick={() => window.open(generateSystemUrl(userData.slug), '_blank')}
          >
            Acessar Sistema
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/')}>
            Voltar ao Site
          </SecondaryButton>
        </ActionButtons>
      </SuccessCard>
    </Container>
  );
};

export default RegisterSuccess;