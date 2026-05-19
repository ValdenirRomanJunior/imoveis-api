import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

//import Dashboard from "../pages/Dashboard";
//import Details from "../pages/Details";
//import Edit from "../pages/Edit";
//import EditTenant from "../pages/EditTenant";
//import LeadDetail from "../pages/LeadDetail";
//import Leads from "../pages/Leads";
//import MyAccount from "../pages/MyAccount";
//import Properties from "../pages/Properties";
//import Registration from "../pages/Registration";
//import RegistrationTenant from "../pages/RegistrationTenant";
import SignIn from "../pages/SignIn";
//import Tenants from "../pages/Tenants";
import PageNotFound from "../components/PageNotFound";
//import ConfirmationPage from "../pages/ConfirmationPage";
import React from "react";
import LoadingLogin from "../components/LoadingLogin";
import LoadingPage from "../pages/Site/LoadingPage";
import SubdomainRouter from "../components/SubdomainRouter";
import useTrialStatus from '../hooks/useTrialStatus';
import TrialExpiredModal from '../components/TrialExpiredModal';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';
import SubscriptionExpiredModal from '../components/SubscriptionExpiredModal';
const LazyHome = React.lazy(() => import('../pages/Home'));
const LazyDashboard = React.lazy(() => import('../pages/Dashboard'));
const LazyProperties = React.lazy(() => import('../pages/Properties'));
const LazyRegistration = React.lazy(() => import('../pages/Registration'));
const LazyDetails = React.lazy(() => import('../pages/Details'));
const LazyEdit = React.lazy(() => import('../pages/Edit'));
const LazyLeads = React.lazy(() => import('../pages/Leads'));
const LazyAccount = React.lazy(() => import('../pages/MyAccount'));
const LazyAccountRegistration = React.lazy(() => import('../pages/AccountRegistration'));
const LazyTenants = React.lazy(() => import('../pages/Tenants'));
const LazyEditTenant = React.lazy(() => import('../pages/EditTenant'));
const LazyConfirmationPage = React.lazy(() => import('../pages/ConfirmationPage'));
const LazyLeadDetail = React.lazy(() => import('../pages/LeadDetail'));
const LazyOportunidades = React.lazy(() => import('../pages/Oportunidades'));
const LazyOportunidade = React.lazy(() => import('../pages/Oportunidade'));
const LazySteps = React.lazy(() => import('../pages/Steps'));
const LazyPortals = React.lazy(() => import('../pages/Portals'));
const LazyPortal = React.lazy(() => import('../pages/Portal'));
const LazyPortalConfig = React.lazy(() => import('../pages/PortalConfig'));
const LazyFeatured = React.lazy(() => import('../pages/Featured'));
const LazyUserRegistration = React.lazy(() => import('../pages/UserRegistration'));
const LazyEditUser = React.lazy(() => import('../pages/EditUser'));
const LazyTemaEdit = React.lazy(() => import('../pages/TemaEdit'));
const LazyPlans = React.lazy(() => import('../pages/Plans'));
const LazyPaymentSuccess = React.lazy(() => import('../pages/PaymentSuccess'));
const LazyPaymentCancel = React.lazy(() => import('../pages/PaymentCancel'));
const LazyPaymentExpired = React.lazy(() => import('../pages/PaymentExpired'));
const LazySite = React.lazy(() => import('../pages/Site'));
const LazyImoveis = React.lazy(() => import('../pages/Site/Properties'));
const LazyDetail = React.lazy(() => import('../pages/Site/Detail'));
const LazyUsersList = React.lazy(() => import('../components/UsersList'));
const LazyGuide = React.lazy(() => import('../pages/Guide'));
const LazyAtendimentoStandi = React.lazy(() => import('../pages/AtendimentoStandi'));
const LazyPlansPublic = React.lazy(() => import('../pages/PlansPublic'));
const LazyBlog = React.lazy(() => import('../pages/Blog'));
const LazyBlogPost = React.lazy(() => import('../pages/BlogPost'));
const LazyBlogAdmin = React.lazy(() => import('../pages/BlogAdmin'));
const LazyEmpreendimentos = React.lazy(() => import('../pages/Empreendimentos'));
const LazyNovoLancamento = React.lazy(() => import('../pages/Empreendimentos/Novo'));
const LazyEmpreendimentoDetalhe = React.lazy(() => import('../pages/Empreendimentos/Detalhe'));
const LazyEditorLP = React.lazy(() => import('../pages/Empreendimentos/EditorLP'));
const LazyLancamentoPublico = React.lazy(() => import('../pages/LancamentoPublico'));




// Componente guard para exibir modal de trial expirado globalmente
const TrialGuard: React.FC = () => {
    const trialStatus = useTrialStatus();
    const subscriptionStatus = useSubscriptionStatus();
    const navigate = useNavigate();
    const location = useLocation();

    // Não exibir modal no fluxo de assinatura de planos
    const isSubscriptionFlow = location.pathname === '/plans' || location.pathname.startsWith('/payment');

    // Prioridade: primeiro verifica se a assinatura está expirada, depois o trial
    const showSubscriptionModal = subscriptionStatus.isExpired && !isSubscriptionFlow;
    const showTrialModal = trialStatus.isExpired && !isSubscriptionFlow && !showSubscriptionModal;

    // Debug: log para verificar os valores
    console.log('Debug TrialGuard:', {
        pathname: location.pathname,
        isSubscriptionFlow,
        subscriptionStatus,
        trialStatus,
        showSubscriptionModal,
        showTrialModal
    });

    return (
        <>
            {showSubscriptionModal && (
                <SubscriptionExpiredModal onViewPlans={() => navigate('/plans')} />
            )}
            {showTrialModal && (
                <TrialExpiredModal onViewPlans={() => navigate('/plans')} />
            )}
            <Routes>
           
                <Route path="/"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazyHome/></React.Suspense>} />
                <Route path="/login"  element={<SignIn />} />
                <Route path="/dashboard"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyDashboard/></React.Suspense>} />                            
                <Route path="/properties"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyProperties/></React.Suspense>} />
                <Route path="/registration"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyRegistration/></React.Suspense>} />
                <Route path="/details/:propertyId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyDetails/></React.Suspense>} />
                <Route path="/edit/:propertyId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyEdit/></React.Suspense>} />     
                <Route path="/leads"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyLeads/></React.Suspense>} />
                <Route path="/account"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyAccount/></React.Suspense>} />
                <Route path="/accountRegistration"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyAccountRegistration /></React.Suspense>} />
                <Route path="/accounts"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyTenants/></React.Suspense>} />
                <Route path="/users"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyUsersList/></React.Suspense>} />
                <Route path="/edittenant/:tenantId" element={<React.Suspense fallback={<LoadingLogin/>}><LazyEditTenant/></React.Suspense>} />
                <Route path="/verification/:tenantEmail" element={<React.Suspense fallback={<LoadingLogin/>}><LazyConfirmationPage/></React.Suspense>} />
                <Route path="/leadDetail/:leadId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyLeadDetail/></React.Suspense>} />
                <Route path="/oportunidades"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyOportunidades/></React.Suspense>} />
                <Route path="/oportunidades/oportunidade/:opportunityId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyOportunidade/></React.Suspense>} />
                <Route path="/steps"  element={<React.Suspense fallback={<LoadingLogin/>}><LazySteps/></React.Suspense>} />
                <Route path="/portais"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPortals/></React.Suspense>} />
                <Route path="/portal"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPortal/></React.Suspense>} />
                <Route path="/portalConfig"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPortalConfig/></React.Suspense>} />
                <Route path="/featured"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyFeatured/></React.Suspense>} />
                <Route path="/userRegistration"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyUserRegistration/></React.Suspense>} />
                <Route path="/editUser/:tenantId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyEditUser/></React.Suspense>} />
                <Route path="/plans"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPlans/></React.Suspense>} />
                <Route path="/payment/success"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPaymentSuccess/></React.Suspense>} />
                <Route path="/payment/cancel"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPaymentCancel/></React.Suspense>} />
                <Route path="/payment-cancel"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPaymentCancel/></React.Suspense>} />
                <Route path="/payment/expired"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyPaymentExpired/></React.Suspense>} />
                <Route path="/guide"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyGuide/></React.Suspense>} />
                <Route path="/empreendimentos" element={<React.Suspense fallback={<LoadingLogin/>}><LazyEmpreendimentos/></React.Suspense>} />
                <Route path="/empreendimentos/:id" element={<React.Suspense fallback={<LoadingLogin/>}><LazyEmpreendimentoDetalhe/></React.Suspense>} />
                <Route path="/empreendimentos/:id/nova-pagina" element={<Navigate to="/empreendimentos/:id/nova-pagina/briefing" replace />} />
                <Route path="/empreendimentos/:id/nova-pagina/briefing" element={<React.Suspense fallback={<LoadingLogin/>}><LazyNovoLancamento/></React.Suspense>} />
                <Route path="/empreendimentos/:id/nova-pagina/template" element={<React.Suspense fallback={<LoadingLogin/>}><LazyNovoLancamento/></React.Suspense>} />
                <Route path="/empreendimentos/:id/nova-pagina/preview" element={<React.Suspense fallback={<LoadingLogin/>}><LazyNovoLancamento/></React.Suspense>} />
                <Route path="/empreendimentos/:id/pagina/:paginaId/editar" element={<React.Suspense fallback={<LoadingLogin/>}><LazyEditorLP/></React.Suspense>} />
                <Route path="/:tenantSlug/lp/:lancamentoSlug" element={<React.Suspense fallback={<div>Carregando...</div>}><LazyLancamentoPublico/></React.Suspense>} />

                <Route path="/blog" element={
                    <React.Suspense fallback={<div>Carregando...</div>}>
                        <LazyBlog />
                    </React.Suspense>
                } />

                <Route path="/blog/:slug" element={
                    <React.Suspense fallback={<div>Carregando...</div>}>
                        <LazyBlogPost />
                    </React.Suspense>
                } />

                <Route path="/atendimento-standi" element={
                    <React.Suspense fallback={<div>Carregando...</div>}>
                        <LazyAtendimentoStandi />
                    </React.Suspense>
                } />

                <Route path="/plans-public" element={
                    <React.Suspense fallback={<div>Carregando...</div>}>
                        <LazyPlansPublic />
                    </React.Suspense>
                } />

                <Route path="/blog-admin" element={
                    <React.Suspense fallback={<div>Carregando...</div>}>
                        <LazyBlogAdmin />
                    </React.Suspense>
                } />

                <Route path="/temaEdit"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazyTemaEdit/></React.Suspense>} />
                <Route path="/site/:companyName"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazySite/></React.Suspense>} />
                <Route path="/site/:companyName/imoveis"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazyImoveis/></React.Suspense>} />
                <Route path="/site/:companyName/detail/:propertyId"  element={<React.Suspense fallback={<LoadingPage/>}> <LazyDetail /> </React.Suspense>} /> 
                <Route path="/detail/:propertyId"  element={<React.Suspense fallback={<LoadingPage/>}> <LazyDetail /> </React.Suspense>} />
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </>
    );
};

export const Router = () => {
    return (
        <BrowserRouter>
            <SubdomainRouter>
                <TrialGuard />
            </SubdomainRouter>
        </BrowserRouter>
    );
}

export default Router
