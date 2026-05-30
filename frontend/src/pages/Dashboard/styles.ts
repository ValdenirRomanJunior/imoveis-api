import styled from "styled-components";

export const DashboardBackground = styled.main`
    width: 100%;   
    display: flex;  
    flex-direction: column;
    background-color: #fafafa;
    min-height: 100vh;
`;

export const BodyContainer = styled.div`
    width: 100%;
    padding: 30px 20px 40px 20px;
    font-family: 'Inter', 'Nunito Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .welcome-header {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 8px;
        min-height: 40px;
        
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

        .action-buttons {
            display: flex;
            gap: 12px;

            button {
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }

            .btn-secondary {
                background: #fff;
                border: 1px solid #eaeaea;
                color: #666;

                &:hover {
                    border-color: #000;
                    color: #000;
                }
            }

            .btn-primary {
                background: #000;
                border: 1px solid #000;
                color: #fff;

                &:hover {
                    background: #fff;
                    color: #000;
                }
            }
        }
        
        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            
            h1 {
                position: static;
                transform: none;
                text-align: center;
                margin-bottom: 8px;
            }

            .action-buttons {
                justify-content: center;
            }
        }
    }

    @media screen and (min-width: 1000px){
        padding: 40px 40px 40px 100px; /* Espaço para o Sidebar lateral */
        max-width: 1400px;
    }
`;

export const KPIGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const KPICard = styled.div`
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);

    .kpi-header {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        font-size: 14px;
        font-weight: 500;

        svg {
            font-size: 18px;
            color: #888;
        }
    }

    .kpi-value {
        font-size: 32px;
        font-weight: 700;
        color: #000;
        line-height: 1;
    }
`;

export const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    @media screen and (min-width: 1024px) {
        grid-template-columns: 1.5fr 1fr;
    }
`;

export const SectionCard = styled.div`
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 24px;

        .title-block {
            h2 {
                font-size: 18px;
                font-weight: 600;
                color: #111;
                margin: 0 0 4px 0;
            }
            p {
                font-size: 14px;
                color: #666;
                margin: 0;
            }
        }

        .action-link {
            padding: 6px 16px;
            border: 1px solid #eaeaea;
            border-radius: 18px;
            font-size: 13px;
            font-weight: 500;
            color: #111;
            background: #fff;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;

            &:hover {
                background: #fafafa;
                border-color: #000;
            }
        }
    }
    
    .funnel-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        
        > div {
            border-bottom: none !important;
        }
    }
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid #eaeaea;

    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    &:first-child {
        padding-top: 0;
    }

    .item-info {
        display: flex;
        align-items: center;
        gap: 16px;

        .item-image {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            background: #f0f0f0;
            object-fit: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #aaa;
        }

        .item-text {
            h4 {
                font-size: 15px;
                font-weight: 600;
                color: #111;
                margin: 0 0 4px 0;
            }
            p {
                font-size: 13px;
                color: #666;
                margin: 0;
            }
        }
    }

    .item-actions {
        display: flex;
        align-items: center;
        gap: 16px;

        .badge {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 500;
            
            &.novo { background: #eff6ff; color: #1d4ed8; }
            &.ativo { background: #f0fdf4; color: #15803d; }
            &.inativo { background: #f3f4f6; color: #4b5563; }
        }

        button {
            padding: 6px 16px;
            border: 1px solid #eaeaea;
            border-radius: 18px;
            background: #fff;
            color: #666;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;

            &:hover {
                border-color: #000;
                color: #000;
            }
        }
    }
    
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        
        .item-actions {
            width: 100%;
            justify-content: space-between;
        }
    }
`;