import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SubdomainRouterProps {
  children: React.ReactNode;
}

const SubdomainRouter: React.FC<SubdomainRouterProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubdomain, setIsSubdomain] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    console.log('SubdomainRouter - Debug Info:', {
      hostname,
      isLocalhost,
      pathname: location.pathname,
      search: location.search,
      fullUrl: window.location.href
    });
    
    // Verificar se estamos em uma rota /site/ (tanto em localhost quanto em produção)
    if (location.pathname.startsWith('/site/')) {
      const pathParts = location.pathname.split('/');
      if (pathParts.length >= 3 && pathParts[1] === 'site') {
        const companySlug = pathParts[2];
        console.log('SubdomainRouter - Site route detected:', companySlug);
        setIsSubdomain(true);
        setCompanyName(companySlug);
        setIsInitialized(true);
        return;
      }
    }
    
    // Detectar se é um subdomínio real (apenas em produção)
    if (!isLocalhost) {
      const parts = hostname.split('.');
      console.log('SubdomainRouter - Hostname parts:', parts);
      
      // Verificar se é um subdomínio do standi.com.br
      if (parts.length >= 3 && parts[parts.length - 2] === 'standi' && parts[parts.length - 1] === 'br') {
        const subdomain = parts[0];
        console.log('SubdomainRouter - Detected subdomain:', subdomain);
        
        // Verificar se não é 'www' ou outros subdomínios do sistema
        if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
          console.log('SubdomainRouter - Valid subdomain, redirecting to site route');
          setIsSubdomain(true);
          setCompanyName(subdomain);
          
          // Redirecionar para a rota /site/ se não estiver já nela
          if (!location.pathname.startsWith('/site/')) {
            const targetPath = location.pathname === '/' ? `/site/${subdomain}` : `/site/${subdomain}${location.pathname}`;
            console.log('SubdomainRouter - Navigating to:', targetPath);
            navigate(`${targetPath}${location.search}`);
          }
        } else {
          console.log('SubdomainRouter - System subdomain, ignoring:', subdomain);
        }
      } else {
        console.log('SubdomainRouter - Not a standi.com.br subdomain');
      }
    } else {
      // Em localhost, verificar parâmetro de subdomínio
      const urlParams = new URLSearchParams(window.location.search);
      const subdomainParam = urlParams.get('subdomain');
      console.log('SubdomainRouter - Localhost subdomain param:', subdomainParam);
      
      if (subdomainParam) {
        setIsSubdomain(true);
        setCompanyName(subdomainParam);
        
        if (!location.pathname.startsWith('/site/')) {
          const targetPath = location.pathname === '/' ? `/site/${subdomainParam}` : `/site/${subdomainParam}${location.pathname}`;
          console.log('SubdomainRouter - Localhost navigating to:', targetPath);
          navigate(targetPath);
        }
      }
    }
    
    setIsInitialized(true);
  }, [navigate, location]);

  // Aguardar inicialização
  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  // Se for um subdomínio ou rota /site/, renderizar o conteúdo do site
  if (isSubdomain && companyName) {
    return (
      <div className="subdomain-site">
        {children}
      </div>
    );
  }

  // Caso contrário, renderizar normalmente (aplicação principal)
  return <>{children}</>;
};

export default SubdomainRouter;