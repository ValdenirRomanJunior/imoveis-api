import styled from "styled-components";


export const PseudoSearchContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .arrow-location-pseudoSearch{
        display: none;
    }

    button{
        background: transparent;
        border:none;
        color:#b2b2b2;
        font-size: 1rem;
        padding-left: 2.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        padding-right:2.3rem;
       
       
    }

    .input-rent-sale-wrapper-desktop{
        display: none;
    }

    .input-search-desktop{
        display: none;
    }

    .search-icon-pseudo-search{
     
    position: absolute;
    right: .75rem;
    top: .8125rem;

        color:gray;
        font-size:20px;
        line-height: 1;
        cursor: pointer;
     
    }
    .result-list-wrapper-desktop{
        display:none;
    }

   @media screen and (min-width:1000px){

        width: 100%;
        max-width: 1000px;
        background: transparent;
        box-shadow: none;
        padding: 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        button{
            display:none;
        }

        /* Estrutura das Abas Flutuantes (Buy / Rent / Sell) */
        .tabs-container {
            display: flex;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            border-radius: 12px 12px 0 0;
            padding: 8px 12px;
            width: fit-content;
            margin-bottom: 0; /* Gruda na caixa de baixo */
            margin-left: 20px;
            z-index: 2;
        }

        .tabs-container label {
            padding: 8px 24px;
            color: #fff;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .tabs-container label.active {
            background: #fff;
            color: #111;
        }

        .tabs-container input {
            display: none;
        }

        /* Caixa Branca Principal */
        .search-box-main {
            display: flex;
            width: 100%;
            background: #fff;
            border-radius: 50px;
            padding: 15px;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* Escondendo a estrutura antiga de label que era usada para as abas */
        .input-rent-sale-wrapper-desktop {
            display: none;
        }

        /* Blocos de Input dentro da caixa branca */
        .search-block {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 0 20px;
            position: relative;
        }

        /* Divisória Vertical */
        .search-block:not(:first-child)::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10%;
            height: 80%;
            width: 1px;
            background: #eaeaea;
        }

        .block-title {
            font-size: 13px;
            font-weight: 600;
            color: #111;
            margin-bottom: 4px;
            text-align: left;
            font-family: 'Inter', sans-serif;
        }

        .block-input {
            border: none;
            background: transparent;
            font-size: 14px;
            color: #666;
            width: 100%;
            outline: none;
            font-family: 'Inter', sans-serif;
        }

        .block-input::placeholder {
            color: #999;
        }

        /* Dropdown customizado */
        .custom-dropdown {
            width: 100%;
            border: none;
            padding: 0;
            margin: 0;
            color: #666;
            font-size: 14px;
            justify-content: space-between;
        }

        /* Botão de Busca Escuro */
        .search-btn-dark {
            display: block !important;
            background: #111;
            color: #fff;
            border: none;
            padding: 14px 32px;
            border-radius: 30px;
            font-size: 15px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
            transition: background 0.2s;
            margin-left: 12px;
        }

        .search-btn-dark:hover {
            background: #333;
        }

        /* Tags Populares */
        .popular-tags {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 12px;
            margin-top: 24px;
        }

        .popular-title {
            font-size: 14px;
            color: #fff;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
        }

        .tag-pill {
         
            color: #111;
            padding: 6px 16px;
            border:1px solid #e3e3e3ff;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
            transition: all 0.2s;
        }

        .tag-pill:hover {
            background: #fff;
            transform: translateY(-2px);
        }

        /* Ocultar elementos antigos do Desktop */
        .input-search-desktop, .search-icon-pseudo-search {
            display: none;
        }

        .result-list-wrapper-desktop{
            display:block;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            width: 100%;
            max-width: 800px;
            margin-top: 10px;

            h2{
            margin-bottom:0;
            }
          
        }
        .result-list-wrapper-desktop ul{
            width: 100%;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .result-list-wrapper-desktop li{
            width: 100%;
            background:#fff;
            padding: 12px 20px;
            border-bottom: 1px solid #eaeaea;
            color: #444;
            cursor: pointer;
            text-align: left;
        }
        .result-list-wrapper-desktop li:hover {
            background: #f9fafb;
        }
        .result-list-wrapper-desktop input{
            width: 100%;
            border: none;
            padding: 12px 20px;
            background: transparent;
            cursor: pointer;
            color: #444;
            text-align: left;
        }
        .result-list-wrapper-desktop input:hover {
            background: #f9fafb;
        }

          .custom-dropdown .items-holder{
                position:absolute;
                top:100%;
                left: 0;
                background-color:#fff;
                width:100%;
                border: 1px solid #eaeaea;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 10;   
                max-height: 210px;
                border-radius: 12px;
                padding:8px 0;
                overflow:scroll;   
                margin-top: 8px;

}
        .dropdown-item {
            padding: 8px 16px;
            text-align: left;
        }
        .dropdown-item:hover {
            background: #f9fafb;
            color: #111;
        }
      
   }

   @media screen and (min-width:1300px){
    width: 100%;
    height:3rem;
       bottom: 32%;

    button{
        display:none;
    }

    .input-rent-sale-wrapper-desktop{
        position: relative;
        font-family: "Outfit", sans-serif;
        min-height: 3rem;
        display: flex;
        text-transform: uppercase;
        border-bottom: 1px solid rgb(229, 229, 229);
        margin-left:2rem;
        width:45%;

         label{
            width:33%;
         
            display: flex;
            align-items: center;
                justify-content: center;
                position: relative;
                border-left: 1px solid rgb(229, 229, 229); 
        }
         input{
            position:absolute;
            top:50%;
            left:50%;
            visibility: hidden;
       
        }
 
  
        .label-class.activeRent .rent-span{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:rgb(100, 100, 100);
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background: rgb(100, 100, 100); 
            padding:0 10px;         
        }
        .label-class.activeRent .rent-span:hover{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000;
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span:hover{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000; 
            padding:0 10px;         
        }
  
        .rent-span{
           cursor: pointer;
            font-size: 12px;
            }
            .sale-span{
                cursor: pointer;
                font-size: 12px;
            }
            .select-half{
                cursor: pointer;
                text-align: center;
                border:none;
                font-family: "Outfit", sans-serif;
                font-size:14px;
                text-transform: uppercase;
                width: 100%;
                outline:none;
               
            }
            .select-half option {
              font-size: 12px;
              outline:none;
              border:none;
            }
          
    }

    .input-search-desktop{
        background: transparent;
        border:none;
        color:rgb(118 118 118);
        font-size: 1rem;
        padding-left: 2.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        padding-right:2.3rem;
        outline:none;     
      
        font-weight:300 !important;
        flex:1;

        
    }
    input::-webkit-input-placeholder{
        font-weight:200 !important;
    }
    input:-moz-placeholder{
        font-weight: 200 !important;
    }

    .result-list-wrapper-desktop{
        display:block;
        position: absolute;
        bottom: -100px;
        left:50%;
        z-index:1;
        width:300px;
      
    }
    .result-list-wrapper-desktop ul{
        width:300px;
    }
    .result-list-wrapper-desktop li{
        width:300px;
        background:#fff;
    }
    .result-list-wrapper-desktop input{
        width:300px;
    }
  
}

@media screen and (min-width:1400px){
    width: 100%;
    height:3rem;

    button{
        display:none;
    }

    .input-rent-sale-wrapper-desktop{
        position: relative;
        font-family: "Outfit", sans-serif;
        min-height: 3rem;
        display: flex;
        text-transform: uppercase;
        border-bottom: 1px solid rgb(229, 229, 229);
        margin-left:2rem;
        width:45%;

         label{
            width:33%;
         
            display: flex;
            align-items: center;
                justify-content: center;
                position: relative;
                border-left: 1px solid rgb(229, 229, 229); 
        }
         input{
            position:absolute;
            top:50%;
            left:50%;
            visibility: hidden;
       
        }
 
  
        .label-class.activeRent .rent-span{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:rgb(100, 100, 100);
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background: rgb(100, 100, 100); 
            padding:0 10px;         
        }
        .label-class.activeRent .rent-span:hover{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000;
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span:hover{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000; 
            padding:0 10px;         
        }
  
        .rent-span{
           cursor: pointer;
            font-size: 12px;
            }
            .sale-span{
                cursor: pointer;
                font-size: 12px;
            }
            .select-half{
                cursor: pointer;
                text-align: center;
                border:none;
                font-family: "Outfit", sans-serif;
                font-size:14px;
                text-transform: uppercase;
                width: 100%;
                outline:none;
               
            }
            .select-half option {
              font-size: 12px;
              outline:none;
              border:none;
            }
          
    }

    .input-search-desktop{
        background: transparent;
        border:none;
        color:rgb(118 118 118);
        font-size: 1rem;
        padding-left: 2.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        padding-right:2.3rem;
        outline:none;     
        
        font-weight:300 !important;
        flex:1;

        
    }
    input::-webkit-input-placeholder{
        font-weight:200 !important;
    }
    input:-moz-placeholder{
        font-weight: 200 !important;
    }

    .result-list-wrapper-desktop{
        display:block;
        position: absolute;
        bottom: -100px;
        left:50%;
        z-index:1;
        width:300px;
      
    }
    .result-list-wrapper-desktop ul{
        width:300px;
    }
    .result-list-wrapper-desktop li{
        width:300px;
        background:#fff;
    }
    .result-list-wrapper-desktop input{
        width:300px;
    }
  
}

@media screen and (min-width:1700px){
    width: 50%;
    height:3rem;

    button{
        display:none;
    }

    .input-rent-sale-wrapper-desktop{
        position: relative;
        font-family: "Outfit", sans-serif;
        min-height: 3rem;
        display: flex;
        text-transform: uppercase;
        border-bottom: 1px solid rgb(229, 229, 229);
        margin-left:2rem;
        width:45%;

         label{
            width:33%;
         
            display: flex;
            align-items: center;
                justify-content: center;
                position: relative;
                border-left: 1px solid rgb(229, 229, 229); 
        }
         input{
            position:absolute;
            top:50%;
            left:50%;
            visibility: hidden;
       
        }
 
  
        .label-class.activeRent .rent-span{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:rgb(100, 100, 100);
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background: rgb(100, 100, 100); 
            padding:0 10px;         
        }
        .label-class.activeRent .rent-span:hover{
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000;
            padding:0 10px;
         
        }
        .label-class.activeSale .sale-span:hover{ 
            border-radius:3px;
            display: flex;
            align-items: center;
            height:60%;              
            color:#fff;
            background:#000; 
            padding:0 10px;         
        }
  
        .rent-span{
           cursor: pointer;
            font-size: 12px;
            }
            .sale-span{
                cursor: pointer;
                font-size: 12px;
            }
            .select-half{
                cursor: pointer;
                text-align: center;
                border:none;
                font-family: "Outfit", sans-serif;
                font-size:14px;
                text-transform: uppercase;
                width: 100%;
                outline:none;
               
            }
            .select-half option {
              font-size: 12px;
              outline:none;
              border:none;
            }
          
    }

    .input-search-desktop{
        background: transparent;
        border:none;
        color:rgb(118 118 118);
        font-size: 1rem;
        padding-left: 2.3rem;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        padding-right:2.3rem;
        outline:none;     
    
        font-weight:300 !important;
        flex:1;

        
    }
    input::-webkit-input-placeholder{
        font-weight:200 !important;
    }
    input:-moz-placeholder{
        font-weight: 200 !important;
    }

    .result-list-wrapper-desktop{
        display:block;
        position: absolute;
        bottom: -100px;
        left:50%;
        z-index:1;
        width:300px;
      
    }
    .result-list-wrapper-desktop ul{
        width:300px;
    }
    .result-list-wrapper-desktop li{
        width:300px;
        background:#fff;
    }
    .result-list-wrapper-desktop input{
        width:300px;
    }
  
}
`