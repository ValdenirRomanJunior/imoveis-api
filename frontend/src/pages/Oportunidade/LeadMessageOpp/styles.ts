import styled from "styled-components";

export const LeadMessageOppContainer= styled.div`
width: 100%;
min-height: 150px;
border:1px solid #e6e9ed;
position: relative;
margin-top: 20px;
background:#fff;


 .subtitle-opportunity{
    font-size: 13px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
     font-weight: 700;
     padding:8px;
     background: #fff;
     color: rgb(12, 58, 103);

    display:flex;
    align-items:center;
}
   .icon-message-opportunity{
    margin-right:7px;
    font-size:19px;
   }
.icon-message-op{
    font-size: 25px;
    position: absolute;
    top:0;
    left: 50%;
    transform: translate(-50%, -50%);
    color:gray;
}
.message-opportunity{
    margin-top: 20px;
    padding: 10px !important;
    font-size:12px;
   
}

   @media screen and (min-width: 825px){

    width: 100%;
    min-height: 200px;
    border:1px solid #e6e9ed;
    position: relative;
    margin-top: 20px;
    background:#fff;


 .subtitle-opportunity{
    font-size: 15px !important;
     border-bottom:1px solid #e6e9ed;
     font-size: 18px;
     font-weight: 700;
     padding:8px;
     background: #fff;
     color: rgb(12, 58, 103);

    display:flex;
    align-items:center;
}
   .icon-message-opportunity{
    margin-right:7px;
    font-size:19px;
   }
.icon-message-op{
    font-size: 35px;
    position: absolute;
    top:0;
    left: 50%;
    transform: translate(-50%, -50%);
    color:gray;
}
.message-opportunity{
    margin-top: 20px;
    padding: 10px !important;
    font-size:14px;
   
}

}
`