import styled from "styled-components";
import imageTopBanner from '../../assets/images/banner-top.png';


export const PropertiesBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};


.title-steps{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 20px;
    margin-top: 40px;
  
    
   h2{
    color: #5d5d5d;
    font-weight: 400 !important;
    font-family:"Poppins",sans-serif;
    font-size:17px;
    color:#5d5d5d;
    margin-bottom:0;
    margin-left:7px;
   }
   .icon-title-steps{
    color: #6475fd;
    font-size:19px;
   }

}
    .bar-top-location{
         padding:5px 20px;
         width:100%;
        span{
        font-size:12px;
        font-family:"Open Sans", sans-serif;
        color:gray;
        }
    
}

 @media screen and (min-width: 1000px){
    align-items: center;

    .title-steps{
    padding: 0 90px;
    h2{
    
    }
    }
    

        .bar-top-location{
         padding:10px 20px;
         width:100%;
        span{
        font-size:13px;
        font-family:"Open Sans", sans-serif;
        color:gray;
        margin-left:70px;
        }
    
}
`

export const BodyPropertiesContainer = styled.main`      
    width:100%;
    display:flex;
    flex-direction: column;

    padding: 10px 0 30px 0;


    @media screen and (min-width: 1000px){
      
    }
  
    `

    
export const TitleWrapper = styled.div`
   
    
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 50px;

    
    .title-properties{
        text-align: left;
       
        font-family: "Poppins", sans-serif;
        font-size: 13px;
        color: #5d5d5d;
        font-weight: 400;
        margin-bottom: 0;
        margin-left:25px;
        
    }


  .button-add-lead{
     
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:5px;
        background: rgba(191,235,214,0.5);
        border: none;
        position: relative;
        color: green;

        .icon-add-lead-positive{
            position:absolute;
            top:5px;
            right:8px;
        }
        

        a{
            color:#fff;
        }

    }
        .featured-properties{
        font-size:13px;
        border:1px solid #001fa0d9;
        color:#001fa0d9;
        padding:6px 7px;
        border-radius:5px;
        margin-bottom:0;
        cursor: pointer;
        
        }
    @media screen and (min-width: 450px){
        padding: 10px 80px 10px 80px;
    }

    @media screen and (min-width: 520px){
        padding: 10px 110px 10px 110px;
    }
    @media screen and (min-width: 620px){
        padding: 10px 150px 10px 150px;
    }
    @media screen and (min-width: 800px){
        padding: 10px 170px 10px 170px;
    }


    @media screen and (min-width: 1000px){
        padding: 10px 70px 10px 140px;

        .title-properties{

            display:none;   
        }


        .button-add-lead{
            width:auto;
            height: auto;
            padding: 5px 20px;
            margin-bottom:0;
            font-size: 17px;
            border-radius:5px;
            background: rgba(191,235,214,0.5);
            border: none;
            position: relative;
            color: green;
    
            .icon-add-lead-positive{
                position:absolute;
                top:5px;
                right:8px;
            }
            
    
            a{
                color:#fff;
            }
        
    }
   
}

@media screen and (min-width: 1200px){
    padding: 10px 70px 10px 140px;

    .title-properties{

        display:none;   
    }


    .button-add-lead{
        margin-left:25px;
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:5px;
        background: rgba(191,235,214,0.5);
        border: none;
        position: relative;
        color: green;

        .icon-add-lead-positive{
            position:absolute;
            top:5px;
            right:8px;
        }
        

        a{
            color:#fff;
        }
    
}

}

@media screen and (min-width: 1350px){
    padding: 10px 100px 10px 160px;

    .title-properties{

        display:none;   
    }


    .button-add-lead{
        margin-left:65px;
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:5px;
        background: rgba(191,235,214,0.5);
        border: none;
        position: relative;
        color: green;

        .icon-add-lead-positive{
            position:absolute;
            top:5px;
            right:8px;
        }
        

        a{
            color:#fff;
        }
    
}

}

@media screen and (min-width: 1450px){
    padding: 10px 150px 10px 200px;

    .title-properties{

        display:none;   
    }


    .button-add-lead{
        margin-left:85px;
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:5px;
        background: rgba(191,235,214,0.5);
        border: none;
        position: relative;
        color: green;

        .icon-add-lead-positive{
            position:absolute;
            top:5px;
            right:8px;
        }
        

        a{
            color:#fff;
        }
    
}

}


`
