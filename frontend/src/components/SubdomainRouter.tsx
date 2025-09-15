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
    
    // Detectar se é um subdomínio
    if (!isLocalhost) {
      const parts = hostname.split('.');
      
      // Verificar se é um subdomínio do standi.com.br
      if (parts.length >= 3 && parts[parts.length - 2] === 'standi' && parts[parts.length - 1] === 'br') {
        const subdomain = parts[0];
        
        // Verificar se não é 'www' ou outros subdomínios do sistema
        if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin') {
          setIsSubdomain(true);
          setCompanyName(subdomain);
          
          // Redirecionar para o template do site se não estiver já na rota correta
          if (!location.pathname.startsWith('/site/')) {
            const targetPath = location.pathname === '/' ? `/site/${subdomain}` : `/site/${subdomain}${location.pathname}`;
            navigate(`${targetPath}${location.search}`);
          }
        }
      }
    } else {
      // Em localhost, verificar se há parâmetro de subdomínio na URL
      const urlParams = new URLSearchParams(window.location.search);
      const subdomainParam = urlParams.get('subdomain');
      
      if (subdomainParam) {
        setIsSubdomain(true);
        setCompanyName(subdomainParam);
        
        if (!location.pathname.startsWith('/site/')) {
          const targetPath = location.pathname === '/' ? `/site/${subdomainParam}` : `/site/${subdomainParam}${location.pathname}`;
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