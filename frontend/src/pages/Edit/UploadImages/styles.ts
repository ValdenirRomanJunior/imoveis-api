import styled from "styled-components";

export const ImagesContainer = styled.div`
    width: 100%;
    overflow: visible;

    .title-fotos{

    }

    p{

    }


`

export const UploadImage = styled.div`
    width: 160px;
    height: 122px;
    border-radius: 2px;
    background-color: #fff;
    border: 1px dashed #9027b0;
    float: left;
    margin-right: 12px;
    margin-top: 6px;
    text-align: center;
    cursor: pointer;
    position:relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon-photo{
        width: 100%;
        font-size: 40px;
    }
    input[type='file']{
   position: absolute;
   top:0;
   left: 0;
   opacity:0;
   z-index:1;
    width: 160px;
    height: 122px;
   
  
}

input[type=file]::-webkit-file-upload-button{
    cursor:pointer;
}

`

export const ImageWrapper = styled.div`

width: 160px;
height: 122px;
border-radius: 2px;
background-color: #fff;
float: left;
margin-right: 12px;
margin-top: 6px;
text-align: center;
cursor: pointer;


align-items: flex-start;
overflow: hidden;
position: relative;
display: flex;
justify-content: center;

img{
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
}
.button-close{
    
    position: absolute;
    top:0;
    right: 0;
    font-size: 25px;
}


`