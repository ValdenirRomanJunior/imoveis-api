import styled from "styled-components";

export const FunnelContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 10px 0;
    min-height: 220px;
    font-family: 'Inter', 'Nunito Sans', sans-serif;
`;

export const FunnelGraphic = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    clip-path: polygon(0 0, 100% 0, 70% 100%, 30% 100%);
    background: transparent;
`;

export const FunnelSlice = styled.div`
    flex: 1;
    width: 100%;
    margin-bottom: 3px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const FunnelLabels = styled.div`
    width: 55%;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`;

export const LabelRow = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

export const LabelLine = styled.div`
    width: 20px;
    height: 1px;
    border-bottom: 1px dashed #d1d5db;
    margin-right: 12px;
`;

export const LabelName = styled.span`
    font-size: 13px;
    color: #4b5563;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const LabelValue = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #113bb5;
    margin-left: auto;
`;