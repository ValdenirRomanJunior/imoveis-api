import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import {  useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import GetImages from './GetImages';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../UploadImages/styles.css'
import {ImageItem, ImagePage} from '../../../types/Images'
import { Link, useParams } from 'react-router-dom';
import { uploadPropertyImage } from '../../../services/resources/property';
import LoadingFile from '../../../components/LoadingFile';


interface PropImages{
    images:ImageItem[];
    handleResult:(imgs: ImageItem[]) => void;
}


const UploadImages = (props:PropImages) =>{

    const params = useParams(); 
    const [imagesSelecteds, setimagesSelecteds] = useState<ImageItem[]>([]);

    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [errorMaxSize,setErrorMaxSize]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);
    

    const [fileBase64,setFileBase64]= useState<string>("");

   
    const handleFile= async()=> {
        setLoading(true)
      const data=await  uploadPropertyImage(fileBase64 as string);            
      if(data.status === 201){  
        console.log(data.status )   
              setLoading(false)
              setSuccessMessage(true)
              cancelSendImage();

              setTimeout(()=>{
              setSuccessMessage(false);

              },4000)  
      }

      if(data.response.data.status !== 201 && data.response.data.status !== 411 ){ 
        console.log(data.response.data.status)         
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
           setFileBase64('');   
                       
    }

   
    useEffect(() => {    
       //verificar se url no bucket existe
          setimagesSelecteds(props.images)
        }, []);


 
    const handleToRegistration =() =>{  

        <Link to={`/edit/${params.propertyId}`}></Link>        
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
                className='ModalE'
              
                                                 
            >
                <div className='title-wrapper'>
                <h2 className='title-fileManager'>Minhas Imagens</h2>
                <form id='form-image-profile' > +           
               <input className='input-add-image'  name='file' type="file" accept="image/png,image/jpeg" onChange={(e) => convertFile(e.target.files)}/>
                 
             </form> 
              
                </div>
                { successMessage===true && <div className='message-file-success'>Adicionada com sucesso!</div>}
                 {fileBase64.length>0 && <div className='message-add-image'>1 Imagem selecionada :<button className='cancel-button-file' onClick={cancelSendImage}>Cancelar</button> {loading===false ? <button className='send-button-file' onClick={handleFile}>Enviar</button>: <button className='send-button-file' ><LoadingFile/></button>}</div>}
                 { error===true && <div className='message-file-error'>Tente mais tarde</div>}
                 { errorMaxSize===true && <div className='message-file-error'>Tamanho Máximo é de 10M</div>}
              
                
                <IoCloseOutline onClick={handleCloseModal} className='button-close-modal-edit' />
                <GetImages onClick={handleToRegistration} image={{
                        id: 0,
                        url: '',
                        idTenant: 0,
                        selected: false,
                        
                       
                    }} onSelectedChanged={function (image: ImageItem): void {
                        throw new Error('Function not implemented.');
                    }} onChange={function (image: ImageItem): void {
                        throw new Error('Function not implemented.'); }}
                        refreshImages={successMessage}
                         onChanges={removePhoto}/>                                            
                               
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