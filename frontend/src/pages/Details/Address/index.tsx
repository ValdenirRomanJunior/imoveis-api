import { AddressContainer } from "./styles";

type PropAddress = {
    address:{
     cep:string,
     city:string,
     district:string,
     street:string,
     number:string
   };
 }

const Address = ({address}:PropAddress) =>{

 
    return(
   <AddressContainer>
    <div><span>CEP</span><div className="address-value-wrapper"><span>{address?.cep}</span></div></div>
    <div><span>Município</span><div className="address-value-wrapper"><span>{address?.city}</span></div></div>
    <div><span>Bairro</span><div className="address-value-wrapper"><span>{address?.district}</span></div></div>
    <div><span>Logradouro</span><div className="address-value-wrapper"><span>{address?.street}, <span>{address?.number}</span></span></div></div>

   </AddressContainer>
               
           
       )
   }
   
   export default Address;