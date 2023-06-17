export type ImageItem ={
    
    id:number;
    url: string;
    idTenant: number;
    selected:boolean ;
    
}

export type Images ={
    imageList: Array<ImageItem>;
}

export type ImagePage = {


    content: ImageItem[] | any;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
} 


export type ImagePage2 = {


    content: ImageItem[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
} 