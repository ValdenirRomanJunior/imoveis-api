
import {LeadItemContainer, LeadWrapper} from "./styles";
import {BsPersonFill} from 'react-icons/bs';
import Button from "../../../components/Button";

interface LeadListItem {
    name: string,
    value: number,
    localization: string
    
}

const LeadCard = ({name,value,localization}: LeadListItem)  => {

    return(
     <LeadWrapper>
       
            
                <div><BsPersonFill className="icon-lead"/></div>
                <div className="data-lead-wrapper">
                <h3>Valdenir Roman</h3>
                <span className="number-lead">85982251426</span>
                <span>vromanjunior@outlook.com</span>
                </div>
                
                <Button className="button-leads">VER DETALHES</Button>
               
            
        
     </LeadWrapper>
    )


}

const CardProperty = ()=>{

    const properties : LeadListItem [] = [
        {           
            name: 'Propriedade1',
            value: 2500.00,
            localization: 'caucaia, cumbuco, 247'
        },
        {  
            name: 'Propriedade2',
            value: 2500.00,
            localization: 'caucaia, cumbuco, 247'
        },
        {  
            name: 'Propriedade3',
            value: 2500.00,
            localization: 'caucaia, cumbuco, 247'
        }

    ]
    return(
        <LeadItemContainer>
            {properties.map(property => <LeadCard {...property} />)}
         </LeadItemContainer>
    
    )

}

export default CardProperty;