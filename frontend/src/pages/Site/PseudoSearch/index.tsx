import { PseudoSearchContainer } from "./styles";
import { BiSearchAlt2 } from "react-icons/bi";
import {TfiLocationArrow} from 'react-icons/tfi';
import Modal from 'react-modal';
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import {IoIosArrowBack, IoIosArrowDown} from 'react-icons/io'
import './styles.css'

import { createSearchParams, Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getTAllAddressRequest} from '../Services/property';
import Loading from "../Loading";
import { IoCloseOutline } from "react-icons/io5";
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

const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname:any, params:any) =>
      navigate(`${pathname}/?${createSearchParams(params)}`);
  };
  
const PseudoSearch = () =>{
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const clientSlug = subdomainCompanyName || companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');
    const navigateSearch = useNavigateSearch();


    const[goal,setGoal]=useState('');
    const[type,setType]= useState('');
    const[name,setSearch]= useState('');

    const [address,setAddress]= useState<Address[]>([]);   
    const [cities,setCities]= useState<City[]>([]);

    const[loading, setLoading]=useState(false);
    


    const [modalIsOpen, setIsOpen] = useState(false);

    const  openModal=()=> {
      setIsOpen(true);
    }

  
   const  handleCloseModal=()=> {
    setSearch('');
    setSelectedSale(true)
    setSelectedRent(false)
  
      setIsOpen(false);
    }
    
    const [selectedRent,setSelectedRent]=useState(false);
    const [selectedSale,setSelectedSale]=useState(true);

   function selectedAfterGoalRent(e:any){
   setSelectedRent(true)
   setSelectedSale(false)
      
    }

    
   function selectedAfterGoalSale(e:any){
    setSelectedSale(true)
    setSelectedRent(false)
       
     }

    let toogleClassCheckRent = selectedRent ? ' activeRent': '';
    let toogleClassCheckSale = selectedSale ? ' activeSale':  '';

    const [url,setUrl]= useState(clientSlug || window.location.hostname);
    const getAllAddress = async () => {
        let params = new URLSearchParams(document.location.search);
        const data = await getTAllAddressRequest(url);
        setAddress(data.data);
    }

     useEffect(()=> {
        setUrl(clientSlug || window.location.hostname);
     },[clientSlug])

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



     //bairro
     const getTypingDistrict = () => {
        const lowerCased = name.toLowerCase();
        let newResult: Address[]= [];
          newResult= address?.filter(adr => (adr.district.toLowerCase().match(lowerCased)));
        
          const uniqueDistricts= new Map();
    
          newResult?.forEach((ct) => {
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

     
 
     const startLoading = () => {    
        const targetPath = isLocalhost ? `/site/${clientSlug}/imoveis` : `/imoveis`;
navigateSearch(targetPath,{'goal': `${goal}`, type: `${type}`, name:`${name}`});
   
    
        setLoading(true)
        setTimeout(()=> {
          
           // navigate(`/properties/${name}/${goal}/${type}`)
           // <Link  to={`/properties/${name}/${goal}/${type}`}></Link>
           setLoading(false);
         
        },1000)
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

         console.log(type)
    return(
        <PseudoSearchContainer className="container"> 
            <TfiLocationArrow className="arrow-location-pseudoSearch"/>        
            <button onClick={openModal}>Estado, Cidade, Tipo, Finalidade...</button>
          
            <div className="input-rent-sale-wrapper-desktop">
            <label  onClick={selectedAfterGoalSale} className={`selectedClass${toogleClassCheckSale} label-class`} >
                    <input type="radio" name="goal" value="1" onChange={(e)=>setGoal(e.target.value)}/>                
                    <span className="sale-span">comprar</span>
                </label>

                <label  onClick={selectedAfterGoalRent} className={`selectedClass${toogleClassCheckRent} label-class`} >
                <input type="radio" name="goal" value="2"  onChange={(e)=>setGoal(e.target.value)}/>
                    <span className="rent-span">alugar</span>
                 
                </label>
           
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
                </div>
            <input placeholder="Estado, Cidade, Tipo, Finalidade..." type="text" className="input-search-desktop"  onKeyUp={onKeyUp} value={name.toLowerCase()} onChange={(e)=>setSearch(e.target.value)}/>
               <BiSearchAlt2 className="search-icon-pseudo-search" onClick={startLoading} />
                 

         
            <Modal
            isOpen={modalIsOpen}                  
            onRequestClose={handleCloseModal}                     
            className="Modal container"
            >

            <div className="header-modal-search">
                 <IoIosArrowBack  className="button-close-search-modal"  onClick={handleCloseModal}/>
                 <p>pesquisar</p>
            </div>
            <div className="input-rent-sale-wrapper">
                <label onClick={selectedAfterGoalSale} className={`selectedClass${toogleClassCheckSale}`}>
                    <input type="radio" name="goal" value="1" onChange={(e)=>setGoal(e.target.value)}/>
                    
                    <span className="sale-span">comprar</span>
                </label>

                <label  onClick={selectedAfterGoalRent} className={`selectedClass${toogleClassCheckRent}`} >
                <input type="radio" name="goal" value="2"  onChange={(e)=>setGoal(e.target.value)}/>
                    <span className="rent-span">alugar</span>
                </label>

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
            </div>
            <div className="search-wrapper">
                <input type="text" placeholder="Digite um bairro ou cidade"  onKeyUp={onKeyUp} value={name} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="result-list-wrapper">

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
               <div className="button-send-search-wrapper">
                {!loading?
                    <button onClick={startLoading} >pesquisar</button>
   
                :
                <button className="button-loading"><Loading/></button>
                }
           
               </div>
            </Modal>


                     <div className="result-list-wrapper-desktop">

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
            
            </PseudoSearchContainer>
            
    )
}

export default  PseudoSearch;