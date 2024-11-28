import BarTop from "../../components/Bartop";
import Header from "../../components/Header";

import { CardContent, CardWrapper, InputRangeProperty, StatusProperty, StepsBackground, StepsContainer } from "./styles";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {IoCloseOutline} from 'react-icons/io5'
import "../Leads/ModalStyle.css";
import { BsPersonPlus, BsTrash } from "react-icons/bs";
import { currency, number, phone } from "../Registration/masks";
import { deleteStep, editStep, newStep, stepsOpportunity } from "../../services/resources/lead";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { refreshToken } from "../../services/resources/user";
import LoadingLogin from "../../components/LoadingLogin";
import PageNotFound from "../../components/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import useAuth from "../../hooks/useAuth";
import { BiBorderRadius, BiMap } from "react-icons/bi";
import { Step } from "../../types/opportunity";
import { IoMdAdd } from "react-icons/io";
import Card from "../../components/Card";
import { AiOutlineEdit } from "react-icons/ai";
import { MdPublishedWithChanges } from "react-icons/md";
import { Property } from "../../types/property";
import { propertiesFeatured } from "../../services/resources/property";
import defaultImage from '../../assets/images/no-pictures.png';
import React from "react";
import CardProperty from "./CardFeatured";

type Error = {
    fieldName:string;
    message:string;
}

const Featured = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const [errorLimite, setErrorLimite] = useState(false);

    const [loading,setLoading]= useState(false);
    const [properties,setProperties]=useState<Property[]>([]);


    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/featured')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])



    const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
     
      useEffect(() =>{       
        getCurrentUser();
          
    },[])


  

    let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');
    return(
        <>
        {perfilTenant? 
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
        
        <StepsBackground>
            <Header />
            <BarTop />
            <StepsContainer>

            <div className="title-steps"><BiBorderRadius className="icon-title-steps"/><h2>Destacados</h2></div>
           
            <CardProperty  />

            </StepsContainer>
        </StepsBackground>
        </div>
        </ErrorBoundary>
        : <PageNotFound/>}
        </>
    )
}

export default Featured;