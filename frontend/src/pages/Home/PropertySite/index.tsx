import Card from '../../../components/Card';
import {PropertySiteContainer,CardImage,PriceContainer,TitleAndAdressContainer, DescriptionContainerBottom} from './styles';




const PropertySite = () =>{

    const Property = {
        image:"https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg"
    };

    return(
        <PropertySiteContainer>
        <Card width='70%'padding>            
            <CardImage>
                <img src={Property.image} />
            </CardImage>
            <PriceContainer>
                <span className='price'>R$ 256,000</span>
            </PriceContainer>
            <TitleAndAdressContainer>
                <h2>Title here</h2>
                <p>adress here adress here</p>
            </TitleAndAdressContainer>
            <DescriptionContainerBottom>
                <div>
                <p>03</p>
                <span>Beds</span>
                </div>
                    <div>
                    <p>02</p>
                    <span>Baths</span>
                    </div>
                        <div>
                        <p>2010</p>
                        <span>Yr Built?</span>
                        </div>
                        <div>
                        <p>2010</p>
                        <span>Sq Ft</span>
                        </div>
            </DescriptionContainerBottom>
        
     
        </Card>
        </PropertySiteContainer>
     
      
            
           

      
    )
}

export default PropertySite