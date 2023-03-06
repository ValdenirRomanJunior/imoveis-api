import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { sendConfirmationTenant } from '../../services/resources/tenant';
import {BodyConfirmationPage} from './styles';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import logo from '../../assets/images/logo-site.png';
import {BiXCircle} from 'react-icons/bi';

type Props = {
tenantEmail: string;
}
const ConfirmationPage = () => {
    const navigate = useNavigate();

 
    const [error, setError] = useState('');
    const [sucessReturn, setSucessReturn] = useState(false);
    
    const [loadingTenant, setLoadingTenant]=useState(false);
    const param = useParams();

const handleToConfirmation = async() => {
    setLoadingTenant(true)
    const data= await sendConfirmationTenant(`${param.tenantEmail}`);

    if(data.status === 204){
       
        setTimeout(()=>{
            setSucessReturn(true)
           
        },2000)
             
        setTimeout(()=>{
            setLoadingTenant(false)
          
        },2000)

                      
      }
      else if(data.response.status === 404){
        console.log(data.response.data.message)
        setError(data.response.data.message)
       
        setTimeout(()=>{
            setLoadingTenant(false)
            
        },2000)
       

      
    }
}

    return(
        <BodyConfirmationPage>
            
            { sucessReturn && 
                <div className='verified-email'> 
                <AiOutlineCheckCircle className='icon-verified-email'/>
                 <p className='text-verify'>Cadastro confirmado</p>
                 <Link to="/" className='link-verified-email'>Login</Link>                    
                </div> 
               
            } 
                   { error && 
                <div className='verified-email'> 
                <BiXCircle className='icon-error-verification'/>
                 <p className='text-verify'>{error}</p>
                 <Link to="/" className='link-verified-email'>Login</Link>                        
                </div> 
               
            } 
                { !sucessReturn && !error &&

                    <div className='page-confirmation-wrapper'>
                        <div className='logo-wrapper-confirmation'>
                        <img src={logo} alt='' />
                        </div>
                     <h2>Por favor confirme seu cadastro</h2>   
                 <div className='verify-buttom-register-wrapper'>            
                {
                        loadingTenant && <button className="loading-verify-button-send-confirmation" type='submit'><Loading/></button>
                    }
                    
                    {
                        !loadingTenant &&
                        <button  className='verify-button-send-confirmation' onClick={handleToConfirmation}>Confirmar cadastro</button>
                    }
                </div>
                </div>
                }

        </BodyConfirmationPage>
    )

}

export default ConfirmationPage;