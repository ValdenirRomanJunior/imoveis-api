import { DetailContainer  } from "./styles";


type PropDetail = {
   details:{
    typeProperty:string,
    goal:string,
    area:string,
    numberRooms:string,
    bathRooms:string,
    vacancies:string,
    areaTotal:string
  };
}

const Detail = ({details}:PropDetail) =>{

 return(
    <DetailContainer>
        <div><span>Tipo</span> <div className="detail-value-wrapper"><span className="type-value">{details.typeProperty}</span></div></div>
        <div><span>Finalidade</span><div className="detail-value-wrapper"><span className="goal-value">{details.goal}</span></div></div>
        <div><span>Área construída</span><div className="detail-value-wrapper"><span className="area-value">{details.area}m²</span></div></div>
        <div><span>Área total</span><div className="detail-value-wrapper"><span className="area-value">{details.areaTotal}m²</span></div></div>
        <div><span>Quartos</span><div className="detail-value-wrapper"><span className="numberRoom-value">{details.numberRooms}</span></div></div>
        <div><span>Banheiros</span><div className="detail-value-wrapper"><span className="bathRoom-value">{details.bathRooms}</span></div></div>
        <div><span>Vagas</span><div className="detail-value-wrapper"><span className="vacancies-value">{details.vacancies}</span></div></div>
       
    </DetailContainer>
            
        
    )
}

export default Detail;