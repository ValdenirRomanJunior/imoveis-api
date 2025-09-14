import {LoadingPageContainer} from './styles';
import {TailSpin} from 'react-loader-spinner';

const LoadingPage = () =>{
 
    return(
       <LoadingPageContainer>      
         <TailSpin wrapperClass='spin-loading' height='27' width='27'  color='#3d3dff' radius="1"  visible={true}/>
        </LoadingPageContainer>
       

    )
   

}

export default LoadingPage;