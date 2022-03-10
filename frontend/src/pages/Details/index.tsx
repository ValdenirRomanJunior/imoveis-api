import React from 'react'
import Header from '../../components/Header';
import LandDetail from './LandDetail';
import LandImages from './LandImages';
import LandLocalization from './LandLocalization';
import {DetailsWrapper,BodyContainer,TitleContainer, ImageContainer, DetailsContainer,DetailsLocalizationContainer, PropertyItemImageContainer} from './styles';

interface PropertyProps {
    width?: string;
    children?: React.ReactNode;
    height?: string;
    noShadow?: boolean
    marginTop?: string;
}



interface PropertyItem {
    image: [],
    title: string,
    description: string,
    value: number,
    bed: number,
    built: number,
    sqft: number,

    address: {

        zipcode: string,
        number: number,
        city: {

            name: string,
            
            estado: {
                name: string
            }
        }


    }


}



const Details = ()=> {
    return(
      <DetailsWrapper>
          <Header />
          <BodyContainer>
              <TitleContainer>
                  <h1>Casa a venda nos estados unidos</h1>
              </TitleContainer>
              <ImageContainer>
                <LandImages /> 

              </ImageContainer>
              <DetailsContainer>
                  <h2>R$ 200.000</h2>
                  <p>Este imovel se encontra no estado do arkansas, ao centro dos estados unidos
                      situado em uma região de otima qualidade, perto de escolas, predios,
                      batante verde.
                  </p>
                  <LandDetail />
                          <DetailsLocalizationContainer>
                              < LandLocalization />
                          </DetailsLocalizationContainer>
              </DetailsContainer>
          </BodyContainer>
      </DetailsWrapper>
    )
}


export default Details