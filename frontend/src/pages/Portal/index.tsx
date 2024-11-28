import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import CardProperty from './CardPortal';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import {VscHome } from 'react-icons/vsc';
import {IoIosAdd, IoIosArrowForward} from 'react-icons/io';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import PageNotFound from '../../components/PageNotFound';
import useAuth from '../../hooks/useAuth';
import {BiCaretUpCircle, BiSearch} from 'react-icons/bi'
import Modal from 'react-modal';
import  './ModalStyle.css';
import SearchDesktop from '../../components/SearchDesktop';
import CardPortal from './CardPortal';
import { AiOutlineTool } from 'react-icons/ai';
import imageDefault from '../../assets/images/no-pictures.png';
import { Property } from '../../types/property';
import { propertiesToPortal } from '../../services/resources/property';
import { MdAttachMoney, MdOutlineBedroomChild, MdOutlineSell } from 'react-icons/md';

import { IoCarSportOutline, IoHomeOutline } from 'react-icons/io5';
import { IoIosArrowRoundForward } from "react-icons/io";


const Portal = ()=>{

    const navigate = useNavigate();

    const[idAux,setId]= useState('');
    const[stateAux,setState]= useState('');
    const[cityAux,setCity]= useState('');
    const[goalAux,setGoal]= useState('');
    const[typeAux,setType]= useState('');
    const[paramToCloseModal,setParamToCloseModal]= useState(false);
    const[paramToGetAllProperties,setParamToAllProperties]= useState(false);
  


    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/portal')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])


const {user, getCurrentUser} = useAuth();
useEffect(() =>{     
  getCurrentUser();

},[])

const [properties, setProperties] = useState<Property[]>();

const getProperties = async () => {     
    const {data}= await propertiesToPortal();
    setProperties(data as Property[]) ;
    localStorage.removeItem('images')
      
}
useEffect(() =>{      
    getProperties();
   
},[])

   const getBooleanCloseModal = (param:boolean)=> { 
    setParamToCloseModal(param);
    
   }

   const[modalSearch,setModalSearch] = useState(false);

   const handleOpenModal= ()=>{
    setModalSearch(modalSearch=>!modalSearch)

   }
 
   const destacar = 'destacar'
   const superDestaque= 'super destaque'
   const remover = 'remover imoveis'
   const removerDestaque= 'remover destaque'

   //seleciona os imoveis para o portal depois salva
   const [selectedItems,setSelectedItems]= useState<number[]>([]);
    const checkboxHandler = (e:any) => {
      let isSelected= e.target.checked;
      let value= parseInt(e.target.value);
      if(isSelected){
        setSelectedItems([...selectedItems,value])
      }else{
        setSelectedItems((prevData) =>{
         return  prevData.filter((id) =>{
            return id!==value;
         })
        })
      }
    }

    const [checked,setChecked]= useState(false);

    const checkAllHandler= ()=>{

      if( properties?.length === selectedItems.length){
          setChecked(false)
        setSelectedItems([])
      }else {
        setChecked(true)
     
    const postIds= properties?.map((item) => {
        return item.id
      })

      setSelectedItems(postIds as number[]);
      
      }
    }
      console.log(selectedItems)
    return(
      <>
        {user?.perfis?.[0] === 'TENANT' ? 
      <div>
    
 
    <PropertiesBackground>
       <Header /> 
      <BarTop />
       <BodyPropertiesContainer>
        
        <TitleWrapper>
         
        <h1 className='title-properties'> Portais<IoIosArrowRoundForward />Portal</h1>
          
         <div className='button-wrapper'><button onClick={handleOpenModal} className="button-add-lead" > <VscHome className="icon-add-lead"/>Adicionar</button>
         <button onClick={handleOpenModal} className="button-config" ><AiOutlineTool  className='icon-config'/></button>
         </div>

        <Modal 
                isOpen={modalSearch}
                onRequestClose={handleOpenModal}    
                className='Modall'                       
              >
                <CardPortal  />
             </Modal>
                
        </TitleWrapper>
          <main className='main-container'>
          <div className='container-info'>
          <div className='bar-info'><BiCaretUpCircle /><span>Portal</span></div>
             <div className='info'>
               
              <div className='img-wrapper'>
                <img src={imageDefault}/>

              </div>
            <div>
              <h5>Tipo</h5>
              <span>Portal pago</span>
              </div>
            <div>
                <h5>Anúncios</h5>
                <span>1/10</span>
              </div>
            <div>
            <h5>Link integração</h5>
           <div> <span>http://api.standi.com.br/..</span> <span className='copy-link'>copiar</span></div>
            </div>

             </div>
             </div>
        
        
             <div className='container-properties'>
             <div className='bar-properties'>
                <div className='title-icon-wrapper'> <IoHomeOutline className='icon-property-bar'/>
                    <span>Imóveis</span>
                  </div> 
                      <div className='select-button-wrapper'>
                        <select placeholder='Acões'>
                          <option hidden>Ações</option>
                          <option>{destacar}</option>
                          <option>{superDestaque}</option>
                          <option>{remover}</option>
                          <option>{removerDestaque}</option>
                          </select>
                        <button>Salvar</button>
                      </div>
              </div>
                  
              <div className='properties'>

              <div className='checkbox-property-wrapper-all'>
              <input type='checkbox' onClick={checkAllHandler} className='check-all-property' checked={checked}/>
              <span>Selecionar tudo</span>

              </div> 
           
                {properties && properties.map(property =>(
               
               
                <div className='property-group'>
                  <input onChange={checkboxHandler} type='checkbox' value={property.id} checked={selectedItems.includes(property.id)} className='checkProperty'/> 
              <div className='property-wrapper'>
                  <div className='img-data-principal-wrapper'>
                    <div className='img-wrapper-property'><img src={imageDefault} /></div>                
                        <div className='data-property-info-left'>
                          <span className='property-data-info-left-item'>nome da propriedade fica aqui fsfffssfsdfsdfs454545445fs54345545454fsf</span>
                          <span className='property-data-info-left-item'>Rua Almirante tamandare3343434344545444543, 44545445454523234343434</span>
                        </div>
                      </div>
                        <div className='property-data-right-wrapper'>
                            <div className='data-property-info-right'>
                             <div className='data-item-wrapper'><MdOutlineBedroomChild className='icon-data-property'/><span className='property-data-info-right-item'> 1</span></div> 
                             <div className='data-item-wrapper'><BiCaretUpCircle className='icon-data-property' /><span className='property-data-info-right-item'> 2</span></div> 
                             <div className='data-item-wrapper'><IoCarSportOutline className='icon-data-property'/> <span className='property-data-info-right-item'>3</span></div> 
                            </div>

                            <div className='data-property-info-right'>
                                <div className='data-item-wrapper'><span className='property-data-info-right-item'>R$1</span></div> 
                                <div className='data-item-wrapper'><span className='property-data-info-right-item'>Venda</span></div> 
                                <div className='data-item-wrapper'> <span className='property-data-info-right-item'>Casa</span></div> 
                            </div>
                         </div>
                            <div><IoIosArrowForward className='icon-arrow-detail'/></div>
                            
                        </div>         
                </div>
                ))}

              </div>
              
         </div>
          </main>
        
       </BodyPropertiesContainer>
    </PropertiesBackground>

    </div>
    : <PageNotFound/>}
    </>
    )

}

export default Portal;