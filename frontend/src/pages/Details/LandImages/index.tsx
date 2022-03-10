import React from 'react'
import { LandImageContainer, LandImageContainerVW, LandImageContainerVH,LandImageItemContainer } from './styles';
import {IoIosArrowDroprightCircle,IoIosArrowDropleftCircle} from 'react-icons/io';

interface PropertyImages{
    images:string[];
}

const LandImageItem  = ({images}: PropertyImages) =>{
    return(
        <LandImageItemContainer>
          <LandImageContainerVW >
           
                <IoIosArrowDropleftCircle size={50} color="#fff"style={{position:"absolute", top:"45%"}}/>
              
            <img src={images[0]} alt='foto'/>
          
            <IoIosArrowDroprightCircle size={50} color="#fff"style={{position:"absolute", top:"45%", right:"0px"}} />
            
        </LandImageContainerVW>
            <LandImageContainerVH>
           
               
                
                {images.map(image => (
                    <div>
                        <img src={image} alt='Property photo'/>
                        </div>
                    )

                    )}
        
     </LandImageContainerVH>

    </LandImageItemContainer>

    )
}

const LandImages = () =>{
    const images: PropertyImages[] = [
        {

            images:["https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg"
        
        
        
        ] 
           
        }
        
    ]



    return (
        <LandImageContainer>
              {images.map(image => <LandImageItem {...image} />)}
        </LandImageContainer>
    )
}

export default LandImages