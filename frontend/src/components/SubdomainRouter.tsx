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
    
    // Detectar se é um subdomínio
    if (!isLocalhost) {
      const parts = hostname.split('.');
      console.log('SubdomainRouter - Hostname parts:', parts);
      
      // Verificar se é um subdomínio do standi.com.br
      if (parts.length >= 3 && parts[parts.length - 2] === 'standi' && parts[parts.length - 1] === 'br') {
        const subdomain = parts[0];
        console.log('SubdomainRouter - Detected subdomain:', subdomain);
        
        // Verificar se não é 'www' ou outros subdomínios do sistema
        if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
          console.log('SubdomainRouter - Valid subdomain, setting state');
          setIsSubdomain(true);
          setCompanyName(subdomain);
          
          // Redirecionar para o template do site se não estiver já na rosta correta
          if (!location.pathname.startsWith('/site/')) {
            const targetPath = location.pathname === '/' ? `/site/${subdomain}` : `/site/${subdomain}${location.pathname}`;
            console.log('SubdomainRouter - Navigating to:', targetPath);
            navigate(`${targetPath}${location.search}`);
          } else {
            console.log('SubdomainRouter - Already on correct path:', location.pathname);
          }
        } else {
          console.log('SubdomainRouter - System subdomain, ignoring:', subdomain);
        }
      } else {
        console.log('SubdomainRouter - Not a standi.com.br subdomain');
      }
    } else {
      // Em localhost, verificar se há parâmetro de subdomínio na URL
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
  }, [navigate, location]);

  // Se for um subdomínio, renderizar apenas o conteúdo do site
  if (isSubdomain && companyName) {
    return (
      <div className="subdomain-site">
        {children}
      </div>
    );
  }

  // Caso contrário, renderizar normalmente
  return <>{children}</>;
};

export default SubdomainRouter;