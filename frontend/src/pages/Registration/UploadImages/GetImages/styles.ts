import styled from "styled-components";

export const ImageWrapperManager = styled.div`
    width: 100%;
    height:290px;
    overflow: scroll;
    
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top:10px;


   .button-file-Manager {
    border-radius: 5px;
    
    position: fixed;
    bottom: 0;
    left:0;
   }

   @media screen and (min-width: 1000px){
    margin-top:0px;
    flex-direction: row;
    flex-wrap: wrap;

    height:320px;
    
   }

   @media screen and (min-width: 1300px){
    margin-top:0px;
    flex-direction: row;
    flex-wrap: wrap;

    height:350px;
    
   }


`

export const ImageWrapperGetImages= styled.div<{image: string}>`
min-width: 200px;
width: 200px;
height: 200px;
border-radius: 2px;
border: 1px solid #d3d3d352;

float: left;

margin-top: 30px;
text-align: center;
cursor: pointer;


align-items: center;

position: relative;

background-image:url(${({image}) => image });
background-position: center;
background-size: contain;
background-repeat: no-repeat;
background-color:rgb(243 244 246);

img{
    width:100%;
    height:200px;
    object-fit: contain;
    
}

input{
    position: absolute;
    top:0;
    left:0;
   
}

.button-close-bucket-images{
    position: absolute;
    top:0;
    right: 0;
    font-size: 25px;
    background:#b1b1b1;
    border-radius:50%;
    border-none;
}

@media screen and (min-width: 1000px){
    margin:15px;
   
}

`