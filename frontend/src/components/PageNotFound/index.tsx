import { Link } from 'react-router-dom';
import {BodyPageNotFound} from './styles';
import {VscError} from 'react-icons/vsc'

const PageNotFound = () =>{
    return(

       <BodyPageNotFound>
        <div>
            <p>Que pena, não encontramos esta página.</p>
            <VscError className='not-found-icon'/>
            <Link to="/dashboard" className='link-back'>Voltar para o início</Link>

        </div>
       </BodyPageNotFound>
    )
    }
 export default PageNotFound;