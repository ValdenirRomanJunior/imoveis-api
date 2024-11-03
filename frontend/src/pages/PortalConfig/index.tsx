import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';

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

import SearchDesktop from '../../components/SearchDesktop';

import { AiOutlineTool } from 'react-icons/ai';
import imageDefault from '../../assets/images/no-pictures.png';
import { Property } from '../../types/property';
import { propertiesToPortal } from '../../services/resources/property';
import { MdAttachMoney, MdOutlineBedroomChild, MdOutlineSell } from 'react-icons/md';
import { TbBath } from "react-icons/tb";
import { IoCarSportOutline, IoHomeOutline } from 'react-icons/io5';
import { IoIosArrowRoundForward } from "react-icons/io";


const PortalConfig = ()=>{

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
          navigate('/portalConfig')
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
         
        <h1 className='title-properties'> Portais<IoIosArrowRoundForward />Portal<IoIosArrowRoundForward />configuração</h1>
          

                
        </TitleWrapper>

          <main className='main-container'>

          <div className='container-info'>
          <div className='bar-info'><BiCaretUpCircle /><span>Portal</span></div>
             <div className='info'>
        <div className='data-left-side'>
              <div className='img-wrapper'>
                <img src={imageDefault}/>
              </div>
              </div>    
              <div className='data-info-wrapper'>
              <div className='data-info-status-wrapper'>  

            <div className='status-wrapper'>
              <h5>Status</h5>
             <div className='input-wrapper-active'>
               <div className='input-radio-wrapper'><input type='radio'/><span>ativar</span></div>
               <div className='input-radio-wrapper'><input type='radio'/><span>desativar</span></div>
             </div>  
              </div>
             
            <div>
                <h5>Endereço imóvel</h5>
                <span>1/10</span>
              </div>
              </div>
            <div>
            <h5>Link integração</h5>
           <div> <span>http://api.standi.com.br/..</span> <span className='copy-link'>copiar</span></div>
            </div>
            </div>
             </div>
    </div>
        
                  <div className='container-plan'>
                  <div className='bar-info'><BiCaretUpCircle /><span>Configuração do plano</span></div>
                  <div className='plan'>
                    <div className='input-wrapper'>
                        <label>Total de Anúncios*</label>
                        <input type='text' placeholder='total do plano'/>
                    </div>
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

export default PortalConfig;