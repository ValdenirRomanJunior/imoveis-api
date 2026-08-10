import styled from "styled-components";

export const DetailContainer = styled.div`
    width:100%;
    
    position: relative;
    .title-property-desktop-detail{
        display:none;
    }

    .full-width-slider {
        width: 100vw;
        height: 100vh;
        margin-left: calc(-50vw + 50%); /* Força a ocupar a tela toda */
        margin-top: 0;
    }

    @media screen and (min-width: 900px){
        .full-width-slider {
            height: 100vh;
        }
    }

    .links-desktop-container{
 
        display:none;
       
    }

    .links-desktop-wrapper {

        
    }

    .list-links-desktop-wrapper{
    

    }
    .arrow-link-detail{
       
    }

    .item-links-desktop-detail {  
   

    }
    
    .last-item-links-desktop-detail {
     
    }

    .message{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: #629a7f;
        padding-left:10px;
        z-index:99999999;

        display: flex;
        align-items: center;
        
        position: fixed;
        bottom:10%;
        left:50%;
        transform: translate(-50%,-50%);

    }
    .success{
       
        color: #fff;
        z-index:99999;
    }

    .other-error{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: rgb(227 60 60 / 68%);
       
        z-index:99999;

        display: flex;
        align-items: center;
        justify-content: center;
        
        position: fixed;
        bottom:10%;
        left:50%;
        transform: translate(-50%,-50%);
      
        color: #fff;
    }
  

    @media screen and (min-width: 900px){
        width: 100%;
        padding-top:1rem;
        
       
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

       
        .links-desktop-container{
            width: 100%;
            height:60px;
            display: flex;
            align-items: center;
            justify-content: center;          
            position: relative;
            margin-top:10px;
           
        }

        .links-desktop-wrapper {
            width: 850px;
            display: flex;
            align-items: center;
            
            
        }

        .list-links-desktop-wrapper{
            width:40%;
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        .arrow-link-detail{
            font-size:10px;
            margin-left:4px;
            margin-right:4px;
        }

        .item-links-desktop-detail {  
            display: inline-block;             
          
            font-weight:400;
            font-size: 13px;
          

        }
        
        .last-item-links-desktop-detail {
            color: rgb(0, 100, 229);
        }
        .ellipse-item{
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;

        }
      
    }

    .message{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: #629a7f;
        padding-left:10px;
        z-index:1;

        display: flex;
        align-items: center;
        
        position: fixed;
        bottom:10%;
        left:50%;
        transform: translate(-50%,-50%);

    }
    .success{
      
        color: #fff;
    }

    .other-error{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: rgb(227 60 60 / 68%);
       
        z-index:1;

        display: flex;
        align-items: center;
        justify-content: center;
        
        position: fixed;
        bottom:10%;
        left:50%;
        transform: translate(-50%,-50%);
      
        color: #fff;
    }

    @media screen and (min-width: 1400px) {
        width: 100%;
        padding-top:1rem;
        
            
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

       
        .links-desktop-container{
            width: 100%;
            height:60px;
            display: flex;
            align-items: center;
            justify-content: center;          
            position: relative;
            margin-top:10px;
           
        }

        .links-desktop-wrapper {
            width: 1000px;
            display: flex;
            align-items: center;
            
            
        }

        .list-links-desktop-wrapper{
            width:35%;
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        .arrow-link-detail{
            font-size:10px;
            margin-left:4px;
            margin-right:4px;
        }

        .item-links-desktop-detail {  
            display: inline-block;             
          
            font-weight:400;
            font-size: 13px;
            text-transform: Capitalize;

        }
        
        .last-item-links-desktop-detail {
            color: rgb(0, 100, 229);
        }
      
 
    }

 

`
export const DetailContent = styled.div`
    width:100%;
    letter-spacing: .45px;
    position: relative;
    z-index: 10;
    margin-top: 2rem; /* Overlap the slider */

    .right-left-container-flex {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 0 1rem;
    }

    .main-content-detail-container {
        width: 100%;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .modal-desktop-container {
        width: 100%;
    }

    @media screen and (min-width: 900px){
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

       .right-left-container-flex {
            width: 850px;
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            padding: 0;
            gap: 0;
       }
        
        .main-content-detail-container {
            width:60%;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .modal-desktop-container{
            width:40%;
            height: auto;
            padding-left: 20px;
        }
    }

    @media screen and (min-width: 1300px){
        .right-left-container-flex {
            width: 1300px;
        }
    }
`
export const DetailTextContainer = styled.div`
    width:100%;
    padding:1rem 1.5rem;
    text-transform:Capitalize;
    position: relative;

    .copy-url-wrapper{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: #629a7f;
        padding-left:10px;
        z-index:1;

        display: flex;
        align-items: center;
        
        position: fixed;
        bottom:10%;
        left:50%;
        transform: translate(-50%,-50%);

    }

    .copy-url-text{
      
        color: #fff;

    }

 
   

`

export const PriceWrapper = styled.div`
    width:100%;
    display: flex;
    justify-content: space-between;
    padding:0 0 .5rem 0;
    font-size: 1.125rem;
     
    .price-star-wrapper{
        display: flex;
        align-items: center;
       
    }

    span{
        text-align: center;
        
        background: rgb(187 187 254 / 36%);
       
        padding:2px 10px;
        border-radius:15px;
        font-size:15px;

    }

    .share-icon-detail{         
        font-size:15px;
        border-radius: 2px;
        color: gray;
        cursor:pointer;
    }

    .star-detail-wrapper{
        margin-left:10px;
            
        display: flex;
        align-items: center;

    }
    .star-detail{
        color:#d0d300;
        font-size:14px;
    }

    @media screen and (min-width:900px){

        .price-star-wrapper{
            display: flex;
            align-items: center;
           
        }

        span{
          
            background: rgb(187 187 254 / 36%);
            padding:2px 10px;
            border-radius:15px;
            font-size:16px;
    
        }

        .share-icon-detail{         
            font-size:15px;
            border-radius: 2px;
            color: gray;
            cursor:pointer;
        }

        .star-detail-wrapper{
            margin-left:10px;
                
            display: flex;
            align-items: center;

        }
        .star-detail{
            color:#d0d300;
            font-size:14px;
        }
    }

`
export const TitleWrapper = styled.div`
    width:100%;
    padding:1rem 0;
   
    h2{
        font-weight: 300;
        font-size: 2.25rem;
        line-height: 120%;
        line-break: anywhere;
        white-space: pre-line;
        overflow-wrap: break-word;
        color: #666;
        margin-bottom: 1rem;
    }

    .views-badge {
        display: inline-block;
        border: 1px solid #ff6b35be;
        color: #ff6b35be;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 13px;
        margin-bottom: 1.5rem;
    }

    .property-subtitle {
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 0.5rem;
    }

    .property-reference {
        font-size: 0.9rem;
        color: #999;
    }
`

export const LocalizationWrapper = styled.div`
    width:100%;
    letter-spacing: .45px;
    line-height: 150%;
   
    font-weight:200;
    font-size:15px;
   

    .localization-street-district{
        display:flex;
        align-items: center;
        span{
           
            font-weight:200;
            font-size:15px;
        }
       
    }
    .localization-city-state-cep{
        display:flex;
        align-items: center;
        span{
           
            font-weight:200;
            font-size:15px;
        }
       
    }
   
`
export const DetailsWrapper = styled.div`
    width:100%;
    padding: 2rem 0;
    margin-top: 1rem;
   
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;

    .detail-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;

        .detail-icon {
            font-size: 2.5rem;
            color: #ff6b35be;
            opacity: 0.7;
        }

        .detail-value{
            color: #666;
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        .detail-title{
            font-weight: 300;
            font-size: 0.9rem;
            color: #666;
        }
    }
`
export const DescriptionWrapper = styled.div`
    width:100%;
    padding:.5rem 0 0 0;
    

    h2{
 
   
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 150%;
    margin-bottom:.5rem;
    }

    p{
    padding: .5rem 0;
    
    display:inline;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight:200;
    word-wrap: break-word;
    line-height: 150%;
    line-break: anywhere;
    white-space: pre-line;
    }
`
export const MoreDetailsWrapper = styled.div`
    width:100%;
    padding: 1.5rem 0;
    margin-bottom: 5rem;
    
    h2{
        font-weight: 300;
        font-size: 1.5rem;
        color: #666;
        line-height: 150%;
        margin-bottom: 1.5rem; 
    }

    .amenities-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 2rem;
    }

    .amenity-tag {
        background: #e2e2e2;
        color: #666;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 300;
    }

    .map-placeholder {
        width: 100%;
        height: 250px;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #666;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.8;
    }

   @media screen and (min-width: 900px){
    margin-bottom: 0;
   }
    
`

export const PriceLocalizationContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 0;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 2rem;

    .price-section, .localization-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .section-label {
        font-size: 0.9rem;
        color: #999;
    }

    .price-value {
        font-size: 1.8rem;
        font-weight: 400;
    }

    .localization-value {
        font-size: 1rem;
        color: #666;
        max-width: 300px;
    }
`

export const ContactDetailrapper = styled.div`
   width:100%;
   position:fixed;
   bottom:0;
   left:0;
   box-shadow: 0 0.25rem 1rem rgba(0,0,0,.16);
   padding: 24px;

   background: #fff;


   display: flex;
   align-items: center;
   justify-content: center;

   button{
    background:#0064e5;
    color:#fff;
    border: 1px solid #0064e5;
    width:100%;
    padding: 8px;
   
    border-radius:2px;
   }

   @media screen and (min-width:900px){

    display:none;
   }

`
export const ContactModalDetailWrapper = styled.div<{openModal:boolean}>`
    width:100%;
    background:#fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding-bottom: 20px;
    margin-bottom: 2rem;
    display: flex;
    flex-direction:column;

    .header-modal-contact-wrapper{
        border-bottom:.0625rem solid #e5e5e5;
        height: 3.5rem;

        display: flex;
        justify-content: center;
        align-items:center;
        
        .close-button-modal-contact{
            display: none;
        }

        h1{
            
            font-weight: 400;
            font-size: 1.125rem;
            line-height: 150%;
                     
        }

    }

    h2{
       
        font-weight: 300;
        font-size: 1.125rem;
        line-height: 150%;
        margin-bottom:.5rem; 
        text-align: center;
        margin-top:30px;
    }
    .cod-property{
        padding-left:2rem;
       
        font-weight: 200;
        font-size:12px;
        margin-top:2rem;
    }

    form{
        display: flex;
        flex-direction:column;
        padding:0 2rem;
        background: #fff;

        .input-modal-wrapper{
            position:relative;
        }
      
        
        input{
          
            transition: border-color .2s ease-in-out;
         
            font-size: 1rem;
            line-height: 150%;     
            border-radius: 2px;
            border: 0.0625rem solid #d2d2d2;
            background-color: #fff;
            padding: 0.625rem;
            height: 2.75rem;
            font-weight: 200;
            display: block;
            min-width: 7.5rem;
            width: 100%;
            background-clip: padding-box;
            outline:#9797ff;
            margin-top:1rem;

        }
        input:focus{
            border-color: #9797ff;
        }
        textarea{
          
            transition: border-color .2s ease-in-out;
            border-color: #9797ff;
            outline:#9797ff;
            max-width: 100%;
            height: 152px;
            margin-top:1rem;
            border-radius:2px;
            background-clip: padding-box;
            border: 0.0625rem solid #d2d2d2;
            padding-left: .5rem;
            font-weight: 200;
            min-width: 100%;
        }
        textarea:focus{
            border-color: #9797ff;
        }

        button{           
            margin-top:1rem;
      
            background: transparent;
            
            color:#0064e5;
            border: 0.0625rem solid #d2d2d2;
            -webkit-user-select: none;
            user-select: none;
            cursor: pointer;
            font-size:14px;
            text-transform: uppercase;
            border-radius:2px;
            height:35px;

        }

        button:focus{
           border-color: #9797ff;
           box-shadow: 0px 0px 3px #0064e5;
           outline-none;
          
        }

        .button-send-lead{

           margin-top:1rem;
        
            background: #0064e5;
            height:35px;
            color:#0064e5;
            border: 0.0625rem solid #d2d2d2;
            -webkit-user-select: none;
            user-select: none;
            cursor: pointer;
            font-size:14px;
            text-transform: uppercase;
            border-radius:2px;
      
        display:flex;
        align-items: center;
        justify-content: center;
        position: relative;
        }
    }

    .formField__error{
  
        color:red;
      
        font-weight:300;
        font-size:12px;
        
    }

    .messageModal{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: #629a7f;
        padding-left:10px;
        z-index:99999999;

        display: flex;
        align-items: center;
        
        position: fixed;
        bottom:2%;
        left:50%;
        transform: translate(-50%,-50%);

    }
    .success{
     
        color: #fff;
        z-index:99999;
    }

    .other-errorModal{
        width:200px;
        height:40px;
        -webkit-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        -moz-box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        box-shadow: 0px 6px 8px -2px rgba(209,209,209,1);
        font-weight:300;
        background: rgb(227 60 60 / 68%);
       
        z-index:99999;

        display: flex;
        align-items: center;
        justify-content: center;
        
        position: fixed;
        bottom:2%;
        left:50%;
        transform: translate(-50%,-50%);
     
        color: #fff;
    }

 

    @media screen and (min-width:900px){
        width: 350px;
        height: auto;
        padding-bottom: 20px; 
        display: ${({openModal}) => (openModal ? 'flex' : 'flex')};
        z-index:0;
        border: 0.0625rem solid #d2d2d2;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        
        position:sticky;
        position: -webkit-sticky;
        top:145px;
        background:#fff;
        transition: margin-top 0.4s ease-in-out;
        margin-top: -150px;
       
     

        .header-modal-contact-wrapper{
            border-bottom:.0625rem solid #e5e5e5;
            min-height: 2rem;
            height:2rem;
    
            display: flex;
            justify-content: center;
            align-items:center;
            
            .close-button-modal-contact{
                position: absolute;
                top:2%;
                right:5%;  
                font-size:20px;                
            }

            h1{
          
                font-weight: 400;
                font-size: .9rem;
                line-height: 120%;
                         
            }
        }

     

        h2{
         
            font-weight: 300;
            font-size: .8rem;
            line-height: 150%;
            margin-bottom:0; 
            text-align: center;
            margin-top:7px;
        }
        .cod-property{
            padding-left:2rem;
         
            font-weight: 200;
            font-size:11px;
            margin-top:.3rem;
        }

        form{
            display: flex;
            flex-direction:column;
            padding:0 2rem;
            background: #fff;
    
         
            input{
                
                transition: border-color .2s ease-in-out;
             
                font-size: .9rem;
                line-height: 150%;     
                border-radius: 2px;
                border: 0.0625rem solid #d2d2d2;
                background-color: #fff;
                padding: 0.625rem;
                height: 2.35rem;
                font-weight: 200;
                display: block;
                min-width: 7.5rem;
                width: 100%;
                background-clip: padding-box;
                outline:#9797ff;
                margin-top:1.2rem;
    
            }
            input:focus{
                border-color: #9797ff;
            }
            textarea{
               
                transition: border-color .2s ease-in-out;
                border-color: #9797ff;
                outline:#9797ff;
                max-width: 100%;
                min-width: 100%;
                height: 80px;
                margin-top:1rem;
                border-radius:2px;
                background-clip: padding-box;
                border: 0.0625rem solid #d2d2d2;

            }
            .formField__error.textarea-class{
                position: absolute;
                bottom:-12%;
                left:0;
            }
            .formField__error.error-name{
                position: absolute;
                bottom:-27%;
                left:0;
            }
            .formField__error.error-phone{
                position: absolute;
                bottom:-27%;
                left:0;
            }

            textarea:focus{
                border-color: #9797ff;
            }
    
            button{           
                margin-top:1rem;
              
                background: #0064e5;
                height:33px;
                color:#fff;
                border: 0.0625rem solid #d2d2d2;
                -webkit-user-select: none;
                user-select: none;
                cursor: pointer;
                font-size:13px;
                text-transform: uppercase;
    
            }
            .button-send-lead{
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1.5rem;
                text-transform: none;
            }

            .btn-whatsapp {
                background: #25d366;
                color: #fff;
                border: none;
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1rem;
                text-transform: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .btn-outline {
                background: transparent;
                color: #666;
                border: 1px solid #ff6b35be;
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1rem;
                text-transform: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            button:focus{
               border-color: #9797ff;
               box-shadow: 0px 0px 3px #0064e5;
               outline-none;
              
            }

       
    }
    .messageModal{
        display: none;
    }
    .other-errorModal{
        display: none;

    }
}
    @media screen and (min-width:1300px){
        width: 350px;
        height: auto;
        padding-bottom: 20px;
        display: ${({openModal}) => (openModal ? 'flex' : 'flex')};
        
        border: 0.0625rem solid #d2d2d2;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        
        position:sticky;
        position: -webkit-sticky;
        top:148px;
        background:#fff;
        transition: margin-top 0.4s ease-in-out;
        margin-top: -150px;
       
     

        .header-modal-contact-wrapper{
            border-bottom:.0625rem solid #e5e5e5;
            min-height: 2.3rem;
    
            display: flex;
            justify-content: center;
            align-items:center;
            
            .close-button-modal-contact{
                position: absolute;
                top:2%;
                right:5%;  
                font-size:20px;                
            }

            h1{
             
                font-weight: 400;
                font-size: .9rem;
                line-height: 120%;
                         
            }
        }

     

        h2{
       
            font-weight: 300;
            font-size: .9rem;
            line-height: 150%;
          
            text-align: center;
            margin-top:7px;
        }
        .cod-property{
            padding-left:2rem;
        
            font-weight: 200;
            font-size:12px;
            margin-top:.3rem;
        }

        form{
            display: flex;
            flex-direction:column;
            padding:0 2rem;
            background: #fff;
    
         
            input{
             
                transition: border-color .2s ease-in-out;
             
                font-size: 1rem;
                line-height: 150%;     
                border-radius: 2px;
                border: 0.0625rem solid #d2d2d2;
                background-color: #fff;
                padding: 0.625rem;
                height: 2.3rem;
                font-weight: 200;
                display: block;
                min-width: 7.5rem;
                width: 100%;
                background-clip: padding-box;
                outline:#9797ff;
                margin-top:.7rem;
    
            }
            input:focus{
                border-color: #9797ff;
            }
            textarea{
             
                transition: border-color .2s ease-in-out;
                border-color: #9797ff;
                outline:#9797ff;
                max-width: 100%;
                height: 90px;
                margin-top:.7rem;
                border-radius:2px;
                background-clip: padding-box;
                border: 0.0625rem solid #d2d2d2;
            }

            textarea:focus{
                border-color: #9797ff;
            }
    
            .formField__error.textarea-class{
                position: absolute;
                bottom:-12%;
                left:0;
            }
            .formField__error.error-name{
                position: absolute;
                bottom:-27%;
                left:0;
            }
            .formField__error.error-phone{
                position: absolute;
                bottom:-27%;
                left:0;
            }

            button{           
                margin-top:1rem;
               
                background: #0064e5;
                
                color:#fff;
                border: 0.0625rem solid #d2d2d2;
                -webkit-user-select: none;
                user-select: none;
                cursor: pointer;
                font-size:13px;
                text-transform: uppercase;
                height:33px;
    
            }
            
            .button-send-lead{
                height:33px;
            }
            button:focus{
               border-color: #9797ff;
               box-shadow: 0px 0px 3px #0064e5;
               outline-none;
              
            }
    }
}
    @media screen and (min-width:1400px){
        width: 380px;
        height: auto;
        padding-bottom: 20px;
        display: ${({openModal}) => (openModal ? 'flex' : 'flex')};
        
        border: 0.0625rem solid #d2d2d2;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        
        position:sticky;
        position: -webkit-sticky;
        top:147px;
        background:#fff;
        transition: margin-top 0.4s ease-in-out;
        margin-top: -150px;
       
     

        .header-modal-contact-wrapper{
            border-bottom:.0625rem solid #e5e5e5;
            height: 2.6rem;
    
            display: flex;
            justify-content: center;
            align-items:center;
            
            .close-button-modal-contact{
                position: absolute;
                top:2%;
                right:5%;  
                font-size:20px;                
            }

            h1{
               
                font-weight: 400;
                font-size: .9rem;
                line-height: 120%;
                         
            }
        }

     

        h2{
         
            font-weight: 300;
            font-size: .9rem;
            line-height: 150%;
            margin-bottom:.2rem; 
            text-align: center;
            margin-top:10px;
        }
        .cod-property{
            padding-left:2rem;
          
            font-weight: 200;
            font-size:12px;
            margin-top:.2rem;
        }

        form{
            display: flex;
            flex-direction:column;
            padding:0 2rem;
            background: #fff;
    
         
            input{
              
                transition: border-color .2s ease-in-out;
             
                font-size: 1rem;
                line-height: 150%;     
                border-radius: 2px;
                border: 0.0625rem solid #d2d2d2;
                background-color: #fff;
                padding: 0.625rem;
                height: 2.25rem;
                font-weight: 200;
                display: block;
                min-width: 7.5rem;
                width: 100%;
                background-clip: padding-box;
                outline:#9797ff;
                margin-top:.7rem;
    
            }
            input:focus{
                border-color: #9797ff;
            }
            textarea{
              
                transition: border-color .2s ease-in-out;
                border-color: #9797ff;
                outline:#9797ff;
                max-width: 100%;
                height: 85px;
                margin-top:.7rem;
                border-radius:2px;
                background-clip: padding-box;
                border: 0.0625rem solid #d2d2d2;
            }

            textarea:focus{
                border-color: #9797ff;
            }
    
            button{           
                margin-top:1rem;
             
                background: #0064e5;
                height:33px;
                color:#fff;
                border: 0.0625rem solid #d2d2d2;
                -webkit-user-select: none;
                user-select: none;
                cursor: pointer;
                font-size:13px;
                text-transform: uppercase;
    
            }
            .button-send-lead{
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1.5rem;
                text-transform: none;
            }

            .btn-whatsapp {
                background: #25d366;
                color: #fff;
                border: none;
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1rem;
                text-transform: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .btn-outline {
                background: transparent;
                color: #666;
                border: 1px solid #ff6b35be;
                height: 45px;
                border-radius: 4px;
                font-weight: 500;
                font-size: 1rem;
                margin-top: 1rem;
                text-transform: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            button:focus{
               border-color: #9797ff;
               box-shadow: 0px 0px 3px #0064e5;
               outline-none;
              
            }    
    }
  
}


`

export const SessionFooter= styled.div`
    margin-top:2rem;
    margin-bottom: 4rem;
    padding:2rem 0 2rem 0;
    width:100%;
    background-color:#f5f5f5;
    box-shadow: 1px -3px 20px -12px black;

    @media screen and (min-width:900px){
        margin-top:4rem;
        margin-bottom: 0;
    }
`
