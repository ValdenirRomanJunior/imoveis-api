import styled from "styled-components";


export const PseudoSearchContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* ========== VARIANT PROPERTIES (PAGE IMÓVEIS) ========== */
    &.properties-variant {
        max-width: 1300px;
        width: 100%;

        @media (min-width: 768px) {
            width: 100vw;
        }

        .properties-desktop-filter {
            display: none;
            width: 100%;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            padding: 20px;
            flex-direction: column;
            gap: 15px;

            @media (min-width: 768px) {
                display: flex;
            }

            .properties-filter-header {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 20px;

                .properties-filter-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #333;
                    font-family: 'Inter', sans-serif;
                }

                .properties-clear-btn {
                    background: #8A92A6;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    padding: 4px 12px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: opacity 0.2s;
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }

            .properties-filter-row {
                display: flex;
                align-items: center;
                gap: 12px;
                width: 100%;

                .properties-dropdown {
                    flex: 1;
                    height: 44px;
                    border: 1px solid #E2E8F0;
                    border-radius: 8px;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    position: relative;

                    .custom-dropdown-selection {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                    }

                    input {
                        border: none;
                        outline: none;
                        width: 100%;
                        font-size: 14px;
                        color: #666;
                        background: transparent;
                    }
                }

                .properties-submit-btn {
                    height: 44px;
                    padding: 0 24px;
                    border-radius: 8px;
                    border: none;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: filter 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    &:hover {
                        filter: brightness(0.9);
                    }
                }
            }
        }

        .properties-mobile-filter {
            display: flex;
            width: 100%;
            justify-content: center;

            @media (min-width: 768px) {
                display: none;
            }

            .properties-mobile-open-btn {
                width: 100%;
                max-width: 300px;
                height: 48px;
                background: transparent;
                border: 1.5px solid;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .properties-mobile-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #fff;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                animation: slideUp 0.3s ease;

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #eaeaea;

                    .modal-title {
                        font-size: 18px;
                        font-weight: 700;
                        color: #333;
                    }

                    .modal-close {
                        font-size: 28px;
                        color: #333;
                        cursor: pointer;
                    }
                }

                .modal-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;

                    .modal-field {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;

                        label {
                            font-size: 14px;
                            font-weight: 600;
                            color: #555;
                        }

                        select, input {
                            height: 48px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            padding: 0 15px;
                            font-size: 15px;
                            color: #333;
                            outline: none;
                            background: #f9f9f9;
                        }

                        .goal-toggle {
                            display: flex;
                            gap: 10px;

                            button {
                                flex: 1;
                                height: 48px;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                background: #f9f9f9;
                                color: #666;
                                font-size: 15px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.2s;

                                &.active {
                                    border-color: transparent;
                                }
                            }
                        }
                    }
                }

                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;

                    .clear-btn {
                        height: 48px;
                        background: transparent;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        color: #666;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    }

                    .submit-btn {
                        height: 48px;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    }
                }
            }
        }

        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
    }
    /* ======================================================= */

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
        display: block;
        width: 90%;
        margin-top: 10px;
        z-index: 10;
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
    .result-list-wrapper-desktop input{
        width: 100%;
        border: none;
        padding: 12px 20px;
        background: transparent;
        cursor: pointer;
        color: #444;
        text-align: left;
    }

    .search-box-main {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #fff;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        gap: 15px;
        margin-top: 20px;
        z-index: 10;
    }

    .search-block {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        padding: 0;
    }

    .search-block:not(:first-child)::before {
        content: '';
        position: absolute;
        left: 0;
        top: -7px;
        width: 100%;
        height: 1px;
        background: #eaeaea;
    }

    .goal-inline-tabs {
        display: flex;
        background: transparent;
        padding: 0;
        width: 100%;
        justify-content: center;
        margin-top: 0;
        gap: 20px;
    }

    .goal-inline-tabs label {
        padding: 0;
        color: #999;
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .goal-inline-tabs label.active {
        background: transparent;
        color: #111;
        box-shadow: none;
    }

    .goal-inline-tabs input {
        display: none;
    }

    .block-input {
        border: none;
        background: transparent;
        font-size: 14px;
        color: #666;
        width: 100%;
        outline: none;
        font-family: 'Inter', sans-serif;
        padding: 10px 0;
    }

    .custom-dropdown {
        width: 100%;
        border: none;
        padding: 10px 0;
        margin: 0;
        color: #666;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .custom-dropdown .items-holder {
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
    
    .search-btn-dark {
        display: block !important;
        background: var(--brand-color, #FF5317) !important;
        color: #fff;
        border: none;
        padding: 14px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        cursor: pointer;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .popular-tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 90%;
        gap: 8px;
        margin-top: 15px;
        margin-bottom: 20px;
    }

    .tag-pill {
        color: #111;
        padding: 6px 12px;
        border:1px solid #e3e3e3ff;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        background: #fff;
    }

    @media screen and (min-width:768px){
        /* Default styles for desktop (Home variant) */
        &:not(.properties-variant) {
            width: 100%;
            max-width: 1000px;
            background: transparent;
            box-shadow: none;
            padding: 0;
            position: absolute;
            bottom: -10%;
            left: 50%;
            transform: translate(-50%, 50%);
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        button{
            display:none;
        }

        /* Estrutura das Abas Flutuantes (Buy / Rent / Sell) - Ocultado */
        .tabs-container {
            display: none;
        }

        /* Estrutura Inline das Abas (Goal) */
        .goal-inline-tabs {
            display: flex;
            background: transparent;
            padding: 0;
            width: fit-content;
            margin-top: 0;
        }

        .goal-inline-tabs label {
            padding: 0;
            color: #999;
            font-size: 15px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .goal-inline-tabs label.active {
            background: transparent;
            color: #111;
            box-shadow: none;
        }

        .goal-inline-tabs input {
            display: none;
        }

        /* Caixa Branca Principal */
        .search-box-main {
            display: flex;
            flex-direction: row;
            width: 100%;
            background: #fff;
            border-radius: 10px;
            padding: 15px;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            gap: 0;
            margin-top: 0;
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
            top: 50%;
            transform: translateY(-50%);
            height: 30px;
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
            background: var(--brand-color, #FF5317) !important;
            color: #fff;
            border: none;
            padding: 14px 45px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
            transition: opacity 0.2s;
            margin-left: 12px;
            width: auto;
            margin-top: 0;
        }

        .search-btn-dark:hover {
            opacity: 0.9;
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
            border-radius: 5px;
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
       bottom: 10%;

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