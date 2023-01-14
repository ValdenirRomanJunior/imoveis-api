import {LeadMessageContainer} from "./styles";
import {HiOutlineMailOpen} from 'react-icons/hi'

const LeadMessage = () => {
    return(
    <LeadMessageContainer>
        <HiOutlineMailOpen className="icon-message" />
        <p>Olá, meu nome é valdenir, gostaria de mais informações</p>
    </LeadMessageContainer>
    )
}

export default LeadMessage;