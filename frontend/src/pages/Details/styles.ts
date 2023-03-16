import styled from "styled-components";

export const DetailsBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
height:auto;

`
export const DetailsBodyContainer = styled.div<{copyUrl:boolean}>`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-right: 1.5rem;
padding-left: 1.5rem;
height: auto;


.price{
    width:100%;
    font-weight: 400;
    font-size: 34px;
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    color: #585858;
    text-align: left;
}



h4{
    width:100%;
    margin-top:20px;
    margin-bottom: 17px;
    color: #585858;
    font-size: 18px;
    font-weight: 600;
    font-family: "Nunito Sans", sans-serif;
    
}

.button-wrapper{
    width:35%;
    position: relative;
     margin-top: 15px;
     margin-bottom:30px;
   
    
    display: flex;
    justify-content: center;
    color:gray;
    align-items: center;

    .icon-copy{
        color:#52b0de;
        font-size:25px;
    }

       

}

.button-wrapper::before{
    position: absolute;
    top:-55px;
    left:26%;
    transform: translate(-50%,-50%);
    content: "copiado";

    background-color: gray;
    display: flex;
    color:#fff;
    font-size:12px;
    padding:5px 15px;
    -webkit-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    text-align: center;
    display:${({copyUrl}) => copyUrl === true ?  'block' : 'none'};
    font-weight: bold;
    transition: transform .3s;
    animation: copy 4s ease-in-out;
    transform: translateY(0) scale(0);
    opacity:0;
    font-weight:400;
   


  }

  @keyframes copy {
    
    0%{
        transition: .1s;
        transform: translateY(0) scale(1.2);
        opacity:0.3;
       
       
    } 
    25%{
       
        transform: translateY(10px) scale(1.2);
        opacity:1;   
        
              
    }

    50%{
       
        transform: translateY(10px) scale(1.2);
        opacity:.9; 
                
    }
    75%{
       
        transform: translateY(10px) scale(1.2);
        opacity:.3;
                    
    }
    100%{
       
        transform: translateY(10px) scale(1.2);
        opacity:0;
                    
    }
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
width:100%;
font-family: "Nunito Sans", sans-serif;

.localization-detail-wrapper{
    width:100%;
    display: flex;
    overflow:hidden;
    white-space: nowrap;
    justify-content: start;

    .icon-localization-detail{
        font-size:20px;
        margin-right:3px;
    }

   
    .localization-district-detail-wrapper{
        max-width: 55%;
       
        text-overflow: ellipsis;
    }
    .localization-city-detail-wrapper{
        max-width: 45%;
        margin-left:5px;
        text-overflow: ellipsis;
    }


p{
    overflow: hidden;
    margin-bottom: 0;  
    white-space: nowrap;
    
   
    
}

}





@media screen and (min-width:1000px){
    align-items: center;
   
}
`

export const Description = styled.div`
    width:100%;
    border-bottom:1px solid #e6e9ed;

p{

    color: rgb(74, 74, 74);
    font-size: 16px;
    font-weight: 400;
    line-height:1.5;
    overflow: hidden;
    line-break: anywhere;
    white-space: pre-line;
    font-family: "Nunito Sans", sans-serif;

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
    width:100vw; 
    aspect-ratio: 16/ 9;

img{
    width:100%;
    object-fit: cover;
    object-position: top left;
    aspect-ratio: 16/ 9;


}


@media screen and (min-width:1000px){
    align-items: center;
    width:100vw;
}


`

export const TitleWrapper = styled.div`
    width: 100%;
    margin-top:5px;

    h3{
       
        height: auto;
        color: #585858;
        margin-top: 10px;
        font-size: 1.2rem !important;
        font-weight: 600;
        border-bottom:1px solid #e6e9ed;
        margin-bottom: 20px;
        padding-bottom: 20px;
        position: relative;
        line-break: anywhere;
        font-family: "Nunito Sans", sans-serif; 
        text-align: left;
          
        
    }
`




