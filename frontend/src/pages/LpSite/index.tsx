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
          Como Imobiliárias Estão Recebendo <span>10 a 15 contatos Qualificados Por Dia</span> Com um Site, Bem Posicionado Na sua Cidade.
        </MainTitle>

        <SubTitle>
          Assista ao vídeo de 1 minuto onde Valdenir Roman mostra o que a Standi Tecnologia Imobiliária tem para te ajudar a encher o CRM de contatos em que você não precisa gastar dias configurando.
        </SubTitle>

        <VideoContainer onClick={() => setPlaying(true)}>
          {!playing ? (
            <>
              <img
                className="video-thumb"
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                alt="Thumb do vídeo"
              />
              <svg className="play-icon" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#fff" opacity="0.95" />
                <polygon points="40,30 78,50 40,70" fill="#ff0000" />
              </svg>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&playsinline=1&fs=1&disablekb=1&showinfo=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </VideoContainer>

        <CtaText>
          Clique abaixo para falar comigo <span>e fecharmos sua estrutura</span>
        </CtaText>

        <CtaButton>
          <FaWhatsapp color="#ffffff" />
          QUERO SABER MAIS NO WHATSAPP
        </CtaButton>
      </ContentWrapper>
    </Container>
  );
};

export default LpSite;
