

import { Tenant } from '../../types/tenant';
import api from "../../utils/requests";


export const findTenant = (id:string) => {
    return api.get(`/tenants/find/${id}`,) 
                  .then(response =>{
                 
                      return response
                     
                 
                   
                  }).catch((error) =>{
                    return error
                   
                });
}
        
export const tenantsPageable = (pageNumber: number) => {
    return api.get(`/tenants/page?size=12&page=${pageNumber}&sort=name`)
              
}



export const newTenant = (slug:string, lastName:string, email: string, password:string,creci:string) => {
    return api.post('/tenants/save',{slug, lastName, email,password,creci})
                                                 .then(response =>{
                                                    return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editTenant = (slug:string, lastName:string, email: string,password:string, status: string,creci:string, domain:string,verification:string,signedDays:string, id:string) => {

    return api.put(`/tenants/update/${id}`,{slug, email,status,lastName, password,creci,domain,verification,signedDays})
                                             
                                                 .then(response =>{
                                                    return response;
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

  export const sendNewPasswordForEmail=(email:string) => {
    return api.post('/auth/forgot',email,{
      headers: {
        'Content-Type': 'application/json'
    }
  }
    )
              .then(response =>{
                return response;
              }).catch((error) =>{
                return error;
              })
  }

  export const deleteTenant = (id:string) => {
    return api.delete(`/tenants/delete/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data 
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
  }

  export const sendConfirmationTenant=(email:string) =>{
    return api.put('/verification/confirmation',{email})
   
              .then(response =>{
                return response;
               
              }).catch((error) =>{
                return error;
              })
  }

  export const resendEmailConfirmationTenant=(email:string) =>{
    return api.post('/verification/resend',{email})
   
              .then(response =>{
                return response;
               
              }).catch((error) =>{
                return error;
              })
  }

  