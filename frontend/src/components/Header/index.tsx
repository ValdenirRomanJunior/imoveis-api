import React from 'react';
import { HeaderContainer, HeaderWrapper, UserInfo} from './styles';
import logoDynamous from '../../assets/images/logo-preto.png';
import UserCircle from '../UserCircle';
import {useNavigate} from 'react-router-dom';



const  Header = () => {

    const navigate = useNavigate();

    const handleLogoff = ()=>{
        navigate('/')
    }
    return(
        <HeaderContainer>
            <HeaderWrapper>
                <img src={logoDynamous} width={172} height={61} alt="logo dynamous"/>
                <UserInfo>
                   <UserCircle initials='PF'/>
                    <div>
                        <p>Olá. <span className='primary-color font-bold'>Junior</span></p>
                        <a href='#' onClick={handleLogoff}>Sair</a>
                    </div>
                </UserInfo>
            </HeaderWrapper>
            </HeaderContainer>
     
    )
}

export default Header;