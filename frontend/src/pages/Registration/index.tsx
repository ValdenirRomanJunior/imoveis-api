/* eslint-disable no-loop-func */
import {  useEffect, useRef, useState } from 'react';
import BarTop from '../../components/Bartop';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {RegistrationBackground,BodyRegistrationContainer, FormContainer} from './styles';
import UploadImages from './UploadImages';
import {getCaracteristicas, getDistricts, newProperty} from '../../services/resources/property';
import {ImageItem} from '../../types/Images'
import api from '../../utils/requests';
import { Link, useNavigate } from 'react-router-dom';
import {number, currency, cep} from './masks';
import { refreshToken } from '../../services/resources/user';
import Loading from '../../components/Loading';
import LoadingLogin from '../../components/LoadingLogin';
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

export type Feature= {
    id:number;
    name: string;
}

type Error = {
    fieldName:string;
    message:string;
}
type Bairro = {
    id:number;
    name:string;
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
type BRASILABERTOResponse = {
    
        meta: {
          currentPage: number,
          itemsPerPage: number,
          totalOfItems: number,
          totalOfPages: number
        },
        result:  Bairro[];
      }




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
    const [fileBase64Images,setFileBase64Images]=useState<String[]>();
   
 

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

    //features do backend
    const [isDropdownVisibleFeatures,setIsDropDownVisibleFeatures]=useState(false)
    const [selectedFeatures,setSelectedFeatures]= useState<Feature[]>([])
    const [features,setFeatures]= useState<Feature[]>([]);
    const getCaracteristicasFeatures = async () => {
       const data = await getCaracteristicas() as Feature[];
        setFeatures(data)
             

    }
       
    useEffect( () =>  {
    getCaracteristicasFeatures()
    },[])
   


        const getImagesUrls = (fileBase64:string[]) => {            
            setFileBase64Images(fileBase64);
            console.log(fileBase64)
                                        
        }
     
        const [isVisibleDistricts,setIsVisibleDistricts]= useState(false);
        
        const handleChangeVisibilityDistricts = () =>{
            setIsVisibleDistricts(isVisibleDistricts=>!isVisibleDistricts)
        }
        const [bairrosCadastrados,setBairrosCadastrados]= useState<string[]>([]);
      const getBairrosCadastrados= async()=> {
        const data = await getDistricts();
     
        setBairrosCadastrados(data.data)
        
    }

    useEffect( () =>  {
        getBairrosCadastrados()
        },[])

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
            suites:"",
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
            cep:"",
            areaTotal:""


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
            cep:"",
            areaTotal:""
                
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

            const changeCity = () => {
                if(form['uf']===''){
                    setForm({ ...form,
                        'city':'',
                    });
                 }

                 let trueCity=Object.values(cities).some(obj => obj.nome === form['city']);
                 if(trueCity===false){
                    setForm({ ...form,
                        'city':'',
                    });
                 }

            }

       

               
            const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{

                if(e.currentTarget.name  === 'suites'){
                    number(e)
                }
                if(e.currentTarget.name  === 'vacancies'){
                    number(e)
                }
                if(e.currentTarget.name  === 'bathRooms'){
                    number(e)
                }
                if(e.currentTarget.name  === 'numberRooms'){
                    number(e)
                }
                
                if(e.currentTarget.name  === 'number'){
                    number(e)
                }
                if(e.currentTarget.name  === 'area'){
                    number(e)
                }
          
                if(e.currentTarget.name  === 'areaTotal'){                  
                    number(e);
                    setForm({ ...form,     
                        areaTotal:e.currentTarget.value
                                   
                        });
       
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
                if(e.currentTarget.name === 'price'){
                    currency(e);
                  }
                setErrors([])
                    
            }
           
            const [fileSize,setFileSize]=useState(false);
            
            const handleSubmit = async (e:any) => {
              e.preventDefault();
              if(fileBase64Images?.length as any >15){
                setFileSize(true);
              }
            
        
                let emptyValues=Object.values(form).some(obj => obj === '');
                setEmptyValue(emptyValues);
                
                                
                if(!emptyValues && fileBase64Images?.length as any <16) {
                    setLoadingTenant(true)
                 
                             
                const data = await newProperty(form['name'],form['description'],selectedItemIndex as any,form['goal'] , form['numberRooms'], form['suites'],form['bathRooms'],form['area'],form['areaTotal'], form['iptu'],form['vacancies'],form['condominium'],                                      
                form['price'],form['uf'],form['city'],form['street'],form['number'],form['district'],form['cep'], fileBase64Images as string[],selectedFeatures,selectedRadioBtn,selectedRadioBtnPermuta)
                 
                
                if(data.status === 201){
                    setFileSize(false)
                    setSelectedItemIndex(null)
                    setSelectedFeatures([])
                    setCleanImagesForm(true);
                    cleanForm()                    
                    setSuccessMessage(true)
                    setLoadingTenant(false)
                    getBairrosCadastrados()

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
                    else if(data.response.status === 404 || data.response.status === 403 || data.response.status === 400){
                   
                        setOtherError(true)
                        setSuccessMessage(false)
                        setLoadingTenant(false)
                       
                        setTimeout(()=>{
                            setOtherError(false)
                        },2000)
                    }
          
             
         } 
                        
     }

     const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
      
      useEffect(() =>{
            
        getCurrentUser();
       
    
    },[])
             

    const [isDropdownVisible,setIsDropDownVisible]=useState(false)
    const [itemsList,setItemsList]= useState([
     
        {
            type:"Casa",
            value:"1"
        },
        {
            type:"Apartamento",
            value:"2"
        },
        {
            type:"Terreno",
            value:"3"
        },
        {
            type:"Casa Comercial",
            value:"4"
        },
        {
            type:"Casa de Condomínio",
            value:"5"
        },
    
        {
            type:"Flat",
            value:"6"
        },
        {
            type:"Chácara",
            value:"7"
        },
        {
            type:"Sítio",
            value:"8"
        },
        {
            type:"Fazenda",
            value:"9"
        },
        {
            type:"Galpão/Barracão",
            value:"10"
        },
        {
            type:"Pousada",
            value:"11"
        },
        {
            type:"Studio",
            value:"12"
        },
        {
            type:"Sala Comercial",
            value:"13"
        },
        {
            type:"Sobrado",
            value:"14"
        },
        {
            type:"Lançamento",
            value:"15"
        }
    ])
    //selected index typeProperty
        const [selectedItemIndex,setSelectedItemIndex]=useState(null);
        const ref = useRef<HTMLDivElement>(null);
      
  
        useEffect(() => {
            document.addEventListener("click", handleClickOutside, false);
            return () => {
              document.removeEventListener("click", handleClickOutside, false);
            };
          }, []);
        
          const handleClickOutside = (event:any) => {
            if (ref.current && !ref.current.contains(event.target)) {
              setIsDropDownVisible(false)
                              
            }
          };

          const cleanIndexType = ()=>{
            setSelectedItemIndex(null)
            setForm({ ...form,
                'typeProperty':'',
            });      
          }

          const cleanIndexTypeFeatures = (id:number)=>{
            const fileListArr = Array.from(selectedFeatures);
            setSelectedFeatures(fileListArr.filter((_, i) => i !== id));
           
          }
     
       
          //useref features
          const refFeatures = useRef<HTMLDivElement>(null);
      
  
          useEffect(() => {
              document.addEventListener("click", handleClickOutsideFeatures, false);
              return () => {
                document.removeEventListener("click", handleClickOutsideFeatures, false);
              };
            }, []);
          
            const handleClickOutsideFeatures = (event:any) => {
              if (refFeatures.current && !refFeatures.current.contains(event.target)) {
                setIsDropDownVisibleFeatures(false)
                                       
              }
            };

            const [selectedRadioBtn, setSelectedRadioBtn]= useState('nao')
           const isRadioSelected = (value:string): boolean=> selectedRadioBtn=== value ;

            const handleRadioClick = (e:React.ChangeEvent<HTMLInputElement>): void=> setSelectedRadioBtn(e.currentTarget.value)

            const [selectedRadioBtnPermuta, setSelectedRadioBtnPermuta]= useState('nao')
            const isRadioSelectedPermuta = (value:string): boolean=> selectedRadioBtnPermuta=== value ;
 
             const handleRadioClickPermuta = (e:React.ChangeEvent<HTMLInputElement>): void=> setSelectedRadioBtnPermuta(e.currentTarget.value)
            
             let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');



                    //useref bairros
          const refBairros = useRef<HTMLDivElement>(null);
      
  
          useEffect(() => {
              document.addEventListener("click", handleClickOutsideBairros, false);
              return () => {
                document.removeEventListener("click", handleClickOutsideBairros, false);
              };
            }, []);
          
            const handleClickOutsideBairros = (event:any) => {
              if (refBairros.current && !refBairros.current.contains(event.target)) {
                setIsVisibleDistricts(false)
                                       
              }
            };

    return(
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
       
 
       {perfilTenant? 
       <RegistrationBackground>
        <Header />
        <BarTop />
        <BodyRegistrationContainer>
            <h1 className='title-registration'>Cadastrar imóvel</h1>

        
            <form onSubmit={(e)=> {handleSubmit(e)}}   encType="multipart/form-data" >
            <FormContainer>

                <label>Título*</label>
                <Input id="name" name="name" onChange={(e) => handleChange(e)} maxLength={80} onKeyUp={handleKeyUp}/>              
                {errors.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['name'] === '' ? <span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Descrição*</label>
                <textarea id="description" name="description" rows={4}  onChange={(e) => handleChange(e)} maxLength={350}></textarea>
                {errors.map(x => { if(x.fieldName === 'description') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['description'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Finalidade*</label>
                    <select  name='goal'  id='goal' value={form['goal']}  placeholder='selecione'  onChange={(e) => handleChange(e)} >
                    <option value='' >Selecione</option>
                    <option key='1' value='1'>Alugar</option>
                    <option key='2' value='2'>Vender</option>
                    <option key='3' value='3'>Vender/Alugar</option>    
                                
                </select>
                {errors.map(x => { if(x.fieldName === 'goal') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['goal'] === '' ?<span className='formField__error_reg'>Selecione uma Finalidade</span>: ''}
                
            
                <label>Tipo*</label>
                <div className="custom-dropdown" ref={ref}>
                    <div className="custom-dropdown-selection" onClick={e=> {
                        setIsDropDownVisible(!isDropdownVisible);
                    }}>
                        {selectedItemIndex !== null ? itemsList[selectedItemIndex].type :" Tipo"}
                        {selectedItemIndex !== null && <IoCloseOutline  onClick={cleanIndexType} className="icon-clean-type"/> }

                        <IoIosArrowDown className="arrow-type" />
                    </div>
                    {isDropdownVisible ? 
                    <div className="items-holder">
                        {
                            itemsList.map((item,index) => (
                                <div key={item.value} className="dropdown-item" onClick={e => {
                                    setSelectedItemIndex(index as any)
                                    setIsDropDownVisible(false)
                                    setForm({ ...form,
                                        'typeProperty':item.value,
                                    });
                                    }}>
                                    {item.type}
                                                               
                                </div>
                            ))
                        }
                    </div>: <></>}
                 
                </div> 

                {errors.map(x => { if(x.fieldName === 'typeProperty') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['typeProperty'] === '' ?<span className='formField__error_reg'>Selecione um Tipo</span>: ''}

                        
                <label>Financiavel*</label>
                <div className='financeable-background'>
                <div className='financeable-container'>
                    <div className='financeable-wrapper'>
                    <label className='financeable-item-label'>Não</label>
                    <input 
                    type='radio'
                    name='radio-financeable'
                    value="nao"
                    checked={isRadioSelected('nao')}
                    onChange={handleRadioClick}
                     />
                </div>
                <div className='financeable-wrapper'>
                    <label className='financeable-item-label'>Sim</label>
                    <input 
                    type='radio'
                    name='radio-financeable'
                    value="sim"
                    checked={isRadioSelected('sim')}
                    onChange={handleRadioClick}
                     />
            </div>
                </div>
                </div>        
                <label>Quartos*</label>
                <Input type='text'  name='numberRooms' id='numberRooms' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'numberRooms') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['numberRooms'] === '' ?<span className='formField__error_reg'>Selecione o número de Quartos</span>: ''}
                
                <label>Suites*</label>
                <Input type='text'  name='suites' id='suites' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'suites') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['suites'] === '' ?<span className='formField__error_reg'>Selecione o número de Suites</span>: ''}

                <label>Banheiros*</label>
                <Input type='text'  name='bathRooms' id='bathRooms' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
              
                 {errors.map(x => { if(x.fieldName === 'bathRooms') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['bathRooms'] === '' ? <span className='formField__error_reg'>Selecione o número de Banheiros</span>: ''}
               
                <label>Área(m2)*</label>
                <Input id="area" name="area" placeholder='Digite apenas números' onBlur={(e) => handleChange(e)} maxLength={6} onKeyUp={handleKeyUp}/>
                { emptyValue && form['area'] === '' ?<span className='formField__error_reg'>Preencha o total da Área interna</span>: ''}

                <label>Área total(m2)*</label>
                <Input id="areaTotal" name="areaTotal"  placeholder='Digite apenas números' onBlur={(e) => handleChange(e)} maxLength={6} onKeyUp={handleKeyUp}/>
                {errors.map(x => { if(x.fieldName === 'areaTotal') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['areaTotal'] === '' ?<span className='formField__error_reg'>Preencha o total da Área externa</span>: ''}

                <label>Vagas*</label>
                <Input type='text'  name='vacancies' id='vacancies' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'vacancies') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['vacancies'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Comodidades*</label>
                <div className="custom-dropdown-feature" ref={refFeatures}>
                    <div className="custom-dropdown-selection-feature" onClick={e=> {setIsDropDownVisibleFeatures(!isDropdownVisibleFeatures); }}>
                        {!isDropdownVisibleFeatures && selectedFeatures.length===0 && "Selecione"}         
                        { selectedFeatures.map((item,index) => (<span className='item-selected-dropdown-feature'>{item.name}<IoCloseOutline  onClick={()=>cleanIndexTypeFeatures(index)} className="icon-clean-type-feature"/></span>))}
                                    
                        <IoIosArrowDown className="arrow-type-feature" />
                    </div>
                    {isDropdownVisibleFeatures ? 
                    <div className="items-holder-feature">
                        {
                            
                            features && features.map((item,index) => (
                                <div key={item.id} className="dropdown-item-feature" onClick={e => {
                                 
                                    setSelectedFeatures([...selectedFeatures,item])
                                    setIsDropDownVisibleFeatures(false)                               
                                    }}>
                                    {item.name}
                                                               
                                </div>
                            ))
                        }
                    </div>: <></>}
                 
                </div> 

                      

                <label>IPTU(R$)*</label>
                <Input id="iptu" name="iptu" maxLength={14} onKeyUp={handleKeyUp} onBlur={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'iptu') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['iptu'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Condomínio(R$)*</label>
                <Input  id="condominium" name="condominium" maxLength={14} onKeyUp={handleKeyUp} onBlur={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'condominium') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['condominium'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label className='label-permuta'>Permuta*</label>
                <div className='permuta-background'>
                <div className='permuta-container'>
                    <div className='permuta-wrapper'>
                    <label className='permuta-item-label'>Não</label>
                    <input 
                    type='radio'
                    name='radio-permuta'
                    value="nao"
                    checked={isRadioSelectedPermuta('nao')}
                    onChange={handleRadioClickPermuta}
                     />
                </div>
                <div className='permuta-wrapper'>
                    <label className='permuta-item-label'>Sim</label>
                    <input 
                    type='radio'
                    name='radio-permuta'
                    value="sim"
                    checked={isRadioSelectedPermuta('sim')}
                    onChange={handleRadioClickPermuta}
                     />
            </div>
                </div>
                </div>   
               
                <label>Preço(R$)*</label>
                <Input type='text' id='price' name='price' maxLength={14} onKeyUp={handleKeyUp} onBlur={(e) => handleChange(e)}/>  
                {errors.map(x => { if(x.fieldName === 'price') return  <p className=' formField__error_reg'>{x.message}</p>})}  
                { emptyValue && form['price'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
               
             
                 <label>Estado*</label>
                <select placeholder='selecione' name='uf'  id='uf' onBlur={changeCity}  onChange={(e) => handleChange(e)} > 
                <option value='' >Selecione</option>
                  
                 { ufs.map((uf) => (
                    <option  key={uf.id} value={uf.sigla}>{uf.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'uf') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['uf'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Cidade*</label>
                <select placeholder='selecione'  name='city'  id='city'   onChange={(e) => handleChange(e)}>
                    <option value='' >Selecione a Cidade</option>
                 { cities.map((city) => (
                    <option key={city.id} value={city.nome}>{city.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'city') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['city'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Bairro*</label>
                <div ref={refBairros}>
                <Input  name='district'  id='district' value={form['district']}  placeholder='selecione ou adicione um novo bairro' onClick={handleChangeVisibilityDistricts} onChange={(e) => handleChange(e)} />
                {errors.map(x => { if(x.fieldName === 'district') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['district'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
                {isVisibleDistricts &&
                <div className='bairros-cadastrados-wrapper' >
                    <ul className='ul-list-bairros-cadastrados'>
                        {bairrosCadastrados && bairrosCadastrados.map(item => (
                            <i className='li-bairro-cadastrado' id='district' style={{cursor:'pointer'}} onClick={(e) => {
                                setIsVisibleDistricts(false)
                                setForm({ ...form,
                                    'district':item,
                                });
                            }}>{item}</i>
                        ))}
                        
                    </ul>
                </div>
                         } 
                         </div>
                <label>Rua*</label>
                <Input   name='street'  id='street' onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'street') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['street'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
                
                <label>Número*</label>
                <div className='number-wrapper'>
                <Input type='text'  name='number' id='number' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                </div>
                {errors.map(x => { if(x.fieldName === 'number') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['number'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}

                <label>Cep*</label>
                <Input  name='cep'  id='cep' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/> 
                {errors.map(x => { if(x.fieldName === 'cep') return  <p className=' formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['cep'] === '' ?<span className='formField__error_reg'>Este campo é requerido</span>: ''}
                {fileSize &&
                   <p style={{color:'red',fontSize:'14px'}}>É permitido no máximo 15 imagens</p>
                   }
                <UploadImages handleResult={getImagesUrls} cleanImages={cleanImagesForm}/>
                 
                <div className='buttom-register-wrapper'>
                
                  {
                        loadingTenant && <Button className="button-send-email" onClick={(e)=> e.preventDefault()}><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit' >Adicionar</Button>
                    }
                </div>
                <div className="message-registration">
                    {successMessage   ? <span className='success'>Cadastrado com sucesso! <Link to="/properties" className='new-property-link'>Ver Imóveis</Link></span>: ''}
                    </div>
                    { otherError &&   
                <div className='other-error'>Erro Inesperado</div>
                 }
            </FormContainer>
            </form>
        </BodyRegistrationContainer>
       </RegistrationBackground>
       : <PageNotFound/>}
    
       </div>
            
       </ErrorBoundary>
    )
}

export default Registration;


