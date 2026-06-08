import React, { useEffect, useState } from 'react'
 import { useSubdomain } from '../../../../components/SubdomainRouter';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty,DetailsCardWrapper, CardFooter} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import {BiMap, BiBed, BiCar, BiArea} from 'react-icons/bi';
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
  isLancamento?: boolean;
}

const FeaturedPropertyCard = ({ url, properties, buttonColor = '#2563eb', isLancamento }: FeaturedPropertyCardProps) => {
  const [featuredProperties, setFeaturedProperties] = useState<SiteProperty[]>(properties || []);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Limitar a apenas 3 imóveis como solicitado
      setFeaturedProperties(properties.slice(0, 3));
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
    slidesToShow: 3, // Forçado para 3 colunas
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
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
        {featuredProperties.map((property, index) => (
          <div key={property.id}>
            <CardListItem {...property} isLancamento={isLancamento} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedPropertyCard;

interface CardListItemProps extends SiteProperty {
  isLancamento?: boolean;
  index?: number;
}

const CardListItem = ({id,name,images,price,address,numberRooms,bathRooms,area,goal, isLancamento, index = 0}: CardListItemProps) =>{
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const slug = subdomainCompanyName || companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');
    const detailLink = isLocalhost ? `/site/${slug}/detail/${id}` : `/detail/${id}`;

    const phases = ['EM OBRAS', 'PRÉ-LANÇAMENTO', 'LANÇAMENTO'];
    const phase = phases[index % 3];

    return(
        <CardContainer style={{ padding: '0 10px' }}>
        <CardWrapper>               
              <CardContent>
                   <div className='image-card-property-home-wrapper'>
                    {isLancamento && <div className='phase-tag'>{phase}</div>}                   
                    {images?.[0]?.url ?  <Link to={detailLink} className='link-card-property-home'><LazyLoadImage effect='opacity' dir="vertical"  src={images?.[0].url } className='image-card-property-home'/> </Link>
                    :
                    <Link to={detailLink} className='link-card-property-home'><LazyLoadImage effect='opacity' dir="vertical"  src={defaultImage} className='default-image-card-property-home'/> </Link>}
                    </div> 

                                <div className='text-wrapper-card'>
                                <Link to={detailLink} className='title-wrapper-card-property'> 
                                  <p className='title-card-property'>{name}</p>
                                  <p className='title-card-property-cod'>REF: {id}</p>
                                </Link>  
                                
                                <div className='localization-wrapper'>
                                  <p className='localization'>
                                    {address.street}, {address.number ? address.number + ', ' : ''} {address.district} - {address.city.name}
                                  </p>
                                </div>
                                </div>
                  <DetailsCardWrapper>
                    <div className='details-bottom-card'>
                      <BiArea className="icon-detail" />
                      <span className='title-detail-bottom'>Área total</span>
                      <span className='value-detail-bottom'>{area || 0} m²</span>
                    </div>
                    <div className='details-bottom-card'>
                      <BiBed className="icon-detail" />
                      <span className='title-detail-bottom'>Dormitórios</span>
                      <span className='value-detail-bottom'>{numberRooms || 0}</span>
                    </div>
                    <div className='details-bottom-card'>
                      <BiCar className="icon-detail" />
                      <span className='title-detail-bottom'>Vaga(s)</span>
                      <span className='value-detail-bottom'>0</span> {/* Usando 0 pois não tem vagas na API base ainda */}
                    </div>
                  </DetailsCardWrapper>

                  <CardFooter>
                    <div className="price-block">
                      <span className="price-label">Valor</span>
                      <span className="price-value">R$ {price}</span>
                    </div>
                    <Link to={detailLink} className="btn-conheca">Conheça</Link>
                  </CardFooter>
              </CardContent>       
      </CardWrapper>
      </CardContainer>
      
   
    )
     
}