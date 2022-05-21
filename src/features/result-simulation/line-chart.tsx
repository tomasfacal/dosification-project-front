import { Fragment, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StylesContext } from "@material-ui/core/node_modules/@material-ui/styles";
import { height } from "@mui/material/node_modules/@mui/system";

const SimulationGraph = (props: any) => {
  const theme = useTheme();
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
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      decimalsInFloat: 2,
    },
    fill: {
      type: "solid",
    },
    series: series,
  };
  console.log(chartData);

  return (
    <Fragment>
      {series.length > 0 && (
        <ReactApexChart height= {400} width= {600} options={chartData} series={chartData.series} />
      )}
    </Fragment>
  );
};

export default SimulationGraph;
