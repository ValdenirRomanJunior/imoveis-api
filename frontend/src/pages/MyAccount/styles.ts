import styled from "styled-components"

export const MyAccountBackground = styled.div`
width: 100%;   
display: flex;  
flex-direction: column;
justify-content: center;
background-color: ${({theme}) => theme.colors.backgroundLight};

@media screen and (min-width:100px){
    align-items: center;
}
`

export const BodyMyAccountContainer = styled.main`      
    width:85%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    padding: 50px 0 30px 0;

    .upload{
        position:relative;
        margin-top:20px;
    }
    .imgWrapper{
        width:130px;
        height:130px;
        border: 3px solid ${({theme}) => theme.colors.primary};
        border-radius:50%;
        padding:10px;
        text-align:center;
        background: ${({theme}) => theme.colors.white};
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        
        display: flex;
        align-items: center;
        justify-content: center;
      
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        img{
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius:50%;
            
        }  
        
        p{
            color: ${({theme}) => theme.colors.primary};
            font-weight: 600;
            font-size:50px;
            
        }
    }

    .round{
        position: absolute;
        bottom:0;
        right:0;
        background: ${({theme}) => theme.colors.primary};
        width:40px;
        height:40px;
        line-height: 32px;
        overflow: hidden;
        text-align:center;
        border-radius: 50%;
        opacity:0;
        transition: opacity 0.3s ease;
        cursor: pointer;
        
        &:hover {
            opacity: 1;
        }
    }
    .round input[type='file']{
        position: absolute;
        transform:scale(2);
        opacity:0;
        cursor: pointer;
    }

    .message-file-success-account{
        color: ${({theme}) => theme.colors.green};
        font-weight: 500;
        margin-top: 10px;
    }

    .message-file-error-account{
        color: ${({theme}) => theme.colors.red};
        font-weight: 500;
        margin-top: 10px;
    }

    input[type=file]::-webkit-file-upload-button{
        cursor:pointer;
    }
    .button-submit{
         opacity:1;
         z-index: 5000;
        visibility:visible;
        
    }
  


    @media screen and (min-width: 1000px){
        width:90%;
        max-width: 1200px;
    }
`

// Container para organizar os cards em grid no desktop
export const CardsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    
    @media screen and (min-width: 1000px){
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 32px;
        margin-top: 32px;
    }
    
    @media screen and (min-width: 1400px){
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items:left;
    width:100%;
    justify-content:center;
    
    padding: 20px 0;
    border-bottom:2px solid ${({theme}) => theme.colors.primary};
    margin-bottom: 30px;
    
    .title-account{
        text-align: center;
        font-family: "Poppins", sans-serif;
        font-size: 28px;
        color: ${({theme}) => theme.colors.gray[800]};
        font-weight: 600;
        margin-bottom: 0;
    }

    button{
        width:auto;
        height: auto;
        padding: 12px 24px;
        margin-bottom:0;
        font-size: 16px;
        font-weight: 600;
        border-radius:25px;
        background: ${({theme}) => theme.colors.green};
        border: none;
        color: #fff;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            background: ${({theme}) => theme.colors.green}dd;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        a{
            color:#fff;
            text-decoration: none;
        }
    }

    @media screen and (min-width: 1000px){
    display: flex;
    align-items:left;
    width:100%;
    justify-content:center;
    
    padding: 10px 0;
    border-bottom:2px solid ${({theme}) => theme.colors.primary};
    margin-bottom: 30px;
    
    .title-account{
        text-align: center;
        font-family: "Poppins", sans-serif;
        font-size: 24px;
   
        font-weight: 600;
        margin-bottom: 0;
    }
    }
`

// Status Badge Component
export const StatusBadge = styled.span<{status: 'active' | 'inactive' | 'trial' | 'expired'}>`
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    ${({status, theme}) => {
        switch(status) {
            case 'active':
                return `
                    background: ${theme.colors.green}20;
                    color: ${theme.colors.green};
                    border: 1px solid ${theme.colors.green}40;
                `;
            case 'trial':
                return `
                    background: #ffc10720;
                    color: #ffc107;
                    border: 1px solid #ffc10740;
                `;
            case 'expired':
                return `
                    background: ${theme.colors.red}20;
                    color: ${theme.colors.red};
                    border: 1px solid ${theme.colors.red}40;
                `;
            default:
                return `
                    background: ${theme.colors.gray[200]};
                    color: ${theme.colors.gray[600]};
                    border: 1px solid ${theme.colors.gray[300]};
                `;
        }
    }}
`;

// Progress Bar Component
export const ProgressBar = styled.div<{percentage: number}>`
    width: 100%;
    height: 8px;
    background: ${({theme}) => theme.colors.gray[200]};
    border-radius: 4px;
    overflow: hidden;
    margin: 8px 0;
    
    &::after {
        content: '';
        display: block;
        height: 100%;
        width: ${({percentage}) => Math.min(percentage, 100)}%;
        background: linear-gradient(90deg, #ffc107, #ff9800);
        border-radius: 4px;
        transition: width 0.3s ease;
    }
`;

// Action Button Component
export const ActionButton = styled.button<{variant?: 'primary' | 'secondary' | 'danger'}>`
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    
    ${({variant, theme}) => {
        switch(variant) {
            case 'primary':
                return `
                    background: ${theme.colors.primary};
                    color: white;
                    
                    &:hover {
                        background: ${theme.colors.primaryDark};
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px ${theme.colors.primary}40;
                    }
                `;
            case 'danger':
                return `
                    background: ${theme.colors.red};
                    color: white;
                    
                    &:hover {
                        background: ${theme.colors.red}dd;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px ${theme.colors.red}40;
                    }
                `;
            default:
                return `
                    background: ${theme.colors.gray[100]};
                    color: ${theme.colors.gray[700]};
                    border: 1px solid ${theme.colors.gray[300]};
                    
                    &:hover {
                        background: ${theme.colors.gray[200]};
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                `;
        }
    }}
`;

export const CardAccount = styled.div<{status:'ACTIVE' | 'DESACTIVATED'}>`
    width: 100%;
    height: auto;
    margin-top: 24px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.white};
    
    border-radius: 16px;
    border: 1px solid ${({theme}) => theme.colors.gray[200]};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    @media screen and (min-width: 1000px){
        margin-top: 0;
        max-width: 500px;
        height: fit-content;
    }

    .card-account-wrapper{
        width:100%;
        padding: 32px;

        @media screen and (min-width: 1000px){
            padding: 24px;
        }

        h2{
            font-family:'Nunito Sans', sans-serif;
            font-weight: 600;
            font-size: 24px;
            color: ${({theme}) => theme.colors.gray[800]};
            line-height: 1.2;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 2px solid ${({theme}) => theme.colors.primary};
            
            @media screen and (min-width: 1000px){
                font-size: 20px;
                margin-bottom: 20px;
            }
        }
        
        .card-account-wrapper-name,
        .card-account-wrapper-email,
        .card-account-wrapper-date,
        .card-account-wrapper-status {
            width:100%;
            margin-bottom: 20px;
            
            @media screen and (min-width: 1000px){
                margin-bottom: 16px;
            }
            
            label {
                display: block;
                font-size: 14px;
                font-weight: 600;
                color: ${({theme}) => theme.colors.gray[600]};
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                
                @media screen and (min-width: 1000px){
                    font-size: 12px;
                    margin-bottom: 4px;
                }
            }
            
            p{
                color: ${({theme}) => theme.colors.gray[800]};
                margin-bottom: 0;
                font-size: 16px;
                font-weight: 500;
                
                @media screen and (min-width: 1000px){
                    font-size: 14px;
                }
            }
        }
        
        .card-account-wrapper-status{
            p{
                color:${({status,theme}) => status === 'ACTIVE' ?  theme.colors.green : theme.colors.red};
                font-weight: 600;
            }
        }        
    }

    .title-users-account{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 0 32px;

        .link-add-user{
            font-size: 14px !important;
            color: ${({theme}) => theme.colors.primary};
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border: 1px solid ${({theme}) => theme.colors.primary};
            border-radius: 8px;
            transition: all 0.3s ease;
            
            &:hover {
                background: ${({theme}) => theme.colors.primary};
                color: white;
                transform: translateY(-1px);
            }
        }

        h2{
            margin-bottom: 0;
            font-size: 20px;
            font-weight: 600;
            color: ${({theme}) => theme.colors.gray[800]};
        }
    }
    
    .users-account-wrapper{
        display: flex;
        flex-direction: column;
        padding: 0 32px 32px;

        .list-users-account{
            margin-top: 16px;
            margin-bottom: 0;
            padding-left: 0;

            li{
                background: ${({theme}) => theme.colors.gray[50]};
                border: 1px solid ${({theme}) => theme.colors.gray[200]};
                margin-top: 12px;
                height: auto;
                min-height: 50px;
                padding: 12px 16px;
                display: flex;
                align-items: center;
                border-radius: 12px;
                transition: all 0.3s ease;
                
                &:hover {
                    background: ${({theme}) => theme.colors.gray[100]};
                    transform: translateX(4px);
                }

                .user-account-name{
                    font-size: 15px;
                    font-weight: 500;
                    color: ${({theme}) => theme.colors.gray[800]};
                    text-overflow: ellipsis;
                    overflow: hidden;
                    flex: 1;
                }

                .edit-remove-user-wrapper{
                    margin-left: 20px;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    .edit-user-link{
                        margin-right: 0;
                        
                        a {
                            color: ${({theme}) => theme.colors.primary};
                            text-decoration: none;
                            font-weight: 500;
                            padding: 4px 8px;
                            border-radius: 4px;
                            transition: all 0.3s ease;
                            
                            &:hover {
                                background: ${({theme}) => theme.colors.primary}20;
                            }
                        }
                    }
                    
                    p {
                        color: ${({theme}) => theme.colors.red};
                        cursor: pointer;
                        font-weight: 500;
                        padding: 4px 8px;
                        border-radius: 4px;
                        transition: all 0.3s ease;
                        margin: 0;
                        
                        &:hover {
                            background: ${({theme}) => theme.colors.red}20;
                        }
                    }
                }

                .initials-user-account-wrapper{
                    width: 40px;
                    height: 40px;
                    border: 2px solid ${({theme}) => theme.colors.primary};
                    border-radius: 50%;
                    padding: 0;
                    margin-right: 12px;
                    background: ${({theme}) => theme.colors.primary}20;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .initials-user-account{
                    color: ${({theme}) => theme.colors.primary};
                    font-weight: 600;
                    font-size: 16px;
                }

                p{
                    margin-bottom: 0;
                }
            }
        }
    }

    @media screen and (min-width: 1000px){
        .users-account-wrapper {
            .list-users-account{
                width: 100%;
                
                li{
                    background: ${({theme}) => theme.colors.gray[50]};
                    border: 1px solid ${({theme}) => theme.colors.gray[200]};
                    margin-top: 12px;
                    height: auto;
                    min-height: 50px;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;

                    .user-account-name{
                        font-size: 15px;
                        font-weight: 500;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .edit-remove-user-wrapper{
                        margin-left: 20px;
                        font-size: 13px;
                    }
                    
                    .initials-user-account-wrapper{
                        width: 40px;
                        height: 40px;
                        border: 2px solid ${({theme}) => theme.colors.primary};
                        border-radius: 50%;
                        padding: 0;
                        margin-right: 12px;
                        background: ${({theme}) => theme.colors.primary}20;
                        
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .initials-user-account{
                        color: ${({theme}) => theme.colors.primary};
                        font-weight: 600;
                    }
                    
                    p{
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
`