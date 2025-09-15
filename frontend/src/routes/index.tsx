import {
    BrowserRouter,
    Routes,
    Route,
   
    Link,
    Navigate,
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
const LazySite = React.lazy(() => import('../pages/Site'));
const LazyImoveis = React.lazy(() => import('../pages/Site/Properties'));
const LazyDetail = React.lazy(() => import('../pages/Site/Detail'));




export const Router = () => {

    return (
             
        <BrowserRouter>

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

                <Route path="/temaEdit"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazyTemaEdit/></React.Suspense>} />
                <Route path="/site/:companyName"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazySite/></React.Suspense>} />
                <Route path="/site/:companyName/imoveis"  element={<React.Suspense fallback={<div>Carregando...</div>}><LazyImoveis/></React.Suspense>} />
                 <Route path="/site/:companyName/detail/:propertyId"  element={<React.Suspense fallback={<LoadingPage/>}> <LazyDetail /> </React.Suspense>} /> 
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          
        </BrowserRouter>
              
    )
}

export default Router
