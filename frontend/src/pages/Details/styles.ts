import styled from "styled-components";
export const DetailsBackground = styled.div`
width: 100%;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;

`
export const DetailsBodyContainer = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-right: 1rem;
padding-left: 1rem;


.price{
    font-weight: 400;
    font-size: 32px;
    margin-top: 10px;
    font-family: 'Roboto', sans serif;
    color: #4a4a4a;
}
.title{
    color: #4a4a4a;
    margin-top: 10px;
    font-size: 25px;
    font-weight: 400;
    border-bottom:1px solid #e6e9ed;
    margin-bottom: 30px;
    padding-bottom: 30px;
}

h4{
    margin-top:25px;
    margin-bottom: 15px;
    color: #4a4a4a;
    font-size: 20px;
    font-weight: 500;
}

.button-wrapper{
    width:100%;
    position: fixed;
    bottom: 0;
    left:50%;
    transform: translate(-50%,-50%);
    
    display: flex;
    justify-content: center;
}

@media screen and (min-width:1000px){
    
    width:50%;

    .button-wrapper{
        width:200px;
        position: fixed;
        bottom: 0;
        left: 1400px;
       
        
        
        display: flex;
        justify-content: center;
    }
}
`

export const Localization = styled.div`

color:  ${({theme}) => theme.colors.primary};
display: flex;
align-items: center;


p{
    margin-bottom: 0;
    margin-left: .5rem;
    
}


@media screen and (min-width:1000px){
    align-items: center;
   
}
`

export const Description = styled.div`

border-bottom:1px solid #e6e9ed;

p{
    color: rgb(74, 74, 74);
    font-size: 16px;
    font-weight: 400;
    line-height:1.5;
    overflow: hidden;
   
    white-space: pre-line;
  

}


@media screen and (min-width:1000px){
    align-items: center;
   
}
`

export const PhotosContainer = styled.div`
width: 100%;   

background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:1000px){
    align-items: center;
    width:100vw;
}
`

export const CardWrapper = styled.div`
width: 100%;   

img{
    width:100%;
    height:250px;
    object-fit:contain;
}


@media screen and (min-width:1000px){
    align-items: center;
    width:100vw;
}
`




