
import {DetailContainer, DetailTextContainer,PriceWrapper,TitleWrapper,LocalizationWrapper,DetailsWrapper,DescriptionWrapper,
MoreDetailsWrapper,ContactDetailrapper, ContactModalDetailWrapper, DetailContent, SessionFooter, PriceLocalizationContainer} from './styles';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import './styles.css'
import {ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import ImageSlider from '../ImageSlider';
import {BsShare} from 'react-icons/bs'
import {IoCloseOutline} from 'react-icons/io5'
import WhatsappButton from '../WhatsappButton';

import { BiArea, BiBath, BiBed, BiCar } from 'react-icons/bi';
import { MdOutlineShower } from 'react-icons/md';
import { TbVectorTriangle } from 'react-icons/tb';
import { SlArrowRight } from 'react-icons/sl';
import { findProperty, getPropertiesHome } from '../Services/property';
import { CardListItem } from '../components/FeaturedPropertyCard';
import { Property } from '../types/property';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ItemSlide, Slides } from '../types/image';
import PageNotFound from '../PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import { newLead } from '../Services/lead';
import { phone } from './masks';
import Loading from '../Loading';
import { ThemeProvider } from 'styled-components';
import api from '../utils/requests';
import { HiMenu, HiX } from 'react-icons/hi';
import {
  Header,
  Logo,
  Nav,
  NavLink,
  MobileMenuButton,
  MobileMenu
} from '../styles';
import DynamicSEO from '../../../components/DynamicSEO';
import DynamicFavicon from '../../../components/DynamicFavicon';
import { useSubdomain } from '../../../components/SubdomainRouter';
// Importar imagens padrão
import corretorPadrao from '../../../assets/images/user-image.jpeg';
import bannerPadrao from '../../../assets/images/bg-principal.png';

interface ThemeConfig {
  name?: string;
  logo?: string;
  logoSize?: string;
  favicon?: string;
  menuLinks?: any[];
  phone?: string;
  bannerImage?: string;
  bannerColor?: string;
  bannerTitle?: string;
  bannerTitleColor?: string;
  bannerTitleSize?: number;
  services?: any[];
  contactTitle?: string;
  contactImage?: string;
  agentPhoto?: string;
  agentQuote?: string;
  agentName?: string;
  footerLogo?: string;
  footerText?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  // Cores
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  buttonColor?: string;
  footerBackgroundColor?: string;
  h1Color?: string;
  h2Color?: string;
  h3Color?: string;
  logoUrl?: string;
  companyName?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  privacyPolicy?: string;
  aboutUs?: string;
  tenantId?: number;
  facebookPixel?: string;
   seoKeywords?: string;
   siteTitle?: string;
 }


type Error = {
    fieldName:string;
    message:string;
}

const Detail  = () => {

 
    const { propertyId, companyName: companyNameParam } = useParams<{ propertyId?: string; companyName?: string }>();
    const location = useLocation();
    const { companyName: companyNameCtx } = useSubdomain();
    const clientSlug = (companyNameCtx || companyNameParam || '');
    const companySlugForLinks = (companyNameCtx || companyNameParam || '');
    
    const [openModalContact,setOpenModalContact]=useState(true);
    const [property, setProperty]= useState<Property>();
    const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
    const [errors,setErrors]=useState<string | undefined>(undefined);
    const [errorsLead, setErrorsLead] = useState<Error[]>([]);
    const [otherError, setOtherError] = useState(false);
    const [loading, setLoading] = useState(true);
 
    const [emptyValue,setEmptyValue]= useState(false);
    const [successMessage, setSuccessMessage] = useState(false); 
    const [loadingAddLead, setLoadingAddLead]=useState(false);
    
    // Estados do header
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        textColor: '#333',
        backgroundColor: '#fff',
        buttonColor: '#ff6b35be',
        h1Color: '#333',
        h2Color: '#333',
        logoSize: 'media'
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Carrega configuração do tema
    const loadThemeConfig = useCallback(async () => {
        try {
            // Verificar se existe configuração de preview no localStorage
            const previewData = localStorage.getItem(`theme-preview-${clientSlug}`);
            
            if (previewData) {
                try {
                    const parsedPreview = JSON.parse(previewData);
                    // Verificar se o preview não é muito antigo (5 minutos)
                    const isRecentPreview = Date.now() - parsedPreview.timestamp < 5 * 60 * 1000;
                    
                    if (parsedPreview.isPreview && isRecentPreview) {
                        console.log('Usando configuração de preview do localStorage');
                        // Parse JSON strings do preview
                        const previewConfig = {
                            ...parsedPreview,
                            menuLinks: typeof parsedPreview.menuLinks === 'string' ? JSON.parse(parsedPreview.menuLinks || '[]') : parsedPreview.menuLinks || [],
                            services: typeof parsedPreview.services === 'string' ? JSON.parse(parsedPreview.services || '[]') : parsedPreview.services || [],
                            socialLinks: typeof parsedPreview.socialLinks === 'string' ? JSON.parse(parsedPreview.socialLinks || '{}') : parsedPreview.socialLinks || {}
                        };
                        setThemeConfig(previewConfig);
                        setLoading(false);
                        return;
                    } else {
                        // Preview expirado, remover do localStorage
                        localStorage.removeItem(`theme-preview-${clientSlug}`);
                    }
                } catch (previewError) {
                    console.error('Erro ao processar preview:', previewError);
                    localStorage.removeItem(`theme-preview-${clientSlug}`);
                }
            }

            const response = await api.get(`/api/themes/theme-config/${clientSlug}`);
            if (response.data && response.data.themeConfig) {
                // Parse JSON strings from backend
                const themeData = {
                    ...response.data.themeConfig,
                    menuLinks: typeof response.data.themeConfig.menuLinks === 'string' ? JSON.parse(response.data.themeConfig.menuLinks || '[]') : response.data.themeConfig.menuLinks || [],
                    services: typeof response.data.themeConfig.services === 'string' ? JSON.parse(response.data.themeConfig.services || '[]') : response.data.themeConfig.services || [],
                    socialLinks: typeof response.data.themeConfig.socialLinks === 'string' ? JSON.parse(response.data.themeConfig.socialLinks || '{}') : response.data.themeConfig.socialLinks || {}
                };
                setThemeConfig(themeData);
            }
        } catch (error) {
            console.error('Erro ao carregar configuração do tema:', error);
            // Fallback para configuração padrão se não encontrar
            setThemeConfig({
                name: 'Site Padrão',
                logo: '',
                logoSize: 'media',
                menuLinks: [],
                phone: '',
                bannerImage: bannerPadrao,
                bannerTitle: 'Encontre o imóvel dos seus sonhos',
                bannerTitleColor: '#ffffff',
                bannerTitleSize: 48,
                bannerColor: '#2563eb',
                services: [],
                contactTitle: 'Entre em contato',
                contactImage: '',
                agentPhoto: corretorPadrao,
                agentQuote: 'Estou aqui para ajudar você a encontrar o imóvel perfeito.',
                agentName: 'Corretor',
                footerLogo: '',
                socialLinks: {
                    facebook: '',
                    instagram: '',
                    whatsapp: ''
                },
                footerText: 'Todos os direitos reservados.',
                footerBackgroundColor: '#1f2937',
                textColor: '#1f2937',
                buttonColor: '#ff6b35be',
                h2Color: '#1f2937',
                privacyPolicy: '',
                aboutUs: '',
                tenantId: 0
            });
        } finally {
            setLoading(false);
        }
    }, [clientSlug]);

    useEffect(() => {
        if (clientSlug) {
            loadThemeConfig();
        }
    }, [clientSlug]);
    
    // Tema dinâmico
    const dynamicTheme = {
        colors: {
            primary: themeConfig.buttonColor || '#ff6b35be',
            primaryDark: themeConfig.buttonColor || '#ff6b35be',
            secondary: themeConfig.secondaryColor || '#64748b',
            tertiary: '#f8fafc',
            background: themeConfig.backgroundColor || '#ffffff',
            backgroundLight: '#f8fafc',
            backgroundGray: '#f3f4f6',
            red: '#ef4444',
            green: '#10b981',
            white: '#ffffff',
            text: themeConfig.textColor || '#333333',
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827'
            }
        }
    } as any;


    // Resolve o ID do imóvel a partir dos parâmetros ou da URL
    const resolvePropertyId = () => {
        if (propertyId) {
            return String(propertyId);
        }
        const pathname = location.pathname;
        const matchDetail = pathname.match(/\/detail\/([^\/]+)/);
        if (matchDetail && matchDetail[1]) {
            return matchDetail[1];
        }
        const matchSiteDetail = pathname.match(/\/site\/[^\/]+\/detail\/([^\/]+)/);
        if (matchSiteDetail && matchSiteDetail[1]) {
            return matchSiteDetail[1];
        }
        const segments = pathname.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment && /^[a-zA-Z0-9]+$/.test(lastSegment)) {
            return lastSegment;
        }
        return null;
    };

    //pega propriedade com id
    const getProperty = async() => {             
        const resolvedId = resolvePropertyId();
        if (!resolvedId) {
            setErrors('ID do imóvel não encontrado na URL.');
            return;
        }
        const dataProperty = await findProperty(resolvedId as string);
        if(dataProperty && dataProperty.status === 200){  
            console.log(dataProperty.status) 
            setProperty(dataProperty.data as Property)           
          } 
          if(dataProperty && dataProperty.response && dataProperty.response.status === 404){ 
            console.log(dataProperty.response.data.error)
            setErrors(dataProperty.response.data.error);           
          }
          if(dataProperty && dataProperty.response && dataProperty.response.status === 400){    
            setErrors(dataProperty.response.data.error);
             
          }            
    }

    const getSimilarProperties = async () => {
        if (clientSlug) {
            const res = await getPropertiesHome(clientSlug);
            if (res && res.data) {
                setSimilarProperties(res.data.slice(0, 4));
            }
        }
    }

    useEffect(() => {
        getProperty();
        getSimilarProperties();
    }, [location.pathname, propertyId, clientSlug]);
   
 

  let imgs :Array<ItemSlide>= [];
  property?.images?.map((image)=> (
    imgs.push(
        {
            id: image.id,
            url: image.url,
            idTenant: image.idTenant
          } ,
        
      ) 
  ))


  //lead service
  const [form,setForm]=useState<any>({
    name:'',
    email:'',
    phone:'',
    message:''
    
});

const cleanForm = () =>{
Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  ); 
  Array.from(document.querySelectorAll("textarea")).forEach(
    textarea => (textarea.value = "")
  ); 
setForm({ ...form,
    name:'',
    email:'',
    phone:'',
    message:''
    
});
}

const handleKeyUp = (e: React.FormEvent<HTMLInputElement | any>) =>{      
    if(e.currentTarget.name === 'phone'){  
        phone(e)
      
    }
   
}
  
console.log(form)
console.log(property?.id)

 //submete fortmulario do lead
  const handleSubmitLead = async (e:any) =>{   
    e.preventDefault()
    
    let emptyValues=Object.values(form).some(obj => obj === '');
    setEmptyValue(emptyValues);
  
    
    if(!emptyValues){
    setLoadingAddLead(true);
       
     const data = await newLead(form['name'],form['email'],form['phone'],form['message'],property?.id as number) 
      if(data.status === 201){
        cleanForm()         
        setSuccessMessage(true)
        setTimeout(()=> {
            setSuccessMessage(false)
        },3000)
        setLoadingAddLead(false)
 
      }
        if(data.response.data.errors){              
            setErrorsLead(data.response.data.errors);
            setSuccessMessage(false)
            setLoadingAddLead(false)
                                                                           
        } 
        else if(data.response.status === 404 || data.response.status === 403 || data.response.status === 400){
               
            setOtherError(true)
            setSuccessMessage(false)
            setLoadingAddLead(false)
           
            setTimeout(()=>{
                setOtherError(false)
            },2000)
        }

    }      
                                         
}

 

    const handleOpenModalContact = ()=> {
      setOpenModalContact(openModalContact => !openModalContact);
      if(!openModalContact){
        setEmptyValue(false)
        setErrorsLead([]);
        setSuccessMessage(false)
      }
    }


    const [copyUrl,setCopyUrl]= useState(false); 
    const handleCopyUrl = () =>{
        var url_atual = window.location.href;   
        navigator.clipboard.writeText(url_atual);
        setCopyUrl(true);
        setTimeout(()=> {
            setCopyUrl(false);
        },2000)
    }



    const ErrorHandler = () => {
        return <PageNotFound/>;
      }
  


    function handleChange(e: any): void {
        const field= e.target.getAttribute('name');
        const value= e.target.value
        setForm({ ...form,
            [field]:value,
        });
  
    }
 
    const getParamHeader = (goal:string) => {
        return goal;
      }
    let emptyValues=Object.values(form).some(obj => obj === '');

    return(
        <>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
        <ThemeProvider theme={dynamicTheme}>
            <DynamicSEO facebookPixelId={themeConfig?.facebookPixel} keywords={themeConfig?.seoKeywords} title={themeConfig?.siteTitle} />
            <DynamicFavicon faviconUrl={themeConfig?.favicon} />
            <Header>
                {(() => {
                    const hostname = window.location.hostname;
                    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
                    const homePath = isLocalhost ? `/site/${companySlugForLinks}` : '/';
                    return (
                        <NavLink href={homePath}>
                            <Logo logoSize={themeConfig.logoSize}>
                                {themeConfig.logo ? (
                                    <img src={themeConfig.logo} alt={themeConfig.companyName || 'Logo'} />
                                ) : (
                                    themeConfig.companyName || 'Imobiliária'
                                )}
                            </Logo>
                        </NavLink>
                    );
                })()}
                <Nav>
                    {(() => {
                        const hostname = window.location.hostname;
                        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
                        const homePath = isLocalhost ? `/site/${companySlugForLinks}` : '/';
                        const propertiesPath = isLocalhost ? `/site/${companySlugForLinks}/imoveis/?goal=&type=&name=` : '/imoveis/?goal=&type=&name=';
                        return (
                            <>
                                <NavLink href={homePath}>Início</NavLink>
                                <NavLink href={propertiesPath}>Imóveis</NavLink>
                            </>
                        );
                    })()}
                    <NavLink href={`tel:${themeConfig.phone}`}>{themeConfig.phone || '(00) 0000-0000'}</NavLink>
                </Nav>
                <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <HiX /> : <HiMenu />}
                </MobileMenuButton>
                {mobileMenuOpen && (
                    <MobileMenu>
                        {(() => {
                            const hostname = window.location.hostname;
                            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
                            const homePath = isLocalhost ? `/site/${companySlugForLinks}` : '/';
                            const propertiesPath = isLocalhost ? `/site/${companySlugForLinks}/imoveis/?goal=&type=&name=` : '/imoveis/?goal=&type=&name=';
                            return (
                                <>
                                    <NavLink href={homePath} onClick={() => setMobileMenuOpen(false)}>Início</NavLink>
                                    <NavLink href={propertiesPath} onClick={() => setMobileMenuOpen(false)}>Imóveis</NavLink>
                                </>
                            );
                        })()}
                        <NavLink href={`tel:${themeConfig.phone}`} onClick={() => setMobileMenuOpen(false)}>{themeConfig.phone || '(00) 0000-0000'}</NavLink>
                    </MobileMenu>
                )}
            </Header>
        { !errors ? 
        <DetailContainer>
               <div className='full-width-slider'>
                   <ImageSlider items={imgs} goal={property?.goal as string}/>
               </div>
               <div className='links-desktop-container'>
                <div className='links-desktop-wrapper'>
                    <ul className='list-links-desktop-wrapper'>
                            <li className='item-links-desktop-detail'>Home</li><SlArrowRight className='arrow-link-detail'/>
                            <li className='item-links-desktop-detail'>Detalhes</li><SlArrowRight className='arrow-link-detail'/>
                            <li className='item-links-desktop-detail ellipse-item'>{property?.address.city.name || 'cidade'}</li><SlArrowRight className='arrow-link-detail '/>
                            <li className='item-links-desktop-detail last-item-links-desktop-detail  ellipse-item'>{property?.address.district || 'bairro'}</li>
                    </ul>
                
                </div>           
                </div>
            
                   <DetailContent>
                    <div className='right-left-container-flex'>
                        <div className='main-content-detail-container'>
                        <DetailTextContainer>
                            <TitleWrapper>
                                <h2>{property?.name}</h2>
                                <div className='views-badge'>Este imóvel já recebeu 102 visualizações</div>
                                <p className='property-subtitle'>{property?.typeProperty} {property?.numberRooms} Quartos {property?.address.district} {property?.areaTotal}m²</p>
                                <p className='property-reference'>Referência: {property?.id}</p>
                            </TitleWrapper>

                            <DetailsWrapper>
                                <div className='detail-wrapper'>
                                    <TbVectorTriangle className='detail-icon' />
                                    <span className='detail-title'>Área total</span>
                                    <span className='detail-value'>{property?.areaTotal}m²</span>
                                </div>
                                <div className='detail-wrapper'>
                                    <BiArea className='detail-icon' />
                                    <span className='detail-title'>Área privativa</span>
                                    <span className='detail-value'>{property?.area}m²</span>
                                </div>
                                <div className='detail-wrapper'>
                                    <BiBed className='detail-icon' />
                                    <span className='detail-title'>Dormitórios</span>
                                    <span className='detail-value'>{property?.numberRooms}</span>
                                </div>
                                <div className='detail-wrapper'>
                                    <MdOutlineShower className='detail-icon' />
                                    <span className='detail-title'>Suítes</span>
                                    <span className='detail-value'>{property?.suites || '0'}</span>
                                </div>
                                <div className='detail-wrapper'>
                                    <BiCar className='detail-icon' />
                                    <span className='detail-title'>Vagas</span>
                                    <span className='detail-value'>{property?.vacancies || '0'}</span>
                                </div>
                                <div className='detail-wrapper'>
                                    <BiBath className='detail-icon' />
                                    <span className='detail-title'>Banheiros</span>
                                    <span className='detail-value'>{property?.bathRooms}</span>
                                </div>
                            </DetailsWrapper>

                            <PriceLocalizationContainer>
                                <div className='price-section'>
                                    <span className='section-label'>Valor</span>
                                    <div className='price-value' style={{ color: themeConfig.buttonColor }}>R$ {property?.price}</div>
                                </div>
                                <div className='localization-section'>
                                    <span className='section-label'>Localização</span>
                                    <div className='localization-value'>
                                        <span>{property?.address.street}, {property?.address.number} - {property?.address.district}</span>
                                    </div>
                                </div>
                            </PriceLocalizationContainer>

                            <DescriptionWrapper>
                                <h2>Descrição</h2>
                                <p>{property?.description}</p>
                            </DescriptionWrapper>

                            <MoreDetailsWrapper>
                                <h2>O condomínio também oferece</h2>
                                <div className='amenities-grid'>
                                    {['Churrasqueira Condominio', 'Terraço Coletivo', 'Condominio Fechado', 'Elevador', 'Portaria', 'Salão de Festas'].map(item => (
                                        <div key={item} className='amenity-tag'>{item}</div>
                                    ))}
                                </div>

                                <h2 style={{ marginTop: '2rem' }}>Localização do imóvel</h2>
                                <div className='localization-street-district' style={{ marginBottom: '1rem', color: '#666' }}>
                                    <TbVectorTriangle style={{ marginRight: '5px', color: '#ff6b35be' }}/>
                                    <span>{property?.address.street}, {property?.address.number} {property?.address.district} {property?.address.city.name} - {property?.address.city.state.name}</span>
                                </div>
                                <div className='map-placeholder'>
                                    <span>Clique para ver o mapa</span>
                                </div>
                            </MoreDetailsWrapper>
                        </DetailTextContainer> 
            </div>

            <div className='modal-desktop-container'>
            <ContactModalDetailWrapper openModal={openModalContact}>
            <div className='header-modal-contact-wrapper'>
                <h1>Fale conosco <br/> ou agende uma visita</h1>
                <IoCloseOutline onClick={handleOpenModalContact} className='close-button-modal-contact'/>
            </div>

                <form onSubmit={(e)=> {handleSubmitLead(e)}}> 
                    <div className='input-modal-wrapper'>    
                        <input type='text' placeholder="Nome completo" className="input-class" id="name" name="name" onChange={(e) => handleChange(e)} maxLength={41} onKeyUp={handleKeyUp}/>   
                        {errorsLead.map(x => { if(x.fieldName === 'name') return  <p className=' formField__error error-name'>{x.message}</p>})}
                        { emptyValue && form['name'] === '' ? <span className='formField__error error-name'>Este campo é requerido</span>: ''}
                    </div>   

                    <div className='input-modal-wrapper'>  
                        <input type='text' placeholder="E-mail" className="input-class" id="email" name="email" onChange={(e) => handleChange(e)}  maxLength={40} onKeyUp={handleKeyUp}/>
                        {errorsLead.map(x => { if(x.fieldName === 'email') return  <p className=' formField__error'>{x.message}</p>})}
                        { emptyValue && form['email'] === '' ? <span className='formField__error'>Este campo é requerido</span>: ''}
                    </div>

                    <div className='input-modal-wrapper'>  
                        <input type='text'  placeholder="telefone com DDD" className="input-class" id="phone" name="phone" onChange={(e) => handleChange(e)} onKeyUp={handleKeyUp}/>
                        {errorsLead.map(x => { if(x.fieldName === 'phone') return  <p className=' formField__error error-phone'>{x.message}</p>})}
                        { emptyValue && form['phone'] === '' ? <span className='formField__error error-phone'>Este campo é requerido</span>: ''}
                        { form['phone'].length >1 && form['phone'].length <14 &&  <span className='formField__error error-phone'>Formato de telefone errado</span>}
                    </div>

                   {
                        loadingAddLead ? <button className="button-send-lead" style={{background: themeConfig.buttonColor, borderColor: themeConfig.buttonColor, color: '#fff'}} type='submit'><Loading/></button>
                        : <button type='submit' className="button-send-lead" style={{background: themeConfig.buttonColor, borderColor: themeConfig.buttonColor, color: '#fff'}}>Enviar</button>
                    }
                    
                    <button type="button" className="btn-whatsapp" onClick={() => window.open(`https://wa.me/${themeConfig.phone}?text=Olá, tenho interesse no imóvel código ${property?.id}`)}>
                        Converse via WhatsApp
                    </button>
                    
                    <button type="button" className="btn-outline" onClick={() => window.open(`tel:${themeConfig.phone}`)}>
                        Ligue para nós
                    </button>

                    <button type="button" className="btn-outline" onClick={handleCopyUrl}>
                        Compartilhe este imóvel
                    </button>
                </form>
                { otherError &&   
                <div className='other-errorModal'>Erro Inesperado</div>
                 }
            {successMessage   ? <div className="messageModal">
                    <span className='success'>Enviado com sucesso!</span>
                    </div>: ''}
                           
            </ContactModalDetailWrapper>  

            </div>
            </div>
            </DetailContent> 
            
            <div style={{ width: '100%', maxWidth: '1200px', margin: '4rem auto', padding: '0 1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#666', marginBottom: '2rem' }}>Imóveis similares</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {similarProperties.map(prop => (
                        <CardListItem 
                            key={prop.id} 
                            {...prop} 
                            buttonColor={themeConfig.buttonColor}
                            brandColor2={themeConfig.secondaryColor || '#1C1C38'}
                        />
                    ))}
                </div>
            </div>

            { otherError &&   
                <div className='other-error'>Erro Inesperado</div>
                 }
            {successMessage   ? <div className="message">
                    <span className='success'>Lead salvo com sucesso!</span>
                    </div>: ''}
            <WhatsappButton whatsappNumber={themeConfig.phone} />   
            <SessionFooter>
        
            </SessionFooter>                         
        </DetailContainer>
                        :<PageNotFound/>}
        </ThemeProvider>
        </ErrorBoundary>
                        </>
    )
}

export default Detail;