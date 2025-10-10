
import { useEffect, useState } from 'react';
import { FunnelContainer } from './styles';
import Funnel from "react-apexcharts";
import { Step } from '../../types/opportunity';
import { countstepsName, stepsName, stepsOpportunity } from '../../services/resources/lead';

import useAuth from '../../hooks/useAuth';
import PageNotFoundDashboard from '../PageNotFoundDashboard';


type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[] ;
    };
        series: SeriesData[];
}


type Counts = {
    name:string;
    count:number;
}


function Funil(){

    const [errors,setErrors]= useState(false);

    const {user, getCurrentUser} = useAuth();
    useEffect(() =>{
        
        getCurrentUser()
      
        if(user === null){
            setErrors(true)
        }
       
    },[])
  
    const [chartData, setChartData]= useState<ChartData>({ 

        labels: {
          categories: []
    },
    series: [
        {
            name: "funil",
            data: []                   
        }
    ]
    });

    const [counts,setCounts] = useState<Counts[]>()
    const getcountSteps = async () => {     
        const data= await countstepsName() as Counts[]
        setCounts(data as Counts[])
        const myLabels = data.map(x=>x.name);
        var indices: number[]=[];
        
        for(let i = 0; i<data.length; i++) {  
            indices.push(i)
        }
        var  meuArrayInvertido= indices.slice(0).reverse();
       
       
   
        setChartData({
            labels: {           
                categories:myLabels
          },
          series: [
              {
                  name: 'funil',
                  data: [8,7,6,5,4,3,2,1]
              }
          ]
        })

    
}
    useEffect(() =>{      
 getcountSteps()
          
    },[])

    
    const options = {
        
    
        plotOptions: {
          
          
            bar: {
                horizontal: true,
                isFunnel: true,
                
                
            }
        },
        dataLabels: {
          
            enabled: true,
            formatter: function (val:string, opt:any) {
                if(opt.w.globals.labels[opt.dataPointIndex] === undefined){
                     return ' '  +':  ' + ''

                }else{
                return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + ''
                }
             
            },
           
            dropShadow: {
              enabled: true,
            }},
          
              
    };
   
    let perfilTenant=user?.perfis ? Object.values(user.perfis).some(obj => 
         obj === 'TENANT'
     ) : false;
let perfilAdmin=user?.perfis ? Object.values(user.perfis).some(obj => 
    obj === 'ADMIN' 
) : false;
    return(
        <>
        { perfilTenant ? 
        <FunnelContainer>
          <div className='counts-item'>
                {counts && counts.map(item=>(
                    
                        <span>{item.count}</span>
                    
                )
                    
               
                )}
                </div>
                  <Funnel

                  options={{...options,xaxis:chartData?.labels}}
                  series={chartData?.series}
                  type="bar"
                  height="240"
                  
                  
                
                  
            />

      
  

       </FunnelContainer>
         : <PageNotFoundDashboard/>}
      </>

    );
}

export default Funil;