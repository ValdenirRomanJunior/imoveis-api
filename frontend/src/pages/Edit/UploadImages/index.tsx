import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import {  useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import GetImages from './GetImages';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../UploadImages/styles.css'
import {ImageItem} from '../../../types/Images'
import { Link, useParams } from 'react-router-dom';


interface PropImages{
    images:ImageItem[];
    handleResult:(imgs: ImageItem[]) => void;
}


const UploadImages = (props:PropImages) =>{

    const params = useParams(); 
    const [imagesSelecteds, setimagesSelecteds] = useState<ImageItem[]>([]);
  
  
   

   
 const removePhoto =(url:string) => { 
  let  imgs=imagesSelecteds.filter((l => l.url !== url));
  localStorage.setItem('images',JSON.stringify(imgs))
  setimagesSelecteds(imgs)
       
}


    const [modalIsOpen, setIsOpen] = useState(false);

    //abre modal
    const handleOpenModal =() => {
        return setIsOpen(true)
    }
    //fecha modal 
    const handleCloseModal =()=>{
           setIsOpen(false)                     
    }

   
    useEffect(() => { 
    
          setimagesSelecteds(props.images)
        }, []);


 
    const handleToRegistration =() =>{ 

        
        <Link to={`/edit/${params.propertyId}`}></Link>      
        //  navigate(`/edit/${params.propertyId}`)
        // window.location.reload();
        
         let a=JSON.parse(localStorage.getItem('images') || '[]') as ImageItem[]; 
         if(a === null){
            localStorage.removeItem('images')
        }    
        setimagesSelecteds([...imagesSelecteds,...a]) 
        localStorage.removeItem('images')
        
        setIsOpen(false)
      
          
    }
    localStorage.removeItem('images')
   useEffect(() => { 
     
    props.handleResult(imagesSelecteds);
      
    }, [imagesSelecteds, props]);
  

    return(
        <ImagesContainer>
            <h3 className='title-photos'>Fotos</h3>
    
            <p>Adicione até <strong>10 fotos</strong></p>
            <div>
            <UploadImage  onClick={handleOpenModal}>
                <MdPhotoCamera className='icon-photo'/>
                <span>Adicionar fotos</span>
                <span>PNG e JPG somente</span>
            </UploadImage>

            <Modal
             
                isOpen={modalIsOpen}
                onRequestClose={handleToRegistration}   
                className='Modal'
              
                
                                      
            >
                <div className='title-wrapper'>
                <h2 className='title-fileManager'>Todas Minhas Imagens</h2>
                <button className='button-add-image'>+</button>
                </div>
                
              
                
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal' />
                <GetImages onClick={handleToRegistration} image={{
                        id: 0,
                        url: '',
                        idTenant: 0,
                        selected: false
                    }} onSelectedChanged={function (image: ImageItem): void {
                        throw new Error('Function not implemented.');
                    } } />
                               
            </Modal>
            </div>
           
                    
     
             {  imagesSelecteds && imagesSelecteds.map((image) => {
               
                return(           
                <ImageWrapper  >
                <AiFillCloseCircle  className='button-close' onClick={()=>removePhoto(image.url)}/>
                <img  src={image.url} id="urlId" alt='imagem propriedade'/>               
               </ImageWrapper>          
                )              
            })
            }
 
          
        </ImagesContainer>

            
        
    )
}

export default UploadImages;