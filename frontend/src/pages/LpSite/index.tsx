import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Container,
  TopBar,
  TopBarText,
  ContentWrapper,
  MainTitle,
  SubTitle,
  VideoContainer,
  CtaText,
  CtaButton
} from './styles';

const LpSite: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const YOUTUBE_ID = 'irE_2tOSScw';

  useEffect(() => {
    // Meta Pixel Code
    const loadPixel = () => {
      const w = window as any;
      if (w.fbq) return;
      const n: any = (w.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!w._fbq) w._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = document.createElement('script');
      t.async = true;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const s = document.getElementsByTagName('script')[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      } else {
        document.head.appendChild(t);
      }
    };

    loadPixel();
    
    const w = window as any;
    if (w.fbq) {
      w.fbq('init', '1329570232233482');
      w.fbq('track', 'PageView');
    }
  }, []);

  return (
    <Container>
      {/* Meta Pixel NoScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1329570232233482&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <TopBar>
        <TopBarText>Para Imobiliárias que precisam de uma estrutura digital</TopBarText>
      </TopBar>

      <ContentWrapper>
        <MainTitle>
          Como Imobiliárias Estão Recebendo <span>10 a 15 contatos Qualificados Por Dia</span> Com um Site, Bem Posicionado Na sua Cidade Sem Gastar com Tráfego Pago.
        </MainTitle>

        <SubTitle>
          Nós da Standi Tecnologia Imobiliária cria seu Site imobiliário com Taxa de Setup + mensalidade com valor reduzido e você não precisa colocar a mão na massa.
        </SubTitle>

     

        <CtaText>
          Clique abaixo para falar comigo <span>e fecharmos sua estrutura</span>
        </CtaText>

        <CtaButton as="a" href="https://api.whatsapp.com/send?phone=45974007155" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={24} color="#ffffff" />
          QUERO SABER MAIS NO WHATSAPP
        </CtaButton>
      </ContentWrapper>
    </Container>
  );
};

export default LpSite;
