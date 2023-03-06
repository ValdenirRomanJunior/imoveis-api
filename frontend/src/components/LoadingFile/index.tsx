import {BodyLoading} from './styles';
import {TailSpin} from 'react-loader-spinner';

const LoadingFile = () =>{
 
    return(
        <BodyLoading >
                   
         <TailSpin height={''} width={''} wrapperClass='icon-send-file' ariaLabel='LoadingFile' radius="1"  visible={true}/>
        
        
        </BodyLoading>
       

    )
   

}

export default LoadingFile;