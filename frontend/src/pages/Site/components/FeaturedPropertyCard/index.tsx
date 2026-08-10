import React, { useEffect, useState } from 'react'
 import { useSubdomain } from '../../../../components/SubdomainRouter';
import {CardWrapper,CardContent,CardContainer,MessageNoProperties,StatusProperty, InputRangeProperty,DetailsCardWrapper, CardFooter} from './styles';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';
import { PiBedLight, PiCarLight, PiRulerLight, PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import {HiHome} from 'react-icons/hi';
import Slider from "react-slick";


import { getPropertiesHome, searchProperties } from '../../Services/property';
import { Property, PropertyPage } from '../../types/property';
import './carousel-styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import defaultImage from '../../assets/no-pictures.png';

const cardAccentColor = '#1C1C38';



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
  images?: Array<{
    id: number;
    url: string;
    idTenant: number;
  }>;
}

interface FeaturedPropertyCardProps {
  url: string;
  properties: SiteProperty[];
  buttonColor?: string;
  brandColor2?: string;
  isLancamento?: boolean;
}

const FeaturedPropertyCard = ({ url, properties, buttonColor = '#FF5317', brandColor2 = '#1C1C38', isLancamento }: FeaturedPropertyCardProps) => {
  const [featuredProperties, setFeaturedProperties] = useState<SiteProperty[]>(properties || []);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Limitar a 5 imóveis e preencher se necessário para garantir imagens em destaque
      let propsToShow = properties.slice(0, 5);
      if (propsToShow.length > 0 && propsToShow.length < 5) {
         let originalLength = propsToShow.length;
         while (propsToShow.length < 5) {
            propsToShow.push({...propsToShow[propsToShow.length % originalLength], id: propsToShow.length + 9999});
         }
      }
      setFeaturedProperties(propsToShow);
    }
  }, [properties]);

  function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        style={{ 
          ...style, 
          display: 'flex',
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--dynamic-brand-color-2, #1C1C38)',
          boxShadow: '2px 3px 6px -4px rgba(128,128,128,1)',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClick}
      >
        <PiCaretRightBold style={{ color: '#fff', fontSize: '24px' }} />
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
          display: 'flex',
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--dynamic-brand-color-2, #1C1C38)',
          boxShadow: '-2px 3px 6px -4px rgba(128,128,128,1)',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClick}
      >
        <PiCaretLeftBold style={{ color: '#fff', fontSize: '24px' }} />
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
    <div className="featured-properties-slider" style={{ '--dynamic-button-color': buttonColor, '--dynamic-brand-color-2': brandColor2 } as React.CSSProperties}>
      <Slider {...settings}>
        {featuredProperties.map((property, index) => (
          <div key={`${property.id}-${index}`}>
            <CardListItem {...property} isLancamento={isLancamento} index={index} buttonColor={buttonColor} brandColor2={brandColor2} />
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
  buttonColor?: string;
  brandColor2?: string;
}

export const CardListItem = ({id,name,images,price,address,numberRooms,bathRooms,area,goal, isLancamento, index = 0, buttonColor = '#FF5317', brandColor2 = '#1C1C38'}: CardListItemProps) =>{
    const { companyName } = useParams<{ companyName: string }>();
    const { companyName: subdomainCompanyName } = useSubdomain();
    const slug = subdomainCompanyName || companyName;
    const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.startsWith('127.');
    const detailLink = isLocalhost ? `/site/${slug}/detail/${id}` : `/detail/${id}`;

    const phases = ['EM OBRAS', 'PRÉ-LANÇAMENTO', 'LANÇAMENTO'];
    const phase = phases[index % 3];

    const mockImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600607687931-cecebd802404?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    const imageToShow = images?.[0]?.url || mockImages[index % mockImages.length];

    return(
        <CardContainer style={{ padding: '0 10px' }}>
        <CardWrapper>               
              <CardContent>
                   <div className='image-card-property-home-wrapper'>
                    {isLancamento && <div className='phase-tag'>{phase}</div>}                   
                    <Link to={detailLink} className='link-card-property-home' style={{ display: 'block', width: '100%', height: '100%' }}><LazyLoadImage effect='opacity' dir="vertical"  src={imageToShow} className='image-card-property-home'/> </Link>
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
                      <PiRulerLight className="icon-detail" style={{ color: 'var(--dynamic-button-color, #FF5317)', fontSize: '35px'}} />
                      <span className='title-detail-bottom'>Área total</span>
                      <span className='value-detail-bottom'>{area || 0} m²</span>
                    </div>
                    <div className='details-bottom-card'>
                      <PiBedLight className="icon-detail" style={{ color: 'var(--dynamic-button-color, #FF5317)', fontSize: '35px'}} />
                      <span className='title-detail-bottom'>Dormitórios</span>
                      <span className='value-detail-bottom'>{numberRooms || 0}</span>
                    </div>
                    <div className='details-bottom-card'>
                      <PiCarLight className="icon-detail" style={{ color: 'var(--dynamic-button-color, #FF5317)', fontSize: '35px'}} />
                      <span className='title-detail-bottom'>Vaga(s)</span>
                      <span className='value-detail-bottom'>0</span> {/* Usando 0 pois não tem vagas na API base ainda */}
                    </div>
                  </DetailsCardWrapper>

                  <CardFooter>
                    <div className="price-block">
                      <span className="price-label">Valor</span>
                      <span className="price-value" style={{ color: 'var(--dynamic-button-color, #FF5317)' }}>R$ {price}</span>
                    </div>
                    <Link to={detailLink} className="btn-conheca" style={{ background: brandColor2 }}>Conheça</Link>
                  </CardFooter>
              </CardContent>       
      </CardWrapper>
      </CardContainer>
      
   
    )
     
}
