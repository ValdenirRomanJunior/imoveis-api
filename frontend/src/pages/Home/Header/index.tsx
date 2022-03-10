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
          <div className='menu-box'>
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Buy</li>
              <li>Sell</li>
            </ul>
          </nav>
            <div className='listing-button'><span>LISTING</span></div>
            </div>
       <div className='login-lets-box'>
        <p className='login'>Log In </p>
        <span className='lets'>Let's start</span>
        </div>

        <div className='menu-hamburguer'>
          <span>MENU</span>
        <GiHamburgerMenu />
        </div>


      </HeaderContainer>
    )
}

export default Header