
import {Wrapper, Background, InputContainer, ButtonContainer} from './styles';

import Card  from '../../components/Card';
import background  from '../../assets/images/fundo-login.png';
import logoDynamous from '../../assets/images/logo-preto.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {

    const navigate = useNavigate();


    const handleToSignIn = () =>{
        navigate('/dashboard');
    }
    return (
        <Wrapper>
            <Background image={background} />
            <Card width="403px">
            <img src={logoDynamous} width={172} height={61} alt="logo dynamous" />
        
            <InputContainer>
            <Input placeholder='EMAIL' />
            <Input placeholder='SENHA' type="password" />
            </InputContainer>

            <ButtonContainer>
                <Button type="button" onClick={handleToSignIn}>Entrar</Button>
                <p>Ainda não tem acesso? <Link to="/home">Voltar para home</Link></p>
            </ButtonContainer>       
            
            </Card>
       </Wrapper>
    )
}

export default SignIn