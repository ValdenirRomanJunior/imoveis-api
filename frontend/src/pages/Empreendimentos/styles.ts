import styled from "styled-components";

export const EmpreendimentosBackground = styled.main`
    width: 100%;   
    display: flex;  
    flex-direction: column;
    background-color: #fafafa;
    min-height: 100vh;
`;

export const EmpreendimentosContainer = styled.div`
    width: 100%;
    padding: 30px 20px 40px 20px;
    font-family: 'Inter', 'Nunito Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;

    .page-header {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;

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

        .btn-primary {
            background: #000;
            border: 1px solid #000;
            color: #fff;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;

            &:hover {
                background: #333;
            }
        }
        
        @media screen and (max-width: 600px) {
            justify-content: center;
            
            h1 {
                position: static;
                transform: none;
                margin-bottom: 16px;
            }
            
            .btn-primary {
                width: 100%;
                text-align: center;
            }
        }
    }

    @media screen and (min-width: 1000px){
        padding: 40px 40px 40px 100px;
        max-width: 1400px;
    }
`;

export const EmpreendimentosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const EmpreendimentoCard = styled.div`
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;

    &:hover {
        border-color: #ccc;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        transform: translateY(-2px);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;

        h3 {
            font-size: 18px;
            font-weight: 600;
            color: #111;
            margin: 0;
            line-height: 1.3;
        }

        .badge {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            
            &.ativo { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
            &.inativo { background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; }
        }
    }

    .card-metrics {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-top: auto;
        padding-top: 16px;
        border-top: 1px solid #eaeaea;

        .metric-item {
            display: flex;
            flex-direction: column;
            gap: 4px;

            span.label {
                font-size: 12px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            span.value {
                font-size: 20px;
                font-weight: 600;
                color: #111;
            }
        }
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 24px;
    background: #fff;
    border: 1px dashed #eaeaea;
    border-radius: 12px;
    text-align: center;
    gap: 16px;

    h3 {
        font-size: 18px;
        font-weight: 600;
        color: #111;
        margin: 0;
    }

    p {
        font-size: 14px;
        color: #666;
        margin: 0;
        max-width: 400px;
    }

    button {
        margin-top: 8px;
        background: #000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background: #333;
        }
    }
`;