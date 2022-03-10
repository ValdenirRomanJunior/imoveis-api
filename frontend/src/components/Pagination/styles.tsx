import styled from "styled-components";

export const PaginationContainer= styled.div`
    width:140px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:1rem;
    
    p{
        margin: 0;
        font-size:12px;
    }

    .pagination-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;



    }

    .pagination-button{
        width:40px;
        height: 40px;
        border-radius: 4px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid blue;
        cursor: pointer;
    }

    .pagination-button svg{
        filter: brightness(0) saturate(100%) sepia(19%) ;
    }

    .pagination-button:disabled{
        border: 1px solid #c2c2c2;
        cursor: unset;

    }
    .pagination-button: disabled svg{
        filter: none ;
    }

`
    

