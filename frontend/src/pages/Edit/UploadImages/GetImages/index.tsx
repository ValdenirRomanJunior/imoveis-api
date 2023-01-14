
import { useEffect, useState } from 'react';
import { getTenantImages } from '../../../../services/resources/fileManager';
import {ImageWrapperManager, ImageWrapperGetImages} from './styles';
import {ImageItem} from '../../../../types/Images'
import { number } from '../../../Registration/masks';

import Button from '../../../../components/Button';
import { IoCloseOutline } from 'react-icons/io5';





export type ImageProps = {
    image: ImageItem;
    onSelectedChanged: (image: ImageItem) => void;
    onClick:Function;
   

    
   
    
  };

  
 const ImageComponent = (props:ImageProps)=>{


    return(
        <div>          
          <ImageWrapperGetImages image={props.image.url} >      
            <input 
            type='checkbox'  
            value={props.image.url}
            checked={props.image.selected}
            onChange={(el) =>{
                props.onSelectedChanged({
                    id:props.image.id,
                    url:props.image.url,
                    idTenant:props.image.idTenant,
                    selected: el.target.checked
                }); 
                }}
                />                                         
         </ImageWrapperGetImages>
         </div>
         
         )
        } 
           
        
const GetImages = (props:ImageProps) =>{

    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImages] = useState<ImageItem[]>([]);
   

    const [disable, setDisable] = useState<boolean>(true);
   
   
    

    const onChange = (currentImage: ImageItem) => {
        setImages((currentState) =>
        currentState.map((i: ImageItem) =>
            
            i.url === currentImage.url
            ? {
                ...i,
                
                selected:currentImage.selected
               
              }
              
            : {
                ...i,
                         
            }
        )
            );
        
                       
            if(currentImage.selected) {
                                
                let images= localStorage.getItem('images') || '[]';
                let parseImages= JSON.parse(images) as ImageItem[];             
                 parseImages.push(currentImage);
                 selectedImages.push(currentImage)                         
                localStorage.setItem('images', JSON.stringify(parseImages));

             
                                            
            } 
            
               if(!currentImage.selected){
                let index = selectedImages.findIndex(val => val.id === currentImage.id);
                
                selectedImages.splice(index, 1);     
                let images= localStorage.getItem('images') || '[]';
                
                let parseImages= JSON.parse(images) as ImageItem[];
                 
                
                let indexs = parseImages.findIndex(val => val.id === currentImage.id);
                parseImages.splice(indexs, 1);
                
                localStorage.setItem('images', JSON.stringify(parseImages));
                                    
            } 
                    
                         if(selectedImages.length >0){
                              
                                setDisable(false)

                            }else{
                                setDisable(true)
                            }      
                   
    };
        
    
    //requisição para api para buscar imagens
    const getAllImages = async () => {
        const {data}= await getTenantImages();
        setImages(data.content);
        
    }
                
    useEffect(() =>{
        getAllImages();
               
    },[])


   
    return(
        
    <ImageWrapperManager> 
                 
    {images && images.map((image,index) => (
        <ImageComponent
            key={index}
            onSelectedChanged={onChange}
            image={image}
             onClick={props.onClick}
           
           
        />
        
    ))}
      
    <Button onClick={()=> props.onClick()}  disabled={disable} className="button-fileManager">Selecionar</Button>    
    </ImageWrapperManager>
   
 )
}

export default GetImages;