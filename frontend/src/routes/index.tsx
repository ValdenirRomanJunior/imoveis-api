import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Edit from "../pages/Edit";
import EditTenant from "../pages/EditTenant";
import LeadDetail from "../pages/LeadDetail";
import Leads from "../pages/Leads";
import MyAccount from "../pages/MyAccount";
import Properties from "../pages/Properties";
import Registration from "../pages/Registration";
import RegistrationTenant from "../pages/RegistrationTenant";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Tenants from "../pages/Tenants";



export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/details/:propertyId" element={<Details />} />
                <Route path="/edit/:propertyId"  element={<Edit/>}/>               
                <Route path="/leads" element={<Leads />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/registrationTenant" element={<RegistrationTenant />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/edittenant/:tenantId" element={<EditTenant />} />
                
                
            
            </Routes>
        </BrowserRouter>
    )
}

export default Router
