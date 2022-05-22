import { Fragment, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SimulationGraph = (props: any) => {
  const [series, setSeries] = useState([] as any);

  useEffect(() => {
    const seriesAux = [] as any;
    props.results.map((result: any, index: any) => {
      const number_treatment = index + 1;
      const serie = {
        name: "Tratamiento " + number_treatment,
        type: "line",
        data: result.values,
      };
      seriesAux.push(serie);
    });
    setSeries(seriesAux);
  }, []);

  const chartData: ApexOptions = {
    chart: {
      width: "100%",
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "numeric",
      title: {
        text: "Tiempo (Hs)",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      decimalsInFloat: 2,
      title: {
        text: props.output + " (mg/L)",
      },
    },
    fill: {
      type: "solid",
    },
    title: {
      text: "Resultados de la simulación",
      align: "left",
    },
    subtitle: {
      text: "Paciente: " + props.document_number,
      align: "left",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    series: series,
  };
  console.log(chartData);

  return (
    <Fragment>
      {series.length > 0 && (
        <ReactApexChart
          height={400}
          width={600}
          options={chartData}
          series={chartData.series}
        />
      )}
    </Fragment>
  );
};

export default SimulationGraph;
