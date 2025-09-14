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

p{
    font-family: "Outfit", sans-serif;
}

.pagination-button{

    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border:1px solid rgb(216 216 216 / 26%)
    cursor: pointer;
    box-shadow: 0px 7px 7px -5px rgba(0,0,0,0.1);
}

.pagination-button svg {
    filter: brightness(0) saturate(100%) invert(26%) sepia(19%) saturate(7395%) hue-rotate(234deg) brightness(89%) contrast(92%);
    color: rgba(69, 115, 155, 0.85);
}

.pagination-button:disabled {
    border: 1px solid rgb(216 216 216 / 26%);
    cursor: unset;
}

.pagination-button:disabled svg {
    filter: none;
}

.pagination-container p {
    margin: 0;
    font-size: 12px;
    color: var(--color-primary);
    font-family: "Outfit", sans-serif;
}

.flip-horizontal {
    transform: rotate(180deg);
}

`