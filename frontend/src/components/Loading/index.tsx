import {BodyLoading} from './styles';
import {ThreeDots,TailSpin} from 'react-loader-spinner';

const Loading = () =>{
 
    return(
        <BodyLoading >        
         <TailSpin height='27' width='27' ariaLabel='Loading' color='#fff' radius="1"  visible={true}/>
        <p>Aguarde</p> 
        </BodyLoading>
       

    )
   

}

export default Loading;