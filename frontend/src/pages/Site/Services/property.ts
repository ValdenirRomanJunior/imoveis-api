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
  minArea?: string;
  maxArea?: string;
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
      minArea = '',
      maxArea = '',
      url,
      pageNumber = 0,
      linesPerPage = 12,
    } = filters;

    const queryParams: Record<string, string> = {};
    if (name) queryParams.name = name;
    if (goal) queryParams.goal = goal;
    if (typeProperty) queryParams.typeProperty = typeProperty;
    if (city) queryParams.city = city;
    if (district) queryParams.district = district;
    if (minPrice) queryParams.minPrice = minPrice;
    if (maxPrice) queryParams.maxPrice = maxPrice;
    if (minRooms) queryParams.minRooms = minRooms;
    if (minSuites) queryParams.minSuites = minSuites;
    if (minVacancies) queryParams.minVacancies = minVacancies;
    if (minArea) queryParams.minArea = minArea;
    if (maxArea) queryParams.maxArea = maxArea;
    queryParams.nameUrl = url;
    queryParams.page = String(pageNumber);
    queryParams.linesPerPage = String(linesPerPage);
    queryParams.orderBy = 'name';
    queryParams.direction = 'ASC';

    const params = new URLSearchParams(queryParams);

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
