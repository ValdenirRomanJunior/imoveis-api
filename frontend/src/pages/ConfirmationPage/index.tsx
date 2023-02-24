import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { sendConfirmationTenant } from '../../services/resources/tenant';
import {BodyConfirmationPage} from './styles';
import {AiOutlineCheckCircle} from 'react-icons/ai';

type Props = {
tenantEmail: string;
}
const ConfirmationPage = () => {
    const navigate = useNavigate();

    const [otherError, setOtherError] = useState(false);
    
    const [loadingTenant, setLoadingTenant]=useState(false);
    const param = useParams();

const handleToConfirmation = async() => {
    setLoadingTenant(true)
    const data= await sendConfirmationTenant(`${param.tenantEmail}`);

    if(data.status === 204){
        setTimeout(()=>{
            setOtherError(true)
        },2000)
             
        setLoadingTenant(false)

                      
      }
      else if(data.response.status === 404){
        
       
        setTimeout(()=>{
            setLoadingTenant(false)
            setOtherError(true)
        },2000)
       

        setTimeout(()=>{
            setOtherError(false)
        },5000)
    }
}

    return(
        <BodyConfirmationPage>
            
            { otherError ?  
                <div className='verified-email'> 
                <AiOutlineCheckCircle className='icon-verified-email'/>
                 <p className='text-verify'>Email verificado</p>
                 <Link to="/" className='link-verified-email'>Login</Link>
                 
                
                </div>
                       
                : 
               
                 <div className='verify-buttom-register-wrapper'>            
                {
                        !loadingTenant && <button className="loading-verify-button-send-confirmation" type='submit'><Loading/></button>
                    }
                    
                    {
                        loadingTenant &&
                        <button  className='verify-button-send-confirmation' onClick={handleToConfirmation}>Confirmar cadastro</button>
                    }
                </div>
              
                }

        </BodyConfirmationPage>
    )

}

export default ConfirmationPage;