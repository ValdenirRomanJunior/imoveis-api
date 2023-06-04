export type Tenant ={
    id:number;
    slug: string;
    lastName: string;
    email:string;
    password:string;
    status:string;
    creci:string;
    domain:string;
    start:string;
    endDate:string;
    renovation:string;
    verification:string;
    images:[{
        id:number;
        url:string;
    }];
    
}



export type TenantPage = {
    
    content: Tenant[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}