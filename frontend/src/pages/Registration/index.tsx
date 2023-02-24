/* eslint-disable no-loop-func */
import {  useEffect, useState } from 'react';
import BarTop from '../../components/Bartop';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {RegistrationBackground,BodyRegistrationContainer, FormContainer} from './styles';
import UploadImages from './UploadImages';
import {newProperty} from '../../services/resources/property';
import {ImageItem} from '../../types/Images'
import api from '../../utils/requests';
import { Link, useNavigate } from 'react-router-dom';
import {number, currency, cep} from './masks';
import { refreshToken } from '../../services/resources/user';
import Loading from '../../components/Loading';
import LoadingLogin from '../../components/LoadingLogin';


type Error = {
    fieldName:string;
    message:string;
}

type IBGEUFResponse = {
    id:number;
    sigla:string;
    nome:string;
};

type IBGECYTYResponse = {
    id: number;
    nome: string;
};


const Registration = () =>{
    
    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const navigate = useNavigate();
    const [ufs, setUfs]= useState<IBGEUFResponse[]>([]);
    const [cities, setCities]= useState<IBGECYTYResponse[]>([]);
    const [state, setState]=useState(); 
    const [images, setImages] = useState<ImageItem[]>([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loadingTenant, setLoadingTenant]=useState(false);
    const [cleanImagesForm,setCleanImagesForm] = useState(false);
   
    const [loadingLogin,setLoadingLogin]= useState(true);

    useEffect(() =>{
       
        setTimeout(() =>{
            setLoadingLogin(false)
        },1500)

    },[])
    
            const refreshTokenUser = async ()=>{
                const  resp = await refreshToken();    
                if(resp === 204){  
                  navigate('/registration')
                }else{
                    navigate('/')
                }
            }
        
          useEffect( () =>  {
          refreshTokenUser()
        },[])
      
     const getImagesUrls = (data:ImageItem[]) => {      
         setImages(data);
         console.log(data)
                                     
    }

    
    useEffect(() => {
        api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
        .then(
            (response) => {
                setUfs(response.data);
               
            });
    }, []);


    useEffect(() => {
        api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
        .then(
            (response) => {
                setCities(response.data)
               
            }
        )
    }, [state]);
    

        const [form, setForm] = useState<any>({
            
            name:"",
            description:"",
            typeProperty:"",
            goal:"",
            numberRooms:"",
            bathRooms:"",
            area:"",
            iptu:"",
            vacancies:"",
            condominium:"",
            price:"",
            uf:"",
            city:"",
            district:"",
            street:"",
            number:"",
            cep:""


        })

        const cleanForm = () =>{

            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
              Array.from(document.querySelectorAll("textarea")).forEach(
                textarea => (textarea.value = "")
              );

              
              Array.from(document.querySelectorAll("select")).forEach(
                select => (select.value = "")
              );
              
            setForm({ ...form,
                name:"",
            description:"",
            typeProperty:"",
            goal:"",
            numberRooms:"",
            bathRooms:"",
            area:"",
            iptu:"",
            vacancies:"",
            condominium:"",
            price:"",
            uf:"",
            city:"",
            district:"",
            street:"",
            number:"",
            cep:""
                
            });
            setCleanImagesForm(true);
           }

         
           

        const [emptyValue,setEmptyValue]= useState(false);

            const handleChange = (e:any) =>{
              
                const field= e.target.getAttribute('name');
                const value= e.target.value
                setForm({ ...form,
                    [field]:value,
                }); 
             

                  
                if(e.target.name === "uf"){
                    setState(e.target.value);
                }

                        
            }

    

            const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{

                
                if(e.currentTarget.name  === 'number'){
                    number(e)
                }
                if(e.currentTarget.name  === 'area'){
                    number(e)
                }
                if(e.currentTarget.name === 'price'){
                    currency(e);
                }
                if(e.currentTarget.name === 'cep'){
                    cep(e);
                }
                if(e.currentTarget.name === 'condominium'){
                    currency(e);
                }
                if(e.currentTarget.name === 'iptu'){
                    currency(e);
                }
                setErrors([])
                    
            }
           
            const handleSubmit = async (e:any) => {
              e.preventDefault();

        
                let emptyValues=Object.values(form).some(obj => obj === '');
                setEmptyValue(emptyValues);
                
              
              
                let name: any;            
                for (var prop in form) { if(prop === 'name'){name=form[prop]; } }
                        
                let description: any;            
                for (var prop1 in form) {if(prop1 === 'description'){ description=form[prop1];  }}

                let typeProperty:any;      
                for (var prop2 in form) {if(prop2 === 'typeProperty'){ typeProperty=form[prop2];}}

                let goal:any;            
                for (var prop3 in form) {if(prop3 === 'goal'){ goal=form[prop3];}}

                let numberRooms: any;            
                for (var prop4 in form) {if(prop4 === 'numberRooms'){ numberRooms=form[prop4];}}

                let bathRooms: any;            
                for (var prop5 in form) {if(prop5 === 'bathRooms'){ bathRooms=form[prop5];}}

                let area: any;            
                for (var prop6 in form) {if(prop6 === 'area'){ area=form[prop6];}}

                let iptu: any;            
                for (var prop7 in form) {if(prop7 === 'iptu'){ iptu=form[prop7];}}

                let vacancies: any;            
                for (var prop8 in form) {if(prop8 === 'vacancies'){ vacancies=form[prop8];}}

                let condominium: any;            
                for (var prop9 in form) {if(prop9 === 'condominium'){ condominium=form[prop9];}}

                let price: any;            
                for (var prop10 in form) {if(prop10 === 'price'){ price=form[prop10];}}
              

                let state: any; 
                for (var prop11 in form) {if(prop11 === 'uf'){ state=form[prop11];}  }
              
    
                let city: any;            
                for (var prop12 in form) {if(prop12 === 'city'){ city=form[prop12];}}

                let district: any;            
                for (var prop13 in form) {if(prop13 === 'district'){ district=form[prop13];}}

                let street: any;            
                for (var prop14 in form) {if(prop14 === 'street'){ street=form[prop14];}}

                let number: any;            
                for (var prop15 in form) {if(prop15 === 'number'){ number=form[prop15];}}

                let cep: any;            
                for (var prop16 in form) {if(prop16 === 'cep'){ cep=form[prop16];}}
                    
                if(!emptyValues){

                    setLoadingTenant(true)
                    setTimeout(async() =>{
                    
                const data = await newProperty(name, description, goal, typeProperty, numberRooms, bathRooms,area, iptu,vacancies,condominium,                                      
                price, state, city, district, street, number, cep, images)
                 
                if(data.status === 201){
                    setCleanImagesForm(true);
                    cleanForm()                    
                    setSuccessMessage(true)
                    setLoadingTenant(false)

                    setTimeout(()=>{
                        setSuccessMessage(false);
                        setCleanImagesForm(false);
                    },5000)
                                                                       
                  }
                    if(data.response.data.errors){                       
                        setErrors(data.response.data.errors);
                        setSuccessMessage(false)
                        setLoadingTenant(false)
                                                                                       
                    }  
                    else if(data.response.status === 404){
                        console.log(data.response.status)
                        setOtherError(true)
                        setSuccessMessage(false)
                        setLoadingTenant(false)

                        setTimeout(()=>{
                            setOtherError(false)
                        },2000)
                    }
            },2000) 
             
         } 
                        
     }

   
                
    return(
        <div>
        { loadingLogin &&  <LoadingLogin/> }
   { !loadingLogin ?  
       <RegistrationBackground>
        <Header />
        <BarTop />
        <BodyRegistrationContainer>
            <h1 className='title-registration'>Cadastrar imóvel</h1>

        
            <form onSubmit={(e)=> {handleSubmit(e)}}>
            <FormContainer>

                <label>Título*</label>
                <Input id="name" name="name" onChange={(e) => handleChange(e)} maxLength={80} onKeyUp={handleKeyUp}/>              
                {errors.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['name'] === '' ? <span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Descrição*</label>
                <textarea id="description" name="description" rows={4}  onChange={(e) => handleChange(e)} maxLength={250}></textarea>
                {errors.map(x => { if(x.fieldName === 'description') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['description'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Finalidade</label>
                    <select  name='goal'  id='goal' value={form['goal']}  placeholder='selecione'  onChange={(e) => handleChange(e)} >
                    <option value='' >Selecione</option>
                    <option key='1' value='1'>Vender</option>
                    <option key='2' value='2'>Alugar</option>               
                </select>
                {errors.map(x => { if(x.fieldName === 'goal') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['goal'] === '' ?<span className='formField__error_reg'>Selecione uma Finalidade</span>: ''}
                
            
                <label>Tipo*</label>
                <select  name='typeProperty' placeholder='selecione' id='typeProperty'   onChange={(e) => handleChange(e)} >
                    <option value=''  >Selecione</option>
                    <option key='1' value='1'>Casa</option>
                    <option  key='2' value='2'>Apartamento</option>
                    <option  key='3' value='3'>Terreno</option>
                    <option  key='4' value='4'>Comercial</option>
                </select>
                {errors.map(x => { if(x.fieldName === 'typeProperty') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['typeProperty'] === '' ?<span className='formField__error_reg'>Selecione um Tipo</span>: ''}

          
                <label>Quartos*</label>
                <select name='numberRooms'  placeholder='selecione' id='numberRooms'  onChange={(e) => handleChange(e)}>
                <option value=''  >Selecione</option>
                    <option key='0' value='0'>0</option>
                    <option key='1' value='1'>1</option>
                    <option key='2' value='2'>2</option>
                    <option key='3' value='3'>3</option>
                    <option key='4' value='4 ou mais'>4 ou mais</option>
                </select>
                {errors.map(x => { if(x.fieldName === 'numberRooms') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['numberRooms'] === '' ?<span className='formField__error_reg'>Selecione o número de Quartos</span>: ''}
                

                <label>Banheiros*</label>
                <select  id="bathRooms" name="bathRooms"  placeholder='selecione' onChange={(e) => handleChange(e)}>
                    <option value=''  >Selecione</option>
                    <option key='0' value='0'>0</option>
                    <option key='1' value='1'>1</option>
                    <option key='2' value='2'>2</option>
                    <option key='3' value='3'>3</option>
                    <option key='4' value='4 ou mais'>4 ou mais</option>
                </select>
                 {errors.map(x => { if(x.fieldName === 'bathRooms') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['bathRooms'] === '' ? <span className='formField__error_reg'>Selecione o número de Banheiros</span>: ''}
               
                <label>Área(m2)*</label>
                <Input id="area" name="area" onChange={(e) => handleChange(e)} maxLength={11} onKeyUp={handleKeyUp}/>
                { emptyValue && form['area'] === '' ?<span className='formField__error_reg'>Preencha o total da Área interna</span>: ''}

                <label>Vagas</label>
                <select id="vacancies" name="vacancies"  placeholder='selecione' onChange={(e) => handleChange(e)}>
                <option value=''  >Selecione</option>
                    <option key='0' value='0'>0</option>
                    <option key='1' value='1'>1</option>
                    <option key='2' value='2'>2</option>
                    <option key='3' value='3'>3</option>
                    <option key='4' value='4 ou mais'>4 ou mais</option>
                </select>
                {errors.map(x => { if(x.fieldName === 'vacancies') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['vacancies'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>IPTU(R$)</label>
                <Input id="iptu" name="iptu" maxLength={14} onKeyUp={handleKeyUp} onBlur={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'iptu') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['iptu'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Condomínio(R$)</label>
                <Input  id="condominium" name="condominium" maxLength={14} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'condominium') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['condominium'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

               
                <label>Preço(R$)</label>
                <Input type='text' id='price' name='price' maxLength={14} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>  
                {errors.map(x => { if(x.fieldName === 'price') return  <p className=' formField__error_reg'>{x.message}</p>})}  
                { emptyValue && form['price'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
               
             
                 <label>Estado</label>
                <select placeholder='selecione' name='uf'  id='uf'  onChange={(e) => handleChange(e)} > 
                <option value='' >Selecione</option>
                  
                 { ufs.map((uf) => (
                    <option  key={uf.id} value={uf.sigla}>{uf.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'uf') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['uf'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Cidade</label>
                <select placeholder='selecione'  name='city'  id='city'  onChange={(e) => handleChange(e)}>
                    <option value='' >Selecione a Cidade</option>
                 { cities.map((city) => (
                    <option key={city.id} value={city.nome}>{city.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'city') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['city'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Bairro</label>
                <Input  name='district'  id='district'  onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'district') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['district'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Rua</label>
                <Input   name='street'  id='street' onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'street') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['street'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
                
                <label>Número</label>
                <div className='number-wrapper'>
                <Input type='text'  name='number' id='number' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                </div>
                {errors.map(x => { if(x.fieldName === 'number') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['number'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Cep</label>
                <Input  name='cep'  id='cep' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/> 
                {errors.map(x => { if(x.fieldName === 'cep') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['cep'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
                     
                <UploadImages handleResult={getImagesUrls} cleanImages={cleanImagesForm}/>
                <div className="message-registration">
                    {successMessage   ? <span className='success'>Cadastrado com sucesso! <Link to="/properties" className='new-property-link'>Ver Imóveis</Link></span>: ''}
                    </div>
                <div className='buttom-register-wrapper'>
                 { otherError &&   
                <div className='other-error'>Erro Inesperado</div>
                 }
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
       :''}
       </div>
            
        
    )
}

export default Registration;


