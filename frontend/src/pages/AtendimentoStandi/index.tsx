import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { 
  Container, 
  Header, 
  Title, 
  Section, 
  SectionTitle, 
  ProcessStep, 
  QuickResponse, 
  CopyButton, 
  LinkButton,
  AccessDenied,
  LoadingContainer
} from './styles';

interface QuickResponseItem {
  id: string;
  title: string;
  text: string;
}

const AtendimentoStandi: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento para verificar perfil
    const timer = setTimeout(() => {
      setIsLoading(false);
      const isAdmin = user?.perfis ? Object.values(user.perfis).some(obj => obj === 'ADMIN') : false;
      if (!user || !isAdmin) {
        navigate('/');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const quickResponses: QuickResponseItem[] = [
    {
      id: '1',
      title: 'Boas-vindas',
      text: 'Olá! Bem-vindo ao Standi. Estou aqui para ajudá-lo com qualquer dúvida sobre nossa plataforma. Como posso auxiliá-lo hoje?'
    },
    {
      id: '2',
      title: 'Problemas técnicos',
      text: 'Entendo que você está enfrentando dificuldades técnicas. Vou verificar isso imediatamente. Pode me fornecer mais detalhes sobre o problema?'
    },
    {
      id: '3',
      title: 'Dúvidas sobre planos',
      text: 'Temos três planos disponíveis: Teste (gratuito por 7 dias), Lite (R$ 97/mês) e Pro (R$ 197/mês). Qual plano gostaria de conhecer melhor?'
    },
    {
      id: '4',
      title: 'Suporte para configuração',
      text: 'Vou ajudá-lo com a configuração da sua conta. Primeiro, vamos verificar se todos os dados estão corretos no seu perfil.'
    },
    {
      id: '5',
      title: 'Encerramento',
      text: 'Foi um prazer ajudá-lo hoje! Se precisar de mais alguma coisa, não hesite em entrar em contato. Tenha um ótimo dia!'
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <MdSupportAgent size={48} />
        <p>Carregando atendimento...</p>
      </LoadingContainer>
    );
  }

  const isAdmin = user?.perfis ? Object.values(user.perfis).some(obj => obj === 'ADMIN') : false;
  
  if (!user || !isAdmin) {
    return (
      <AccessDenied>
        <MdSupportAgent size={64} />
        <h2>Acesso Negado</h2>
        <p>Esta página é restrita apenas para administradores.</p>
      </AccessDenied>
    );
  }

  return (
    <Container>
      <Header>
        <MdSupportAgent size={32} />
        <Title>Atendimento Standi</Title>
      </Header>

      <Section>
        <SectionTitle>Processo de Atendimento</SectionTitle>
        <ProcessStep>
          <strong>1. Recepção:</strong> Cumprimente o cliente de forma cordial e identifique-se como suporte Standi.
        </ProcessStep>
        <ProcessStep>
          <strong>2. Identificação:</strong> Colete informações básicas do cliente (nome, empresa, tipo de problema).
        </ProcessStep>
        <ProcessStep>
          <strong>3. Diagnóstico:</strong> Faça perguntas específicas para entender o problema ou necessidade.
        </ProcessStep>
        <ProcessStep>
          <strong>4. Solução:</strong> Ofereça soluções claras e práticas, utilizando as respostas rápidas quando apropriado.
        </ProcessStep>
        <ProcessStep>
          <strong>5. Verificação:</strong> Confirme se a solução resolveu o problema do cliente.
        </ProcessStep>
        <ProcessStep>
          <strong>6. Encerramento:</strong> Finalize o atendimento de forma educada e ofereça suporte futuro.
        </ProcessStep>
      </Section>

      <Section>
        <SectionTitle>Respostas Rápidas</SectionTitle>
        {quickResponses.map((response) => (
          <QuickResponse key={response.id}>
            <h4>{response.title}</h4>
            <p>{response.text}</p>
            <CopyButton 
              onClick={() => copyToClipboard(response.text, response.id)}
              copied={copiedId === response.id}
            >
              {copiedId === response.id ? <FaCheck /> : <FaCopy />}
              {copiedId === response.id ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </QuickResponse>
        ))}
      </Section>

      <Section>
        <SectionTitle>Links Úteis</SectionTitle>
        <LinkButton href="https://standi.com.br" target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt />
          Site Oficial Standi
        </LinkButton>
        <LinkButton href="/guide" onClick={(e) => { e.preventDefault(); navigate('https://standi.com.br/guide'); }}>
          <FaExternalLinkAlt />
          Guia da Plataforma
        </LinkButton>
        <LinkButton href="/plans" onClick={(e) => { e.preventDefault(); navigate('https://standi.com.br/plans-public'); }}>
          <FaExternalLinkAlt />
          Planos e Preços
        </LinkButton>
      </Section>
    </Container>
  );
};

export default AtendimentoStandi;