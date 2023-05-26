import {  SearchButtonContainer, SearchCodeWrapper, SearchContainer, SearchContent } from "./styles";
import Modal from 'react-modal';
import { FormEvent, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { getAllCities, getAllStates } from "../../services/resources/property";
import { number } from "../../pages/Registration/masks";

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
            console.log('cai aqui')
        }
       
    }


    return(

    <SearchContainer>
   
      
            <SearchContent>
            <select placeholder='selecione' name='state' disabled={disabled} id='state' value={state} onChange={(e)=>setState(e.target.value)}> 
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

                <select placeholder='tipo' name='type' disabled={disabled}  id='type' value={type} className="select-half" onChange={(e)=>setType(e.target.value)}> 
                <option value='' >Tipo</option>                
                    <option key='1' value='1'>Casa</option>
                    <option key='2' value='2'>Apartamento</option>
                    <option key='3' value='3'>Terreno</option>
                    <option key='4' value='4'>Comercial</option>           
                </select>

                <select placeholder='goal' name='goal' disabled={disabled} id='goal' value={goal} className="select-half" onChange={(e)=>setGoal(e.target.value)}> 
                <option value='' >Finalidade</option>                
                    <option key='1' value='1'>Aluguel</option>
                    <option key='2' value='2'>Venda</option>             
                </select>
                <SearchButtonContainer>
                  
                    <button className="search-button-send"  disabled={disabled}  onClick={()=> onChange(id,state,city,goal,type)}>Buscar</button>
                </SearchButtonContainer>

           
                
            </SearchContent>

            <SearchCodeWrapper>
                <input type="number" name='id'  placeholder="Busca por código" onKeyUp={handleKeyUp} onChange={(e)=>setId(e.target.value)}/>
                <button onClick={()=> onChange(id,state,city,goal,type)}>Buscar</button>
            </SearchCodeWrapper>
    </SearchContainer>
    )
}
export default SearchDesktop;