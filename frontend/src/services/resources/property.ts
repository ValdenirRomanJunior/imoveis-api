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
                  if(response.data != null){
                    return response.data
                   
                  }
                 
                }).catch((error) =>{
                  return error
                 
              });
}
        
export const propertiesPageable = (pageNumber: number) => {
    return api.get(`/properties/search?size=12&page=${pageNumber}&sort=id`)
              
}



export const newProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,
    bathRooms:string,area:string,iptu:string, vacancies:string, condominium:string, price:number, state:string, city:string,
     district: string, street: string, number: number, cep: string, images: ImageItem[]) => {
    return api.post('/properties/save',{name, description, typeProperty, goal, numberRooms, bathRooms,area,iptu,vacancies,condominium,                                      
                                                price,state,city, district, street, number, cep, images})
                                                 .then(response =>{
                                                  return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,
    bathRooms:string,area:string,iptu:string, vacancies:string, condominium:string, price:number, state:string, city:string,
     district: string, street: string, number: number, cep: string, images: ImageItem[], id:string) => {
        
    return api.put(`/properties/update/${id}`,{name, description, typeProperty, goal, numberRooms, bathRooms,area,iptu,vacancies,condominium,                                      
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
  console.log(imageBlob.type)
  let formData : FormData = new FormData();
  formData.set('file',imageBlob,`file.${ext}`);
  return api.post('/pictures/save', formData)
   .then(response =>{
          
        return response;
   
    }).catch((error) =>{
      return error
     
  });


}