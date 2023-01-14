import styled from "styled-components";

export const ImageWrapperManager = styled.div`
    width: 100%;
    overflow: visible;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top:20px;

   .button-fileManager{
    border-radius: 5px;
    margin-top: 30px;
    position: fixed;
    bottom:-30px;
   }


`

export const ImageWrapperGetImages= styled.div<{image: string}>`
width: 200px;
height: 13rem;
border-radius: 2px;


float: left;

margin-top: 6px;
text-align: center;
cursor: pointer;


align-items: center;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;
background-image:url(${({image}) => image });
background-position: center;
background-size: contain;
background-repeat: no-repeat;
background-color:rgb(243 244 246);



input{
    position: absolute;
    top:0;
    left:0;
   
   

}

`