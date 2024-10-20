import { FaHome } from "react-icons/fa";
import {LeadMessageOppContainer} from "./styles";
import {HiOutlineMailOpen} from 'react-icons/hi'
import { RiMessage2Fill } from "react-icons/ri";

type PropMessage = {
    message:string
}
const LeadMessageOpp = ({message}:PropMessage) => {
    return(
    <LeadMessageOppContainer>
        <h2 className='subtitle-opportunity'><RiMessage2Fill className='icon-message-opportunity'/>Mensagem do interessado</h2> 
          
        {message ?<span className="message-opportunity">{message }</span> : <span className="message-opportunity">Não há mensagem</span>   }
       
                       
    </LeadMessageOppContainer>
    )
}

export default LeadMessageOpp;