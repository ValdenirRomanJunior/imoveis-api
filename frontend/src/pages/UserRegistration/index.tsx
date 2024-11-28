/* eslint-disable no-loop-func */
import {  useEffect, useState } from 'react';
import BarTop from '../../components/Bartop';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {RegistrationBackground,BodyRegistrationContainer, FormContainer} from './styles';
import { useNavigate } from 'react-router-dom';
import { newTenant } from '../../services/resources/tenant';
import Loading from '../../components/Loading';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import useAuth from '../../hooks/useAuth';
import PageNotFound from '../../components/PageNotFound';
import { newUserTenant } from '../../services/resources/userTenant';



type Error = {
    fieldName:string;
    message:string;
}



const UserRegistration = () =>{

    const [otherError, setOtherError] = useState(false);
    const [errors, setErrors] = useState<Error[]>([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loadingTenant, setLoadingTenant]=useState(false);
    const navigate = useNavigate();


   
    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
        navigate('/userRegistration')
        }else{
           navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])


const {user, getCurrentUser} = useAuth();
useEffect(() =>{
      
  getCurrentUser();

},[])

        const [form, setForm] = useState<any>({
            
            slug:"",
            email:"",
            password:"",
            creci:"",
          
        })
        
        const cleanForm = () =>{

            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
              
            setForm({ ...form,
                slug:"",
                email:"",
                password:"",
                creci:"",
                               
            });
            
           }

        const [emptyValue,setEmptyValue]= useState(false);

            const handleChange = (e:any) =>{
              
                const field= e.target.getAttribute('name');
                const value= e.target.value
                setForm({ ...form,
                    [field]:value,
                }); 
                              
            }

        
            const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{

                setErrors([])
                    
            }
           
          
            const handleSubmit = async (e:any) => {
                e.preventDefault();

        
                let emptyValues=Object.values(form).some(obj => obj === '');
                setEmptyValue(emptyValues);

                      
              
                let slug: any;            
                for (var prop in form) { if(prop === 'slug'){slug=form[prop]; } }
                                 
                let lastName: any;            
                for (var prop2 in form) {if(prop2 === 'lastName'){ lastName=form[prop2];  }}

                let email: any;            
                for (var prop3 in form) {if(prop3 === 'email'){ email=form[prop3];  }}

                let password: any;            
                for (var prop1 in form) {if(prop1 === 'password'){ password=form[prop1];  }}

                let creci: any;            
                for (var prop4 in form) {if(prop4 === 'creci'){ creci=form[prop4];  }}

                let signedDays: any;            
                for (var prop5 in form) {if(prop5 === 'signedDays'){ signedDays=form[prop5];  }}

   
                if(!emptyValues){
                    setLoadingTenant(true)

                                      
                const data = await newUserTenant(slug,email,password,creci)
                console.log(data.response)
                    
                if(data.status === 201){
                    cleanForm()
                    
                    setSuccessMessage(true)
                    setLoadingTenant(false)
        
                                  
                  }
                    if(data.response.data.errors){ 
                                   
                        setErrors(data.response.data.errors);
                        setSuccessMessage(false)
                        setLoadingTenant(false)
                                                                                       
                    }  
                    else if(data.response.status === 404 || data.response.status === 400 || data.response.status === 403){
                       
                        setOtherError(true)
                        setSuccessMessage(false)
                        setLoadingTenant(false)

                        setTimeout(()=>{
                            setOtherError(false)
                        },2000)
                    }
         
                             
        }                     
      }

      let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');
      let perfilAdmin=Object.values(user.perfis).some(obj => obj === 'ADMIN');
      let perfilAccount=Object.values(user.perfis).some(obj => obj === 'ACCOUNT');
 
            
    return(
         
     <>
     {perfilAccount ?
        <div>
       
  
       <RegistrationBackground>
        <Header />
        <BarTop />
        <BodyRegistrationContainer>
            <h1 className='title-registration'>Cadastrar Usuário</h1>
          

            <form onSubmit={(e)=> {handleSubmit(e)}}>
            <FormContainer>

                
                <label>Nome usuario*</label>
                <Input id="slug" name="slug"  onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={35} />
                {errors.map(x => { if(x.fieldName === 'slug') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['slug'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}


                <label>Email</label>
                <Input id="email" name="email" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={45}/>
                {errors.map(x => { if(x.fieldName === 'email') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['email'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Senha*</label>
                <Input id="password" name="password"   onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={20}/>
                {errors.map(x => { if(x.fieldName === 'password') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['password'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
              
                <label>creci</label>
                <Input id="creci" name="creci"   onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={15}/>
                {errors.map(x => { if(x.fieldName === 'creci') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['creci'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

           
      
                <div className='buttom-register-wrapper'>
                { otherError &&   
                <div className='other-error-tenant'>Tente mais tarde</div>
                 }
                {
                        loadingTenant && <Button className="button-send-email" type='submit'><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit'>Adicionar</Button>
                    }
                </div>
                <div className="messageTenant">
                    {successMessage   ? <span className='success'>Cadastrado com sucesso!</span>: ''}
            </div>
            </FormContainer>
            </form>
           
        </BodyRegistrationContainer>
       </RegistrationBackground>
    
       </div>
           :<PageNotFound/>} 
       </> 
    )
}

export default UserRegistration;


