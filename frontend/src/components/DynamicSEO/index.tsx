import React, { useEffect } from 'react';

type Props = {
  facebookPixelId?: string;
  keywords?: string;
  title?: string;
};

const DynamicSEO: React.FC<Props> = ({ facebookPixelId, keywords, title }) => {
  // Document title
  useEffect(() => {
    if (typeof title !== 'undefined') {
      document.title = title || '';
    }
  }, [title]);

  // Meta keywords
  useEffect(() => {
    if (typeof keywords !== 'undefined') {
      let meta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'keywords');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', keywords || '');
    }
  }, [keywords]);

  // Facebook Pixel
  useEffect(() => {
    if (!facebookPixelId) return;
    const w = window as any;

    if (w.fbq) {
      try {
        w.fbq('init', facebookPixelId);
        w.fbq('track', 'PageView');
      } catch (_) {}
      return;
    }

    (function (f: any, b: Document, e: string, v: string, n?: any, t?: HTMLScriptElement, s?: Element) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    try {
      w.fbq('init', facebookPixelId);
      w.fbq('track', 'PageView');
    } catch (_) {}
  }, [facebookPixelId]);

  return null;
};

export default DynamicSEO;
export {};