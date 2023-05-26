import styled from "styled-components";

export const AddressContainer = styled.div`
    width:100%;
    border-bottom:1px solid #e6e9ed;
    padding-bottom: 15px;
    margin-bottom: 20px;
    height: auto;
    background:none !important;
 
    div{
        display: flex;
        justify-content: space-between;
        color: rgb(76 76 76);
        font-size: 16px;
        font-weight: 400;
        line-height:1.5;
        line-break: anywhere;
        font-family: "Nunito Sans", sans-serif;
        
       
    }

    .address-value-wrapper{
     width: 50%;
     padding-left: 16px; 
     margin-bottom:10px;
     
     
     .cep-value{
        font-weight:600;
       
     }
     .city-value{
        font-weight:600;
     }
     .district-value{
        font-weight:600;
     }
     .street-value{
        font-weight:600;
     }
    }

`