import {BarTopContainer} from './styles';
import {MdKeyboardArrowDown} from 'react-icons/md';
import logoDynamous from '../../assets/images/logo-site.png';
import Button from '../Button';

const BarTop = ()=>{
  
    return(
    <BarTopContainer>
          <img src={logoDynamous} alt='logo'/>

<p> "Você está usando a <strong>Dynamob</strong>, a melhor plataforma para corretores"</p>
<Button>Compartilhar Plataforma </Button>
 <div className='arrow-top'>
     < MdKeyboardArrowDown />

 </div>
 <div className='circle-top'>

 </div>

    </BarTopContainer>
            
        
    )
}

export default BarTop;