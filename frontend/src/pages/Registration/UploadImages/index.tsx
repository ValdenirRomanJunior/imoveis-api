import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
import { convertToBlob } from '../../../services/resources/covertToBlob';


interface PropImages{ 
    handleResult:(fileBase64:string[]) => void;   
    cleanImages:boolean;
}

type Url= {
    name:string
    
}

const UploadImages = (props:PropImages) =>{

    const navigate = useNavigate();
  
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);
   
 
    const [errorMaxSize,setErrorMaxSize]= useState(false);

    const [messageFile, setMessageFile]= useState(false);

    const inspectionPictureRef = useRef<HTMLInputElement | any>();
    const [imagesSelected, setImagesSelected] = useState<any[]>([]);
    const [fileBase64,setFileBase64]= useState<string[]>([]);

    const WIDTH = 700;
    function convertFile(files:any){
    
              console.log(files)
        //setImagesSelected([...imagesSelected,...files])
        
        if(files){
            for (let i = 0; i < files.length; i++) {
            
                
            const fileRef= files[i] || ""
            const fileType: string=fileRef.type || ""
            let aux='' as string;
            const reader= new FileReader()         
            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{ 
                aux=`data:${fileType as string};base64,${btoa(ev.target.result )}`
                // fileBase64.push(`data:${fileType as string};base64,${btoa(ev.target.result )}`)   
                //setFileBase64([...fileBase64]); 
                console.log(aux.length) 
                
                   if(aux.length > 383995){
                                   
                let img = document.createElement("img");
                img.src = aux;
                img.onload = (e: any) => {
                    // set a width value for the height of the produced image to depend on (i.e. WIDTH = 100 will be 100px)
                    let canvas = document.createElement("canvas");
                    let ratio = WIDTH / e.target.width;          
                    canvas.width = WIDTH;
                    canvas.height = e.target.height * ratio;               
                    const context = canvas.getContext("2d") as CanvasRenderingContext2D;                
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);                
                    let newImageUrl = context.canvas.toDataURL("image/jpg", 90); // quality ranges 1-100
                    
                    fileBase64.push(newImageUrl)
                    setFileBase64([...fileBase64]); 
                 }  
                } else{
                    fileBase64.push(`data:${fileType as string};base64,${btoa(ev.target.result )}`)   
                    setFileBase64([...fileBase64]); 
                }     
            }
                           
            }
                               
        } 
          
           
        navigate("/registration")
    }
      
    
    const removePhoto =(index:string) => { 
       let  imgs=fileBase64.filter((l => l !== index));
      setFileBase64(imgs)
      if(fileBase64.length  === 0){
        inspectionPictureRef.current.value= " "     
             setFileBase64([])         
    } 
     
                
    }
  
  
 
 useEffect(() => {

    props.handleResult([...fileBase64])  
     if(props.cleanImages === true){
       setFileBase64([])
     }
       
}, [props.cleanImages, fileBase64]);



    return(
        <ImagesContainer>
            <h3 className='title-photos'>Fotos</h3>
    
            <p>Adicione até <strong>15 fotos</strong></p>
            <div>
            <UploadImage >
                <MdPhotoCamera className='icon-photo'/>
                <span>Adicionar fotos</span>
                <span>PNG e JPG somente</span>
                <input className='input-add-image' name='file' type="file"  ref={inspectionPictureRef}  multiple={true} accept="image/png,image/jpeg" onChange={(e) => convertFile(e.target.files)}/>

            </UploadImage>
         
            </div>
                 
            {fileBase64 && Array.from(fileBase64).map((item,index:any)=>  {
               
                return(
                <ImageWrapper>
                <AiFillCloseCircle className='button-close' onClick={()=>removePhoto(item)}/>
                
                <img src={item} id="urlId" alt='imagem propriedade'/>
                
            </ImageWrapper>
                )
            } )
            }
        </ImagesContainer>
       
    )
}

export default UploadImages;