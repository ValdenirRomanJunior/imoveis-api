import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {DetailsBackground,DetailsBodyContainer, Localization,Description,PhotosContainer,CardWrapper} from './styles';
import {BiMap} from 'react-icons/bi';
import Detail from './Detail';
import Address from './Address';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { findProperty } from '../../services/resources/property';
import { useEffect, useState } from 'react';
import { Property } from '../../types/property';
import "./styles.css";
import Carousel from 'react-elastic-carousel';
import defaultImage from '../../assets/images/no-pictures.png'




const Details = ()=>{
    
    const params = useParams();

    const [property, setProperty]= useState<Property>();

    

  

    const getProperty = async() => {             
        const dataProperty = await findProperty(`${params.propertyId}`);
        setProperty(dataProperty) ;
        console.log(property as Property)
        
    }

    useEffect(() => {
        getProperty();
        
    }, [`${params.propertyId}`]);

    const details = {
        type:property?.type as string, 
        goal:property?.goal as string,
        area:property?.area as string,
        numberRooms:property?.numberRooms as string,
        bathRooms:property?.bathRooms as string,
        vacancies:property?.vacancies as string,

    }

    const address = {
        cep:property?.address.cep as string,
        city:property?.address.city.name as string,
        district:property?.address.district as string,
        street:property?.address.street as string,
        number:property?.address.number as string

    }

   
    const breakPoints = [
        {width: 1, itemToShow: 1},
        {width: 550,  itemToShow: 2, itemToScroll: 2},
        {width: 768, itemToShow: 3},
        {width: 1200, itemToShow: 4},
    ]

    return(
    <DetailsBackground>
            <Header />
             <BarTop />
        <DetailsBodyContainer>
     
        <PhotosContainer>
                  <div className='container'>
                    <div className='controls-wrapper'>

                    </div>
                    <hr className='seperator'/>
                    <div className='carousel-wrapper'>
                        <Carousel isRTL breakPoints={breakPoints}>
                         
                        {property?.images && property.images.map((photo) =>           
                               <CardWrapper>
                              <img src={photo.url}  alt="algo"/>
                              
                             </CardWrapper>)}
                             {property?.images?.length===0 as number  && ( <CardWrapper><img src={defaultImage}/></CardWrapper>)}
                                 
               
                        </Carousel>

                    </div>
                  </div>
               
             </PhotosContainer>
         
         
         <h2 className='price'>R$ {property?.price}</h2>
         <Localization>
        <BiMap />
        <p>{property?.address.street}, {property?.address.number}, {property?.address.district}, {property?.address.city.name}</p>
         </Localization>
         <h3 className='title'>{property?.name}</h3>
         <h4 >Descrição</h4>
        <Description>
        <p>{property?.description}
        </p>
      
        </Description>
        <h4>Detalhes </h4>
        <Detail details={details}/>
        <h4>Endereço</h4>
        <Address address={address}/>

        
    <div className='button-wrapper'><Button style={{marginBottom: 0, borderRadius: "40px", width: "80%"}}>Copiar link</Button></div>
    </DetailsBodyContainer>
    </DetailsBackground>
            
        
    )
}

export default Details;