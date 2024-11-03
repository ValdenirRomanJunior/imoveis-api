import {SearchContainer,SearchHiddenWrapper,SearchWrapper} from './styles';

import {BsSliders} from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { getTAllAddressRequest } from '../../services/resources/property';
import { lowercase } from './mask';

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

const NewSearch = ({onChange}:Prop) =>{

    const[goal,setGoal]=useState('');
    const[type,setType]=useState('');
    const[name,setSearch]= useState('');

    const [address,setAddress]= useState<Address[]>([]);   
    const [cities,setCities]= useState<City[]>([]);
    const [openHiddenSearch,setOpenHiddenSearch]= useState(false);

    const openSearchHidden = () => {
        setOpenHiddenSearch(openHiddenSearch => !openHiddenSearch);
        
    }

    const [url,setUrl]= useState(window.location.hostname);
    const getAllAddress = async () => {
        let params = new URLSearchParams(document.location.search);
       
        const data = await getTAllAddressRequest(url);
        setAddress(data.data);
    }

     useEffect(()=> {
        getAllAddress()
     },[])


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
 
    return(
        <SearchContainer>
        <SearchWrapper>
        
        <input placeholder='Digite Cidade ou Bairro' type="text" value={name} onKeyUp={onKeyUp} onChange={(e)=>setSearch(e.target.value.toLowerCase())}/>
        <button className='button-search' onClick={()=>onChange(goal,type,name)}>Buscar</button>
        
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

         <select placeholder='tipo' name='type'  id='type' className="select" onChange={(e)=>setType(e.target.value)}> 
                <option value='' >Tipo</option>                
                    <option key='1' value='1'>Casa</option>
                    <option key='2' value='2'>Apartamento</option>
                    <option key='3' value='3'>Terreno</option>
                    <option key='4' value='4'>Comercial</option>           
                </select>

         </SearchHiddenWrapper>

       
         </SearchContainer>
       
       

    )
   

}

export default NewSearch;