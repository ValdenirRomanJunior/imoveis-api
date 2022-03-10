import React from 'react'
import {DashboardBackground, BodyContainer,RegisterContainer,SearchContainer} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Property from '../../components/Property';
import Input from '../../components/Input';
import { FiSearch   } from "react-icons/fi";
import Pagination from '../../components/Pagination';

const Dashboard = ()=>{

    
    return(
       <DashboardBackground>
           <Header />
           <BodyContainer>
             
                <RegisterContainer>
                       <h2>Register</h2>
                       <Card width="20px">
                       <p className='p-register'>+</p>
                   </Card>
                   </RegisterContainer>
                  <SearchContainer>
                    
                    <FiSearch size={40} color="blue" />
                  
                   <Input placeholder='Search' />
                   </SearchContainer>
               
                  
                   <Card width='100%' marginTop='20px' >
                    <Property />
                    </Card>
                    <Card width='100%' marginTop='20px' >
                    <Property />
                    </Card>

               
               
           </BodyContainer>
           <Pagination />

       </DashboardBackground>
            
        
    )
}

export default Dashboard;