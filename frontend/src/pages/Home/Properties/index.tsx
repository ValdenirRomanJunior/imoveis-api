import React from 'react'
import {PropertiesWrapper,PropertiesContainer,PaginationCard,ButtonViewMore} from './styles';
import {MdArrowBackIos,MdArrowForwardIos} from 'react-icons/md';
import PropertySite from '../PropertySite';



const Properties = () =>{
    return(
        <PropertiesWrapper>
             <h2>Latest Fix and Flip Houses For Sale</h2>
        <p>SOMETHING WRITE HERE, SOMETHING WRITE HERE</p>
        <PropertiesContainer>
       
        <PaginationCard className='left'><MdArrowBackIos size={40} color="#fff"/></PaginationCard>
       
                <PropertySite />
                <PropertySite />
                <PropertySite />
                <PropertySite />

        <PaginationCard className='right'><MdArrowForwardIos size={40} color="#fff" /></PaginationCard>
     
        </PropertiesContainer>
        <ButtonViewMore>
            <span>VIEW MORE</span>
        </ButtonViewMore>
        </PropertiesWrapper>
      
            
           

      
    )
}

export default Properties