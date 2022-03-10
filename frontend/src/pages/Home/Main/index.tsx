import React from 'react'
import {MainWrapper,BackgroundContainer,TextContainer,SearchContainer} from './styles';
import bgPrincipalmob from '../../../assets/images/bg-principal-mob.png';
import {BsSearch} from 'react-icons/bs';



const Main = () =>{
    return(
        <MainWrapper>
            < BackgroundContainer image={bgPrincipalmob } />
            <TextContainer>
            <h1 className='principal-title'>Finding the key for your new home.</h1>
            <p className='subtitle'>Discover  real estate, new homes, shop mortgages, find property records & take virtual tours of houses,
                condos & apartments</p>
            </TextContainer>
            <SearchContainer>
                <input type='text' placeholder='city, state, zipcode' />
                <button type='submit'><BsSearch />  </button>
            </SearchContainer>
            
           
        </MainWrapper>


      
    )
}

export default Main