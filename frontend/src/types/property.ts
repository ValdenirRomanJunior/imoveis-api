export type Property = {
    id:number,
    image: string,
    title: string,
    description: string,
    price: number,
    beds: number,
    baths:number,
    built: number,
    sqft: number,
    

    address: {
        id:number,
        street:string,
        number: number,

        city: {
            id:number,
            name: string,
            
            county: {
                id:number,
                name: string,

                state:{
                    id:number,
                    name: string
                }
            }
        }


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