


import { Lead } from "../../types/lead";
import api from "../../utils/requests";


export const findLead = (id:string) => {
    return api.get<Lead>(`/leads/find/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data 
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
}
        
export const leadsPageable = (pageNumber: number) => {
    return api.get(`/leads/page?size=12&page=${pageNumber}&sort=id`)
              
}



export const newLead = (name:string, email: string, phone:string) => {
    return api.post('/leads/save',{name, email,phone})
                                                 .then(response =>{
                                                  return response
                                                    
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}



  export const sendConfirmationRegistrationLead=(email:string) =>{
    return api.post('/auth/forgot',email,
   
    )
    
              .then(response =>{
               
              }).catch((error) =>{
                return error;
              })
  }

  export const getTotalLeadsById = (id:string) => {
    return api.get(`/leads/totalLeads/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
  }

  export const deleteLead = (id:string) => {
    return api.delete(`/leads/delete/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data 
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
  }