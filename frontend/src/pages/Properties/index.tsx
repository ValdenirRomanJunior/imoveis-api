import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import CardProperty from './CardProperty';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import {VscHome } from 'react-icons/vsc';
import {IoIosAdd, IoIosArrowRoundForward} from 'react-icons/io';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import PageNotFound from '../../components/PageNotFound';
import useAuth from '../../hooks/useAuth';
import {BiBorderRadius, BiSearch} from 'react-icons/bi'
import Modal from 'react-modal';
import Search from '../../components/Search';
import  './styleModal.css';
import SearchDesktop from '../../components/SearchDesktop';


const Properties = ()=>{

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
          navigate('/properties')
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


  const getParamsToSearch = (id:string,state:string,city:string,goal:string,type:string) => {
    
    
     if(id.length === 0 && state.length === 0 && city.length === 0 && goal.length === 0 && type.length === 0){
    
      setState('');
      setCity('');
      setGoal('');
      setType('');
      setId('');
      setParamToAllProperties(true);
     }
     else{
      setState(state);
      setCity(city);
      setGoal(goal);
      setType(type);
      setId(id);
      setParamToAllProperties(false)
     }   
  }

    
   const getBooleanCloseModal = (param:boolean)=> { 
    setParamToCloseModal(param);
    
   }

    const handleToFeatured = ()=>{
        navigate("/featured")
    }
    let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');

 
    
    return(
      <>
        {perfilTenant? 
      <div>
    
 
    <PropertiesBackground>
       <Header /> 
      <BarTop />
      <div className="title-steps"><BiBorderRadius className="icon-title-steps"/><h2>Imóveis</h2></div>
       <BodyPropertiesContainer>
     
        <TitleWrapper>
         
        <h2 className='featured-properties' onClick={handleToFeatured}>Ver Destacados</h2>
        
      
        <Search param={paramToCloseModal} onChange={getParamsToSearch} />
        <Link to="/registration"> <button className="button-add-lead" >
        <VscHome className="icon-add-lead"/> <IoIosAdd className='icon-add-lead-positive'/></button> </Link>
        <SearchDesktop param={paramToCloseModal}  onChange={getParamsToSearch}/>
       
        </TitleWrapper>
       
        <CardProperty paramToGetAll={paramToGetAllProperties} onChange={getBooleanCloseModal}  id={idAux} state={stateAux} city={cityAux} goal={goalAux} type={typeAux}  />
       </BodyPropertiesContainer>
    </PropertiesBackground>

    </div>
    : <PageNotFound/>}
    </>
    )

}

export default Properties;