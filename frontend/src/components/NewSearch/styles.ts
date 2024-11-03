import styled from "styled-components";


export const SearchContainer = styled.div`
    width:100%;
    position: relative;
    border-bottom: none;

    @media screen and (min-width:1000px){
        box-shadow: 0px 5px 7px -3px rgba(0,0,0,0.1);

        .result-list-wrapper-properties-desktop{
            width:65%;
            position: absolute;
            top:110%;
            left:0;
            z-index:1;

        }
        .result-list-wrapper-properties-desktop ul{
            background:#fff;
        }
        .result-list-wrapper-properties-desktop li{
          
            background:#fff;
        }

    }
`

export const SearchWrapper = styled.div`
    width:100%;
 

    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: unset;
    padding: 5px 15px ;
  
    border-bottom:  0.5px solid rgb(229, 229, 229);

    .search-icon-zoom{
        width:45px;
        height:45px;
        font-size:35px;
        color:rgb(69, 115, 155);
        padding-right: 25px;
        margin:auto;
   
    }
    .sliders-icon-search{
       
       color: rgb(69 115 155 / 85%);
       min-width: 25px;
       min-height:25px;
    }
    
    input{
        flex:1;
        height:35px;
        border:none;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        font-family: "Outfit", sans-serif;
       
      
    }
    input::-webkit-input-placeholder  { 
        font-family: "Outfit", sans-serif;
        font-size:15px;
        font-weight: 300;
    }

    input:-moz-placeholder {
        font-family: "Outfit", sans-serif;
        font-size:15px;
        font-weight: 300;
    
    }
    input:focus{
        outline: none;
    }
    .button-search{
        background: transparent;
        color: rgb(69, 115, 155);
        border:none;
        border-radius:2px;
        font-size: 14px;
        padding:3px 8px;
        margin-right:20px;
        border: 1px solid rgb(69, 115, 155);
  
    }

    @media screen and (min-width:1000px){
        width:65%;
        border-bottom:none;
        padding: 5px 15px  5px 35px;
        .sliders-icon-search{      
          
         }
         input{
            flex:none;
         }
    }
    
`

export const SearchHiddenWrapper = styled.div<{open:boolean}>`
    width:100%;
    padding:1rem 2rem;
    display: ${({open}) => (!open ? 'none' : 'block')};

    .select{
        border:1px solid #f1f3f5;
        width:100%;
        height:40px;
        color:#78909c;
        padding: 0 8px;
        margin-top:.5rem;
    }
    .select:focus{
        outline:none;
    }

    @media screen and (min-width:1000px){
        display:flex;
        width:auto;
        position: absolute;
        top:-25px;
        right:1%;

        .select{
            width:140px;
            
        }
    }
`
