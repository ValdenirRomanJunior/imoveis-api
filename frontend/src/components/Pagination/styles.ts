import styled from "styled-components";

export const PaginationContainer = styled.div`
padding: 15px 0;
display: flex;
justify-content: center;
align-items: center;


`

export const PaginationBox = styled.div`
width: 140px;
display: flex;
justify-content: space-between;
align-items: center;

.pagination-button{

    width: 35px;
    height: 35px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-primary);
    cursor: pointer;
}

.pagination-button svg {
    filter: brightness(0) saturate(100%) invert(26%) sepia(19%) saturate(7395%) hue-rotate(234deg) brightness(89%) contrast(92%);
}

.pagination-button:disabled {
    border: 1px solid #c2c2c2;
    cursor: unset;
}

.pagination-button:disabled svg {
    filter: none;
}

.pagination-container p {
    margin: 0;
    font-size: 12px;
    color: var(--color-primary);
}

.flip-horizontal {
    transform: rotate(180deg);
}

`