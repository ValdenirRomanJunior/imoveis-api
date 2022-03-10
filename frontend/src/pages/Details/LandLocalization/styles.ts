import styled from "styled-components";

export const DetailLocalizationWrapper= styled.div`
    width:100%;
    margin-top:2rem;
    
    h3{
        font-family: "Nunito Sans", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        color:rgb(74, 74, 74);
        
    }

    
`
export const DetailLocalizationgrid= styled.div`
    width:100%;
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(2, 3rem);

    div{
        margin-top:1rem;
    }
    div>h4{
        font-family: "Nunito Sans", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        color: #b0b0ad;
        font-weight: 400;
        font-size: 1rem;
    }
    div>span{
        font-family: "Nunito Sans", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
        font-weight: 600;
        color:rgb(74, 74, 74);
    }
 
    div:nth-child(1){
        grid-column: 1/4;
        grid-row: 1/3;
        

    }
    div:nth-child(2){
        grid-column: 5/8;
        grid-row: 1/3;

    }
    div:nth-child(3){
        grid-column: 9/13;
        grid-row: 1/3;

    }
    div:nth-child(4){
        grid-column: 13/16;
        grid-row: 1/3;

    }
    
 
    
`