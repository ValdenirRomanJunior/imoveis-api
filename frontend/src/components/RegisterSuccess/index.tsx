import React, { useState } from 'react';
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

interface RegisterSuccessProps {
  userData: {
    slug: string;
    email: string;
    proprietario: string;
    phone: string;  
    password: string;
    domain: string; // Mudança: domain agora é diretamente uma string, não dentro de account
  };
 
  onBackToHome: () => void;
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ userData, onBackToHome }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const subdomainUrl = `https://${userData.domain}`;
  const systemUrl = `${subdomainUrl}/admin`;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleGoToSystem = () => {
    setIsRedirecting(true);
    // Redireciona para o sistema em uma nova aba
    window.open(systemUrl, '_blank');
    setTimeout(() => {
      setIsRedirecting(false);
      onBackToHome();
    }, 1000);
  };

  return (
    <Container>
      <SuccessCard>
        <SuccessIcon>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </SuccessIcon>
        
        <Title>Conta criada com sucesso!</Title>
        <Subtitle>
          Sua conta foi criada e já está pronta para uso. Abaixo estão os dados da sua nova conta:
        </Subtitle>

        <InfoSection>
          <InfoItem>
            <InfoLabel>Imobiliária</InfoLabel>
            <InfoValue>{userData.slug}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Email de Acesso:</InfoLabel>
            <InfoValue>{userData.email}</InfoValue>
            <CopyButton 
              onClick={() => copyToClipboard(userData.email, 'email')}
              copied={copiedField === 'email'}
            >
              {copiedField === 'email' ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Senha de Acesso:</InfoLabel>
            <InfoValue>{userData.password}</InfoValue>
            <CopyButton 
              onClick={() => copyToClipboard(userData.password, 'password')}
              copied={copiedField === 'password'}
            >
              {copiedField === 'password' ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </InfoItem>


          <InfoItem>
            <InfoLabel>Site da imobiliária</InfoLabel>
            <InfoValue>{subdomainUrl}</InfoValue>
            <CopyButton 
              onClick={() => copyToClipboard(subdomainUrl, 'subdomain')}
              copied={copiedField === 'subdomain'}
            >
              {copiedField === 'subdomain' ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </InfoItem>

          <InfoItem>
            <InfoLabel>link de Acesso ao Sistema</InfoLabel>
            <InfoValue>https://standi.com.br/login</InfoValue>
            <CopyButton 
              onClick={() => copyToClipboard(systemUrl, 'system')}
              copied={copiedField === 'system'}
            >
              {copiedField === 'system' ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </InfoItem>
        </InfoSection>

        <ActionButtons>
          <PrimaryButton onClick={handleGoToSystem} disabled={isRedirecting}>
            {isRedirecting ? (
              <>
                <LoadingSpinner />
                Redirecionando...
              </>
            ) : (
              'Acessar Sistema'
            )}
          </PrimaryButton>
          <SecondaryButton onClick={onBackToHome}>
            Voltar ao Site
          </SecondaryButton>
        </ActionButtons>
      </SuccessCard>
    </Container>
  );
};

export default RegisterSuccess;