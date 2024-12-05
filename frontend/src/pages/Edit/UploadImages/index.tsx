import {ImagesContainer, UploadImage,ImageWrapper} from './styles';
import {MdPhotoCamera} from 'react-icons/md';
import {  useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import GetImages from './GetImages/index';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../UploadImages/styles.css'
import {ImageItem, ImagePage} from '../../../types/Images'
import { Link, useParams } from 'react-router-dom';
import { uploadPropertyImage } from '../../../services/resources/property';
import LoadingFile from '../../../components/LoadingFile';

import { convertToBlob } from '../../../services/resources/covertToBlob';


interface PropImages{
    images:ImageItem[];
    handleResult:(fileBase64:string[], imagesSelected:ImageItem[],deleteIds:any[]) => void;
}


const UploadImages = (props:PropImages) =>{

    const params = useParams(); 
    
    const inspectionPictureRef = useRef<HTMLInputElement | any>();
    const [fileBase64,setFileBase64]= useState<string[]>([]);
    const [imagesSelected, setImagesSelected] = useState<ImageItem[]>([...props.images]);
    const [deleteIds,setDeleteIds]= useState<any[]>([]);

    const WIDTH = 600;
    function convertFile(files:any){
       
        setImagesSelected([...imagesSelected])
        
        if(imagesSelected){
            for (let i = 0; i < files.length; i++) {
                
            const fileRef= files[i]  || ""
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
        
    
    <Link to={`/edit/${params.propertyId}`}></Link>     
}

      const  getIdToRemove=(url:string)=>{
        
       var outro =url.slice(47, -1)
        var newsS =outro.slice(0, outro.indexOf('.'));
        deleteIds.push(parseInt(newsS) as any)
        
}

const removePhoto =(url:string) => {
    getIdToRemove(url); 
    let  imgs=imagesSelected.filter((l => l.url !== url));
    localStorage.setItem('images',JSON.stringify(imgs))
    setImagesSelected(imgs)
   
        //passar o valor de items que o input tem em casa e não so vazio
        if(imagesSelected.length  === 0){   
            inspectionPictureRef.current.value= " "     
                          
        } 
        if(fileBase64.length  === 0){
            inspectionPictureRef.current.value= " "     
                          
        } 
       
  }

  const removePhotoBase64 =(url:string) => { 
    let  imgs=fileBase64.filter((l => l !== url));
    localStorage.setItem('images',JSON.stringify(imgs))
    setFileBase64(imgs)
        //passar o valor de items que o input tem em casa e não so vazio
        if(imagesSelected.length  === 0){
            inspectionPictureRef.current.value= " "     
                          
        } 
        if(fileBase64.length  === 0){
            inspectionPictureRef.current.value= " "     
                          
        }      
  }
  
 


   useEffect(() => {

    props.handleResult([...fileBase64],[...imagesSelected],[...deleteIds])
    
    // setImagesSelected(props.images)

     
}, [props.images,imagesSelected,fileBase64]);

            
    return(
        <ImagesContainer>
            <h3 className='title-photos'>Fotos</h3>
    
            <p>Adicione até <strong>10 fotos</strong></p>
            <div>
            <UploadImage  >
                <MdPhotoCamera className='icon-photo'/>
                <span>Adicionar fotos</span>
                <span>PNG e JPG somente</span>
                <input className='input-add-image' name='file' type="file"  ref={inspectionPictureRef} multiple={true} accept="image/png,image/jpeg" onChange={(e) => convertFile(e.target.files)}/>

            </UploadImage>

            </div>
           
        
            {imagesSelected && Array.from(imagesSelected).map((item,index:any)=>  {
           
           return(
           <ImageWrapper>
           <AiFillCloseCircle className='button-close' onClick={()=>removePhoto(item.url)}/>
           <img src={item.url} id="urlId" alt='imagem propriedade'/>
           
       </ImageWrapper>
           )
       } )
       }

        {fileBase64 && Array.from(fileBase64).map((item,index:any)=>  {
           
           return(
           <ImageWrapper>
           <AiFillCloseCircle className='button-close' onClick={()=>removePhotoBase64(item)}/>
           <img src={item} id="urlId" alt='imagem propriedade'/>
           
       </ImageWrapper>
           )
       } )
       }
                  
          
 
          
        </ImagesContainer>

            
        
    )
}

export default UploadImages;