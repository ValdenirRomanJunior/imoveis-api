import styled from "styled-components";


export const CardWrapper = styled.div`
width: 90%;


border-bottom: 1px solid rgb(222, 222, 222);
margin-top: 10px;
padding: 10px 0;

.status-wrapper{
display: flex;
align-items: center;
}

@media screen and (min-width: 700px){
    width:70%;
}

@media screen and (min-width: 1000px){
    width:50%;
}
`

export const CardContent = styled.div<{copyId:boolean}>`
width: 100%;
height:100%;
padding: 0 10px 0 10px;
display: flex;
justify-content: space-around;
align-items: center;
position: relative;

font-family: "Poppins", sans-serif;



    
    img{
        max-width: 75px;
        width:75px;
        height: 75px;
        object-fit: cover;
        
        border-radius: 5px;
    }

    .text-wrapper-card{
        display:flex;
        flex-direction: column;
        justify-content: center;
        flex:1;
        margin-left:10px;
        padding: 5px 5px;
        max-width:100%;
        overflow: hidden;
        position: relative;

     .cod-property-card{
        position: absolute;
        top:-4%;
        right:5%;
        font-size:13px;
        color: gray;
        width:50px;
        height:50px;
     }

     .cod-property-card::before{
    position: absolute;
    top:5%;
    left:-80%;
    transform: translate(-50%,-50%);
    content: "copiado";

    background-color: gray;
    display: flex;
    color:#fff;
    font-size:11px;
    padding:5px 15px;
    -webkit-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    box-shadow: 0px 0px 13px -5px rgba(214,214,214,1);
    text-align: center;
    display:${({copyId}) => copyId === true ?  'block' : 'none'};
    font-weight: bold;
    transition: transform .3s;
    animation: copyId 4s ease-in-out;
    transform: translateY(0) scale(0);
    opacity:0;
    font-weight:400;
   


  }

  @keyframes copyId {
    
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

        .title-card-property{
            color: rgb(74, 74, 74)  !important;
            margin-bottom: 3px;
            font-weight:400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
           white-space: nowrap;
           cursor: pointer;
           outline: none;
           max-width:100%;
         
            

        }
        .value{
            font-weight: 500;
            color: rgb(74, 74, 74);
            font-size: 14px;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            max-width: 100%;
        }
        p{
            margin-bottom: 0;
            
        }

        .localization-wrapper{
            display:flex;
            width:100%;
            overflow:hidden;
            line-break: anywhere;
            text-overflow: ellipsis;
            align-items:center;
            
        }
        .localization{
            color: rgb(153, 153, 153);
            font-size: 12px;
            
            align-items: center;
            margin-bottom: 6px;
            font-weight: 300;
            line-break: anywhere;
            text-overflow: ellipsis;
            display: block !important;
            white-space: nowrap;
            max-width: 40%;
            overflow: hidden;
           
        }
        .localization-icon{
            font-size:15px;
        }
        .district-localization{
            margin-left:5px;
        }

        .links-card{

            display: flex;
            color:#0b90d1;
            justify-content: space-between;  
            width:150px;
            font-size: 11px;
            font-weight: 300;
            cursor: pointer;
            
            
        
            .icon-links{
                margin-right:4px;
                font-size: 15px;
            }

        }
     
        

 

    @media screen and (min-width: 700px){
        .text-wrapper-card{
            .links-card{
                width:150px;
            }

        }
    }
   
`

export const CardContainer = styled.main`   
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
   
    border-top: 1px solid #e6e9ed;

    .wrapper-properties{
        width:100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }
   
    .pagination-button-wrapper{
        display: flex;
        align-items: center;
        padding-right:20px;
     

        .button-all-properties{
            margin-right:20px;
        }
    }
    `

    export const MessageNoProperties = styled.div`
    width:100%;
    height:100vh;

    text-align: center;

    h4{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        
        color: gray;
        font-size:12px;
        width:100%;
        text-align: center;
    }

    `

    export const StatusProperty = styled.div<{
    statusProperty:string}>`

    width:100%;
    color: ${({statusProperty}) => statusProperty ==='1' ? 'green' : 'red'};
    display: flex;
    align-items: center;
    justify-content: start;
    text-align:left;
    padding-left: 10px;
   
  

    p{
        text-align:left;      
        font-size:10px;
        margin-left:3px;
        text-transform: uppercase;
        margin-bottom: 0;
      
    }
    `

    
    export const StatusFeatured = styled.div<{
        statusFeatured:string}>`
    
        width:100%;
        color: ${({statusFeatured}) => statusFeatured ==='1' ? '#001fa0d9;' : 'red'};
        display: flex;
        align-items: center;
        justify-content: start;
        text-align:left;
        padding-left: 10px;
       
      
        p{
            text-align:left;      
            font-size:10px;
            margin-left:3px;
            text-transform: uppercase;
            margin-bottom: 0;
          
        }
    
        
    
        `

    export const InputRangeProperty =styled.div`
    width:25px;
    margin-left:20px;


    input{
        width:100%;
     
        transition: .4s all ease-out;
        outline: none;

    }


`