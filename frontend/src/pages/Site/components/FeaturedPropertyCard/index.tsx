import React, { useEffect, useState } from 'react'
 import { useSubdomain } from '../../../../components/SubdomainRouter';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty,DetailsCardWrapper} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap} from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import {HiHome} from 'react-icons/hi';
import Slider from "react-slick";


import { getPropertiesHome, searchProperties } from '../../Services/property';
import { Property, PropertyPage } from '../../types/property';
import './carousel-styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import defaultImage from '../../assets/no-pictures.png';



// Interface completa para as propriedades do Site
interface SiteProperty {
  id: number;
  name: string;
  price: string;
  goal: string;
  numberRooms: string;
  bathRooms: string;
  area: string;
  address: {
    id: number;
    street: string;
    number: string;
    district: string;
    cep: string;
    city: {
      id: number;
      name: string;
      state: {
        id: number;
        name: string;
      };
    };
  };
  images: Array<{
    id: number;
    url: string;
    idTenant: number;
  }>;
}

interface FeaturedPropertyCardProps {
  url: string;
  properties: SiteProperty[];
  buttonColor?: string;
}


const FeaturedPropertyCard = ({ url, properties, buttonColor = '#2563eb' }: FeaturedPropertyCardProps) => {
  const [featuredProperties, setFeaturedProperties] = useState<SiteProperty[]>(properties || []);

  useEffect(() => {
    if (properties && properties.length > 0) {
      setFeaturedProperties(properties);
    }
  }, [properties]);

  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        style={{ 
          ...style, 
          display: 'block',
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '2px 3px 6px -4px rgba(128,128,128,1)',
          cursor: 'pointer',
        
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            fontSize: '20px',
            color: buttonColor
          }
        }}
        onClick={onClick}
      >
        <span style={{ color: buttonColor, fontSize: '20px', fontWeight: 'bold' }}>›</span>
      </div>
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`}
        style={{ 
          ...style, 
          display: 'block',
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '-2px 3px 6px -4px rgba(128,128,128,1)',
          cursor: 'pointer',
        
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            fontSize: '20px',
            color: buttonColor
          }
        }}
        onClick={onClick}
      >
        <span style={{ color: buttonColor, fontSize: '20px', fontWeight: 'bold' }}>‹</span>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  };

  if (featuredProperties.length === 0) {
    return (
      <MessageNoProperties>
        Nenhum imóvel em destaque encontrado.
      </MessageNoProperties>
    );
  }

  return (
    <div className="featured-properties-slider">
      <Slider {...settings}>
        {featuredProperties.map((property) => (
          <div key={property.id}>
            <CardListItem {...property} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedPropertyCard;

const CardListItem = ({id,name,images,price,address,numberRooms,bathRooms,area,goal}: SiteProperty) =>{
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const slug = subdomainCompanyName || companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');
    const detailLink = isLocalhost ? `/site/${slug}/detail/${id}` : `/detail/${id}`;

    return(
        <CardContainer>
        <CardWrapper>               
              <CardContent>
                   <div className='image-card-property-home-wrapper'>                   
                    {images?.[0]?.url ?  <Link to={detailLink} className='link-card-property-home'><LazyLoadImage effect='opacity' dir="vertical"  src={images?.[0].url } className='image-card-property-home'/> </Link>
                    :
                    <Link to={detailLink} className='link-card-property-home'><LazyLoadImage effect='opacity' dir="vertical"  src={defaultImage} className='default-image-card-property-home'/> </Link>}
                    </div> 

                     <div className='price-wrapper'>R$ {price}</div>  
                     <div className='type-wrapper'><HiHome/></div>    

                                <div className='text-wrapper-card'>
                                <Link to={detailLink} className='title-wrapper-card-property'> <p className='title-card-property'>{name}</p><p className='title-card-property-cod'>Cod.{id}</p></Link>  
                                
                                <div className='localization-wrapper'>
                                <BiMap className='localization-icon'/> <p className='localization'>
                                {address.city.name}</p>

                                <p className='localization district-localization'>
                                {address.district}</p>
                                </div>
                                </div>
                  <DetailsCardWrapper>
                    <div className='details-bottom-card '><span className='value-detail-bottom'>{bathRooms}</span><span className='title-detail-bottom'>Banheiros</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{numberRooms}</span><span className='title-detail-bottom'>Quartos</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{area}</span><span className='title-detail-bottom'>m2</span></div>
                    <div className='details-bottom-card left-border'><span className='value-detail-bottom'>{goal}</span><span className='title-detail-bottom'>Finalidade</span></div>

                  </DetailsCardWrapper>
              </CardContent>       
      </CardWrapper>
      </CardContainer>
      
   
    )
     
}