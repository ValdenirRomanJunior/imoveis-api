import {SearchContainer,SearchHiddenWrapper,SearchWrapper} from './styles';
import { TfiSearch } from "react-icons/tfi";
import {BsSliders} from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react';
import { getTAllAddressRequest } from '../Services/property';
import { lowercase } from '../PseudoSearch/masks';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useSubdomain } from '../../../components/SubdomainRouter';

type Address={
  
    id: number,
    street: string,
    number: string,
    district: string,
    cep: string,
    city:{
        id: number,
        name: string,
        state:{
            id: number,
            name: string,
        }
    },
   

}

type City={
 id: number,
 name: string,
 state:{
 id: number,
 name: string,
}
}

type Prop={
    onChange:Function;
}
const Search = ({onChange}:Prop) =>{

    const[goal,setGoal]=useState('');
    const[type,setType]=useState('');
    const[name,setSearch]= useState('');

    const { companyName: subdomainCompanyName } = useSubdomain();
    const params = useParams();
    const companySlug = subdomainCompanyName || (params as any)?.companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');

    const [address,setAddress]= useState<Address[]>([]);   
    const [cities,setCities]= useState<City[]>([]);

    const [openHiddenSearch,setOpenHiddenSearch]= useState(false);

    const openSearchHidden = () => {
        setOpenHiddenSearch(openHiddenSearch => !openHiddenSearch);
        
    }
    const [url,setUrl]= useState(companySlug || window.location.hostname);
    const getAllAddress = async () => {
        let params = new URLSearchParams(document.location.search);
       
        const data = await getTAllAddressRequest(url);
        setAddress(data.data);
    }

     useEffect(()=> {
        setUrl(companySlug || window.location.hostname);
     },[companySlug])

     useEffect(()=> {
        getAllAddress()
     },[url])


     const getOnlyCities = () => {
        let newlist:City[]= [];
        address && address.map(x => {
            newlist.push({
                id: x.city.id,
                name: x.city.name,
                state:{
                    id: x.city.state.id,
                    name: x.city.state.name
                }
            });
            setCities(newlist);

        })
     }

     useEffect(()=> {
        getOnlyCities()
     },[address])

   
     //pega cidade da lista de sujestão 
     const [showCompomentSelectCity,setshowComponentSelectCity]= useState(false);
     const getCityFromList = (e:any) => {
       const value=e.currentTarget.value;
    
        setSearch(value)
        setshowComponentSelectCity(showCompomentSelectCity => !showCompomentSelectCity); 
        setshowComponentSelectDistrict(showCompomentSelectDistrict=> !showCompomentSelectDistrict);  
     }

    const onKeyUp = (e: React.FormEvent<HTMLInputElement>) => {
    
        setshowComponentSelectCity(true)
        setshowComponentSelectDistrict(true)
        if(e.currentTarget.name  === 'name'){
           lowercase(e)
        }
    }

     //pega bairro da lista de sujestão 
    const [showCompomentSelectDistrict,setshowComponentSelectDistrict]= useState(false);
    const getDistrictFromList = (e:any) => {
        const value=e.currentTarget.value;
        const newValue  = value.substr(0, value.indexOf(','));
       
         setSearch(newValue)
         setshowComponentSelectDistrict(showCompomentSelectDistrict=> !showCompomentSelectDistrict); 
         setshowComponentSelectCity(showCompomentSelectCity => !showCompomentSelectCity);   
      }

     const getTypingSearch = () => {
        const lowerCased = name.toLowerCase();
    let newResult: City[]= [];
      newResult= cities.filter(city => (city.name.toLowerCase().match(lowerCased )));
    
      const uniqueCities= new Map();

      newResult.forEach((ct) => {
        if(!uniqueCities.has(ct.name)){
            uniqueCities.set(ct.name,ct);

        }
        if(name === '' || name === ct.name){
            uniqueCities.clear()
          
      }
      });
   
      if(uniqueCities.size>0){
      const a=[uniqueCities.keys()].map(x => {
        return(
           <>
            <input id="cityCheck" type="text" className="city-search"
            onClick={getCityFromList} value={x.next().value}/>
           </>
         
        )}) 
     return a;
        }else{
            return <li className="district-search">Não encontramos cidades com este nome</li>
        }
     }

     const getTypingDistrict = () => {
        const lowerCased = name.toLowerCase();
        let newResult: Address[]= [];
          newResult= address.filter(adr => (adr.district.toLowerCase().match(lowerCased)));
        
          const uniqueDistricts= new Map();
    
          newResult.forEach((ct) => {
            if(!uniqueDistricts.has(ct.district)){
                uniqueDistricts.set(ct.district,ct);
                uniqueDistricts.set(ct.city.name,ct);
                uniqueDistricts.set(ct.city.state.name,ct);
    
            }
       
            if(name === '' || name === ct.district){
                uniqueDistricts.clear()
                
          }
          });
       
          if(uniqueDistricts.size>0){

         
          const a=[uniqueDistricts.keys()].map(x  => {
            if(uniqueDistricts.size<0){
                         
            } 
                
            return(  
                <>
                <div className="district-wrapper">
                <input id="cityCheck" type="text" className="district-search"
                onClick={getDistrictFromList} value={`${x.next().value},${x.next().value},${x.next().value}`}/> 
             
                </div>
                </>      
            )})
        
         return a;
        }else{
            return <li className="district-search">Não encontramos bairros com este nome</li>
         
        }
       
         }


     useEffect(()=> {
        getTypingDistrict()
     },[name])


     
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
           setType('')
           
         }
 
    return(
        <SearchContainer>
        <SearchWrapper>
        
        <input placeholder='Digite Cidade ou Bairro' type="text" value={name} onKeyUp={onKeyUp} onChange={(e)=>setSearch(e.target.value.toLowerCase())}/>
        <button className='button-search' onClick={()=>onChange(goal,type,name)} style={{cursor:'pointer'}}>Buscar</button>
        
        <BsSliders className='sliders-icon-search' onClick={openSearchHidden}/>
        </SearchWrapper>

                 <div className="result-list-wrapper-properties-desktop">

                { (name !== '' && showCompomentSelectCity) ?  
                <ul>           
                    <h2 className="subtitle-search-list">Cidades</h2>

                {getTypingSearch()}  
                                        
                </ul>
                : ''}

                { (name !== '' && showCompomentSelectDistrict) ?          
                <ul>                     
                    <h2 className="subtitle-search-list">Bairros</h2>
                {getTypingDistrict()}         
                </ul>            
                :'' }

                </div>
         <SearchHiddenWrapper open={openHiddenSearch}>
         <select placeholder='goal' name='goal'  id='goal' className="select" onChange={(e)=>setGoal(e.target.value)}> 
                <option value='' >Finalidade</option>                
                    <option key='2' value='2'>Comprar</option>
                    <option key='1' value='1'>Alugar</option>
                   
                </select>

                    
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
                                    setType(String(item.value));
                                    }}>
                                    {item.type}
                                                               
                                </div>
                            ))
                        }
                    </div>: <></>}
                 
                </div> 
         </SearchHiddenWrapper>

       
         </SearchContainer>
       
       

    )
   

}

export default Search;