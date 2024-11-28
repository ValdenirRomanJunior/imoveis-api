/* eslint-disable no-loop-func */
import {  useEffect, useState } from 'react';
import BarTop from '../../components/Bartop';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {EditBackground,BodyEditContainer, FormContainer,InputRange} from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Tenant } from '../../types/tenant';
import {editTenant, findTenant, sendNewPasswordForEmail} from '../../services/resources/tenant';
import {MdOutlineChangeCircle} from 'react-icons/md'
import Loading from '../../components/Loading';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import { ErrorBoundary } from 'react-error-boundary';
import PageNotFound from '../../components/PageNotFound';
import useAuth from '../../hooks/useAuth';
import { editUserTenant, findUserTenant } from '../../services/resources/userTenant';

type PropParam = {
    tenantId:string;
}

type Error = {
    fieldName:string;
    message:string;
}


type Prop = {
    tenant: Tenant;
}



const EditTenantComponent = ({tenant}: Prop) =>{

    const params = useParams();  
    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const [loadingTenant, setLoadingTenant]=useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    
    const navigate= useNavigate();


    const intialValueStatusRange = () =>{
        if(tenant.status === 'ATIVO'){
            return '1' as string;
        }
        if(tenant.status === 'DESATIVADO'){
            return '2' as string;
        }
      
    }

    const initialValuesVerification = () => {
        if(tenant.verification === 'VERIFICADO'){
            return '1';
        }
        if(tenant.verification === 'NAO_VERIFICADO'){
            return '2';
        }
    }
       
    const [initialValueStatus,setInitialValueStatus]= useState(()=> intialValueStatusRange());
        const [form, setForm] = useState({
            
            slug:tenant?.slug,        
            email:tenant?.email,
            password:'',  
            creci:tenant?.creci,               
    
});
       
    
        
        const [emptyValue,setEmptyValue]= useState(false);

            const handleChange = (e:any) =>{
                             
                const field= e.target.getAttribute('name');
                const value= e.target.value;
                setForm({ ...form,
                    [field]:value,
                }); 

            
                             
                    }   
                       
            const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{
           
                setErrors([])           
            }   

           
        
            const handleSubmit = async (e:any) =>{
              e.preventDefault();

        
                let emptyvalues=Object.values(form).some(obj => obj === '');
                setEmptyValue(emptyvalues);


                if(!emptyvalues){
                    setLoadingTenant(true)
 
                    
                const data = await editUserTenant(form['slug'], form['email'],form['password'], form['creci'],`${params.tenantId}`)
                      
                if(data.status === 204){
                                 
                    setSuccessMessage(true)
                    setTimeout(()=> {
                        setSuccessMessage(false);
                        navigate("/account")  
                    },2000)

                    setLoadingTenant(false)
                                         
                  }
                                    
                  if(data.response.data.errors){              
                    setErrors(data.response.data.errors);
                    setSuccessMessage(false)
                    setLoadingTenant(false)
                                                                                   
                } 
                else if(data.response.status === 404 || data.response.status === 400 || data.response.status === 403){
                    console.log(data.response.status)
                    setOtherError(true)
                 
                    setSuccessMessage(false)
                    setLoadingTenant(false)

                    setTimeout(()=>{
                        setOtherError(false)
                    },2000)
                }                         
         }
        }

     
                 
    return(
 
      
 
       <EditBackground>
        <Header />
        <BarTop />
        <BodyEditContainer>
            <h1 className='title-registration'>Editar Cliente</h1>
          

            <form onSubmit={(e)=> {handleSubmit(e)}}>
            <FormContainer>

                <label>Nome Usuário</label>       
                <Input id="slug" name="slug" value={form['slug'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={25}/>
                {errors.map(x => { if(x.fieldName === 'slug') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['slug'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}


                     <label>Email*</label>            
                <Input id="email" name="email" value={form['email'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={30} />
                {errors.map(x => { if(x.fieldName === 'email') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['email'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}

                <label>Creci*</label>            
                <Input id="creci" name="creci" value={form['creci'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={15} />
                {errors.map(x => { if(x.fieldName === 'creci') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['creci'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}

                <label>Nova Senha</label>            
                <Input id="password" name="password" value={form['password'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={20} />
                {errors.map(x => { if(x.fieldName === 'password') return  <p className='formField__error'>{x.message}</p>})}

           
                    
                <div className='buttom-register-wrapper'>
           

                 {
                        loadingTenant && <Button className="button-send-email" type='submit'><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit'>Salvar</Button>
                    }

            { otherError &&   
              <div className='message-other-error-wrapper'>  <div className='other-error-tenant'>Tente mais tarde</div></div>
              
                 }
                  { successMessage  &&  <div className="message">
                    <span className='success'>Editado com sucesso!</span>
                    </div>
                     }
                </div>
            </FormContainer>
            </form>
           

        </BodyEditContainer>
       </EditBackground>
        
                
    )
}



const EditUser = () =>{

   
    const params = useParams();
    const [errorPage, setErrorPage] = useState('');
    const [tenant,setTenant]=useState<Tenant>();
    const p = `${params.tenantId}`;

    const navigate = useNavigate();

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
   navigate(`/editUser/${p}`)
        }else{
        navigate('/');
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[p])

  

    const getTenant = async() => {
                 
        const data = await findUserTenant(p);          
          
             if(data.status === 200){               
                setTenant(data.data as Tenant) 
              } 

               if(data.response.status === 404 ){ 
                console.log(data.response.data.error)
                setErrorPage(data.response.data.error);
                 
              }
               if(data.response.status === 400){ 
                setErrorPage(data.response.data.error);
                 
              }                 
    }

     
    useEffect(() => {
        getTenant()

    },
     [p]);

     const {user, getCurrentUser} = useAuth();
     useEffect(() =>{
           
       getCurrentUser();
   
   },[])

     const ErrorHandler = () => {
        return <PageNotFound/>;
      }


      let perfilAccount=Object.values(user.perfis).some(obj => obj === 'ACCOUNT');
    return(
        <ErrorBoundary FallbackComponent={ErrorHandler}>
       
        {errorPage && <PageNotFound/>}
      
           {perfilAccount ?
        <>
            {tenant && !errorPage && 
            <EditTenantComponent tenant={tenant as unknown as Tenant}/>
        }
        </>
        : <PageNotFound/>}
             
          </ErrorBoundary>
    )
}

export default EditUser;
