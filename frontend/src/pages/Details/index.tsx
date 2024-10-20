import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {DetailsBackground,DetailsBodyContainer, Localization,Description,PhotosContainer,CardWrapper,TitleWrapper} from './styles';
import {BiMap} from 'react-icons/bi';
import Detail from './Detail';
import Address from './Address';
import Button from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { findProperty } from '../../services/resources/property';
import { useEffect, useState } from 'react';
import { Property } from '../../types/property';
import "./styles.css";
import Carousel from 'react-elastic-carousel';
import defaultImage from '../../assets/images/no-pictures.png'
import { refreshToken } from '../../services/resources/user';
import {MdOutlineCopyAll} from 'react-icons/md'
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';



const Details = ()=>{
    const navigate = useNavigate();
    const params = useParams();


    const [property, setProperty]= useState<Property>();
    const [copyUrl,setCopyUrl]= useState(false);
    const [errors,setErrors]=useState();


    const refreshTokenUser = async ()=>{
        const  resp = await refreshToken();    
        if(resp === 204){  
          navigate(`/details/${params.propertyId}`)
        }else{
       navigate('/')
        }
    }

  useEffect( () =>  {
  refreshTokenUser()
},[params.propertyId])

    const getProperty = async() => {             
        const dataProperty = await findProperty(`${params.propertyId}`);
        if(dataProperty.status === 200){  
            console.log(dataProperty.status) 
            setProperty(dataProperty.data as Property) 
          } 
          if(dataProperty.response.status === 404){ 
            console.log(dataProperty.response.data.error)
            setErrors(dataProperty.response.data.error);
             
          }
          if(dataProperty.response.status === 400){ 
          
            setErrors(dataProperty.response.data.error);
             
          } 
      
        
    }

    useEffect(() => {
        getProperty();
        
    }, [`${params.propertyId}`]);

    const details = {
        typeProperty:property?.typeProperty as string, 
        goal:property?.goal as string,
        area:property?.area as string,
        numberRooms:property?.numberRooms as string,
        bathRooms:property?.bathRooms as string,
        vacancies:property?.vacancies as string,
        areaTotal:property?.areaTotal as string,

    }

    const address = {
        cep:property?.address.cep as string,
        state:property?.address.city.state.name as string,
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


    const copyPropertyUrl = () => {
      
        var url_atual = window.location.href;   
        navigator.clipboard.writeText(url_atual);
        setCopyUrl(true)
        setTimeout(() => {
            setCopyUrl(false)
        },3000)

    }

    const ErrorHandler = () => {
        return <PageNotFound/>;
      }
    
      const {user, getCurrentUser} = useAuth();
      useEffect(() =>{
            
        getCurrentUser();
      
      
      },[])
  

    return(
        <>
        {user?.perfis?.[0] === 'TENANT' ? 
     
        <div>
       
   { !errors ?   
        <>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
      
        
    <DetailsBackground>
            <Header />
             <BarTop />
        <DetailsBodyContainer copyUrl={copyUrl}>
     
        <PhotosContainer>
                  <div className='container-photos'>
       
                    <hr className='seperator'/>
                    <div className='carousel-wrapper'>
                        <Carousel
                         isRTL={false}                      
                         breakPoints={breakPoints}
                         enableSwipe={true}
                         initialActiveIndex={1}
                         enableMouseSwipe={false}
                        pagination={false}
                        
                         >  
                                       
                        { property?.images && property.images.map((photo) =>           
                               <CardWrapper key={photo.id}>                          
                               <img  src={photo.url}  alt="propriedade"/>                          
                               </CardWrapper>)}

                             {property?.images?.length===0 as number  && 
                             <CardWrapper><img src={defaultImage} alt='Foto Padrão' className='default-image-detail'/>
                             </CardWrapper>} 
                       
                        </Carousel>
                    </div>
                  </div>
               
             </PhotosContainer>
         
         <div className='price-cod-wrapper-detail'>
         <h2  className='price'>R$ {property?.price}</h2>
         <span className='cod-property-detail'>Cod.{property?.id}</span>
         </div>
         <Localization>
         <div className='localization-detail-wrapper'>               
         <p  className='localization-district-detail-wrapper'><BiMap className='icon-localization-detail'/>{property?.address.district}</p>
         <p  className='localization-city-detail-wrapper'>{property?.address.city.name}</p>
        </div>
         </Localization>
         
        <TitleWrapper>
         <h3>{property?.name}</h3>
         </TitleWrapper>
        
         <h4 id='price'>Descrição</h4>
        <Description>
        <p>{property?.description}
        </p>
      
        </Description>
        <h4>Detalhes </h4>
        <Detail details={details}/>
        <h4>Endereço</h4>
        <Address address={address}/>

        
    <div onClick={copyPropertyUrl} className='button-wrapper'> Copiar link<MdOutlineCopyAll className='icon-copy'/></div>
    </DetailsBodyContainer>
    </DetailsBackground>
    </ErrorBoundary>
         </> 
         
         : <div><PageNotFound/></div>}
         </div>  
         : <PageNotFound/>}   
        </>
    )
}

export default Details;