
import {CardContainer} from './styles'; 

interface CardProps {
    width?: string;
    children?: React.ReactNode;
    height?: string;
    noShadow?: boolean
    marginTop?: string;
    padding?: boolean;
}


const Card = ({
    children,
    width='100%',
    height='auto',
    noShadow=false,
    marginTop='20px',
    padding=false
    

}: CardProps) => {
    return (
      <CardContainer width={width} height={height} noShadow={noShadow} marginTop={marginTop} padding={padding}>
             {children}

      </CardContainer>
    )
}

export default Card;