import {BodyLoading} from './styles';
import {ThreeDots,TailSpin} from 'react-loader-spinner';

const Loading = () =>{
 
    return(
        <BodyLoading >        
         <TailSpin height='23' width='23' ariaLabel='Loading' color='#fff' radius="1"  visible={true}/>
        <span>Aguarde</span>
        </BodyLoading>
       

    )
   

}

export default Loading;