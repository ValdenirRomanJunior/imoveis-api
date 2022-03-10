import styled from "styled-components";

export const DetailsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

`

export const BodyContainer = styled.div`
    width: 50%;
    margin-top: 2rem;
    
`

export const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1{
        font-family: "Raleway", sans serif;
        color:rgb(74, 74, 74);
        
    }  
    `

export const ImageContainer = styled.div`
    width: 100%; 
    margin-top: 2rem;
    display: flex;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 10px;
    height: 400px;
    margin-bottom:20px;

    `

    export const DetailsContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
   
    height:100px;

  
        h2{
            font-family: "Nunito Sans", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
            color:rgb(74, 74, 74);
        }
        p{
         
                font-family: "Nunito Sans", "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif;
                color:rgb(74, 74, 74);
            
        }
       
`
export const DetailsLocalizationContainer = styled.div`
width: 100%;
margin-top: 1rem;

height:100px;

`
export const PropertyItemImageContainer = styled.div`
    width: 100%;
    height: 100%;
    
`