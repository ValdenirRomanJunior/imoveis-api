import BarTop from "../../components/Bartop";
import Header from "../../components/Header";

import { PortalsBackground, PortalsContainer } from "./styles";
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
import { BiBorderRadius } from "react-icons/bi";
import { Step } from "../../types/opportunity";
import "./style-modal-portal.css";
import { IoMdAdd } from "react-icons/io";
import  imgDefault from '../../assets/images/no-pictures.png';
import { MdArrowForwardIos } from "react-icons/md";

type Error = {
    fieldName:string;
    message:string;
}

const Portals = () => {

    const navigate = useNavigate();

    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate('/portais')
        }else{
            navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[])


    const [stepsOp, setSteps] = useState<Step[]>();

    const getSteps = async () => {     
        const {data}= await stepsOpportunity();
        setSteps(data as Step[]) ;
        localStorage.removeItem('images')
          
    }
    useEffect(() =>{      
        getSteps();
       
    },[])




    const ErrorHandler = () => {
        return <PageNotFound/>;
      }

      const {user, getCurrentUser} = useAuth();
     
      useEffect(() =>{       
        getCurrentUser();
          
    },[])

    const [status,setStatus]=useState(false)

        let perfilTenant=Object.values(user.perfis).some(obj => obj === 'TENANT');

    return(
        <>
        {perfilTenant? 
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div>
        
        <PortalsBackground>
            <Header />
            <BarTop />
            <PortalsContainer status={status}>

            <div className="title-steps"><BiBorderRadius className="icon-title-steps"/><h2>Portais</h2>
            
            </div>
            <div className="steps-wrapper">
                <div className="bar-top-ul">
                    <span className="title-portal">Portal</span>
                    <span className="title-announced">Anunciados</span>
                    <span className="title-status">Status</span>
                   
                </div>
                <ul>
                    
                    {stepsOp && stepsOp.map(steps => (
                                                   
                        <li>
                            <div className="img-name-wrapper">
                            <div className="img-wrapper-portal"><img src={imgDefault}/></div>
                            <span className="portal-name">{steps.name}</span>
                            </div>
                            <span className="announced" >1</span>
                        {status ?
                            <span className='status-value' >Ativo</span> : <span  className='status-value' >Ativo</span>
                        }
                         
                          <span className="link-detail"><MdArrowForwardIos className="icon-link-detail"/></span>
                        </li>     
                    ))}
                    
                </ul>
            </div>

        
                                   
            </PortalsContainer>
        </PortalsBackground>
        </div>
        </ErrorBoundary>
        : <PageNotFound/>}
        </>
    )
}

export default Portals;