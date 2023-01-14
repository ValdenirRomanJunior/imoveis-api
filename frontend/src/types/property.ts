export type Property = {
    id:number,
    name: string,
    description: string,
    type: string,
    goal: string,
    numberRooms:string,
    bathRooms:string,
    area:string,
    iptu:string,
    vacancies:string,
    condominium:string,
    price:string,
    images?:[{
        id:number,
        url:string,
        idTenant: number
    }]
     ,
     
    tenant:{
        id:number,
        slug: string,
        email: string,
        password: string,
        status: string,
        perfis: []      
    },
        address:{
            id: number,
            street: string,
            number: string,
            district: string,
            cep: string,
            city:{
                id: number,
                name: string,
                state:{
                    id: number,
                    name: string,
                }
            },
           
        }

}

export type PropertyPage = {
    
    content: Property[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type PropertyNewDto ={

    name:string,
    description:string,
    type:string,
    goal:string,
    numberRooms:string,
    bathRooms:string,
    area:string,
    iptu:string,
    vacancies:string,
    condominium:string,
    price:string,
    state:string,
    city:string,
    district:string,
    street:string,
    number:string,
    cep:string

}
