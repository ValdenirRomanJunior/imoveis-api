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



type Error = {
    fieldName:string;
    message:string;
}



const Registration = () =>{
    
    const [errors, setErrors] = useState<Error[]>([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loadingTenant, setLoadingTenant]=useState(false);
    const navigate = useNavigate();
   

        const [form, setForm] = useState<any>({
            
            slug:"",
            lastName:"",
            email:"",
            password:""
         
    
        })
        const cleanForm = () =>{

            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
              
            setForm({ ...form,
                slug:"",
                lastName:"",
                email:"",
                password:""
                
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
           
            const handleSubmit = async (e:any) =>{
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

   
                if(!emptyValues){
                    setLoadingTenant(true)

                    setTimeout(async() =>{
                    
                const data = await newTenant(slug, lastName,email,password)
                
                    
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
            },2000)  
                             
        }                     
      }

      
      const refreshTokenUser = async ()=>{
          const  resp = await refreshToken();    
          if(resp === 204){  
            navigate('/registrationTenant')
          }else{
              navigate('/')
          }
      }
  
    useEffect( () =>  {
    refreshTokenUser()
  },[])
            
    return(
       <RegistrationBackground>
        <Header />
        <BarTop />
        <BodyRegistrationContainer>
            <h1 className='title-registration'>Cadastrar Imobiliária</h1>
            <div className="message">
                    {successMessage   ? <span className='success'>Cadastrado com sucesso!</span>: ''}
                    </div>

            <form onSubmit={(e)=> {handleSubmit(e)}}>
            <FormContainer>

                <label>Nome*</label>
                <Input id="slug" name="slug" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={25} />          
                {errors.map(x => { if(x.fieldName === 'slug') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['slug'] === '' ? <span className='formField__error'>Este campo é r'equerido</span>: ''}

                <label>Sobrenome*</label>
                <Input id="lastName" name="lastName"  onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={35} />
                {errors.map(x => { if(x.fieldName === 'lastName') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['lastName'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Email</label>
                <Input id="email" name="email" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={30}/>
                {errors.map(x => { if(x.fieldName === 'email') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['email'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Senha*</label>
                <Input id="password" name="password"   onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp} maxLength={20}/>
                {errors.map(x => { if(x.fieldName === 'password') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['password'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
              

            
       
                <div className='buttom-register-wrapper'>
                {
                        loadingTenant && <Button className="button-send-email" type='submit'><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit'>Adicionar</Button>
                    }
                </div>
            </FormContainer>
            </form>
           
        </BodyRegistrationContainer>
       </RegistrationBackground>
            
        
    )
}

export default Registration;


