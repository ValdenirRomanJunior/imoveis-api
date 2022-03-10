import React from 'react'
import Header from './Header';
import Main from './Main';
import Properties from './Properties';
import {HomeContainer,MainContainer,} from './styles';

const Home = ()=>{
    return(
       <HomeContainer>
           <MainContainer>
           <Header/>       
           <Main />
           <Properties />
           </MainContainer>
           
       </HomeContainer>
    )
}

export default Home