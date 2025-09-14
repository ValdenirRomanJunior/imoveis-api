import styled from "styled-components";

export const DetailImagesWrapper= styled.div`
    width:100%;
  height:35px;
    background:rgb(0 0 0 / 43%);
   
    padding: 0 1rem;

    position: absolute;
    bottom:0;
    left:0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .type-image-detail-wrapper{
      
        width:80px;
        height:100%;
        
        display: flex;
        align-items: center;

        span{

     
         font-size:11px;
         background:#000;
         padding:6px 9px;
         border-radius:5px;
        }
    }

    .iconImage-counter-wrapper{
        width:80px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height:100%;
    }

    .icon-image-slider-detail{
        color:#fff;
        font-size:20px;
    }

    span{
        color:#fff;
        background:#000;
        border-radius:10px;
        font-size:11px;
       
        font-weight:300;
        padding:4px 7px;
    }

  

    @media screen and (min-width:900px){
    height:50px;
    background:rgb(0 0 0 / 63%);
   
    padding: 0 1rem;

    position: absolute;
    bottom:0;
    left:0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .type-image-detail-wrapper{
      
        width:80px;
        height:100%;
        
        display: flex;
        align-items: center;

        span{

     
         font-size:13px;
         background:#000;
         padding:6px 9px;
         border-radius:5px;
        }
    }

    .iconImage-counter-wrapper{
        width:80px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height:100%;
    }

    .icon-image-slider-detail{
        color:#fff;
        font-size:20px;
    }

    span{
        color:#fff;
        background:#000;
        border-radius:10px;
        font-size:11px;
        
        font-weight:300;
        padding:4px 7px;
    }

}

`