import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import Header from '../../components/Header';
import CardProperty from './CardProperty';
import {PropertiesBackground,BodyPropertiesContainer,TitleWrapper} from './styles';
import BarTop from '../../components/Bartop';
import { Link, useNavigate } from 'react-router-dom';
import {VscHome } from 'react-icons/vsc';
import {IoIosAdd} from 'react-icons/io';
import { refreshToken } from '../../services/resources/user';
import LoadingLogin from '../../components/LoadingLogin';
import PageNotFound from '../../components/PageNotFound';
import useAuth from '../../hooks/useAuth';
import {BiSearch} from 'react-icons/bi'
import Modal from 'react-modal';
import Search from '../../components/Search';
import  './styleModal.css';
import SearchDesktop from '../../components/SearchDesktop';


const Properties = ()=>{

    const navigate = useNavigate();

    const[id,setId]= useState('');
    const[state,setState]= useState('');
    const[city,setCity]= useState('');
    const[goal,setGoal]= useState('');
    const[type,setType]= useState('');
  

    const [loadingLogin,setLoadingLogin]= useState(true);

    useEffect(() =>{
       
      setTimeout(() =>{
          setLoadingLogin(false)
      },1000)

  },[])

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
    setState(state);
    setCity(city);
    setGoal(goal);
    setType(type);
    setId(id);
   

 
  }

   const getBooleanCloseModal = (param:boolean)=> {
    
    return param;
    
   }

    
    return(
      <>
        {user?.perfis?.[0] === 'TENANT' ? 
      <div>
      { loadingLogin &&  <LoadingLogin/> }
 
    <PropertiesBackground>
       <Header /> 
      <BarTop />
       <BodyPropertiesContainer>
        
        <TitleWrapper>
         
        <h1 className='title-properties'>Meus Imóveis</h1>
        
        <Search param={getBooleanCloseModal} onChange={getParamsToSearch} />
        <Link to="/registration"> <button className="button-add-lead" >
        <VscHome className="icon-add-lead"/> <IoIosAdd className='icon-add-lead-positive'/></button> </Link>
        <SearchDesktop onChange={getParamsToSearch}/>
       
        </TitleWrapper>
       
        <CardProperty onChange={getBooleanCloseModal}  id={id} state={state} city={city} goal={goal} type={type}  />
       </BodyPropertiesContainer>
    </PropertiesBackground>

    </div>
    : <PageNotFound/>}
    </>
    )

}

export default Properties;