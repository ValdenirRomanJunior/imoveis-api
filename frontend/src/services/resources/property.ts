import { features } from 'process';
import { Feature } from '../../pages/Registration';
import {ImageItem} from '../../types/Images';
import { Property } from '../../types/property';
import apiImage, { BASE_URL_FROM_BUCKET } from '../../utils/request-image';
import api from "../../utils/requests";
import { convertToBlobList } from './convertListBlob';
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


export const newProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,suites:string,
    bathRooms:string,area:string, areaTotal: string, iptu:string, vacancies:string, condominium:string, price:string, state:string, city:string,
      street: string, number: number,district: string, cep: string, images:string[],features:Feature[],financeable:string,permuta:string) => {
        
        const data={
          name:name,
          description:description,
          typeProperty:typeProperty+1,
          goal:goal,
          numberRooms:numberRooms,
          bathRooms:bathRooms,
          area:area,
          areaTotal:areaTotal,
          iptu:iptu,
          vacancies:vacancies,
          condominium:condominium,
          price:price,
          state:state,  
          city:city,
          street:street,
          number:number,
          district:district,
          cep:cep,
          features:features,
          financeable:financeable,
          permuta:permuta,
          suites:suites
        }
        let formData : FormData = new FormData();
        let forms : any[]=[]
        for (let key in data ) {
          formData.append("propertyNewDTO", new Blob([JSON.stringify(data)], {
             type: "application/json"
            }));
        }
         
        if(images.length >0){      
          let imageBlob= convertToBlobList(images) as Blob[];                    
            for(var i=0; i< imageBlob.length; i++){                                
                formData.append('file',imageBlob[i],`file.png`)     
          }                                 
      }
    return api.post('/properties/save', formData, {headers: { "Content-Type":"multipart/form-data"}})
                                             
                                                 .then(response =>{   
                                                  return response
                                                 }).catch((error) =>{
                                                    return error
                                                   
                                                });
                                              }


export const editProperty = (name:string, description:string, typeProperty: number,goal: number,numberRooms:string,suites:string,
  bathRooms:string,area:string, areaTotal: string, iptu:string, vacancies:string, condominium:string, price:string, state:string, city:string,district: string,
    street: string, number: number, cep: string,imagesSelected:ImageItem[], images:string[], deletedIds:number[],selectedsFeatures:Feature[],financeable:string,permuta:string,id:string) => {
      
      const data={
        name:name,
        description:description,
        typeProperty:typeProperty+1,
        goal:goal,
        numberRooms:numberRooms,
        bathRooms:bathRooms,
        area:area,
        areaTotal:areaTotal,
        iptu:iptu,
        vacancies:vacancies,
        condominium:condominium,
        price:price,
        state:state,
        city:city,
        street:street,
        number:number,
        district:district,
        cep:cep,
        images:imagesSelected,
        deletedIds:deletedIds,
        features:selectedsFeatures,
        financeable:financeable,
        permuta:permuta,
        suites:suites
      }
      let formData : FormData = new FormData();
      let forms : any[]=[]
      for (let key in data ) {
        formData.append("propertyUpdateDTO", new Blob([JSON.stringify(data)], {
           type: "application/json"
          }));
      }
          
      if(images.length >0){      
        let imageBlob= convertToBlobList(images) as Blob[];                    
          for(var i=0; i< imageBlob.length; i++){                                
              formData.append('file',imageBlob[i],`file.png`)     
        }                                 
    }
  return api.put(`/properties/update/${id}`, formData, {headers: { "Content-Type":"multipart/form-data"}})
                                           
                                               .then(response =>{   
                                                return response
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
        
 // let imageBlob= convertToBlob(image)
 //// let ext= getFileExtension(imageBlob.type);
  
  let formData : FormData = new FormData();
//  formData.set('file',imageBlob,`file.${ext}`);
  
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
export const changeStatusPropertyReqFeature = (id: string,statusF:number) => {
      
  return api.put(`/properties/updateStatusFeatured/${id}/${statusF}`)
                                             
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

export const getTAllAddressRequest = (nameUrl:string) => {

  return api.get(`/properties/findAddress/${nameUrl}`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
            
}

export const getAllAddress = () => {
  return api.get('/getAllAddress') 
                .then(response =>{                       
                    return response; 
                               
                  }
                 
                ).catch((error) =>{
                  return error
                 
              });
}

export const searchProperties = ( name:string,goal:string, typeProperty:string , url:string,pageNumber: number) => {
  return api.get(`/properties/searchTest?name=${name}&goal=${goal}&typeProperty=${typeProperty}&nameUrl=${url}&linesPerPage=12&page=${pageNumber}&orderBy=name&direction=ASC`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
            
}

export const searchPropertiesGeneral = () => {
  return api.get(`/properties/findAllFeatures`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
}
export const propertiesToPortal = () => {

  return api.get(`/properties/findAll`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
            
}

export const eventSSe = () => {

  return api.get(`/opportunities/SSe`)
      .then(response =>{
        return response;
      }).catch(error => {
        return error;
      })
            
}

export const getImageToEditPropertyIfExist = (id:string) => {

   return apiImage.get(`cp${id}.jpg`,{responseType: 'blob'})
       .then(response => {
          if(response.status === 200){
           const url=`${BASE_URL_FROM_BUCKET}cp${id}.jpg`;
           return url;

          }
         return null;
                    
       })
}

export const propertiesFeatured = () => {
  return api.get(`/properties/findAllFeatures`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
            
}

export const getCaracteristicas = () => {
  return api.get(`/properties/findAllFeature`)
        .then(response =>{
          return response.data;
        }).catch(error => {
          return error;
        })
            
}

export const getDistricts = () => {
  return api.get('properties/findAllDistricts') 
                .then(response =>{                       
                    return response; 
                               
                  }
                 
                ).catch((error) =>{
                  return error
                 
              });
}
