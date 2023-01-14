import { DetailContainer  } from "./styles";


type PropDetail = {
   details:{
    type:string,
    goal:string,
    area:string,
    numberRooms:string,
    bathRooms:string,
    vacancies:string
  };
}

const Detail = ({details}:PropDetail) =>{

 return(
    <DetailContainer>
        <div><span>Tipo</span> <div className="detail-value-wrapper"><span className="type-value">{details.type}</span></div></div>
        <div><span>Finalidade</span><div className="detail-value-wrapper"><span className="goal-value">{details.goal}</span></div></div>
        <div><span>Área construída</span><div className="detail-value-wrapper"><span>{details.area}</span></div></div>
        <div><span>Quartos</span><div className="detail-value-wrapper"><span>{details.numberRooms}</span></div></div>
        <div><span>Banheiros</span><div className="detail-value-wrapper"><span>{details.bathRooms}</span></div></div>
        <div><span>Vagas</span><div className="detail-value-wrapper"><span>{details.vacancies}</span></div></div>
       
    </DetailContainer>
            
        
    )
}

export default Detail;