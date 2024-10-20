import styled from "styled-components";


export const LeadDetailBackground = styled.div`
width: 100vw;  
background-color: ${({theme}) => theme.colors.backgroundLight};
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;

`

export const LeadDetailContainer = styled.div<{disableName:boolean, disableEmail:boolean, disablePhone:boolean}>`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
align-items: center;
padding-right: 1rem;
padding-left: 1rem;

.h1-oportunidade-wrapper{
    width: 100%;
    padding:5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top:13px;
    position: relative;
    

}
.h1-oportunidade-wrapper h1{

    margin-bottom: 0;
    font-weight: 400 !important;
    font-family: "Poppins", sans-serif;
    font-size: 17px;
    color: #5d5d5d;

}

.link-opportunity{

position: absolute;
left:21%;

}
.h1-oportunidade-wrapper span{ 
   
    background: transparent;
    padding: 2px 7px;
    color: #49599f;
    border-radius: 3px;
     font-size:13px;

    display: flex;
    align-items: center;

}
.h1-oportunidade-wrapper  .excluir-lead{
    border:1px solid #49599f;
    border-radius:5px;
    font-size:13px;
    padding:3px 7px;
    font-weight: 600;

}
label{
    margin-top:10px;
    font-weight:600;
}
    .data-detail-lead-wrapper{
    display: flex;
    align-items: center;
    color: #49599f;
    position: relative;
    
    }
    .edit-label{
    margin-left:20px;
    position:absolute;
    top:0;
    right:10%;
    font-size:13px;
     display: ${({disableEmail, disablePhone}) => (disableEmail || disablePhone   ? 'none' : 'block')};
}
    .edit-label-email{
    margin-left:20px;
    position:absolute;
    top:0;
    right:10%;
    font-size:13px;
    display: ${({disableName, disablePhone}) => (disableName || disablePhone   ? 'none' : 'block')};
}
    .edit-label-phone{
    margin-left:20px;
    position:absolute;
    top:0;
    right:10%;
    font-size:13px;
    display: ${({disableEmail, disableName}) => (disableEmail || disableName   ? 'none' : 'block')};
}

>h2{
    margin-top:30px;
    font-size:15px;
    font-family:"Open Sans", sans-serif;
    width:100%;
    color:rgb(12, 58, 103);
    font-weight:600;
    text-align:left;


   
}
     .icon-lead-detail{
        color:rgb(12, 58, 103);
        font-size:14px;
        margin-right:5px;
    }
.info{
    border:1px solid #e6e9ed;
    padding:10px;
    width:100%;
    margin-top:5px;
    position: relative;
}
.lead-name-detail{
    color:#5f5f5f;
    font-size: 14px;
}
.lead-message-date{
    font-size: 12px;
    color: gray;
}
.lead-email{
  font-family:"Open-Sans", sans-serif;

   color:#5f5f5f;
    font-size: 14px;
}
.lead-phone{
display: flex;
    align-items: center;
    font-size:12px;
    font-family:"Open-Sans", sans-serif;
    color:#49599f;
   
}
.status-lead{
position: absolute;
right:15px;
top:5px;
background:#e5fce5;
border-radius: 3px;
padding:2px 4px;
text-align: center;
font-size:13px;
}


p{
    margin-bottom: 0;
    margin-top:0;
}

.input-wrapper-data{
display: flex;
}
.button-wrapper-send-data{
    display: flex;
    align-items: center;
   

}

    .button-send-data{  
        background:#49599f;
        color:#fff;
        border:none;
        border-radius: 4px;
        padding: 2px 9px;
        font-size: 13px;
        margin-left: 10px;
        position: relative;
        width:70px;
        height:22px;
}
      .button-cancel-data{
       
        color:#49599f;
        border:none;
        border-radius: 4px;
        
        font-size: 13px;
        margin-left: 10px;
        position: relative;
      
        height:22px;
}

.formField__error{
    color:red;
    font-size:12px;
}

@media screen and (min-width: 1000px){
margin-top:10px;
    width: 60%;

    .link-opportunity{

position: absolute;
left:10%;

}
    .h1-oportunidade-wrapper span{ 
    font-size: 15px !important;
}
}



`