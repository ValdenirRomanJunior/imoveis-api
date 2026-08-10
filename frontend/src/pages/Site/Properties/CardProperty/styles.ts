import styled from "styled-components";


export const CardWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 1rem;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  @media screen and (min-width: 1000px) {
    width: 350px;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .image-card-properties-wrapper {
    width: 100%;
    height: 220px;
    position: relative;
    overflow: hidden;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .price-wrapper {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--brand-color-2, #1C1C38);
    color: var(--brand-color-2-text, #FFFFFF);
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    font-family: 'Inter', sans-serif;
  }

  .type-wrapper {
    display: none; /* Oculto para seguir o estilo do FeaturedPropertyCard */
  }

  .text-wrapper-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title-wrapper-card-property {
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-decoration: none;
      padding: 0;
      margin: 0;
    }

    .title-card-property {
      font-size: 16px;
      color: #333 !important;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title-card-property-cod {
      font-size: 12px;
      color: #888 !important;
      font-weight: 400;
      margin: 0;
    }

    .localization-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      margin-top: 8px;

      .localization-icon {
        font-size: 16px;
        color: #888;
        min-width: 16px;
      }

      .localization {
        font-size: 13px;
        color: #666;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400 !important;
        max-width: none;
      }

      .district-localization {
        margin-left: 0;
      }
    }
  }
`;

export const CardContainer = styled.main`   
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;

    .properties-page-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        margin-top: 0;

        .properties-main-title {
            font-size: 28px;
            font-weight: 300;
            color: #666;
            margin-bottom: 20px;
            font-family: 'Inter', sans-serif;
            text-align: left;
            width: 100%;
            max-width: 1200px;
        }

        .properties-controls-bar {
            width: 100%;
            max-width: 1200px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 0;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;

            .view-modes {
                display: flex;
                align-items: center;
                gap: 15px;

                .view-modes-label {
                    font-size: 14px;
                    color: #999;
                    font-weight: 500;
                }

                .view-modes-icons {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    svg {
                        font-size: 22px;
                        color: #666;
                        cursor: pointer;
                        transition: color 0.2s;

                        &.active {
                            color: var(--brand-color, #FF5317);
                        }

                        &:hover {
                            color: var(--brand-color, #FF5317);
                        }
                    }
                }
            }

            .sort-by {
                display: flex;
                align-items: center;
                gap: 10px;

                .sort-by-label {
                    font-size: 14px;
                    color: #999;
                    font-weight: 500;
                }

                .sort-by-select {
                    height: 40px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 0 15px;
                    font-size: 14px;
                    color: #666;
                    background: #fff;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
    }

    .wrapper-properties{
        width:100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: center;
        justify-items: center;
        padding: 0 10px;

        /* Adaptação para o CardContainer do FeaturedPropertyCard */
        & > main {
            width: 100% !important;
            padding: 0 !important;
        }
    }
   
    .pagination-button-wrapper{
        display: flex;
        align-items: center;
        padding-right:20px;
     

        .button-all-properties{
            margin-right:20px;
        }
    }
    .properties-found-message{
        display: none; /* Substituído pelo novo título */
    }

    @media screen and (min-width:600px){
        .wrapper-properties{
            grid-template-columns: repeat(2, 1fr);
            padding:0 2rem;
        }
    }

    @media screen and (min-width:620px){
        .wrapper-properties{
            grid-template-columns: repeat(2, 1fr);
            padding:0 2.5rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:650px){
        .wrapper-properties{
            padding:0 3.4rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:670px){
        .wrapper-properties{
            padding:0 4.6rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:700px){
        .wrapper-properties{
            padding:0 5.2rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:740px){
        .wrapper-properties{
            padding:0 6.8rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:800px){
        .wrapper-properties{
            padding:0 8.2rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:860px){
        .wrapper-properties{
            padding:0 9.4rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:920px){
        .wrapper-properties{
            grid-template-columns: repeat(3, 1fr);
            padding:0 3.5rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }
    @media screen and (min-width:1000px){
        .wrapper-properties{
            grid-template-columns: repeat(3, 1fr);
            padding:0 2rem;
        }
        .properties-found-message{
            width:100%;
            margin-top:40px;
        }
    }

    @media screen and (min-width:1200px){
        padding:0 1rem;
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
  justify-content: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #eaeaea;
  margin-top: auto;

  .details-bottom-card {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #666;

    svg {
      font-size: 16px;
      color: var(--brand-color, #FF5317);
    }

    .value-detail-bottom {
      font-size: 13px;
      font-weight: 500;
      color: #333;
    }

    .title-detail-bottom {
      display: none; /* Oculto para seguir o estilo visual do FeaturedPropertyCard */
    }
  }

  .left-border {
    border-left: none; /* Removido para igualar ao FeaturedPropertyCard */
  }
`;


    