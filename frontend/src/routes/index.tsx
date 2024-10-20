import {
    BrowserRouter,
    Routes,
    Route,
   
    Link,
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
const LazyDashboard = React.lazy(() => import('../pages/Dashboard'));
const LazyProperties = React.lazy(() => import('../pages/Properties'));
const LazyRegistration = React.lazy(() => import('../pages/Registration'));
const LazyDetails = React.lazy(() => import('../pages/Details'));
const LazyEdit = React.lazy(() => import('../pages/Edit'));
const LazyLeads = React.lazy(() => import('../pages/Leads'));
const LazyAccount = React.lazy(() => import('../pages/MyAccount'));
const LazyRegistrationTenant = React.lazy(() => import('../pages/RegistrationTenant'));
const LazyTenants = React.lazy(() => import('../pages/Tenants'));
const LazyEditTenant = React.lazy(() => import('../pages/EditTenant'));
const LazyConfirmationPage = React.lazy(() => import('../pages/ConfirmationPage'));
const LazyLeadDetail = React.lazy(() => import('../pages/LeadDetail'));
const LazyOportunidades = React.lazy(() => import('../pages/Oportunidades'));
const LazyOportunidade = React.lazy(() => import('../pages/Oportunidade'));
const LazySteps = React.lazy(() => import('../pages/Steps'));



export const Router = () => {

  
    return (
        
       
        <BrowserRouter>

            <Routes>
           
                <Route path="/"  element={<SignIn />} /> 
                <Route path='*' element={<PageNotFound/>}/>
                <Route path="/dashboard"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyDashboard/></React.Suspense>} />                            
                <Route path="/properties"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyProperties/></React.Suspense>} />
                <Route path="/registration"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyRegistration/></React.Suspense>} />
                <Route path="/details/:propertyId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyDetails/></React.Suspense>} />
                <Route path="/edit/:propertyId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyEdit/></React.Suspense>} />     
                <Route path="/leads"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyLeads/></React.Suspense>} />
                <Route path="/account"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyAccount/></React.Suspense>} />
                <Route path="/registrationTenant"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyRegistrationTenant/></React.Suspense>} />
                <Route path="/tenants"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyTenants/></React.Suspense>} />
                <Route path="/edittenant/:tenantId" element={<React.Suspense fallback={<LoadingLogin/>}><LazyEditTenant/></React.Suspense>} />
                <Route path="/verification/:tenantEmail" element={<React.Suspense fallback={<LoadingLogin/>}><LazyConfirmationPage/></React.Suspense>} />
                <Route path="/leadDetail/:leadId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyLeadDetail/></React.Suspense>} />
                <Route path="/oportunidades"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyOportunidades/></React.Suspense>} />
                <Route path="/oportunidades/oportunidade/:opportunityId"  element={<React.Suspense fallback={<LoadingLogin/>}><LazyOportunidade/></React.Suspense>} />
                <Route path="/steps"  element={<React.Suspense fallback={<LoadingLogin/>}><LazySteps/></React.Suspense>} />
              
            </Routes>
        </BrowserRouter>
              
    )
}

export default Router
