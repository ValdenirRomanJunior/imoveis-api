import {BarTopContainer} from './styles';
import {MdKeyboardArrowDown} from 'react-icons/md';
import logoDynamous from '../../assets/images/logo-site.png';
import Button from '../Button';

const BarTop = ()=>{
  
    return(
    <BarTopContainer>
          <img src={logoDynamous} alt='logo'/>

<p> "Você está usando o <strong>app-dynamous</strong>, simplificando o dia do corretor"</p>

<a  href='https://www.dynamous.com.br/' target="_blank"><Button>Website Dynamous</Button> </a>
 <div className='arrow-top'>
     < MdKeyboardArrowDown />

 </div>
 <div className='circle-top'>

 </div>

    </BarTopContainer>
            
        
    )
}

export default BarTop;