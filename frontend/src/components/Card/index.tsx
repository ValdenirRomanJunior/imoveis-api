
import {CardContainer} from './styles'; 

interface CardProps {
    width?: string;
    children?: React.ReactNode;
    height?: string;
    noShadow?: boolean;
    paddingTop?:string;
    borderRadius?: string;
    border?: string;
    margin?: string;
    background?: boolean;

  
}


const Card = ({
    children,
    width='100%',
    height='auto',
    noShadow=false,
    paddingTop='10px;',
    borderRadius='20px',
    border='0px',
    margin='0',
    background=true
    
 
    
}: CardProps) => {
    return (
      <CardContainer width={width} height={height} noShadow={noShadow} paddingTop={paddingTop} borderRadius={borderRadius} border={border} margin={margin} background={background}>
             {children}

      </CardContainer>
    )
}

export default Card;