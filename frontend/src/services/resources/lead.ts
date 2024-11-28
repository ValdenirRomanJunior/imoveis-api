
import { Lead } from "../../types/lead";
import api from "../../utils/requests";


export const findLead = (id:string) => {
    return api.get(`/leads/find/${id}`,) 
                  .then(response =>{
                    if(response != null){
                      return response
                     
                    }
                  }).catch((error) =>{
                    return error
                   
                });
}
        
export const leadsPageable = (name: string,pageNumber: number) => {
    return api.get(`/leads/page?name=${name}&size=12&page=${pageNumber}&sort=instant`)
              
}


export const newLead = (name:string, email: string, phone:string,propertyId:number) => {
    return api.post('/opportunities/save',{name, email,phone,propertyId})
                                                 .then(response =>{
                                                  return response
                                                    
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editLead = (name:string, email:string, phone:String,id:number) => {
  return api.put(`/leads/update/${id}`,{name,email,phone})
                                           
                                               .then(response =>{
                                                  return response;
                                               }).catch((error) =>{
                                                  return error
                                                 
                                              });
}
export const editLeadStep = (id:number,stepId: number) => {
  return api.put(`/leads/updateStepLead/${id}/${stepId}`)
                                           
                                               .then(response =>{
                                                  return response;
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
                 
                      return response;                 
                   
                  }).catch((error) =>{
                    return error
                   
                });
  }

  export const deleteLead = (id:string) => {
    return api.delete(`/leads/delete/${id}`,) 
                  .then(response =>{
                    if(response != null){
                      return response
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
  }


export const opportunitiesPageable = () => {
    return api.get(`/opportunities/page`)
                                               
}
export const stepsOpportunity = () => {
  return api.get(`/opportunities/steps`)
            
}
export const stepsName = () => {
  return api.get(`/opportunities/stepsName`)
            
}
export const countstepsName = () => {
  return api.get(`/opportunities/countOpportByStep`)
                    .then(response =>{
                      if(response != null){
                        return response.data 
                      
                      }
                    
                    }).catch((error) =>{
                      return error
                    
                  });
            
            }
export const newStep = (name:string) => {
  return api.post('/steps/saveStep',{name})

                                            .then(response =>{
                                                  if(response != null){
                                                  return response
                                                    
                                                } }).catch((error) =>{
                                                    return error
                                                  
                                                });
  }


export const deleteStep = (id:number) => {
  return api.delete(`/opportunities/deleteStep/${id}`,) 
                .then(response =>{
                  if(response != null){
                    return response
                   
                  }
                 
                }).catch((error) =>{
                  return error
                 
              });
}
export const findOpportunity = (id:string) => {
  return api.get(`/opportunities/find/${id}`,) 
                .then(response =>{
                  if(response != null){
                    return response
                   
                  }
                }).catch((error) =>{
                  return error
                 
              });
}


export const deleteOpportunity = (id:number) => {
  return api.delete(`/opportunities/delete/${id}`,) 
                .then(response =>{
                  if(response != null){
                    return response
                   
                  }
                 
                }).catch((error) =>{
                  return error
                 
              });
}
export const editStep = (name:string,id: number) => {
  return api.put(`/steps/updateStep/${id}`,{name})
                                           
                                               .then(response =>{
                                                  return response;
                                               }).catch((error) =>{
                                                  return error
                                                 
                                              });
}