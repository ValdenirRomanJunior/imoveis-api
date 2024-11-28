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
        border: .3px solid #e6e9ed;
        border-radius:50%;
        padding:10px;
        text-align:center;
        
        display: flex;
        align-items: center;
        justify-content: center;
      

        img{
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius:50%;
            
        }  
        
        p{
            color:#008ace;
            font-weight: 500;
            font-size:50px;
            
        }
    }

    .round{
        position: absolute;
        bottom:0;
        right:0;
        background:#00B4FF;
        width:110px;
        height:110px;
        line-height: 32px;
        overflow: hidden;
        text-align:center;
        border-radius: 50%;
        opacity:0;
        
        
    }
    .round input[type='file']{
        position: absolute;
        transform:scale(2);
        opacity:0;
      
    }

    .message-file-success-account{
        color: #13ac49;
    }

    .message-file-error-account{
        color: red;
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
        width:50%;
    }


  
    `

    export const TitleWrapper = styled.div`
   
    
    display: flex;
    align-items:left;
    width:100%;
    justify-content:center;
    
    padding: 10px 0;
    border-bottom:1px solid #e6e9ed;

    
    .title-account{
        text-align: center;
       

        font-family: "Poppins", sans-serif;
        font-size: 20px;
        color: #5d5d5d;
        font-weight: 400;
        margin-bottom: 0;
           
    }

    button{
        width:auto;
        height: auto;
        padding: 5px 20px;
        margin-bottom:0;
        font-size: 17px;
        border-radius:50px;
        background: rgb(0, 157, 67);
        border: none;
        color: #fff;

        a{
            color:#fff;
        }

    }

    @media screen and (min-width: 1000px){
        
    }
   
`

export const CardAccount = styled.div<{status:'ACTIVE' | 'DESACTIVATED'}>`
        width: 100%;
        height: auto;
        margin-top:20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${({theme}) => theme.colors.background};
        
       border-radius:5px;
       border: 1px solid #e6e9ed;

        .card-account-wrapper{
            width:100%;
            padding: 20px 20px;

            h2{
                font-family:'Nunito Sans', sans-serif;
                font-weight:400;
                font-size: 22px;
                color:#191C1F;
                line-height: 1.2;
            }
            .card-account-wrapper-name{
                width:100%;
                margin-top:25px;
                
                p{
                    color:gray;
                    margin-bottom:0.5rem;
                }

            }
            .card-account-wrapper-email{
                width:100%;
               
                p{
                    color:gray;
                    margin-bottom:0.5rem;
                }
            }
            .card-account-wrapper-date{
                width:100%;
                margin-bottom:0.5rem;
                            
                p{
                    margin-bottom:0.5rem;
                    color:gray;
                }
            }
            .card-account-wrapper-status{
                width:100%;
                
                p{
                    margin-bottom:0.5rem;
                    color:${({status,theme}) => status === 'ACTIVE' ?  theme.colors.green : theme.colors.red};
                   
                }
            }        
        }

        .title-users-account{

        display: flex;
        align-items: center;
        justify-content: space-between;

 
   .link-add-user{
           font-size:13px !important;
           }

        h2{
        margin-bottom: 0;
       font-size:17px;
        }
        
        }
        .users-account-wrapper{
            display: flex;
            flex-direction: column;

        

            .list-users-account{
                 margin-top:10px;
                margin-bottom: 0;
                padding-left:0;

                li{
               background: #f8f8f8;
               border: 1px solid #ebebeb;
                  margin-top:10px;

                 height:30px;             
                 padding 8px 7px;
                 display: flex;
                 align-items: center;

                 .user-account-name{
                     font-size:14px;
                     text-overflow: ellipsis;
                    overflow: hidden;
                 }

                 .edit-remove-user-wrapper{
                 margin-left:20px;
                 font-size:13px;
                 color:#49599f;

                 display: flex;
                 align-items: center;

                 .edit-user-link{
                 margin-right:15px;
                 }
      
                 }

                  .initials-user-account-wrapper{
                    width:25px;
                    height:25px;
                    border: .3px solid #e6e9ed;
                    border-radius: 50%;
                    padding:3px;
                    margin-right:3px;
                 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .initials-user-account{
                    color:#008ace;        

                  }

                  p{
                  margin-bottom:0;
                  }
                }
            }
        }


           @media screen and (min-width: 1000px){

            .list-users-account{
                width:350px;

                
                li{
               background: #f8f8f8;
               border: 1px solid #ebebeb;
                  margin-top:10px;

                 height:30px;             
                 padding 5px 10px;
                 display: flex;
                 align-items: center;

                 .user-account-name{
                     font-size:14px;
                     text-overflow: ellipsis;
                    overflow: hidden;
                 }

                 .edit-remove-user-wrapper{
                 margin-left:20px;
                 font-size:13px;
                 color:#49599f;
                 }
                  .initials-user-account-wrapper{
                    width:25px;
                    height:25px;
                    border: .3px solid #e6e9ed;
                    border-radius: 50%;
                    padding:3px;
                    margin-right:3px;
                 
                    display: flex;
                    align-items: center;
                    justify-content: center;

                  }
                  .initials-user-account{
                    color:#008ace;  

                  }
                  p{
                  margin-bottom:0;

                  }
                }
            }

           
    }
`