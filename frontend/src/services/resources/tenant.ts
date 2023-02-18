

import { Tenant } from '../../types/tenant';
import api from "../../utils/requests";


export const findTenant = (id:string) => {
    return api.get<Tenant>(`/tenants/find/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data 
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
}
        
export const tenantsPageable = (pageNumber: number) => {
    return api.get(`/tenants/page?size=12&page=${pageNumber}&sort=name`)
              
}



export const newTenant = (slug:string, lastName:string, email: string, password:string ) => {
    return api.post('/tenants/save',{slug, lastName, email,password})
                                                 .then(response =>{
                                                    return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editTenant = (slug:string, lastName:string, email: string,password:string, status: string, id:string) => {
  console.log(status)
    return api.put(`/tenants/update/${id}`,{slug, email,status,lastName, password})
                                             
                                                 .then(response =>{
                                                    return response;
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

  export const sendNewPasswordForEmail=(email:string) => {
    return api.post('/auth/forgot',email,
   
    )
    
              .then(response =>{
                
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