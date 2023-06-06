
import { useEffect, useState } from 'react';
import { deleteImagesByTenant, getTenantImages } from '../../../../services/resources/fileManager';
import {ImageWrapperManager, ImageWrapperGetImages} from './styles';
import {ImageItem} from '../../../../types/Images'
import Button from '../../../../components/Button';
import { AiFillCloseCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import Input from '../../../../components/Input';
import React from 'react';
import Loading from '../../../../components/Loading';
import './styleDeleteImageReg.css';


export type ImageProps = {
    image: ImageItem;
    onSelectedChanged: (image: ImageItem) => void;
    onClick:Function;
    onChange:Function;
    refreshImages:boolean;
    onChanges:Function;
  };


 const ImageComponent = (props:ImageProps)=> {

    const [loading,setLoading]=useState(false);
    const [loadingSendEmail,setLoadingSendEmail]=useState(false);
    const [successMessage, setSuccessMessage] = React.useState(false);
    const [error,setError]=useState('');

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
  
    function closeModal() { 
     
      setIsOpen(false);
      
    }

    const closeModalAndDelete = () => {
      props.onChange(props.image.id,props.image.url)
      setIsOpen(false)
  }

    return(
       
            
          <ImageWrapperGetImages image={props.image.url} >
            <img src={props.image.url} alt='img'/>
          <AiFillCloseCircle className='button-close-bucket-images' onClick={openModal}/>     
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
                   <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      
        contentLabel="Example Modal"
        className='Modal-delete'
        
      >
       
        <h1>Tem certeza que deseja excluir?</h1>
         
         <div className="buttons-wrapper-lead">
              <button onClick={closeModal}  className='cancel-button-lead'>Cancelar</button>
              <p onClick={closeModalAndDelete}  className='delete-button-lead'>Excluir</p>
              
              </div>
        
              <div className="message">
              { !loadingSendEmail && successMessage ===true ? <span className='formField__error success'>Algo deu errado</span>: ''}
              {error && error ? <span className='formField__error'>{error}</span>: ''}
             
              </div>
            
            
        
      </Modal>                              
         </ImageWrapperGetImages>
        
         
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
                                
                //let images= localStorage.getItem('images') || '[]';
               // let parseImages= JSON.parse(images) as ImageItem[];             
              //   parseImages.push(currentImage);
                 selectedImages.push(currentImage)                         
              //  localStorage.setItem('images', JSON.stringify(parseImages));
       
                                            
            } 
            
               if(!currentImage.selected){

                let index = selectedImages.findIndex(val => val.url === currentImage.url);               
                selectedImages.splice(index, 1);

                //let images= localStorage.getItem('images') || '[]';                
               // let parseImages= JSON.parse(images) as ImageItem[];
                 
                
              //  let indexs = parseImages.findIndex(val => val.url === currentImage.url);
               // parseImages.splice(indexs, 1);
                
               
                                    
            } 
            localStorage.setItem('images', JSON.stringify(selectedImages));
                         if(selectedImages.length >0){
                              
                                setDisable(false)

                            }else{
                                setDisable(true)
                            } 
                      
                              
    };
        
    
 
    
    const getAllImages = async () => {
        const {data}= await getTenantImages();
        console.log(data)
        setImages(data.content);
        

    }
    
    
    useEffect(() => {
        getAllImages();
               
    },[])

    useEffect(() => {
      if(props.refreshImages===true){
        getAllImages();
      }
    
             
  },[props.refreshImages])
       
    const removePhoto = async(id:string,url:string) => {  
        
          //chamar backend
          const data = await deleteImagesByTenant(id); 
          getAllImages();
        let newList=selectedImages.filter((l => l.id !== Number(id)));
        props.onChanges(url)
        localStorage.setItem('images',JSON.stringify(newList))
        //setSelectedImages(newList);          
    }
     
    

    return(
        
    <ImageWrapperManager>  
         
        
       
    {images && images.map((image,index) => (
        <ImageComponent
        key={index}
        onSelectedChanged={onChange}
        image={image}
        onClick={props.onClick}
        onChange={removePhoto}
        refreshImages={props.refreshImages}
        onChanges={props.onChanges}  
    
        />
        
    ))}
   
   <Button onClick={()=> props.onClick()}  disabled={disable} className="button-file-Manager">Selecionar</Button> 
   
    </ImageWrapperManager>
   
 )
}

export default GetImages;