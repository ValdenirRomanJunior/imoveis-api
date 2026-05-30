import styled from "styled-components";

export const LeadsBackground = styled.main`
    width: 100%;   
    display: flex;  
    flex-direction: column;
    background-color: #fafafa;
    min-height: 100vh;
`;

export const LeadsContainer = styled.div`
    width: 100%;
    padding: 30px 20px 40px 20px;
    font-family: 'Inter', 'Nunito Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .page-header {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-height: 36px;

        h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 16px;
            font-weight: 500;
            color: #111;
            margin: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
    }

    @media screen and (min-width: 1000px){
        padding: 40px 40px 40px 100px;
        max-width: 1400px;
    }
    
    @media screen and (max-width: 600px) {
        .page-header {
            justify-content: center;
            h1 {
                position: static;
                transform: none;
            }
        }
    }
`;