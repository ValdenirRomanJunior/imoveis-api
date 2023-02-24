import styled from "styled-components";

export const DetailContainer = styled.div`
   width: 100%;
   border-bottom:1px solid #e6e9ed;
   padding-bottom: 15px;
   height: auto;

 
   
   div{
      display: flex;
      justify-content: space-between;
      color: rgb(76 76 76);
      font-size: 16px;
      font-weight: 400;
      line-height:1.5;
      font-family: "Nunito Sans", sans-serif;
   }

   .detail-value-wrapper{
      width: 50%;
      padding-left:16px;
      color:rgb(76 76 76);
      margin-bottom:10px;

      .type-value{
         color: ${({theme}) => theme.colors.primary};
         font-weight:600;
      }

      .goal-value{
         color: ${({theme}) => theme.colors.primary};
         font-weight:600;
         
      }
      .area-value{
         font-weight:600;
         
      }
      .numberRoom-value{
         font-weight:600;
      }
      .bathRoom-value{
         font-weight:600;
      }
      .vacancies-value{
         font-weight:600;
      }
   
   }
   
`