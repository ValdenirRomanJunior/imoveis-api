import styled from "styled-components";

export const PropertySiteContainer= styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    position: relative;
    

 
    
    
`

export const CardImage= styled.div`
    width:100%;
    height: 210px;
    border-radius:2px;
    object-fit: cover;
  
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`
export const PriceContainer= styled.div`
        position: absolute;
        top: 53%;
        left: 25%;
        width: 6.5rem;
        height:2rem;
        border-radius:30px;
        box-shadow: 1px 4px 10px #F17524;
        background: #fc4a1a;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
        display:flex;
        align-items: center;
        justify-content: center;
       

        .price{
            font-family: "Raleway", sans serif;
           font-weight: 600;
           color: #fff;
           font-size: 1rem;
        }
    
`

export const TitleAndAdressContainer= styled.div`
    width:100%;
    margin-top:1.5rem;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    font-family:"Poppins", sans serif;   
  
    h2{
       font-size:1rem;
       font-weight: 700;
       font-family:"Poppins", sans-serif;
       
    }

    p{
        font-family:"Poppins", sans-serif;
        color:#BEBEBE;
        font-weight:600;  

    }
`

export const DescriptionContainerBottom= styled.div`
    width:100%;
    font-family:"Poppins", sans serif; 
    background:#F0F0F0; 
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    border-radius:15px;



    
  
    div{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            font-family: "Poppins", sans serif;
            margin-bottom: 0;
        }
    
        span{
            font-family: "Raleway", sans serif;
            color:#939393;
        }

    }

   
  
`