import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import {
  GuideContainer,
  GuideContent,
  GuideHeader,
  GuideTitle,
  GuideSubtitle,
  GuideSection,
  SectionTitle,
  SectionContent,
  StepCard,
  StepNumber,
  FeatureGrid,
  FeatureCard,
  NavigationTip,
  BackToTop
} from './styles';
import { 
  FaUserPlus, 
  FaCreditCard, 
  FaHome, 
  FaUsers, 
  FaHandshake, 
  FaPalette,
  FaGlobe,
  FaChartLine,
  FaCog,
  FaArrowUp,
  FaQuestionCircle,
  FaRocket,
  FaShieldAlt,
  FaMobile
} from 'react-icons/fa';

const Guide: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GuideContainer>
      <Header />
      <GuideContent>
        <GuideHeader>
          <GuideTitle>
            <FaQuestionCircle style={{ marginRight: '1rem', color: '#667eea' }} />
            Guia Completo do Sistema Standi
          </GuideTitle>
          <GuideSubtitle>
            Aprenda a usar todas as funcionalidades da plataforma, desde o cadastro inicial até a gestão completa dos seus imóveis e leads.
          </GuideSubtitle>
        </GuideHeader>

        {/* Seção: Primeiros Passos */}
        <GuideSection>
          <SectionTitle>
            <FaRocket />
            Primeiros Passos
          </SectionTitle>
          <SectionContent>
            <h3>1. Cadastro no Sistema e Acesso</h3>
            <StepCard>
              <StepNumber>1</StepNumber>
              <strong>Acesse o site da Standi</strong>
              <p>Clique em "Teste Grátis" na página inicial, abrirá uma pop-up e preencha seus dados pessoais.</p>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <strong>Dados de acesso</strong>
              <p>Após o cadastro aguarde um pouco e o sistema retornará seus dados de acesso e verifique sua caixa de entrada de e-mail que enviamos todos os seus dados para lá.Dica: Salve esses dados em um lugar seguro.</p>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <strong>Acesso ao sistema</strong>
              <p>Após o cadastro, na mesma tela que mostra seus dados, clique no em "Acessar sistema" que você será redireccionado para seu painel ou acesse o site da Standi e faça o Login com seus dados de acesso.</p>
          
            </StepCard>

            <NavigationTip>
              <strong>Dica:</strong> Mantenha seus dados sempre atualizados para melhor experiência na plataforma.
            </NavigationTip>
          </SectionContent>
        </GuideSection>

        {/* Seção: Escolha de Planos */}
        <GuideSection>
          <SectionTitle>
            <FaCreditCard />
            Escolha de Planos
          </SectionTitle>
          <SectionContent>
            <h3>Planos Disponíveis</h3>
            <p>Ao se cadastrar, automaticamente você estará no plano de teste:</p>
            
            <FeatureGrid>
              <FeatureCard>
                <FaShieldAlt />
                <h4>Plano de Teste</h4>
                <p>Ideal para corretores Testar as funcionalidades básicas da Standi poe 3 dias.</p>
              </FeatureCard>
              <FeatureCard>
                <FaChartLine />
                <h4>Plano Lite</h4>
                <p>Para corretores iniciantes que queiram se posicionar no mercado digital.</p>
              </FeatureCard>
              <FeatureCard>
                <FaRocket />
                <h4>Plano Pro</h4>
                <p>Solução mais completa com todas as funcionalidades da Standi.</p>
              </FeatureCard>
            </FeatureGrid>

            <h3>Como Escolher seu Plano</h3>
            <ol>
              <li>Acesse a seção "Minha Conta" no icone superior direito com suas iniciais</li>
              <li>Clique em "Ver todos os planos"</li>
              <li>Selecione o plano que melhor atende suas necessidades</li>
              <li>Complete o processo de pagamento</li>
              <li>Comece a usar todas as funcionalidades disponíveis</li>
            </ol>
          </SectionContent>
        </GuideSection>

        {/* Seção: Gestão de Imóveis */}
        <GuideSection>
          <SectionTitle>
            <FaHome />
            Gestão de Imóveis
          </SectionTitle>
          <SectionContent>
            <h3>Cadastro de Imóveis</h3>
            <p>Gerencie seu portfólio de imóveis de forma eficiente:</p>
            
            <StepCard>
              <StepNumber>1</StepNumber>
              <strong>Adicionar Novo Imóvel</strong>
              <p>Clique em "Imóveis" no menu e depois no "Icone da casinha". Preencha toas as informações detalhadas.</p>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <strong>Upload de Fotos</strong>
              <p>Adicione fotos de alta qualidade do imóvel. Recomendamos pelo menos 5 fotos por imóvel e no máximo 20.</p>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <strong>Edição e exclusão</strong>
              <p>Para editae e excluir, ao do lado dirito de cada imóvel na página imóveis terá as opções.</p>
            </StepCard>

            <h3>Funcionalidades Principais</h3>
            <ul>
              <li><strong>Busca Avançada:</strong> Filtre imóveis por localização, finalidade e tipo.</li>
              <li><strong>Edição Rápida:</strong> Atualize informações facilmente</li>
              <li><strong>Status do Imóvel:</strong> Controle se está disponível</li>
              
            </ul>
          </SectionContent>
        </GuideSection>

        {/* Seção: Gestão de Leads */}
        <GuideSection>
          <SectionTitle>
            <FaUsers />
            Gestão de Leads
          </SectionTitle>
          <SectionContent>
            <h3>O que são Leads?</h3>
            <p>Leads são potenciais clientes interessados ativos ou já resolvidos nos seus imóveis. O sistema captura automaticamente informações de visitantes do seu site.</p>

            <h3>Como Gerenciar Leads</h3>
            <StepCard>
              <StepNumber>1</StepNumber>
              <strong>Visualizar Leads</strong>
              <p>Acesse "Leads" no menu para ver todos os interessados ativos ou já resolvidos nos seus imóveis.</p>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <strong>Classificar por Interesse</strong>
              <p> Quando um Lead vem do site ou é criado direto no sistema ele terá uma oportunidade em aberto na aba "portunidades". Podendo organizar seus  leads por nível de interesse.</p>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <strong>Acompanhar Atendimento</strong>
              <p>Veja em que etapa seu lead está no funil na aba "Oportunidades".</p>
            </StepCard>

            <NavigationTip>
              <strong>Dica Importante:</strong> Responda rapidamente aos leads para aumentar suas chances de conversão!
            </NavigationTip>
          </SectionContent>
        </GuideSection>

        {/* Seção: Oportunidades */}
        <GuideSection>
          <SectionTitle>
            <FaHandshake />
            Oportunidades de Negócio
          </SectionTitle>
          <SectionContent>
            <h3>Transformando Leads em Oportunidades</h3>
            <p>Quando um lead demonstra interesse real, ele se torna uma oportunidade de negócio.</p>

            <h3>Gestão de Oportunidades</h3>
            <ul>
              <li><strong>Pipeline de Vendas:</strong> Acompanhe o progresso de cada negociação</li>
             
    
            </ul>

            <h3>Etapas do Funil de Vendas</h3>
            <ol>
              <li><strong>Primeiro Contato:</strong> Lead inicial interessado</li>
              <li><strong>Qualificação:</strong> Verificação do perfil e necessidades</li>
              <li><strong>Apresentação:</strong> Visita ao imóvel ou apresentação detalhada</li>
              <li><strong>Proposta:</strong> Negociação de valores e condições</li>
              <li><strong>Fechamento:</strong> Conclusão da venda ou locação</li>
            </ol>
          </SectionContent>
            <NavigationTip>
              <strong>Importante:</strong> Cadastre as etapas do seu funil de vendas em "oportunidades" em seguida clique em "Etapas" e cadastre seu todas as etapas, pois sem elas nao é possivel receber ou cadastrar leads.
            </NavigationTip>
        </GuideSection>

        {/* Seção: Personalização */}
        <GuideSection>
          <SectionTitle>
            <FaPalette />
            Personalização do Site
          </SectionTitle>
          <SectionContent>
            <h3>Editor de Tema</h3>
            <p>Personalize a aparência do seu site de imóveis para refletir sua marca:</p>

            <StepCard>
              <StepNumber>1</StepNumber>
              <strong>Acesse o Editor</strong>
              <p>Clique em "Editor de Tema" no menu lateral para abrir as opções de personalização.</p>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <strong>Escolha Cores</strong>
              <p>Defina a paleta de cores que representa sua marca e identidade visual.</p>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <strong>Configure Layout</strong>
              <p>Ajuste a disposição dos elementos, fontes e espaçamentos.</p>
            </StepCard>
                <StepCard>
              <StepNumber>4</StepNumber>
              <strong>Configure seu domínio próprio</strong>
              <p>Vá na aba "Configurações" e adicione seu domínio próprio, lá também tem um link explicando como apontar para nosso servidor.</p>
            </StepCard>

            <h3>Opções de Personalização</h3>
            <ul>
              <li>Cores primárias e secundárias</li>
              <li>Logotipo e favicon</li>
              <li>Fontes e tipografia</li>
              <li>Layout da página inicial</li>
              <li>Informações de contato</li>
            </ul>
          </SectionContent>
        </GuideSection>

        {/* Seção: Site Público */}
        <GuideSection>
          <SectionTitle>
            <FaGlobe />
            Seu Site Público
          </SectionTitle>
          <SectionContent>
            <h3>Site Automático</h3>
            <p>O Standi gera automaticamente um site profissional com todos os seus imóveis:</p>

            <FeatureGrid>
              <FeatureCard>
                <FaMobile />
                <h4>Responsivo</h4>
                <p>Seu site funciona perfeitamente em computadores, tablets e celulares.</p>
              </FeatureCard>
              <FeatureCard>
                <FaChartLine />
                <h4>SEO Otimizado</h4>
                <p>Configurado para aparecer bem nos resultados de busca do Google.</p>
              </FeatureCard>
              <FeatureCard>
                <FaShieldAlt />
                <h4>Seguro e Rápido</h4>
                <p>Hospedagem segura com carregamento rápido das páginas.</p>
              </FeatureCard>
            </FeatureGrid>

            <h3>Funcionalidades do Site</h3>
            <ul>
              <li>Catálogo completo dos seus imóveis</li>
              <li>Busca avançada para visitantes</li>
              <li>Formulários de contato automáticos</li>
              <li>Galeria de fotos profissional</li>
              <li>Integração com WhatsApp</li>
              <li>Captura automática de leads</li>
            </ul>
          </SectionContent>
        </GuideSection>

        {/* Seção: Configurações */}
        <GuideSection>
          <SectionTitle>
            <FaCog />
            Configurações da Conta
          </SectionTitle>
          <SectionContent>
            <h3>Minha Conta</h3>
            <p>Gerencie suas informações pessoais e configurações do sistema:</p>

            <h3>Configurações Disponíveis</h3>
            <ul>
              <li><strong>Dados Pessoais:</strong> Nome, email, telefone e endereço</li>
      
              <li><strong>Senha:</strong> Altere sua senha de acesso</li>
             
              <li><strong>Pagamentos:</strong> Aqui poderá ver as informações sobre seus pagamentos e assinaturas.</li>
            </ul>

            <NavigationTip>
              <strong>Segurança:</strong> Use senhas fortes e mantenha seus dados sempre atualizados.
            </NavigationTip>
          </SectionContent>
        </GuideSection>

        {/* Seção: Dicas e Melhores Práticas */}
        <GuideSection>
          <SectionTitle>
            <FaChartLine />
            Dicas para Sucesso
          </SectionTitle>
          <SectionContent>
            <h3>Melhores Práticas</h3>
            <ul>
              <li><strong>Fotos de Qualidade:</strong> Use imagens bem iluminadas e em alta resolução</li>
              <li><strong>Descrições Completas:</strong> Detalhe todas as características dos imóveis</li>
              <li><strong>Preços Competitivos:</strong> Pesquise o mercado e mantenha preços atualizados</li>
              <li><strong>Resposta Rápida:</strong> Atenda leads em no máximo 2 horas</li>
              <li><strong>Acompanhamento:</strong> Mantenha contato regular com interessados</li>
            </ul>

            <h3>Métricas Importantes</h3>
            <ul>
              <li>Número de visualizações por imóvel</li>
              <li>Taxa de conversão de leads</li>
              <li>Tempo médio de venda</li>
              <li>Origem dos leads (site, redes sociais, etc.)</li>
            </ul>
          </SectionContent>
        </GuideSection>

        {showBackToTop && (
          <BackToTop onClick={scrollToTop}>
            <FaArrowUp />
          </BackToTop>
        )}
      </GuideContent>
    </GuideContainer>
  );
};

export default Guide;