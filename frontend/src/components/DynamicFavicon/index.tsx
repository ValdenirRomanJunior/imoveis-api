import React, { useEffect } from 'react';

interface DynamicFaviconProps {
  faviconUrl?: string;
}

const DynamicFavicon: React.FC<DynamicFaviconProps> = ({ faviconUrl }) => {
  useEffect(() => {
    console.log('DynamicFavicon - faviconUrl recebida:', faviconUrl);
    
    if (!faviconUrl) {
      console.log('DynamicFavicon - Nenhuma URL de favicon fornecida');
      return;
    }

    console.log('DynamicFavicon - Processando favicon:', faviconUrl);

    // Remove existing favicon links
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    console.log('DynamicFavicon - Removendo', existingFavicons.length, 'favicons existentes');
    existingFavicons.forEach(link => link.remove());

    // Detectar tipo de arquivo baseado na extensão
    const isIcoFile = faviconUrl.toLowerCase().includes('.ico');
    const contentType = isIcoFile ? 'image/x-icon' : 'image/png';
    
    console.log('DynamicFavicon - Tipo detectado:', contentType, 'para URL:', faviconUrl);

    // Create main favicon link (prioritário)
    const mainLink = document.createElement('link');
    mainLink.rel = 'icon';
    mainLink.type = contentType;
    mainLink.href = faviconUrl;
    document.head.appendChild(mainLink);
    console.log('DynamicFavicon - Adicionado favicon principal:', faviconUrl);

    // Create shortcut icon (fallback para browsers antigos)
    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.type = contentType;
    shortcutLink.href = faviconUrl;
    document.head.appendChild(shortcutLink);
    console.log('DynamicFavicon - Adicionado shortcut icon:', faviconUrl);

    // Se for PNG, criar links com tamanhos específicos
    if (!isIcoFile) {
      const sizes = ['16x16', '32x32'];
      sizes.forEach(size => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = faviconUrl;
        link.setAttribute('sizes', size);
        document.head.appendChild(link);
        console.log('DynamicFavicon - Adicionado favicon', size, ':', faviconUrl);
      });
    }

    // Apple touch icon
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.href = faviconUrl;
    appleLink.setAttribute('sizes', '180x180');
    document.head.appendChild(appleLink);
    console.log('DynamicFavicon - Adicionado apple-touch-icon:', faviconUrl);
    
    console.log('DynamicFavicon - Favicon configurado com sucesso');
  }, [faviconUrl]);

  return null; // This component doesn't render anything
};

export default DynamicFavicon;