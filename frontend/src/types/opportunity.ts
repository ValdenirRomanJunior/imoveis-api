import { Lead } from "./lead";

export type Opportunity ={
    error:string;
    close:boolean;
    onChange:Function;
    id:number;
    instant:string;
    nameLead:string;
    messageLead:string;
    phoneLead:string
    emailLead:string;
    stepId:number;
    stepName:string;
    lead:Lead;
    propertyId?:number;
    idLead:number;
    tenantId:number;
    step:Column

}

export const Columns={
    steps: true
   
}


type Column= Step
export type Columntype = keyof Column

export type OpportunityPage = {   
    content: Opportunity[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export type Step = {
    id:number;
    name:string;
 
}