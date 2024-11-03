
import { useState } from 'react';
import { FunnelContainer } from './styles';
import Funnel from "react-apexcharts";


type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
        series: SeriesData[];
}

function Funil(){

    const [chartData, setChartData]= useState<ChartData>({ 

        labels: {
          categories: ['captura','em atendimento']
    },
    series: [
        {
            name: "funil",
            data: [1380, 1100, 990, 880, 740, 548, 330, 200]                 
        }
    ]
    });







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
              return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
            },
       
            dropShadow: {
              enabled: true,
            }},
            
              
    };
    

    return(
        <FunnelContainer>
    <Funnel
            options={{...options,xaxis:chartData.labels}}
            series={chartData.series}
            type="bar"
            height="240"
            
      />

       </FunnelContainer>

    );
}

export default Funil;