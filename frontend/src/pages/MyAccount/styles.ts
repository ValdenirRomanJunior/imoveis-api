import styled from "styled-components"

export const MyAccountBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:100px){
    align-items: center;
}
`

export const BodyMyAccountContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    padding: 50px 0 30px 0;

    .upload{
        position:relative;
    }
    .imgWrapper{
        width:92px;
        height:92px;
        border: .3px solid #e6e9ed;
        border-radius:50%;
        padding:10px;
        text-align:center;

        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }      
    }

    .round{
        position: absolute;
        bottom:0;
        right:0;
        background:#00B4FF;
        width:32px;
        height:32px;
        line-height: 32px;
        overflow: hidden;
        text-align:center;
        border-radius: 50%;
        
        
    }
    .round input[type='file']{
        position: absolute;
        transform:scale(2);
        opacity:0;
      
    }

    input[type=file]::-webkit-file-upload-button{
        cursor:pointer;
    }
    .button-submit{
         opacity:1;
         z-index: 5000;
        visibility:visible;
        
    }
    

    

    @media screen and (min-width: 1000px){
        width:1145px;
    }


  
    `

    export const TitleWrapper = styled.div`
   
    
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;

    
    .title-properties{
        text-align: left;
       

        font-family: "Poppins", sans-serif;
        font-size: 20px;
        color: #5d5d5d;
        font-weight: 400;
        margin-bottom: 0;
           
    }

    button{
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:50px;
        background: rgb(0, 157, 67);
        border: none;
        color: #fff;

        a{
            color:#fff;
        }

    }

    @media screen and (min-width: 1000px){
        
    }
   

`