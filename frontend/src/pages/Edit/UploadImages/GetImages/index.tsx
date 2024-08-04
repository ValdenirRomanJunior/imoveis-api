
import { useEffect, useState } from 'react';
import { deleteImagesByTenant, getTenantImages } from '../../../../services/resources/fileManager';
import {ImageWrapperManager, ImageWrapperGetImages} from './styles';
import {ImageItem, ImagePage, ImagePage2} from '../../../../types/Images'
import { number } from '../../../Registration/masks';
import Modal from 'react-modal';
import Button from '../../../../components/Button';
import { IoCloseOutline } from 'react-icons/io5';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../GetImages/stylesDeleteImage.css'
import PaginationImages from '../../../../components/PaginationImages';
import { MdOutlineHomeRepairService } from 'react-icons/md';
import { isUndefined } from 'util';


export type ImageProps = {
    image: ImageItem;
    //onSelectedChanged: Function;
    onClick:Function;
    onChange:Function;
    refreshImages:boolean;
    onChanges:Function;
    handleChange:Function;
    checked:boolean;
    
  };

 
 const ImageComponent = (props:ImageProps,index:number)=>{

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
            checked={props.checked}
            onChange={(el) =>{
              props.handleChange({

                id: props.image.id ,
                url: props.image.url,
                idTenant: props.image.idTenant ,
                selected:props.image.selected,
                checked: el.target.checked ,
                
             
               
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
    const [selectedImages,setSelectedsImages] = useState<ImageItem[]>([]);
    const [selectedIndex,setSelectedsIndex] = useState<number[]>([]);
    const [pageNumber, setPageNumber] = useState(0);

    const [disable, setDisable] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false);
    const [itemChecked, setItemCheked] = useState<number>();
      
    const [page, setPage] = useState<ImagePage>({

      content: [],
      last: true,
      totalPages: 0,
      totalElements: 0,
      size: 12,
      number: 0,
      first: true,
      numberOfElements: 0,
      empty: true
  } ); 

 
    const handleChange= (currentImage:ImageItem, index:number) => {
   
      setChecked(!checked)

      if(isNaN(currentImage.id && currentImage.idTenant)){

    
      setPage((currentState) =>
        currentState?.content?.map((i: ImageItem) =>
          
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
      }               
   
        if(selectedIndex.includes(index)){     
       setSelectedsIndex(selectedIndex.filter((i)=> i!==index));
                 
      } else {
        setSelectedsIndex([...selectedIndex, index]);    
      }

      let resultado = selectedImages.some(item=> item.id === index)
      console.log(resultado)
        if(!resultado){
          selectedImages.push(currentImage)   
        }
     
       if (resultado) {    
       let index = selectedImages.findIndex(val => val.id === currentImage.id);      
            selectedImages.splice(index, 1);   
      }


        localStorage.setItem('images', JSON.stringify(selectedImages));
      
        if(selectedImages.length >0){                            
          setDisable(false)          
            }else{
           setDisable(true)
          }      
                                 
    };
        
  
    //requisição para api para buscar imagens
    const getAllImages = async () => {
        const {data}= await getTenantImages(pageNumber);       
        setImages(data.content);
        setPage(data)
       
        
    }
                
    useEffect(() =>{
        getAllImages();
               
    },[pageNumber])

 

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
        
      }

      const handlePageChange = (newPageNumber : number)=>{      
         
        setPageNumber(newPageNumber);          
      }


    return(
      <div> 
    <ImageWrapperManager> 
           
    {images && images.map((image,index) => (
      <div key={index}>
        <ImageComponent
        key={index}
        image={image as ImageItem}
        onClick={props.onClick}
        onChange={removePhoto}
        refreshImages={props.refreshImages}
        onChanges={props.onChanges}
        handleChange={() => handleChange(image, image.id)} 
        checked={selectedIndex.includes(image.id)}        
           
           
        />
        </div>
    ))}
  
    <Button onClick={()=> props.onClick()}  disabled={disable} className="button-file-Manager">Selecionar</Button>   
    
  
    </ImageWrapperManager>
    <PaginationImages page={page as ImagePage} onChange={handlePageChange}/>
    </div>  
   
 )
}

export default GetImages;