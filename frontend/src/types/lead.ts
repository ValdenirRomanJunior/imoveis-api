export type Lead ={
    error:string;
    close:boolean;
    onChange:Function;
    id:number;
    name: string;
    lastName: string;
    email:string;
    phone:string;
    message:string;
    propertyId:number;
    instant:string;
    opportunityId:number;
    column:Columntype;  
}

export const columns={
    captura:true,
    emAndamento:true  
}


type Column= typeof columns
export type Columntype = keyof Column

export type LeadPage = {
    
    content: Lead[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}