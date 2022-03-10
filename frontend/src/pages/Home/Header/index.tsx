import React from 'react'
import {HeaderContainer} from './styles';
import logo from '../../../assets/images/logo.png';
import {GiHamburgerMenu} from 'react-icons/gi';

const Header = () =>{
    return(
      <HeaderContainer>
          <div className='logo-wrapper'>
          <img src={logo} alt='Logo oppenterprise'/>
          </div>
       
        <p className='login'>Login </p>
        <span className='lets'>Let's start</span>
        <div className='menu-hamburguer'>
          <span>MENU</span>
        <GiHamburgerMenu />
        </div>


      </HeaderContainer>
    )
}

export default Header