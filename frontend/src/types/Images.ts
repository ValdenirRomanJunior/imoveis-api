export type ImageItem ={
    id:number;
    url: string;
    idTenant: number;
    selected:boolean;
    
}

export type Images ={
    imageList: Array<ImageItem>;
}