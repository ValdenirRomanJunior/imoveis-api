import {ImageItem} from '../../types/Images';
import { Property } from '../../types/property';
import api from "../../utils/requests";
import { convertToBlob } from './covertToBlob';
import { getFileExtension } from './getExtImg';


export const findProperty = (id:string) => {
    return api.get(`/properties/find/${id}`,) 
                  .then(response =>{
                   
                      return response;
                                   
                  }).catch((error) =>{
                   
                    return error
                   
                });
}

export const findPropertyLead = (id:string) => {
  return api.get<Property>(`/properties/findLeadProperty/${id}`,) 
                .then(response =>{                       
                    return response; 
                               
                  }
                 
                ).catch((error) =>{
                  return error
                 
              });
}

export const getTotalPropertiesById = (id:string) => {
  return api.get(`/properties/totalProperties/${id}`,) 
                .then(response =>{
                 
                    return response
                       
                }).catch((error) =>{
                  return error
                 
              });
}

export const getPublishedPropertiesById = (id:string) => {
  return api.get(`/properties/publishedProperties/${id}`,) 
                .then(response =>{
                 
                    return response
                       
                }).catch((error) =>{
                  return error
                 
              });
}
        
export const propertiesPageable = (id:string,state:string, city:string,goal:string, typeProperty:string ,pageNumber: number) => {
    return api.get(`/properties/search?id=${id}&state=${state}&city=${city}&goal=${goal}&typeProperty=${typeProperty}&size=12&page=${pageNumber}&sort=name`)
          .then(response =>{
            return response;
          }).catch(error => {
            return error;
          })
              
}



export const newProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,
    bathRooms:string,area:string, areaTotal: string, iptu:string, vacancies:string, condominium:string, price:string, state:string, city:string,
      street: string, number: number,district: string, cep: string, images: ImageItem[]) => {
    return api.post('/properties/save',{name, description, typeProperty, goal, numberRooms, bathRooms,area,areaTotal,iptu,vacancies,condominium,                                      
                                                price,state,city, street,number,district, cep, images})
                                                 .then(response =>{
                                                  return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,
    bathRooms:string,area:string, areaTotal: string,iptu:string, vacancies:string, condominium:string, price:string, state:string, city:string,
     district: string, street: string, number: number, cep: string, images: ImageItem[], id:string) => {
        
    return api.put(`/properties/update/${id}`,{name, description, typeProperty, goal, numberRooms, bathRooms,area, areaTotal,iptu,vacancies,condominium,                                      
                                                price,state,city, district, street, number, cep, images})
                                               
                                                 .then(response =>{
                                                    return response;
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}



export const deletePropertyReq = (id:string) => {
  return api.delete(`/properties/delete/${id}`,) 
                .then(response =>{                
                    return response
                                     
                 
                }).catch((error) =>{
                  return error;
                 
              });
}

export const uploadPropertyImage = (image:string)=>{
        
  let imageBlob= convertToBlob(image)
  let ext= getFileExtension(imageBlob.type);
  
  let formData : FormData = new FormData();
  formData.set('file',imageBlob,`file.${ext}`);
  return api.post('/pictures/save', formData)
   .then(response =>{
          
        return response;
   
    }).catch((error) =>{
      return error
     
  });


}

export const changeStatusPropertyReq = (id: string,statusP:number) => {
      
  return api.put(`/properties/updateStatus/${id}/${statusP}`)
                                             
                                               .then(response =>{
                                                  return response;
                                               }).catch((error) =>{
                                                  return error
                                                 
                                              });
}


export const getAllStates = () => {
  return api.get('/states') 
                .then(response =>{                       
                    return response; 
                               
                  }
                 
                ).catch((error) =>{
                  return error
                 
              });
}

export const getAllCities = (id:string) => {
  return api.get(`/states/${id}/cities`) 
                .then(response =>{                       
                    return response; 
                               
                  }
                 
                ).catch((error) =>{
                  return error
                 
              });
}