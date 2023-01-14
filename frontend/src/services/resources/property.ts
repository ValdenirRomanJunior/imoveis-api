import {ImageItem} from '../../types/Images';
import { Property } from '../../types/property';
import api from "../../utils/requests";


export const findProperty = (id:string) => {
    return api.get<Property>(`/properties/find/${id}`,) 
                  .then(response =>{
                    if(response.data != null){
                      return response.data as Property
                     
                    }
                   
                  }).catch((error) =>{
                    return error
                   
                });
}
        
export const propertiesPageable = (pageNumber: number) => {
    return api.get(`/properties/search?size=12&page=${pageNumber}&sort=name`)
              
}



export const newProperty = (name:string, description:string, goal: number, type: number,numberRooms:string,
    bathRooms:string,area:string,iptu:string, vacancies:string, condominium:string, price:number, state:string, city:string,
     district: string, street: string, number: number, cep: string, images: ImageItem[]) => {
    return api.post('/properties/save',{name, description, goal, type, numberRooms, bathRooms,area,iptu,vacancies,condominium,                                      
                                                price,state,city, district, street, number, cep, images})
                                                 .then(response =>{
                                                    console.log(response.data)
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}

export const editProperty = (name:string, description:string, goal: number, type: number,numberRooms:string,
    bathRooms:string,area:string,iptu:string, vacancies:string, condominium:string, price:number, state:string, city:string,
     district: string, street: string, number: number, cep: string, images: ImageItem[], id:string) => {
        console.log('cheguei aqui')
    return api.put(`/properties/update/${id}`,{name, description, goal, type, numberRooms, bathRooms,area,iptu,vacancies,condominium,                                      
                                                price,state,city, district, street, number, cep, images})
                                               
                                                 .then(response =>{
                                                    console.log(response.data)
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
}