import styled from "styled-components";

export const LeadCardContainer = styled.div`
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Inter', 'Nunito Sans', sans-serif;
`;

export const LeadSearchWrapper = styled.div`
    padding: 16px 24px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    background: #fff;

    .search-input-container {
        display: flex;
        align-items: center;
        background: #fafafa;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        padding: 0 12px;
        width: 100%;
        max-width: 400px;
        transition: all 0.2s;

        &:focus-within {
            border-color: #999;
            background: #fff;
        }

        svg {
            color: #888;
            font-size: 18px;
        }

        input {
            width: 100%;
            border: none;
            background: transparent;
            padding: 10px 8px;
            font-size: 14px;
            color: #111;
            outline: none;

            &::placeholder {
                color: #888;
            }
        }
    }
`;

export const LeadList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LeadListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #eaeaea;
    transition: background 0.2s;
    text-decoration: none;
    color: inherit;

    &:hover {
        background: #fafafa;
    }

    &:last-child {
        border-bottom: none;
    }

    .lead-info {
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 2;

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f0f0f0;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            border: 1px solid #e5e5e5;
            text-transform: uppercase;
        }

        .details {
            display: flex;
            flex-direction: column;
            gap: 4px;
            
            .name-link {
                text-decoration: none;
                color: #111;
                font-size: 14px;
                font-weight: 600;
                
                &:hover {
                    text-decoration: underline;
                }
            }
            
            .contact-info {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 13px;
                color: #666;

                span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
            }
        }
    }

    .lead-status {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;

        .badge {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            
            &.resolvido { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
            &.aberto { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
            &.captacao { background: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe; }
        }

        .action-link {
            color: #666;
            padding: 6px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            text-decoration: none;

            &:hover {
                background: #eaeaea;
                color: #111;
            }
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;

        .lead-status {
            width: 100%;
            justify-content: space-between;
        }
    }
`;

export const MessageNoLeads = styled.div`
    padding: 48px 24px;
    text-align: center;
    color: #666;
    font-size: 14px;
    
    h4 {
        font-weight: 400;
        margin: 0;
    }
`;