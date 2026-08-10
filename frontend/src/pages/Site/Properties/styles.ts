import styled from "styled-components";
import imageTopBanner from '../../assets/images/banner-top.png';


export const PropertiesBackground = styled.main`
    background-color:#FAFAFA;
    min-height: 100vh;
    width: 100%;
    padding-top: 80px; /* Space for the fixed header */

    .properties-search-wrapper {
        margin-top: 0 !important;

        @media (min-width: 768px) {
            margin-top: 20px !important;
        }
    }
`

export const BodyPropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 1rem;
`;

    
export const TitleWrapper = styled.div`
   
    
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 60px;

    
    .title-properties{
        text-align: left;
       

        font-family: "Poppins", sans-serif;
        font-size: 15px;
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