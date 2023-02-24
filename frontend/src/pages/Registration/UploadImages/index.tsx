import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import GetImages from './GetImages';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../UploadImages/styles.css'
import {ImageItem} from '../../../types/Images'
import { useNavigate } from 'react-router-dom';


interface PropImages{ 
    handleResult:(imgs: ImageItem[]) => void;
    cleanImages:boolean;
}


const UploadImages = (props:PropImages) =>{
    const navigate = useNavigate();
    const [imagesSelected, setImagesSelected] = useState<ImageItem[]>([]);
   


    const removePhoto =(url:string) => {     
        let newList=imagesSelected.filter((l => l.url !== url));
        localStorage.setItem('images',JSON.stringify(newList))
        setImagesSelected(newList);          
    }
  
 
 
 
useEffect(() => {
  
     if(props.cleanImages === true){
        setImagesSelected([]);
     }
    
    console.log(imagesSelected)
   
       
}, [props.cleanImages]);

 
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal =() => {
        setIsOpen(true);
    }

    const handleCloseModal =() =>{                 
            setIsOpen(false)
                    
    }

    const handleToRegistration =() =>{
       
        navigate("/registration")
        let itemImages=JSON.parse(localStorage.getItem('images') || '[]') as ImageItem[];
        
        if(itemImages === null){
            localStorage.removeItem('images')
        }
        setImagesSelected([...itemImages]);
        props.handleResult(itemImages)
        localStorage.removeItem('images')
        setIsOpen(false)
        
        
    }
    localStorage.setItem('images',JSON.stringify(imagesSelected))
        
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
              
                <IoCloseOutline onClick={handleCloseModal}  className='button-close-modal' />        
                <GetImages  onClick={handleToRegistration} image={{
                        id: 0,
                        url: '',
                        idTenant: 0,
                        selected: false
                    }} onSelectedChanged={function (image: ImageItem): void {
                        throw new Error('Function not implemented.');
                    } } />
                
                
            </Modal>
            </div>
     
        
            { imagesSelected && imagesSelected.map((image) => {
                return(
                <ImageWrapper>
                <AiFillCloseCircle className='button-close' onClick={()=>removePhoto(image.url)}/>
                <img src={image.url} id="urlId" alt='imagem propriedade'/>
                
            </ImageWrapper>
                )
            } )
            }
        </ImagesContainer>
       
    )
}

export default UploadImages;