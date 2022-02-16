
import React, { Fragment, useEffect, useState } from 'react';
import { useTheme } from "@material-ui/core/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { JSDocNamespaceBody } from "typescript";
import ResultSimulation from "./result-simulation";


const SimulationGraph = (props: any) => {
   const theme = useTheme();
   const [ series, setSeries] = useState([] as any)   


    useEffect(() => {
        const seriesAux = [] as any
        props.results.map((result: any) => {
            const serie = {
                name: "Treatment" ,
                type: "line",
                data: result.values,
            }
            seriesAux.push(serie)
        })
        setSeries(seriesAux)
    }, []);

   

  const chartData: ApexOptions = {
    chart: {
        width: '100%',
        type: 'area',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Resultado simulación',
        align: 'left'
      },
      xaxis: {
        type: 'numeric',
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      yaxis:{
        decimalsInFloat:2
      },
      fill: {
        type: "solid",
      },
      series: series
  };
  console.log(chartData)
  
  return(
    <Fragment>
          {series.length>0 && <ReactApexChart options={chartData} series={chartData.series} />}
    </Fragment> 
  )
};

export default SimulationGraph;
