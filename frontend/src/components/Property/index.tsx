import React from 'react';
import { FiTrash, FiEdit } from "react-icons/fi";
import { PropertiesContainer, PropertyItemContainer } from './styles';


interface PropertyProps {
    width?: string;
    children?: React.ReactNode;
    height?: string;
    noShadow?: boolean
    marginTop?: string;
}

interface PropertyItem {
    image: string,
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

const PropertyItem = ({ image, title, description, value, built, address }: PropertyItem) => {
    return (
        <PropertyItemContainer>

            <img src={image} width={100} height={50} alt="Property image" />

            <div>
            <h4>Title</h4>
            <p>{title}</p>
            </div>
            <div>
             <h4 >Description</h4>
            <p>{description}</p>
            </div>
            <div>
                <h4>Price</h4>
            <p>{value}</p>
            </div>
            <div>
                <h4>Built</h4>
            <p>{built}</p>
            </div>
            <div>
                <h4>Zipcode</h4>
            <p>{address.zipcode}</p>
            </div>
            <FiEdit color='blue' />
            <FiTrash color='blue' />


        </PropertyItemContainer>


    )


}

const Property = () => {

    const properties: PropertyItem[] = [
        {

            image: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
            title: "Beautiful house",
            description: "nice enterprise",
            value: 250.00,
            bed: 1123,
            built: 1970,
            sqft: 12345.00,
            address: {

                zipcode: "123455",
                number: 123,

                city: {

                    name: "litle Rock",
                    estado: {

                        name: "Arkansas"
                    }
                }


            }
        }
        
    ]


    return (
        <PropertiesContainer>
            {properties.map(property => <PropertyItem {...property} />)}


        </PropertiesContainer>

    )
}

export default Property;