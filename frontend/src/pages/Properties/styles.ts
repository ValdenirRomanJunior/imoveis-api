import styled from "styled-components";
import imageTopBanner from '../../assets/images/banner-top.png';


export const PropertiesBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:100px){
    align-items: center;
}
`

export const BodyPropertiesContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;
   
  
    padding: 50px 0 30px 0;


    @media screen and (min-width: 1000px){
        width:1145px;
    }
  
    `

    export const BarTopContainer = styled.div`
        width:100%;
        height:55px;
      
        background-image: url(${imageTopBanner});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-around;
        align-items: center;
             
        margin-top:65px;
        border-bottom: 1px solid #e6e9ed;

        img{
            width: 110px;
            height: 40px;
            object-fit: contain;
            margin-left:30px;
                           
        }

        p{
            
           font-size: 11px;
           margin-bottom: 0;
           position: absolute;
           top:110px;
           left:20px;
           display: none;
          
        }
        
        button{
          width:auto;
          height: auto;
          padding: 3px 8px !important;
          margin-bottom:0;
          background:#7b62e2 !important;
          border-radius:3px;
          font-size:12px;
        
          margin-left: 25px;
       
         
        }

        .arrow-top{
            
            background: #fff;
            position: absolute;
            top:110px;
            border-radius:20%;
            padding: 0 4px;
            box-shadow:0 2px 4px 0rgba(0,0,0,.1);
            border: 1px solid #e6e9ed;

            display: flex;
            align-items: center;
            justify-content: center;
          

        }

        @media screen and (min-width:1000px){

            width:100%;
            height:60px;
            
            background-image: url(${imageTopBanner});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
                 
            margin-top: 65px;
            border-bottom: 1px solid #e6e9ed;

            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 90px;
    
            img{
                width: 140px;
                height: 30px;
                object-fit: contain;
                             
            }
            
            p{
               
                font-size: 14px;
                position: relative;
                top:0;
                left:0;
                display: block;
            }
            
            button{
                width:auto;
                height: auto;
                padding: 5px 10px;
                margin-bottom:0;
                font-size: 17px;
    
            }
    
            .arrow-top{             
                background: #fff;
                position: absolute;
                top:123px;
                left:50%;
                transform: translate(-50%, -50%);
                border-radius:30%;
                padding: 2px 5px;
                box-shadow:0 2px 4px 0rgba(0,0,0,.1);
                border: 1px solid #e6e9ed;
                
                display: flex;
                align-items: center;
                justify-content: center;
                
            }

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
