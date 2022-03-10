import React from 'react'
import {PropertiesContainer,PaginationCard} from './styles';
import {MdArrowBackIos,MdArrowForwardIos} from 'react-icons/md';
import PropertySite from '../PropertySite';



const Properties = () =>{
    return(
        <PropertiesContainer>
        <h2>Latest Fix and Flip Houses For Sale</h2>
        <p>SOMETHING WRITE HERE, SOMETHING WRITE HERE</p>
        <PaginationCard className='left'><MdArrowBackIos size={40} color="#fff"/></PaginationCard>
        <PropertySite />
        <PaginationCard className='right'><MdArrowForwardIos size={40} color="#fff" /></PaginationCard>
        </PropertiesContainer>
      
            
           

      
    )
}

export default Properties