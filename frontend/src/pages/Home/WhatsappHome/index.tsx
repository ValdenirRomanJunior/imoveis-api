import { WhatsappWrapper } from "./styles";
import WhatsAppIcon from '../../../assets/images/whatsapp.png';

interface WhatsappButtonProps {
    whatsappNumber?: string;
}

const WhatsappHome = ({ whatsappNumber }: WhatsappButtonProps) => {
    // Debug: Log do valor recebido
    console.log('WhatsappButton - Valor recebido (phone):', whatsappNumber);
    
    // Número padrão caso não seja fornecido
    const defaultNumber = "5545988348165";
    const defaultDisplay = "(45) 98834-8165";
    
    // Usar o número do phone do header se disponível
    let phoneNumber = defaultNumber;
    let displayNumber = defaultDisplay;
    
    if (whatsappNumber && whatsappNumber.trim() !== '') {
        console.log('WhatsappButton - Usando número do header (phone):', whatsappNumber);
        // Se o número do telefone foi fornecido, usar ele
        phoneNumber = whatsappNumber.replace(/[^0-9]/g, ''); // Remove formatação
        displayNumber = whatsappNumber; // Mantém a formatação original para exibição
        
        // Se não tem formatação, aplicar formatação padrão brasileira
        if (!/[\(\)\-\s]/.test(whatsappNumber)) {
            const cleaned = phoneNumber;
            if (cleaned.length === 11) {
                displayNumber = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
            } else if (cleaned.length === 13 && cleaned.startsWith('55')) {
                displayNumber = `(${cleaned.substring(2, 4)}) ${cleaned.substring(4, 9)}-${cleaned.substring(9)}`;
            }
        }
    } else {
        console.log('WhatsappButton - Usando número padrão');
    }
    
    console.log('WhatsappButton - Número final para link:', phoneNumber);
    console.log('WhatsappButton - Número final para exibição:', displayNumber);

    return(
        <WhatsappWrapper href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}>
                <img src={WhatsAppIcon} alt="" className="whatsapp-icon"/>
                <span className="whatsapp-text">Whatsapp</span>
                <span className="whatsapp-number">{displayNumber}</span>
            </WhatsappWrapper>
    )

}

export default WhatsappHome;

