import {  SearchButtonContainer, SearchCodeWrapper, SearchContainer, SearchContent } from "./styles";
import Modal from 'react-modal';
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { getAllCities, getAllStates } from "../../services/resources/property";
import { number } from "../../pages/Registration/masks";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

type Props = {
    param:boolean;
    onChange:Function;
}


type StateProp={
    id:number,
    name:string;

}

type CityProp={
    id:number,
    name:string;

}

const SearchDesktop = ({onChange,param}:Props)=>{

    const[id,setId]= useState('');
    const[state,setState]= useState('');
    const[city,setCity]= useState('');
    const[goal,setGoal]= useState('');
    const[type,setType]= useState('');

    const[states,setStates]= useState<StateProp[]>([]);
    const[cities,setCities]= useState<CityProp[]>([]);

    const [disabled,setDisabled]=useState(false);


     
    useEffect(() => { 
     
        if(param){
            setState('')
            setCity('')
        }
 

    },[param])

    useEffect(() => { 
     
        if(state === ''){
            setCity('')
        }
 

    },[state])


    const getStates = async() => {
        const data= await getAllStates();   
        setStates(data.data)
    }

    useEffect(() => {  
            getStates()        
    },[id])



    const disableIfId = () => {
        if(id !== ''){
        
           setDisabled(true)
        }
        if(id === ''){
            setDisabled(false)
        }
    }

    useEffect(() => {
      
        disableIfId()
    },[id,state,city,goal,type])



    const getCities = async() => {
        if(state !== '' || null){
            const data= await getAllCities(state); 
            setCities(data.data)   
        }
         if(state === '' || null){
          
            setCities([])
         }
       
       
    }

    useEffect(() => {
       getCities()
    },[state])

    

    const handleKeyUp = (e: React.FormEvent<HTMLInputElement>) => {
       
        setState('')
        setCity('')      
        setGoal('')
        setType('')
        setStates([])
        if(id ===''){
            getStates()
            setDisabled(false)

        }
        if(e.currentTarget.name  === 'id'){
            number(e)
           
             getStates()
        }

        if(e.currentTarget.name  === 'state'){
           
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
        
      
            <SearchContent>
            <select placeholder='selecione' name='state' disabled={disabled} id='state' value={state} onChange={(e)=> {
                setState(e.currentTarget.value);
                setCity('')
                }}>

                <option value='' >Estado</option>
                       
                { states.map((uf) => (       
                    <option  key={uf.id} value={uf.id}>{uf.name}</option>            
                 ))}  
                           
                </select>

                <select placeholder='selecione' disabled={disabled} name='city'  id='city' value={city} onChange={(e)=>setCity(e.target.value)}> 
                <option value='' >Cidade</option>                
                { cities.map((ct) => (       
                    <option  key={ct.id} value={ct.id}>{ct.name}</option>            
                 ))}               
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
                                    setType(String(index));
                                    }}>
                                    {item.type}
                                                               
                                </div>
                            ))
                        }
                    </div>: <></>}
                 
                </div> 
                <select placeholder='goal' name='goal' disabled={disabled} id='goal' value={goal} className="select-half" onChange={(e)=>setGoal(e.target.value)}> 
                <option value='' >Finalidade</option>                
                    <option key='1' value='1'>Aluguel</option>
                    <option key='2' value='2'>Venda</option>  
                    <option key='3' value='3'>Vender/Alugar</option>             
                </select>
                <SearchButtonContainer>
                  
                    <button className="search-button-send"  disabled={disabled}  onClick={()=> onChange(id,state,city,goal,type+1)}>Buscar</button>
                </SearchButtonContainer>

             
            </SearchContent>
            <SearchCodeWrapper>
                <input type="number" name='id'  placeholder="Busca por código" onKeyUp={handleKeyUp} onChange={(e)=>setId(e.target.value)}/>
                <button onClick={()=> onChange(id,state,city,goal,type+1)}>Buscar</button>
            </SearchCodeWrapper>
    </SearchContainer>
    )
}
export default SearchDesktop;