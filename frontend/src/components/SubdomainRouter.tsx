import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Contexto para compartilhar o companyName
const SubdomainContext = createContext<{ companyName: string | null }>({ companyName: null });

// Hook para usar o contexto
export const useSubdomain = () => useContext(SubdomainContext);

// Lazy load do componente Site
const LazySite = React.lazy(() => import('../pages/Site'));
const LazyImoveis = React.lazy(() => import('../pages/Site/Properties'));
const LazyDetail = React.lazy(() => import('../pages/Site/Detail'));

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
    
    // Em produção, detectar subdomínio primeiro
    if (!isLocalhost) {
      const parts = hostname.split('.');
      console.log('SubdomainRouter - Hostname parts:', parts);
      
      // Verificar se é um subdomínio do standi.com.br
      if (parts.length >= 3 && parts[parts.length - 2] === 'standi' && parts[parts.length - 1] === 'br') {
        const subdomain = parts[0];
        console.log('SubdomainRouter - Detected subdomain:', subdomain);
        
        // Verificar se não é 'www' ou outros subdomínios do sistema
        if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin' && subdomain !== 'app') {
          console.log('SubdomainRouter - Valid client subdomain detected:', subdomain);
          setIsSubdomain(true);
          setCompanyName(subdomain);
          setIsInitialized(true);
          return; // Não redirecionar, apenas definir o estado
        } else {
          console.log('SubdomainRouter - System subdomain, ignoring:', subdomain);
        }
      } else {
        console.log('SubdomainRouter - Not a standi.com.br subdomain');
      }
    }
    
    // Em localhost, verificar rota /site/ ou parâmetro subdomain
    if (isLocalhost) {
      // Primeiro verificar se estamos em uma rota /site/
      if (location.pathname.startsWith('/site/')) {
        const pathParts = location.pathname.split('/');
        if (pathParts.length >= 3 && pathParts[1] === 'site') {
          const companySlug = pathParts[2];
          console.log('SubdomainRouter - Site route detected in localhost:', companySlug);
          setIsSubdomain(true);
          setCompanyName(companySlug);
          setIsInitialized(true);
          return;
        }
      }
      
      // Verificar parâmetro de subdomínio
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
        setIsInitialized(true);
        return;
      }
    }
    
    setIsInitialized(true);
  }, [navigate, location]);

  // Aguardar inicialização
  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  // Se for um subdomínio em produção, renderizar diretamente o componente Site
  if (isSubdomain && companyName) {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    // Em produção (subdomínio real), renderizar Site diretamente baseado na URL
    if (!isLocalhost && !location.pathname.startsWith('/site/')) {
      const pathname = location.pathname;
      
      // Determinar qual componente renderizar baseado na URL
       if (pathname === '/' || pathname === '') {
         return (
           <SubdomainContext.Provider value={{ companyName }}>
             <div className="subdomain-site">
               <React.Suspense fallback={<div>Carregando...</div>}>
                 <LazySite />
               </React.Suspense>
             </div>
           </SubdomainContext.Provider>
         );
       } else if (pathname === '/imoveis' || pathname.startsWith('/imoveis')) {
         return (
           <SubdomainContext.Provider value={{ companyName }}>
             <div className="subdomain-site">
               <React.Suspense fallback={<div>Carregando...</div>}>
                 <LazyImoveis />
               </React.Suspense>
             </div>
           </SubdomainContext.Provider>
         );
       } else if (pathname.startsWith('/detail/')) {
         return (
           <SubdomainContext.Provider value={{ companyName }}>
             <div className="subdomain-site">
               <React.Suspense fallback={<div>Carregando...</div>}>
                 <LazyDetail />
               </React.Suspense>
             </div>
           </SubdomainContext.Provider>
         );
       } else {
         // Para outras rotas, renderizar Site como fallback
         return (
           <SubdomainContext.Provider value={{ companyName }}>
             <div className="subdomain-site">
               <React.Suspense fallback={<div>Carregando...</div>}>
                 <LazySite />
               </React.Suspense>
             </div>
           </SubdomainContext.Provider>
         );
       }
    }
    
    // Em localhost ou rotas /site/, usar o sistema de rotas normal
    return (
      <div className="subdomain-site">
       "login""
      </div>
    );
  }

  // Caso contrário, renderizar normalmente (aplicação principal)
  return <>"{"/login"}"</>;
};

export default SubdomainRouter;