import { WhatsappWrapper } from "./styles";
import WhatsAppIcon from '../../../assets/images/whatsapp.png';

const WhatsappButton = () => {


    return(
        <WhatsappWrapper href="https://api.whatsapp.com/send?phone=5588993170211">
                <img src={WhatsAppIcon} alt="" className="whatsapp-icon"/>
                <span className="whatsapp-text">Whatsapp</span>
                <span className="whatsapp-number">(88) 99317-0211</span>
            </WhatsappWrapper>
    )

}

export default WhatsappButton;

