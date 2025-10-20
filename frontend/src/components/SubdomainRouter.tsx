import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/requests';

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
    const resolveCustomDomain = async (host: string) => {
      try {
        const res = await api.get(`/api/accounts/resolve-domain/${host}`);
        if (res.data?.success && res.data?.tenantSlug) {
          console.log('SubdomainRouter - Custom domain resolved:', res.data);
          setIsSubdomain(true);
          setCompanyName(res.data.tenantSlug);
          setIsInitialized(true);
          return true;
        }
      } catch (e) {
        console.log('SubdomainRouter - Custom domain resolution failed:', e);
      }
      return false;
    };

    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    console.log('SubdomainRouter - Debug Info:', {
      hostname,
      isLocalhost,
      pathname: location.pathname,
      search: location.search,
      fullUrl: window.location.href
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const simulateProduction = urlParams.get('simulate') === 'production';
    const simulatedSubdomain = urlParams.get('subdomain');
    
    if (simulateProduction && simulatedSubdomain) {
      console.log('SubdomainRouter - SIMULATION MODE: Simulating production with subdomain:', simulatedSubdomain);
      setIsSubdomain(true);
      setCompanyName(simulatedSubdomain);
      setIsInitialized(true);
      return;
    }
    
    (async () => {
      if (!isLocalhost) {
        const parts = hostname.split('.');
        console.log('SubdomainRouter - Hostname parts:', parts);
        
        if (parts.length >= 3) {
          const subdomain = parts[0];
          const domain = parts.slice(1).join('.');
          console.log('SubdomainRouter - Checking subdomain:', subdomain, 'domain:', domain);
          
          if (domain === 'standi.com.br') {
            console.log('SubdomainRouter - Detected standi.com.br subdomain:', subdomain);
            
            if (subdomain !== 'www' && subdomain !== 'api' && subdomain !== 'admin' && subdomain !== 'app') {
              console.log('SubdomainRouter - Valid client subdomain detected:', subdomain);
              setIsSubdomain(true);
              setCompanyName(subdomain);
              setIsInitialized(true);
              return;
            } else {
              console.log('SubdomainRouter - System subdomain, ignoring:', subdomain);
            }
          } else {
            console.log('SubdomainRouter - Not a standi.com.br domain:', domain);
            // NEW: tentar resolver domínio personalizado quando não é standi.com.br
            const ok = await resolveCustomDomain(hostname);
            if (ok) return;
          }
        } else {
          console.log('SubdomainRouter - Not enough hostname parts for subdomain');
          // NEW: domínio raiz (ex: meu-dominio.com) — tentar resolver
          const ok = await resolveCustomDomain(hostname);
          if (ok) return;
        }
      }
      
      // Em localhost, manter lógica existente
      if (isLocalhost) {
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
    })();
  }, [navigate, location]);

  // Aguardar inicialização
  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  // Se for um subdomínio válido, renderizar diretamente o componente Site
  if (isSubdomain && companyName) {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    console.log('SubdomainRouter - Rendering subdomain content:', {
      isSubdomain,
      companyName,
      isLocalhost,
      pathname: location.pathname
    });
    
    // Em produção (subdomínio real), renderizar Site diretamente baseado na URL
    if (!isLocalhost) {
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
        {children}
      </div>
    );
  }

  // Caso contrário, renderizar normalmente (aplicação principal)
  return <>{children}</>;
};

export default SubdomainRouter;