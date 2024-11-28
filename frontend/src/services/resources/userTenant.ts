

import { Tenant } from '../../types/tenant';
import api from "../../utils/requests";


export const findUserTenant = (id:string) => {
  return api.get(`/usertenants/find/${id}`,) 
                .then(response =>{
               
                    return response
                                  
                }).catch((error) =>{
                  return error
                 
              });
}
        
export const tenantsPageable = (pageNumber: number) => {
    return api.get(`/tenants/page?size=12&page=${pageNumber}&sort=name`)
              
}



export const newUserTenant = (slug:string, email: string, password:string,creci:string) => {
    return api.post('/usertenants/save',{slug,email,password,creci})
                                                 .then(response =>{
                                                    return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editUserTenant = (slug:string, email: string,password:string,creci:string,id:string) => {

    return api.put(`/usertenants/update/${id}`,{slug, email, password,creci})
                                             
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

  export const deleteUserTenant = (id:string) => {
    return api.delete(`/usertenants/delete/${id}`,) 
                  .then(response =>{
                   
                      return response; 
                   
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

  export const findAllUserTenant = () => {
    return api.get(`/usertenants/findAll/`,) 
                  .then(response =>{
                 
                      return response
                     
                 
                   
                  }).catch((error) =>{
                    return error
                   
                });
}