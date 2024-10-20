import {BodyLoading} from './styles';
import {ThreeDots,TailSpin} from 'react-loader-spinner';

const Loading = () =>{
 
    return(
        <BodyLoading >        
         <TailSpin height='20' width='20' ariaLabel='Loading' color='#fff' radius="1"  visible={true}/>
        
        </BodyLoading>
       

    )
   

}

export default Loading;