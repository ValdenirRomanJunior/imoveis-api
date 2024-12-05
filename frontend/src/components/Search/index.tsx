import { BarTopSearch, SearchButtonContainer, SearchCodeWrapper, SearchContainer, SearchContent } from "./styles";
import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { getAllCities, getAllStates } from "../../services/resources/property";
import { number } from "../../pages/Registration/masks";
import {IoIosArrowDown, IoIosCloseCircleOutline} from 'react-icons/io'


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
     
      }
      console.log(type)
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

                <select placeholder='goal' name='goal'  id='goal' disabled={disabled} value={goal} className="select-half" onChange={(e)=>setGoal(e.target.value)}> 
                <option value='' >Finalidade</option>                
                    <option key='1' value='1'>Aluguel</option>
                    <option key='2' value='2'>Venda</option> 
                    <option key='3' value='3'>Vender/Alugar</option>            
                </select>
                </div>
                <SearchButtonContainer onClick={handleCloseModal}>
                
                    <button className="search-button-send"  disabled={disabled} onClick={()=> onChange(id,state,city,goal,type)}>Buscar</button>
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