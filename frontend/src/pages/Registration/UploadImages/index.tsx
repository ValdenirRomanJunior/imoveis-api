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


    function convertFile(files:any){
              console.log(files)
        setImagesSelected([...imagesSelected,...files])
        
        if(imagesSelected){
            for (let i = 0; i < files.length; i++) {
          
            const fileRef= files[i] || ""
            const fileType: string=fileRef.type || ""
            const reader= new FileReader()         

            reader.readAsBinaryString(fileRef)
            reader.onload=(ev: any) =>{  
                 fileBase64.push(`data:${fileType as string};base64,${btoa(ev.target.result )}`)   
                setFileBase64([...fileBase64]);               
             
               
            }
                       
            }
           
                     
        } 
          
           
        navigate("/registration")
    }
    
    
    const removePhoto =(index:number) => { 
        const fileListArr = Array.from(imagesSelected);
        setImagesSelected(fileListArr.filter((_, i) => i !== index));
        setFileBase64(fileListArr.filter((_, i) => i !== index) )
        
        if(imagesSelected.length -1 === 0){
            inspectionPictureRef.current.value= ""     
              setFileBase64([])
              setImagesSelected([])
           
              
        }
     
                
    }
  
  
 
 useEffect(() => {

    props.handleResult([...fileBase64])  
     if(props.cleanImages === true){
        setImagesSelected([]);
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
                <input className='input-add-image' name='file' type="file"  ref={inspectionPictureRef} multiple={true} accept="image/png,image/jpeg" onChange={(e) => convertFile(e.target.files)}/>

            </UploadImage>
         
            </div>
                 
            {imagesSelected && Array.from(imagesSelected).map((item,index:any)=>  {
               
                return(
                <ImageWrapper>
                <AiFillCloseCircle className='button-close' onClick={()=>removePhoto(index)}/>
                
                <img src={URL.createObjectURL(item as any)} id="urlId" alt='imagem propriedade'/>
                
            </ImageWrapper>
                )
            } )
            }
        </ImagesContainer>
       
    )
}

export default UploadImages;