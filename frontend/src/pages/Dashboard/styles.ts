import styled from "styled-components";
import imageTopBanner from '../../assets/images/banner-top.png';


export const DashboardBackground = styled.main`
    width: 100%;   
    display: flex;  
    flex-direction: column;
    background-color: ${({theme}) => theme.colors.backgroundLight};

    .left-side-message-user{
        margin-top:25px;
        padding: 0 20px;
       
    }

    @media screen and (min-width: 1000px){

        .left-side-message-user{
            margin-top:35px;
            padding: 0 20px;
            margin-left: 90px;
           
        }
    }
   
`

export const BodyContainer = styled.main`   
    width:100%;
    display:flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 20px 0 30px 0;
    font-family:'Nunito Sans', sans-serif;
       
    .left-side{
        margin-top: 50px;
        width: 95%;

        

        .card-wrapper-top{
            padding:25px 20px;
            border: 1px solid #e6e9ed;
            background: ${({theme}) => theme.colors.background};

            button{
                width: auto;
                height:40px;
                padding: 5px 30px;
                font-family:'Nunito Sans', sans-serif;
            }
            p{
                font-family: "Nunito Sans", sans-serif;
                
               }
        }     

        .cards-left-side-title{
            font-size: 1.25rem;
            color:#707780;
            font-weight: 300;
            width:100%;
            text-align: left;
            padding: 0 15px;

        }

      .cards-left-side{
            background: #fff;
            margin-top: 40px;
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #e6e9ed;
            width:100%;
            
            .cards-wrapper{
                width: 100%;
            }

            .card-wrapper-left{
                    width: 100%;
                    height: 150px;
                    padding: 15px 10px;

                    p{
                        color: #767676; 
                        font-weight: 500;
                    }
                    span{
                        color: #484848; 
                        font-weight: 300;
                        font-size: 35px;
                        font-family: "Poppins", sans-serif; 
                    }
            }

            
    .number-card-dashboard{
        font-size:40px;
    }
            
        }
      
    }


    .right-side{
       
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width:100%;
        padding: 0 10px;
        

        .img-right{
            width: 100vw;
            height: 70px;
            object-fit: cover;
            display:none;
         
        }
        .eMWcUt{
            display:none;
        }
    }



    @media screen and (min-width:1000px){
        
       
        flex-direction: row;
        align-items: start;
        padding: 40px 15px 30px 15px;
       
         
        .left-side{
            

            width: 60%;
            margin: 0 25px 0 60px;
    
    
            .card-wrapper-top{
                padding:33px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;

               .button-top{
                width:auto;
                padding:10px 20px;
               }

               p{
                font-size:13px;
                margin-bottom: 0;
               }

            }     
            
          
    
          .cards-left-side{

            margin-top: 30px;
            padding: 10px 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border: 1px solid #e6e9ed;

            .cards-left-side-title{
                font-size: 1.30rem;
                color:#707780;
                margin-top:10px;
                text-align: left;
                width:100%;
                margin-left:10px;
                padding-left: 15px;
                font-weight: 400;
            }

            .cards-wrapper{
                display:flex;
                justify-content: center;
            }

                .card-wrapper-left{
                    width: 200px;
                    height: 130px;
                   

                    p{
                        font-size:13px;
                        margin-bottom:0;
                    }
                    .number-card-dashboard{
                        font-size:25px;
                    } 

                }
               
                                       
        }       
    }
    

        .right-side{
            min-width:300px;
            width:300px;
            

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            

            .img-right{
                width:100%;
                height:230px;
                object-fit: cover;
                border-radius: 10px;
                display:block;
            }
            .eMWcUt{
                display:block;
            }


        }

        @media screen and (min-width:1200px){
        
       
            flex-direction: row;
            align-items: start;
            padding: 40px 15px 30px 15px;
           
             
            .left-side{
                
    
                width: 70%;
                margin: 0 25px 0 60px;
        
        
                .card-wrapper-top{
                    padding:33px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
    
                   .button-top{
                    width:auto;
                    padding:10px 20px;
                   }
    
                   p{
                    
                    font-size:18px;
                    margin-bottom: 0;
                   }
    
                }     
                
              
        
              .cards-left-side{
    
                margin-top: 30px;
                padding: 10px 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border: 1px solid #e6e9ed;
    
                .cards-left-side-title{
                    font-size: 1.30rem;
                    color:#707780;
                    margin-top:10px;
                    text-align: left;
                    width:100%;
                    margin-left:10px;
                    padding-left: 15px;
                    font-weight: 400;
                }
    
                .cards-wrapper{
                    display:flex;
                    justify-content: center;
                }
    
                    .card-wrapper-left{
                        width: 250px;
                        height: 130px;
                       
    
                        p{
                            font-size:18px;
                            margin-bottom:0;
                           
                        }
                        .number-card-dashboard{
                            font-size:30px;
                        } 
    
                    }
                   
                                           
            }       
        }
        
    
            .right-side{
                min-width:320px;
                width:320px;
                
    
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                
    
                .img-right{
                    width:100%;
                    height:230px;
                    object-fit: cover;
                    border-radius: 10px;
                    display:block;
                }
                .eMWcUt{
                    display:block;
                }
    
    
            }

            @media screen and (min-width:1300px){
        
       
                flex-direction: row;
                align-items: start;
                padding: 40px 15px 30px 15px;
               
                 
                .left-side{
                    
        
                    width: 70%;
                    margin: 0 25px 0 60px;
            
            
                    .card-wrapper-top{
                        padding:33px 40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
        
                       .button-top{
                        width:auto;
                        padding:10px 20px;
                       }
        
                       p{
                        
                        font-size:18px;
                        margin-bottom: 0;
                       }
        
                    }     
                    
                  
            
                  .cards-left-side{
        
                    margin-top: 30px;
                    padding: 10px 10px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    border: 1px solid #e6e9ed;
        
                    .cards-left-side-title{
                        font-size: 1.30rem;
                        color:#707780;
                        margin-top:10px;
                        text-align: left;
                        width:100%;
                        margin-left:10px;
                        padding-left: 15px;
                        font-weight: 400;
                    }
        
                    .cards-wrapper{
                        display:flex;
                        justify-content: center;
                    }
        
                        .card-wrapper-left{
                            width: 290px;
                            height: 130px;
                           
        
                            p{
                                font-size:18px;
                                margin-bottom:0;
                               
                            }
                            .number-card-dashboard{
                                font-size:30px;
                            } 
        
                        }
                       
                                               
                }       
            }
            
        
                .right-side{
                    min-width:320px;
                    width:320px;
                    
        
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    
        
                    .img-right{
                        width:100%;
                        height:230px;
                        object-fit: cover;
                        border-radius: 10px;
                        display:block;
                    }
                    .eMWcUt{
                        display:block;
                    }
        
        
                }

          
        
`


export const UserInfo = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 7px;
    
    
    
    .user-image-wrapper-dashboard{
        width:92px;
        height:92px;
        border: .3px solid #e6e9ed;
        border-radius:50%;
        padding:10px;
        text-align:center;
        
        img{
            width: 100%;
            height: 100%;
            padding: 3px;
            border-radius: 50%;
            object-fit: cover;
            
            
        }
        .initials{
            color:#008ace;
            font-weight: 500;
            font-size:38px;
           }
       
    }
    .name-perfil-dashboard{
        font-family:'Nunito Sans', sans-serif;
        font-size:17px;
        margin-bottom:0;
        text-align: center;

    }
    .message-welcome-perfil{
        color:#008ace;
        font-family:'Nunito Sans', sans-serif;
        font-size:14px;
        margin-top:10px;
    }

    .builder-icon{
        font-size:20px;
       
    }
   
`

export const SocialList = styled.ul`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width:26%;
    padding-left: 0;

    li{

    }

`








