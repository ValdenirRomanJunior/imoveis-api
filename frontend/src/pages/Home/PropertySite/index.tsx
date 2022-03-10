import Card from '../../../components/Card';
import {PropertySiteContainer,CardImage,PriceContainer,TitleAndAdressContainer, DescriptionContainerBottom} from './styles';




const PropertySite = () =>{

    const Property = {
        image:"https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        price: 256000,
        title:"Title here",
        adress:"adress here adress here",
        bed: 3,
        baths:2.5,
        built:2010,
        sqft: 2994


    };

    return(
        <PropertySiteContainer>
               
            <CardImage>
                <img src={Property.image} />
            </CardImage>
            <PriceContainer>
                <span className='price'>R$ {Property.price}</span>
            </PriceContainer>
            <TitleAndAdressContainer>
                <h2>{Property.title}</h2>
                <p>{Property.adress}</p>
            </TitleAndAdressContainer>
            <DescriptionContainerBottom>
                <div>
                <p>{Property.bed}</p>
                <span>Beds</span>
                </div>
                    <div>
                    <p>{Property.baths}</p>
                    <span>Baths</span>
                    </div>
                        <div>
                        <p>{Property.built}</p>
                        <span>Yr Built?</span>
                        </div>
                        <div>
                        <p>{Property.sqft}</p>
                        <span>Sq Ft</span>
                        </div>
            </DescriptionContainerBottom>
        
     
        
        </PropertySiteContainer>
     
      
            
           

      
    )
}

export default PropertySite