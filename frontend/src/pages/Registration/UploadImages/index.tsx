import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import GetImages from './GetImages';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../UploadImages/styles.css'
import {ImageItem} from '../../../types/Images'
import { useNavigate } from 'react-router-dom';
import { url } from 'inspector';
import { uploadPropertyImage } from '../../../services/resources/property';
import LoadingFile from '../../../components/LoadingFile';


interface PropImages{ 
    handleResult:(imgs: ImageItem[]) => void;
    cleanImages:boolean;
}


const UploadImages = (props:PropImages) =>{
    const navigate = useNavigate();
    const [imagesSelected, setImagesSelected] = useState<ImageItem[]>([]);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);
   
    const [fileBase64,setFileBase64]= useState<string>("");
    const [errorMaxSize,setErrorMaxSize]= useState(false);

    const [messageFile, setMessageFile]= useState(false);



    const formSubmit= async()=> {
          setLoading(true)
        const data=await  uploadPropertyImage(fileBase64 as string);            
        if(data.status === 201){     
                setLoading(false)
                setSuccessMessage(true)
                cancelSendImage();

                setTimeout(()=>{
                setSuccessMessage(false);

                },4000)
               
           
        }

        if(data.response.data.status !== 201 && data.response.data.status !== 411 ){        
                setLoading(false)
                setError(true);
                cancelSendImage();

                setTimeout(() => {
                 setError(false);
                
                },4000)                         
           
        }

        if(data.response.data.status === 411){ 
           
            setLoading(false)
            setErrorMaxSize(true);
            cancelSendImage();
    
            setTimeout(() => {
             setErrorMaxSize(false);
            
            },4000)                 
       
    }
                  
}

useEffect(() => { 
    if(fileBase64 !== " " || "" || null){
     
            //formSubmit()
              
    }
}, [fileBase64]);


    function convertFile(files: FileList|null){
          
        if(files){
            const fileRef= files[0] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{        
                setFileBase64(`data:${fileType as string};base64,${btoa(ev.target.result )}`);
                
                                      
            }                 
        }     
    }

    const cancelSendImage = () => {       
        Array.from(document.querySelectorAll('[class=".input-add-image"]')).forEach(
            input => (input.classList.value = "")
          );
            setFileBase64('')
        
        }            
    
        

    const removePhoto =(url:string) => { 
    
        let newList=imagesSelected.filter((l => l.url !== url));
        localStorage.setItem('images',JSON.stringify(newList))
        setImagesSelected(newList);          
    }
  
  
 
 useEffect(() => {
  
     if(props.cleanImages === true){
        setImagesSelected([]);
     }
    
     
}, [props.cleanImages]);

 
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleOpenModal =() => {
        setIsOpen(true);
    }

    const handleCloseModal =() =>{                 
            setIsOpen(false)
            setFileBase64('');
                    
    }
  
    const handleToRegistration =() =>{
       
        navigate("/registration")
        let itemImages=JSON.parse(localStorage.getItem('images') || '[]') as ImageItem[];
        
        if(itemImages === null){
            localStorage.removeItem('images')
        }
        
        setImagesSelected([...imagesSelected,...itemImages]);
       
        props.handleResult([...imagesSelected,...itemImages])
        localStorage.removeItem('images')
        setIsOpen(false)
        
        
    }
    localStorage.removeItem('images');
    //localStorage.setItem('images',JSON.stringify(imagesSelected))

  
        
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
                className='ModalR'
                
                                         
            >
                <div className='title-wrapper'>
                <h2 className='title-fileManager'>Minhas Imagens</h2>
                
                <form id='form-image-profile' onSubmit={formSubmit}> +           
               <input className='input-add-image' name='file' type="file" accept="image/png,image/jpeg" onChange={(e) => convertFile(e.target.files)}/>
                 
             </form> 
                   
                </div>
                { successMessage===true && <div className='message-file-success'>Adicionada com sucesso!</div>}
                 {fileBase64.length>0 && <div className='message-add-image'>1 Imagem selecionada :<button className='cancel-button-file' onClick={cancelSendImage}>Cancelar</button> {loading===false ? <button className='send-button-file' onClick={formSubmit}>Enviar</button>: <button className='send-button-file' ><LoadingFile/></button>}</div>}
                 { error===true && <div className='message-file-error'>Tente mais tarde</div>}
                 { errorMaxSize===true && <div className='message-file-error'>Tamanho Máximo é de 10M</div>}
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal-registration' />        
                <GetImages  onClick={handleToRegistration} image={{
                        id: 0,
                        url: '',
                        idTenant: 0,
                        selected: false
                    }} onChange={function (image: ImageItem): void {
                        throw new Error('Function not implemented.');
                    } }
                    refreshImages={successMessage}
                    onChanges={removePhoto} handleChange={Function} checked={false}/>   
                
                
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