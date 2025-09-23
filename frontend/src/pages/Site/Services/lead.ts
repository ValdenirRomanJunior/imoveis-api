import api from "../utils/requests";

export const newLead = (name:string, email: string, phone:string, message:string, propertyId:number) => {
    return api.post('/opportunities/saveDetailSite',{name, email,phone,message,propertyId})
                                                 .then(response =>{
                                                  return response
                                                    
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const newLeadHome = (name:string, email: string, phone:string, message:string, companyName:string) => {
    return api.post('/opportunities/saveLeadHome',{name, email,phone,message,companyName})
                                                 .then(response =>{
                                                  return response
                                                    
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}