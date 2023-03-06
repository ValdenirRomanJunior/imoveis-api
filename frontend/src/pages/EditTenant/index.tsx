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
    
    const [loadingTenant, setLoadingTenant]=useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    
   

    const [loadingLogin,setLoadingLogin]= useState(true);

    useEffect(() =>{
       
        setTimeout(() =>{
            setLoadingLogin(false)
        },1000)

    },[])


  


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
            lastName:tenant?.lastName,
            email:tenant?.email,
            password:'',
            status:tenant?.status,
            statusRange:initialValueStatus as string
            
    
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

        
                let emptySlug=Object.values(form['slug']).some(obj => obj === '');
                setEmptyValue(emptySlug);

                let emptyLastName=Object.values(form['lastName']).some(obj => obj === '');
                setEmptyValue(emptyLastName);

                let emptyEmail=Object.values(form['email']).some(obj => obj === '');
                setEmptyValue(emptyEmail);

                let emptyStatus=Object.values(form['status']).some(obj => obj === '');
                setEmptyValue(emptyStatus);

                let emptyStatusRange=Object.values(form['statusRange']).some(obj => obj === '');
                setEmptyValue(emptyStatusRange);
                
                
              
                let slug: any;            
                for (var prop in form) { if(prop === 'slug'){slug=form[prop]; }}
                        
                let lastName: any;            
                for (var prop1 in form) {if(prop1 === 'lastName'){ lastName=form[prop1];}}

                let email: any;            
                for (var prop2 in form) {if(prop2 === 'email'){ email=form[prop2];}}

                let password: any;            
                for (var prop5 in form) {if(prop5 === 'password'){ password=form[prop5];}}

                let status:any;            
               for (var prop3 in form) {if(prop3 === 'statusRange'){ status=form[prop3];}}
             

                if(!emptySlug && !emptyLastName && !emptyEmail && !emptyStatus && !emptyStatusRange){
                    setLoadingTenant(true)

                
                    
                const data = await editTenant(slug, lastName, email,password, status,initialValuesVerification() as string,`${params.tenantId} `)
                        console.log(data)
                if(data.status === 204){
                   console.log(data.status)                    
                    setSuccessMessage(true)
                    setLoadingTenant(false)
                                         
                  }
                                           
                  if(data.response.data.errors){              
                    setErrors(data.response.data.errors);
                    setSuccessMessage(false)
                    setLoadingTenant(false)
                                                                                   
                } 
               
         
               
         }
        }

     
                 
    return(
        <div>
        { loadingLogin &&  <LoadingLogin/> }
 
       <EditBackground>
        <Header />
        <BarTop />
        <BodyEditContainer>
            <h1 className='title-registration'>Editar Cliente</h1>
            <div className="message">
                    {successMessage   ? <span className='success'>Editado com sucesso!</span>: ''}
                    </div>

            <form onSubmit={(e)=> {handleSubmit(e)}}>
            <FormContainer>

                <label>Nome*</label>       
                <Input id="slug" name="slug" value={form['slug'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={25}/>
                {errors.map(x => { if(x.fieldName === 'slug') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['slug'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}

                     <label>Sobrenome*</label>            
                <Input id="lastName" name="lastName" value={form['lastName'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={35}/>
                {errors.map(x => { if(x.fieldName === 'lastName') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['lastName'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''} 

                     <label>Email*</label>            
                <Input id="email" name="email" value={form['email'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={30} />
                {errors.map(x => { if(x.fieldName === 'email') return  <p className='formField__error'>{x.message}</p>})}
                { emptyValue && form['email'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}

                <label>Nova Senha</label>            
                <Input id="password" name="password" value={form['password'] } onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={20} />
                {errors.map(x => { if(x.fieldName === 'password') return  <p className='formField__error'>{x.message}</p>})}
              
                <label>Status</label>
                <InputRange> 
                <input id="statusRange" name="statusRange" value={form['statusRange']} min='1' max='2'  type='range' onChange={(e) => handleChange(e)}/>    
                </InputRange>
              { form['statusRange'] ==='1' &&
                <Input id="status" name="status" disabled value='ATIVO' onChange={(e) => handleChange(e)} maxLength={90} />
            } 
            { form['statusRange'] ==='2' &&
                <Input id="status" name="status" disabled value='DESATIVADO' onChange={(e) => handleChange(e)} maxLength={90} />
        }        
                <div className='buttom-register-wrapper'>

                 {
                        loadingTenant && <Button className="button-send-email" type='submit'><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit'>Salvar</Button>
                    }
                </div>
            </FormContainer>
            </form>

        </BodyEditContainer>
       </EditBackground>
        
          </div>  
        
    )
}

const EditTenant = () =>{

   
    const params = useParams();
    const [errorPage, setErrorPage] = useState('');
    const [tenant,setTenant]=useState<Tenant>();
    const p = `${params.tenantId}`;

    const navigate = useNavigate();

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate(`/edittenant/${p}`)
        }else{
          //  navigate('/');
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[p])

  
    const getTenant = async() => {
                 
        const data = await findTenant(p);          
          
             if(data.status === 200){               
                setTenant(data.data as Tenant) 
              } 

               if(data.response.status === 404){ 
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


     const ErrorHandler = () => {
        return <PageNotFound/>;
      }

    return(
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        
        {errorPage && <PageNotFound/>}
           
        <div>
            {tenant && 
            <EditTenantComponent tenant={tenant as unknown as Tenant}/>
        }
        </div>
             
          </ErrorBoundary>
    )
}

export default EditTenant;
