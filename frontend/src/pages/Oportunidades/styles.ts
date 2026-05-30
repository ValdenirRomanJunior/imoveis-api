import styled from "styled-components";


export const OportunidadesBackground = styled.div`
width: 100%;   
background-color: #fafafa;
min-height: 100vh;

@media screen and (min-width: 1000px){
    display: flex;
    flex-direction: column;
    align-items: center;
}
`

export const OportunidadesContainer = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
background-color: transparent;
padding: 30px 20px 40px 20px;
font-family: 'Inter', 'Nunito Sans', sans-serif;
max-width: 1200px;
margin: 0 auto;

.title-leads {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eaeaea;
    width: 100%;
    min-height: 48px;
    
    .left-section {
        /* Escondido porque o título agora é centralizado absoluto */
        display: none;
    }

    /* Novo título centralizado */
    h1.page-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        font-weight: 500;
        color: #111;
        margin: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .right-section {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: auto; /* Empurra para a direita */

        .button-add-lead {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 12px;
            background: #f0fdf4;
            color: #15803d;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: #dcfce7;
            }

            .icon-add-lead {
                font-size: 16px;
            }
        }

        .etapa-config-wrapper {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: #fff;
            color: #444;
            border: 1px solid #eaeaea;
            border-radius: 6px;
            text-decoration: none;
            transition: all 0.2s;

            &:hover {
                background: #fafafa;
                border-color: #ccc;
                color: #111;
            }

            .icon-step-config {
                font-size: 16px;
            }

            .etapa-text {
                font-size: 13px;
                font-weight: 500;
            }
        }
    @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;

            h1.page-title {
                position: static;
                transform: none;
                text-align: center;
                margin-bottom: 16px;
            }

            .right-section {
                margin-left: 0;
                justify-content: center;
                flex-wrap: wrap;
            }
    }    }
}


.input-property-wrapper-cod input{
 height: 90px;
  
}

@media screen and (min-width: 1000px){
    padding: 40px 40px 40px 100px;
    max-width: 1400px;
}


.input-property-wrapper-cod input{
 height: 90px;
  
}


}


`
