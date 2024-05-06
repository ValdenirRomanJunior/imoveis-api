import { BarTopSearch, SearchButtonContainer, SearchCodeWrapper, SearchContainer, SearchContent } from "./styles";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { getAllCities, getAllStates } from "../../services/resources/property";
import { number } from "../../pages/Registration/masks";
import {IoIosCloseCircleOutline} from 'react-icons/io'


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
const Search = ({onChange,param}:Props)=>{

    const[id,setId]= useState('');
    const[state,setState]= useState('');
    const[city,setCity]= useState('');
    const[goal,setGoal]= useState('');
    const[type,setType]= useState('');
   

    const[states,setStates]= useState<StateProp[]>([]);
    const[cities,setCities]= useState<CityProp[]>([]);
    const[disabled,setDisabled]=useState(false);
    const[hiddenButton,setHiddenButton]=useState(false);
   
 
    
    useEffect(() => { 
     
        if(param){
         
        }
 

    },[param])

    const getStates = async() => {
        const data= await getAllStates();
     
        setStates(data.data)
    }

    useEffect(() => {     
        getStates()
     
    },[id])



    const disableIfId = () => {
    
        if(id !== '' ){
          
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
      
        if(id ===''){
            getStates()
            setDisabled(false)
        }

        if(e.currentTarget.name  === 'id'){
            number(e)
          
          
        }
       
    }

const [modalIsOpen, setIsOpen] = useState(false);

const handleOpenModal =() => {

    setIsOpen(true)
}

const handleCloseModal =() =>{
    setId('')
    setState('')
    setCity('')      
    setGoal('')
    setType('')   
    setIsOpen(false)

}

const handleToDeleteUF = () => {
    const x = document.getElementById("state") as any;
    x?.remove();
}

const hiddenButtonDelete = () => {

    if( state !== '' || null){
        setHiddenButton(true);
    }
    else{
        setHiddenButton(false);
    }
   
       
}

    return(
    <SearchContainer>
     <BiSearch className='icon-search-properties' onClick={handleOpenModal}/>

          <Modal 
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}    
                className='ModalSearch'            
              >
        
       <BarTopSearch>
            <p>Busca</p>
            <IoCloseOutline onClick={handleCloseModal} className='button-close-modal-mobile' /> 
       </BarTopSearch>
            <SearchContent iconDelete={hiddenButton} onChange={hiddenButtonDelete}>
                <div className="selectWrapper">
            <select placeholder='selecione' name='state'  id='state' disabled={disabled}  onChange={(e)=>setState(e.target.value)}> 
                <option value='' >Estado</option>
                       
                { states.map((uf) => ( 
                   
                  <option  key={uf.id} value={uf.id}>{uf.name} </option> 
                                            
                 ))}  
                       
                </select>  
                <IoIosCloseCircleOutline onClick={handleToDeleteUF} className="deleteUF"/>    
                </div> 
                    
           

                <select placeholder='selecione'  name='city'  id='city'disabled={disabled} onChange={(e)=>setCity(e.target.value)}> 
                <option value='' >Cidade</option>                
                { cities.map((ct) => (       
                   <option  key={ct.id} value={ct.id}>{ct.name}</option>
                 ))}               
                </select>
               

            <div className="type-goal-wrapper">
                <select placeholder='tipo' name='type'  id='type' disabled={disabled} value={type} className="select-half" onChange={(e)=>setType(e.target.value)}> 
                <option value='' >Tipo</option>                
                    <option key='1' value='1'>Casa</option>
                    <option key='2' value='2'>Apartamento</option>
                    <option key='3' value='3'>Terreno</option>
                    <option key='4' value='4'>Comercial</option>           
                </select>

                <select placeholder='goal' name='goal'  id='goal' disabled={disabled} value={goal} className="select-half" onChange={(e)=>setGoal(e.target.value)}> 
                <option value='' >Finalidade</option>                
                    <option key='1' value='1'>Aluguel</option>
                    <option key='2' value='2'>Venda</option>             
                </select>
                </div>
                <SearchButtonContainer onClick={handleCloseModal}>
                
                    <button className="search-button-send"  disabled={disabled} onClick={()=> onChange(id,state,city,goal,type,)}>Buscar</button>
                </SearchButtonContainer>
                
                <SearchCodeWrapper >
                <input type="number" name='id' placeholder="Busca por código"  onKeyUp={handleKeyUp} onChange={(e)=>setId(e.target.value)}/>
                <div  onClick={handleCloseModal}>
                <button  onClick={()=> onChange(id,state,city,goal,type)}>Buscar</button>
                </div>
            </SearchCodeWrapper>
                
            </SearchContent>

           
       </Modal>
    </SearchContainer>
    )
}
export default Search;