import React, { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

const FB_PIXEL_ID = '1329570232233482';

const MetaPixel: React.FC = () => {
  useEffect(() => {
    const SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

    // Garante stub fbq em TS strict
    if (typeof window !== 'undefined' && !window.fbq) {
      const fbq: any = function (...args: any[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      window.fbq = fbq;
      window._fbq = fbq;
    }

    // Injeta script no head se necessário
    const ensureScript = () => {
      const exists = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (exists) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = SCRIPT_SRC;
      script.onload = () => {
        try {
          window.fbq?.('init', FB_PIXEL_ID);
          window.fbq?.('track', 'PageView');
        } catch {
          /* silencioso */
        }
      };
      document.head?.appendChild(script);
    };

    if (typeof document !== 'undefined') {
      ensureScript();
    }

    // Chama init/track imediatamente (stub enfileira se ainda não carregou)
    try {
      window.fbq?.('init', FB_PIXEL_ID);
      window.fbq?.('track', 'PageView');
    } catch {
      /* silencioso */
    }
  }, []);

  // Não renderiza nada na tela
  return null;
};

export default MetaPixel;