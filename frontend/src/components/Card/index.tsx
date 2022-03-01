
import {CardContainer} from './styles'; 

interface CardProps {
    width?: string;
    children?: React.ReactNode;
    height?: string;
    noShadow?: boolean
    marginTop?: string;
}


const Card = ({
    children,
    width='100%',
    height='auto',
    noShadow=false,
    marginTop='20px'
    

}: CardProps) => {
    return (
      <CardContainer width={width} height={height} noShadow={noShadow} marginTop={marginTop}>
             {children}

      </CardContainer>
    )
}

export default Card;