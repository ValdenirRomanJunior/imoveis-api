import styled from "styled-components";


export const CardWrapper = styled.div`
width: 100%;
max-width: 380px;
height: 480px;
background: #fff;
border-radius: 8px;
margin-top: 20px;
cursor: pointer;
transition: all 0.3s ease;
border: 1px solid #f3f4f6;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
margin-bottom: 20px;

&:hover{
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 700px){
    width: 100%;
}

@media screen and (min-width: 1300px){
    width: 100%;
}
`

export const CardContent = styled.div`
width: 100%;
height:100%;
display: flex;
flex-direction: column;
align-items: center;
position:relative;
overflow: hidden;
border-radius: 8px;

    .image-card-property-home-wrapper{
        width:100%;
        height: 220px;
        background:rgb(243, 244, 246);
        position: relative;

        .phase-tag {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255, 107, 53, 0.95);
            color: #fff;
            padding: 6px 14px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            z-index: 10;
            text-transform: uppercase;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
            backdrop-filter: blur(4px);
        }
    }

  .image-card-property-home{
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .default-image-card-property-home{
    width: 100%;
    height: 220px;
    object-fit: contain;
  }

    .price-wrapper{
        display: none; /* Removed from image overlay to match the new design */
    }

    .type-wrapper{
        display: none; /* Removed the house icon circle */
    }

    .text-wrapper-card{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px 20px;
        overflow: hidden;

        .title-wrapper-card-property{
            display: flex;
            width:100%;
            margin-top: 15px;
            justify-content: space-between;
            align-items: center;
            text-decoration: none;
        }
        .title-card-property{
            font-size:16px;
            color: #333 !important;
            font-weight:700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .title-card-property-cod{
            font-size:12px;
            color: #999 !important;
            font-weight:400;
            display: flex;
            align-items: center;
        }
   
        p{
            margin-bottom: 0;
        }

        .localization-wrapper{
            font-weight:400;
            display:flex;
            width:100%;
            overflow:hidden;
            align-items:center;
            padding-top:8px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        .localization{
            color: #888;
            font-size: 12px;
            margin-bottom: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .localization-icon{
            display: none;
        }
    }
            font-size:15px;
            color:#A4B7E9;
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
    display: flex;
    justify-content: center;
    

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
        font-size:12px;
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
export const DetailsCardWrapper = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 15px 20px;
      
        .details-bottom-card{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;     
            gap: 4px;
           
            .icon-detail {
                color: #ff6b35; /* Orange icon color */
                font-size: 20px;
                margin-bottom: 4px;
            }

            .value-detail-bottom{
                font-size: 14px;
                font-weight: 700;
                color: #333;
            }

            .title-detail-bottom{         
                font-weight: 400;
                font-size: 12px;
                color: #888;
            }
        }
`

export const CardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    margin-top: auto;

    .price-block {
        display: flex;
        flex-direction: column;
        
        .price-label {
            font-size: 11px;
            color: #888;
            margin-bottom: 2px;
        }
        
        .price-value {
            font-size: 18px;
            font-weight: 800;
            color: #ff6b35; /* Orange price */
        }
    }

    .btn-conheca {
        background: #1e1b4b; /* Dark navy blue */
        color: white;
        padding: 8px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;

        &:hover {
            background: #312e81;
        }
    }
`
    