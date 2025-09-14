import { useState } from "react";
import {SlArrowRight,SlArrowLeft} from 'react-icons/sl'
import './styles.css'
import {IoCloseOutline} from 'react-icons/io5'
import { DetailImagesWrapper } from "./styles";
import {IoImageOutline} from 'react-icons/io5';
import { ItemSlide, Slides } from "../types/image";
import defaultImage from '../assets/no-pictures.png';



const ImageSlider = (slides:Slides)=>{

    const  [currentIndex,setCurretIndex]=useState<number>(0);


    const goToPrevius = ()=>{
      const isFirstSlide=  currentIndex === 0;
        const newIndex=isFirstSlide ? slides.items.length -1 : currentIndex -1;
        setCurretIndex(newIndex);
    }

    const goToNext = ()=>{
        const isLastSlide=  currentIndex === slides.items.length -1;
          const newIndex=isLastSlide ? 0 : currentIndex + 1;
          setCurretIndex(newIndex);
      }

      const [slideNumber,setSlideNumber]= useState(0);
      const [openModel,setOpenModel]= useState(false)

      const handleOpenModel = (currentIndex:number) => {
        setSlideNumber(currentIndex)
        setOpenModel(true)
      }

      //close  full screen
      const handleCloseModal = ()=> {
        setOpenModel(false)

      }
      //previusImageModal full screen
      const prevSlide = ()=> {
        slideNumber === 0 ? setSlideNumber(slides.items.length -1) : setSlideNumber(slideNumber -1);
        
      }
      //nextImageModal full screen
      const nextSlide = ()=> {
        slideNumber +1 === slides.items.length ? setSlideNumber(0) : setSlideNumber(slideNumber +1);
      }


    return(
          
         <div className="slide-property-wrapper-detail">

           {openModel &&
            <div className="sliderWrap">
                
            <div className="counter-wrapper">
                <span>{slideNumber}</span>/    
                 <span>{slides.items.length}</span>
                 </div>

                <IoCloseOutline  className="btn-close" onClick={handleCloseModal}/>
                <SlArrowLeft className="btn-prev" onClick={prevSlide}/>
                <SlArrowRight className="btn-next" onClick={nextSlide}/>
               <div className="fullScreenImage">
            
               {slides.items[slideNumber]?.url ? <img src={slides.items[slideNumber].url as string} alt="foto-imóvel"/>: <img src={defaultImage} alt="defaultImage"/>}
                </div>

            </div>
           } 
           

         <div style={
        {position:'absolute',top:'50%', left:'5%',  fontSize:'35px',
        color:'#fff',
        zIndex: 10,
        cursor:'pointer',
        width:'50px',textAlign:'center'}} onClick={goToPrevius}><SlArrowLeft/></div>

         <div style={{   top:'50%',
        position:'absolute',
        right:'5%',
        fontSize:'35px',
        color:'#fff',
        zIndex: 10,
        cursor:'pointer',
        width:'50px',textAlign:'center'}} onClick={goToNext}><SlArrowRight/></div>
           
            
                  {slides.items.length >0 ? 
                  <div  onClick={()=> handleOpenModel(currentIndex)}   className="slide-item-image-detail-wrapper">  
                 <img src={slides.items[currentIndex]?.url as string} className="slide-item-image-detail"  alt=''/>                                  
                  </div>
                  :   <div  className="slide-item-image-detail-wrapper">  
                 <img src={defaultImage} className="default-image-slide-item-detail"/>                                  
                   </div>


}
                  <DetailImagesWrapper>
                    <div className="type-image-detail-wrapper">
                      <span>{slides.goal}</span>
                    </div>
                    <div className="iconImage-counter-wrapper">
                   <IoImageOutline className="icon-image-slider-detail"/>
                    <span>{slideNumber}/{slides.items.length}</span>
                    </div>
                    
                    </DetailImagesWrapper>        
                </div>
       

    );
};
export default ImageSlider;