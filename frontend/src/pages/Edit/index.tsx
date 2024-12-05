/* eslint-disable no-loop-func */
import {  useEffect, useRef, useState } from 'react';
import BarTop from '../../components/Bartop';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {EditBackground,BodyEditContainer, FormContainer} from './styles';
import UploadImages from './UploadImages';
import {editProperty, findProperty, getCaracteristicas, getDistricts} from '../../services/resources/property';
import {ImageItem} from '../../types/Images'
import api from '../../utils/requests';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {number, currency, cep} from '../Registration/masks';

import { Property } from '../../types/property';
import { refreshToken } from '../../services/resources/user';
import Loading from '../../components/Loading';
import PageNotFound from '../../components/PageNotFound';
import LoadingLogin from '../../components/LoadingLogin';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { Feature } from '../Registration';


type Error = {
    fieldName:string;
    message:string;
}

type Props={
    propertyId:string;
}


type IBGEUFResponse = {
    id:number;
    sigla:string;
    nome:string;
};

type IBGECYTYResponse = {
    id: number;
    nome: string;
    microrregiao: {
        id: number
        nome: string;
        mesorregiao: {
            id: number;
            nome: string;
            UF: {
                id: number;
                sigla: string;
                nome: string;
                regiao: {
                    id: number;
                    sigla: string;
                    nome: string;
                }
            }
        }
    }
};

type Prop = {
    property: Property;
    blobs:Blob[];
}


const EditComponent = (property: Prop) =>{

    const params = useParams();
    
    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const navigate = useNavigate();
    const [ufs, setUfs]= useState<IBGEUFResponse[]>([]);
    const [cities, setCities]= useState<IBGECYTYResponse[]>([]);
    const [state, setState]=useState(); 
    const [imagesBase64, setImagesBase64] = useState<String[]>([]);
    const [imagesSelected, setImagesSelected] = useState<ImageItem[]>([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loadingTenant, setLoadingTenant]=useState(false);
    const [loadingWait, setLoadingWait]=useState(false);
    const [cleanImagesForm,setCleanImagesForm] = useState(false);
    const [deletedIds,setDeletedIds]=useState<any[]>([])
    
  
    
     const getImagesUrls = (fileBase64:string[],imagesSelected:ImageItem[], deleteIds:any[]) => { 
        console.log(fileBase64)
        console.log(imagesSelected) 
        setImagesSelected(imagesSelected as ImageItem[])
         setImagesBase64(fileBase64);
         setDeletedIds(deleteIds)
        
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


      //features do backend
      const [isDropdownVisibleFeatures,setIsDropDownVisibleFeatures]=useState(false)
      const [selectedFeatures,setSelectedFeatures]= useState<Feature[]>([])
      const [features,setFeatures]= useState<Feature[]>([]);
      const getCaracteristicasFeatures = async () => {
         const data = await getCaracteristicas() as Feature[];
          setFeatures(data)
          setSelectedFeatures(property.property.features)   
  
      }
         
      useEffect( () =>  {
      getCaracteristicasFeatures()
      },[])

      
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
    
    useEffect(() => {
        api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
        .then(
            (response) => {
                setUfs(response.data);
               
            });
    }, []);


    useEffect(() => {
        api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form['uf']}/municipios`)
        .then(
            (response) => {
                setCities(response.data)
        
            }
        )
    }, [state]);

        //verificar valores  goal
        const changeGoal = () => {
            if(property.property.goal === 'ALUGUEL'){
                return '1';
            }
            if(property.property.goal === 'VENDA'){
                return '2';
            }
            if(property.property.goal === 'VENDAEALUGUEL'){
                return '3';
            }
        }

                  
            const changeState = ()=>{
                for (const uf in ufs) {
                    if(ufs[uf].sigla ===property.property.address.city.state.name){
                        const aux=ufs[uf];
                        setState(aux as any)
                    }
                 }
            }
            useEffect(() => {
                changeState()
            }, []);
       
        const [form, setForm] = useState({
          
            name:property.property.name,
            description:property.property.description,
            typeProperty:property.property.typeProperty,
            goal:changeGoal(),
            numberRooms:property.property.numberRooms,
            suites:property.property.suites,
            bathRooms:property.property.bathRooms,
            area:property.property.area,
            iptu:property.property.iptu,
            vacancies:property.property.vacancies,
            condominium:property.property.condominium,
            price:property.property.price,
            uf:property.property.address.city.state.name,
            city:property.property.address.city.name,
            district:property.property.address.district,
            street:property.property.address.street,
            number:property.property.address.number,
            cep:property.property.address.cep,
            areaTotal:property.property.areaTotal


});

       
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
    typeProperty:"1",
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
        
    });
    setCleanImagesForm(true);
   }
        

        const [emptyValue,setEmptyValue]= useState(false);

            const handleChange = (e:any ) =>{
                             
                let field= e.target.getAttribute('name');
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
                 //verificar se tem esta cidade neste estado
                 
             let trueCity=Object.values(cities).some(obj => obj.nome === form['city']);
                 if(trueCity===false){
                    setForm({ ...form,
                        'city':'',
                    });
                 }
               
            }
  
               
            const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) =>{

                if(e.currentTarget.name  === 'suites'){                  
                    number(e);
                    setForm({ ...form,     
                        suites:e.currentTarget.value
                                   
                        });     
                }

                if(e.currentTarget.name  === 'vacancies'){                  
                    number(e);
                    setForm({ ...form,     
                        vacancies:e.currentTarget.value
                                   
                        });     
                }
                if(e.currentTarget.name  === 'number'){                  
                    number(e);
                    setForm({ ...form,     
                        number:e.currentTarget.value
                                   
                        });     
                }

                if(e.currentTarget.name  === 'numberRooms'){                  
                    number(e);
                    setForm({ ...form,     
                        numberRooms:e.currentTarget.value
                                   
                        });     
                }

                if(e.currentTarget.name  === 'bathRooms'){                  
                    number(e);
                    setForm({ ...form,     
                        bathRooms:e.currentTarget.value
                                   
                        });     
                }

                if(e.currentTarget.name  === 'areaTotal'){                  
                    number(e);
                    setForm({ ...form,     
                        areaTotal:e.currentTarget.value
                                   
                        });
       
                }

                if(e.currentTarget.name  === 'area'){
                    number(e);
                    setForm({ ...form,     
                        area:e.currentTarget.value
                                   
                     });
                }
                if(e.currentTarget.name === 'price'){
                    currency(e);
                    setForm({ ...form,     
                        price:e.currentTarget.value
                                   
                     });
                }
                if(e.currentTarget.name === 'cep'){
                    cep(e);
                    setForm({ ...form,     
                        cep:e.currentTarget.value
                                   
                     });
                }
                if(e.currentTarget.name === 'condominium'){
                    currency(e);
                    setForm({ ...form,     
                        condominium:e.currentTarget.value
                                   
                     });
                }
                if(e.currentTarget.name === 'iptu'){
                    currency(e);
                    setForm({ ...form,     
                        iptu:e.currentTarget.value
                                   
                     });
                }
                setErrors([])
                    
            }  
               
          
            const [fileSize,setFileSize]=useState(false);
            let somaImages= imagesBase64.length + imagesSelected.length;
            const handleSubmitForm = async (e:any) =>{         
              e.preventDefault();
              if(somaImages >15){
                setFileSize(true);
              }
             
            
              if(somaImages <16){
                setLoadingTenant(true)
              }
                let emptyValues=Object.values(form).some(obj => obj === '');
                setEmptyValue(emptyValues);
                
              
              
                let name: any;            
                for (var prop in form) { if(prop === 'name'){name=form[prop]; } }
                        
                let description: any;            
                for (var prop1 in form) {if(prop1 === 'description'){ description=form[prop1];  console.log(description)}}

                let typeProperty: any;            
               for (var prop2 in form) {if(prop2 === 'typeProperty'){ typeProperty=form[prop2];}}

                let goal: any;            
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
                 

                
                if(!emptyValues && somaImages as any <16){
                    setLoadingWait(true)     
                  
                const data = await editProperty(name, description,selectedItemIndex as any, goal, numberRooms,form['suites'], bathRooms,area, form['areaTotal'],iptu,vacancies,condominium,                                      
                price, state, city, district, street, number, cep,imagesSelected, imagesBase64 as string[], deletedIds as number[],selectedFeatures,selectedRadioBtn,selectedRadioBtnPermuta,`${params.propertyId}`)
              
               
                if(data.status === 204){
                    setFileSize(false)
                    setCleanImagesForm(true);
                    cleanForm()
                    
                    setSuccessMessage(true)
                    setLoadingTenant(false)
                    getBairrosCadastrados()
                    setTimeout(()=>{
                        setLoadingTenant(true);
                        setLoadingWait(false);
                    },1000)
                    setTimeout(()=>{
                        setLoadingTenant(false)
                        setSuccessMessage(false);
                        setCleanImagesForm(false);
                      navigate(`/details/${params.propertyId}`)
                    },1500)
        
                                  
                  }
                    if(data.response.data.errors){              
                        setErrors(data.response.data.errors);
                        setSuccessMessage(false)
                        setLoadingTenant(false)
                        setLoadingWait(false);
                        console.log(data.response.data.errors)
                                                                                       
                    }
                    else if(data.response.status === 404 || data.response.status === 403 || data.response.status === 400){
                        console.log(data.response.status)
                        setOtherError(true)
                        setSuccessMessage(false)
                        setLoadingTenant(false)
                        setLoadingWait(false);
                        setTimeout(()=>{
                            setOtherError(false)
                        },2000)
                    }          
       }
    }

  
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

    const changeType = () => {
        const found = itemsList.find((element) => element.type === property.property.typeDescription );
        
     
        if(found){
            setSelectedItemIndex(Number(found.value) -1  as any)
        }
        return found?.value
    }

            useEffect(() => {
                changeType()
            }, [property.property.typeProperty]);

          

         //selected index typeProperty
        const [selectedItemIndex,setSelectedItemIndex]=useState(null);
        const ref = useRef<HTMLDivElement>(null);
        console.log(selectedItemIndex)
  
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
              
          
          const [selectedRadioBtn, setSelectedRadioBtn]= useState(property.property.financeable)
          const isRadioSelected = (value:string): boolean=> selectedRadioBtn=== value ;

           const handleRadioClick = (e:React.ChangeEvent<HTMLInputElement>): void=> setSelectedRadioBtn(e.currentTarget.value)

           const [selectedRadioBtnPermuta, setSelectedRadioBtnPermuta]= useState(property.property.permuta)
           const isRadioSelectedPermuta = (value:string): boolean=> selectedRadioBtnPermuta=== value ;

            const handleRadioClickPermuta = (e:React.ChangeEvent<HTMLInputElement>): void=> setSelectedRadioBtnPermuta(e.currentTarget.value)


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
        <div>
     
       
       <EditBackground>
       {loadingWait &&<LoadingLogin/>}
        <Header />
        <BarTop />
        <BodyEditContainer>
            <h1 className='title-registration'>Editar imóvel</h1>

            <form onSubmit={(e)=> {handleSubmitForm(e)}}>
            <FormContainer>

                <label>Título*</label>           
                <Input id="name" name="name" value={form['name'] } onChange={(e) => handleChange(e)}  maxLength={80}/>
                {errors.map(x => { if(x.fieldName === 'name') return  <p className='formField__error'>{x.message}</p>})}
               { emptyValue && form['name'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Descrição*</label>
                <textarea id="description"  value={form['description']} name="description" rows={4}  onChange={(e) => handleChange(e)} maxLength={350}></textarea>
                {errors.map(x => { if(x.fieldName === 'description') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['description'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Finalidade</label>
                    <select  name='goal'  id='goal' value={form['goal'] }   placeholder='selecione'  onChange={(e) => handleChange(e)} >
                    <option value='' >Selecione</option>
                    <option key='ALUGUEL' value='1'>Alugar</option>
                    <option  key='VENDA' value='2'>Vender</option>
                    <option  key='VENDAEALUGUEL' value='3'>Vender/Alugar</option>                    
                </select>
                {errors.map(x => { if(x.fieldName === 'goal') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['goal'] === '' ?<span className='formField__error'>Selecione uma Finalidade</span>: ''}
                
            
                <label>Tipo*</label>
                <div className="custom-dropdown" ref={ref}>
                    <div className="custom-dropdown-selection" onClick={e=> {
                        setIsDropDownVisible(!isDropdownVisible);
                    }}>
                        {selectedItemIndex !== null ? itemsList[selectedItemIndex].type :"Tipo"}
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
                                        'typeProperty':'1',
                                    });
                                    }}>
                                    {item.type}
                                                               
                                </div>
                            ))
                        }
                    </div>: <></>}
                 
                </div> 
                {errors.map(x => { if(x.fieldName === 'typeProperty') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && selectedItemIndex === null ?<span className='formField__error'>Selecione um Tipo</span>: ''}

                <label className='label-financeable'>Financiavel*</label>
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
                <Input type='text'  name='numberRooms' id='numberRooms' value={form['numberRooms']} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>            
                {errors.map(x => { if(x.fieldName === 'numberRooms') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['numberRooms'] === '' ?<span className='formField__error'>Selecione o número de Quartos</span>: ''}
                
                <label>Suites*</label>
                <Input type='text'  name='suites' id='suites' value={form['suites']} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'suites') return  <p className='formField__error_reg'>{x.message}</p>})}
                { emptyValue && form['suites'] === '' ?<span className='formField__error_reg'>Selecione o número de Suites</span>: ''}

                <label>Banheiros*</label>
                <Input type='text'  name='bathRooms' id='bathRooms' value={form['bathRooms']} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>            
                {errors.map(x => { if(x.fieldName === 'bathRooms') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['bathRooms'] === '' ? <span className='formField__error'>Selecione o número de Banheiros</span>: ''}
              
                <label>Área(m2)*</label>
                <Input id="area" name="area"  placeholder='Digite apenas números' value={form['area'] } onChange={(e) => handleChange(e)} maxLength={6} onKeyUp={handleKeyUp}/>
                {errors.map(x => { if(x.fieldName === 'area') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['area'] === '' ?<span className='formField__error'>Preencha o total da Área interna</span>: ''}

                <label>Área total(m2)*</label>
                <Input id="areaTotal"  placeholder='Digite apenas números' name="areaTotal" value={form['areaTotal'] } onChange={(e) => handleChange(e)} maxLength={6} onKeyUp={handleKeyUp}/>
                {errors.map(x => { if(x.fieldName === 'areaTotal') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['areaTotal'] === '' ?<span className='formField__error'>Preencha o total da Área externa</span>: ''}

                <label>Vagas</label>
                <Input type='text'  name='vacancies' value={form['vacancies'] }  id='vacancies' onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'vacancies') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['vacancies'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

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

                <label>IPTU(R$)</label>
                <Input id="iptu" name="iptu" value={form['iptu'] }  maxLength={14} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'iptu') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['iptu'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Condomínio(R$)</label>
                <Input  id="condominium" name="condominium" value={form['condominium'] }  maxLength={14} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'condominium') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['condominium'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
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
               
                <label>Preço(R$)</label>
                <Input type='text' id='price' name='price'value={form['price'] }  maxLength={14} onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>    
                {errors.map(x => { if(x.fieldName === 'price') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['price'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
               
             
                 <label>Estado</label>
                <select placeholder='selecione' name='uf'  id='uf' value={form['uf'] } onBlur={changeCity} onChange={(e) => handleChange(e)} > 
                <option value='' >Selecione</option>
                  
                 { ufs.map((uf) => (
                    <option  key={uf.id} value={uf.sigla}>{uf.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'uf') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['uf'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}

                <label>Cidade</label>
                <select placeholder='selecione'  name='city'  id='city' value={form['city'] }  onChange={(e) => handleChange(e)}>
                    <option value='' >Selecione a Cidade</option>
                 { cities.map((city) => (
                    <option key={city.id} value={city.nome}>{city.nome}</option>
                 ))}
                </select>
                {errors.map(x => { if(x.fieldName === 'city') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['city'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
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
                
                <label>Rua</label>
                <Input   name='street'  id='street' value={form['street'] }  onChange={(e) => handleChange(e)}/>
                {errors.map(x => { if(x.fieldName === 'street') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['street'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
                
                <label>Número</label>
                <div className='number-wrapper'>
                <Input type='text'  name='number' id='number' value={form['number']}  onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/>       
                </div>
                {errors.map(x => { if(x.fieldName === 'number') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['number'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
                
                <label>Cep</label>
                <Input  name='cep'  id='cep' value={form['cep'] }  onKeyUp={handleKeyUp} onChange={(e) => handleChange(e)}/> 
                {errors.map(x => { if(x.fieldName === 'cep') return  <p className=' formField__error'>{x.message}</p>})}
                { emptyValue && form['cep'] === '' ?<span className='formField__error'>Este campo é requerido</span>: ''}
                {fileSize &&
                   <p style={{color:'red',fontSize:'14px'}}>É permitido no máximo 15 imagens</p>
                   }  
                <UploadImages images={property.property.images as unknown as ImageItem[]}  handleResult={getImagesUrls}/>
               
               
                <div className='buttom-register-wrapper'>
                
                {
                        loadingTenant && <Button className="button-send-email" ><Loading/></Button>
                    }
                    {
                        !loadingTenant &&
                    <Button className="button-send-email" type='submit'>Salvar</Button>
                    }

                <div className="message-edit">
                    {successMessage   ? <span className='success'>Editado com sucesso! <Link to={`/details/${params.propertyId}`}className='new-property-link'>Ver Imóvel</Link></span>: ''}
                    </div>
                    { otherError &&   
                <div className='other-error-update'>Erro Inesperado</div>
                 }
                </div>
            </FormContainer>
            </form>
        </BodyEditContainer>
       </EditBackground>
  
        </div>    
        
    )
}

const Edit = () =>{

    const navigate = useNavigate();
    const params = useParams();
    const [property,setProperty]=useState<Property>();
    const [errors,setErrors]= useState (false);
    const [otherError,setOtherError]= useState (false);
    const [blobImages,setBlobImages]=useState<Blob[]>([]);
 
    const p = `${params.propertyId}`;

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){             
          navigate(`/edit/${p}`)
        }else{         
           navigate('/')
         
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[p])

   

var myInit = {
    headers:{
     
        'Access-Control-Allow-Headers': 'Content-Type',
        "Access-Control-Allow-Origin": "https://master--steady-cheesecake-480a84.netlify.app",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET" 
              
    }

  };

    const getProperty = async() => {
       
        const data = await findProperty(p);
        if(data.status === 200){  
       
            setProperty(data.data as Property) 
  
         
          }if(data.response.status === 404){ 
           
            setErrors(true);
             
          }
        
            if(data.response.status === 400){ 
        
            setErrors(true);
             
          }
       
                                  
    }
   
    useEffect(() => {
        getProperty();

    },
     [p]);

 

     const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
useEffect(() =>{
      
  getCurrentUser();
},[])
 
let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');
    return(
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          
            {errors && <PageNotFound/>}

            {perfilTenant? 
         <>
          { property?.id  && !errors &&      
            <EditComponent blobs={blobImages} property={property as unknown as Property}/> } 
            </>                
            : <PageNotFound/>}
        
        </ErrorBoundary>
    )
}

export default Edit;
