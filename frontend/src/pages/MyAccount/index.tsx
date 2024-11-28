/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { base64 } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import defaultImage from '../../assets/images/no-pictures.png';
import {MdPhotoCamera} from 'react-icons/md';

import {MyAccountBackground,BodyMyAccountContainer,TitleWrapper, CardAccount} from './styles';
import {  getImageIfExist, refreshToken, uploadProfileImage } from '../../services/resources/user';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { BASE_URL_FROM_BUCKET } from '../../utils/request-image';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { Link, useNavigate } from 'react-router-dom';
import LoadingLogin from '../../components/LoadingLogin';
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import { deleteUserTenant, findAllUserTenant } from '../../services/resources/userTenant';
import { Tenant } from '../../types/tenant';
import { IoCloseOutline } from 'react-icons/io5';
import Loading from '../../components/Loading';



const MyAccount = ()=>{

    const navigate = useNavigate();

    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [errorMaxSize,setErrorMaxSize]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);

    const [fileBase64,setFileBase64]= useState<string>("");

    const [imageUser,setImageUser]= useState<string>("");

    const {user, getCurrentUser} = useAuth();

    const [initials, setInitials]= useState(() => {
        if(user){
            return user.slug?.substring(0,1)+ user.email?.substring(0,1) as string;

        }
        return 'error' as string;

    });
   

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/account')
        }else{
           navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])
   

    useEffect(() =>{
        getCurrentUser();
       
    },[])

   
    const getUserPerfil= () => {
        const userPerfil= user.perfis[0]; 
        return userPerfil;
    }
    
  
    const formSubmit= async()=> {
       
        const data=await  uploadProfileImage(fileBase64 as string);
        
        let a=getUrl();
        setImageUser(a as unknown as string);

        setLoading(true)
       
            if(data.status === 201){  
                setTimeout(()=>{
                  setLoading(false)
                  setSuccessMessage(true)
                    },1000) 
              
                
              setTimeout(()=>{
              setSuccessMessage(false);

              },4000)  
      }      
        if(data.response.data.status !== 201 && data.response.data.status !== 411 ){ 
            console.log(data.response.data.status)         
                  setLoading(false)
                  setError(true);
               
                  setTimeout(() => {
                   setError(false);
                  
                  },4000)                 
             
          }
    
          if(data.response.data.status === 411){ 
            console.log(data.response.data.status)  
            setLoading(false)
            setErrorMaxSize(true);
        
            setTimeout(() => {
             setErrorMaxSize(false);
            
            },4000)                 
       
    }
        
           
}
useEffect(() => { 
    if(fileBase64 !== " " || "" || null){
       
            formSubmit()
        
        
    }
}, [fileBase64]);


    function convertFile(files: FileList|null){
        if(files){
            const fileRef= files[0] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{
                
                setFileBase64(`data:${fileType as string};base64,${btoa(ev.target.result )}`);
                
                                      
            }                 
        }     
    }

      
      
      const getUrl = async() =>{
        const data=  await getImageIfExist(user.id,getUserPerfil());
            if(data !=null){
               // const url=`${BASE_URL_FROM_BUCKET}cp${user.id}.jpg`;
                setImageUser(data as unknown as string);
                return data
            }
        
    
      }  
    
      useEffect(() => {  
        getUrl()
         
        }, [user.id]);

 
        const ErrorHandler = () => {
            return <PageNotFound/>;
          }


          const [userTenants, setUserTenants]= useState<Tenant[]>();
          const getListUsers= async()=>{
            const data=  await findAllUserTenant();
            setUserTenants(data.data as Tenant[])
            
          }

          useEffect(() => {  
            getListUsers()
             
            }, []);

            const [selectedUsers,setSelectedUsers]= useState<Tenant[]>([]);
               let aux=[...selectedUsers as Tenant[]] 
            useEffect(() => {  
               userTenants && userTenants.forEach((item:any) =>{
                    if(!item.perfis.includes('ACCOUNT') ){
                       
                       // selectedUsers.push(item as Tenant)
                        setSelectedUsers([
                             {
            
                            id:item.id,
                            slug: item.slug,
                            proprietario:'',
                            lastName: '',
                            email:'',
                            password:'',
                            status:'',
                            creci:'',
                            domain:'',
                            start:'',
                            endDate:'',
                            renovation:'',
                            verification:'',
                            perfis:[''] ,
                            images:[{
                                id:1 ,
                                url:''
                             }] 
                    }]  as Tenant[])
                      
                       
                    }
                })
                 
                }, [userTenants]);

           console.log(selectedUsers)
         
    
            let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');
            let perfilAdmin=Object.values(user.perfis).some(obj => obj === 'ADMIN');
            let perfilAccount=Object.values(user.perfis).some(obj => obj === 'ACCOUNT');

            const [initialsUser, setInitialsUser]= useState(() => {
                if(user){
                    return user.slug?.substring(0,1)+ user.email?.substring(0,1) as string;
        
                }
                return 'error' as string;
        
            });

            const [isVisible, setIsVisible] = useState(false);
       
            

            const handleToRemove = async (id:number) => {
                setIsVisible(true);       
           const data = await deleteUserTenant((String(id)));
           console.log(data.status)
           if(data.status === 204){
           
            setTimeout(async ()=> { 
                setIsVisible(false)                   
              
           },500)    
           setSelectedUsers([])
           getListUsers()
           }     
    }
          
    return(
        <>
       
        {perfilTenant || perfilAdmin ? 
        
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
       
 
    <MyAccountBackground>
       <Header /> 
      <BarTop />
       <BodyMyAccountContainer>
        
        <TitleWrapper>
        <h1 className='title-account'>Minha Conta</h1>
        
        </TitleWrapper>
       <div className='upload'>
        <div className='imgWrapper'>

        {imageUser !== ''  && user.email !== 'admin@outlook.com'? <img src={imageUser} alt='Foto Perfil'/>:<p className='initials'>{initials}</p>}
        </div>
        <div className='round'>
        <form id='form-image-profile' onSubmit={formSubmit}>
        {
             //<input className='input-image-profile' type="file" accept="image/png,image/jpeg"  onChange={(e) => convertFile(e.target.files)}/>///  
        }    
      
            <MdPhotoCamera style={{color:'#fff'}}/>
      
        </form>  
        </div>
        </div>
        { loading ===true && <div className='message-file-success-account'>Aguarde...</div>}
        { successMessage===true && <div className='message-file-success-account'>Adicionada com sucesso!</div>}

        { error===true && <div className='message-file-error-account'>Tente mais tarde</div>}
                 { errorMaxSize===true && <div className='message-file-error-account'>Tamanho Máximo é de 10M</div>}
        
        <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
            <h2>Perfil</h2>
            
            <div className='card-account-wrapper-name'>
                <label>Imobiliária</label>
                <p>{user.slug} {user.lastName}</p>
            </div>
            <div className='card-account-wrapper-email'>
                <label>Email</label>
                <p>{user.email}</p>
            </div>
           
            <div className='card-account-wrapper-status'>
                <label>Status</label>
                <p>{user.status}</p>
                </div>

            <div className='card-account-wrapper-email'>
                <label>CRECI</label>
                {user.creci ? <p>{user.creci}</p>:<p>Por favor atualize o creci</p>}
            </div>
        
            </div>
         
        </CardAccount>
        {perfilAccount  &&
        <CardAccount status='ACTIVE'>           
            <div className='card-account-wrapper'> 

            <div className='title-users-account'> <h2>Usuários</h2> <Link to={"/userRegistration"} className='link-add-user'>Adicionar usuário</Link></div>
            
            <div className='users-account-wrapper'>
         
            <ul className='list-users-account'>
             
                {selectedUsers && selectedUsers.map(item=> (
                <>
                {!isVisible ? 
                    
                <li><div className='initials-user-account-wrapper'><p className='initials-user-account'>{initialsUser}</p></div><p className='user-account-name'>{item.slug}</p> <div className='edit-remove-user-wrapper'><p className='edit-user-link'><Link to={`/editUser/${item.id}`}>editar</Link></p>    
                <p onClick={()=>handleToRemove(item.id)}>excluir</p></div></li> 
                :
                <p style={{background:'#dadada',width:'100%', height:'30px;', position:'relative' ,color:'#dadada', borderRadius:'5px'}}><Loading/>s</p>}
                </>
                ))}
               
                     
                    
               
            </ul>     
            </div>

            </div>
         
        </CardAccount>
        }
       </BodyMyAccountContainer>
    </MyAccountBackground>
  
      </div>
      </ErrorBoundary>
      : <PageNotFound/>}
   
      </>
    )

}

export default MyAccount;