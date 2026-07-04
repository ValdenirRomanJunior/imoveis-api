import api from "../utils/requests";

export interface SearchPropertyFilters {
  name?: string;
  goal?: string;
  typeProperty?: string;
  city?: string;
  district?: string;
  minPrice?: string;
  maxPrice?: string;
  minRooms?: string;
  minSuites?: string;
  minVacancies?: string;
  url: string;
  pageNumber?: number;
  linesPerPage?: number;
}

export interface PropertyTypeOption {
  value: number;
  label: string;
}

export interface PropertyFilterOptions {
  types: PropertyTypeOption[];
  cities: string[];
  districts: string[];
  minPrice?: number;
  maxPrice?: number;
}

export const searchProperties = (
  filtersOrName: SearchPropertyFilters | string,
  goalArg?: string,
  typePropertyArg?: string,
  urlArg?: string,
  pageNumberArg?: number
) => {
    const filters: SearchPropertyFilters = typeof filtersOrName === 'string'
      ? {
          name: filtersOrName,
          goal: goalArg || '',
          typeProperty: typePropertyArg || '',
          url: urlArg || '',
          pageNumber: pageNumberArg || 0,
        }
      : filtersOrName;

    const {
      name = '',
      goal = '',
      typeProperty = '',
      city = '',
      district = '',
      minPrice = '',
      maxPrice = '',
      minRooms = '',
      minSuites = '',
      minVacancies = '',
      url,
      pageNumber = 0,
      linesPerPage = 12,
    } = filters;

    const params = new URLSearchParams({
      name,
      goal,
      typeProperty,
      city,
      district,
      minPrice,
      maxPrice,
      minRooms,
      minSuites,
      minVacancies,
      nameUrl: url,
      page: String(pageNumber),
      linesPerPage: String(linesPerPage),
      orderBy: 'name',
      direction: 'ASC',
    });

    return api.get(`/properties/searchTest?${params.toString()}`)
          .then(response =>{
            return response;
          }).catch(error => {
            return error;
          })
              
}

export const getTAllAddressRequest = (nameUrl:string) => {

  return api.get(`/properties/findAddress/${nameUrl}`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        })
            
}

export const getPropertiesHome = (nameUrl:string) => {
  return api.get(`/properties/findAll/${nameUrl}`)
        .then(response =>{
          return response;
        }).catch(error => {
          return error;
        });
            
}

export const findProperty = (id:string) => {
  return api.get(`/properties/find/${id}`) 
                .then(response =>{             
                    return response;                                 
                }).catch((error) =>{  
                  console.log(error)             
                  return error
                  
                 
              });
}

export const getPropertyFilterOptions = (nameUrl: string) => {
  return api.get(`/properties/filter-options/${nameUrl}`)
        .then(response => {
          return response;
        }).catch(error => {
          return error;
        });
}
