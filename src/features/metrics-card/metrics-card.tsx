import { useState } from "react";
import styles from "./metrics-card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@material-ui/core";
import metricsImage from "../../assets/images/metrics.jpg";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CircularProgress from "@mui/material/CircularProgress";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const MetricsCard = (props: any) => {
  const metricsTitle =
    props.metrics[0].steady_state === true
      ? "Métricas de simulación en estado estacionario"
      : "Métricas de simulación";
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(false);

  const downloadReport = async () => {
    setIsLoading(true);
    const chart = document.getElementById("chart");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const canvas1 = await html2canvas(chart as HTMLElement);
    const imgData = canvas1.toDataURL("image/jpeg");
    pdf.addImage(imgData, "JPEG", 0, 20, width, height - 50);
    pdf.addPage();
    const metrics = props.metrics.map(function (
      treatment: Metrics,
      index: number
    ) {
      const number_treatment = index + 1;
      return (
        "Tratamiento " +
        number_treatment +
        "\n" +
        "AUC: " +
        treatment.auc +
        "\n" +
        "Concentración maxima: " +
        treatment.maximum +
        treatment.measurement_unit +
        "\n" +
        "Concentración minima: " +
        treatment.minimum +
        treatment.measurement_unit +
        "\n" +
        "Estado estacionario: " +
        treatment.tss +
        "mg * h/l" +
        "\n"
      );
    });
    pdf.text("Metricas \n", 10, 10, {
      maxWidth: 100,
    });
    pdf.text(metrics, 10, 20, {
      maxWidth: 100,
    });
    pdf.save("Reporte.pdf");
    setIsLoading(false);
  };

  return (
    <Card className={styles.CardMetrics}>
      <CardContent>
        <img
          src={metricsImage}
          alt="ilustracion paciente"
          className={styles.MetricImage}
        />
        <Typography className={styles.CardTitle}>{metricsTitle}</Typography>
        <div className={styles.CardItem}>
          <AutoGraphIcon />
          <Typography>TSS: {props.metrics[0].tss}</Typography>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
        >
          {props.metrics.map((treatment: Metrics, index: number) => (
            <Tab
              className={styles.TreatmentTab}
              label={`Tratamiento ${index + 1}`}
            />
          ))}
        </Tabs>
        {props.metrics.map((treatment: Metrics, index: number) => (
          <TabPanel value={value} index={index}>
            <div className={styles.CardItem}>
              <AutoGraphIcon />
              <Typography>AUC: {treatment.auc} mg * h/l</Typography>
            </div>
            <div className={styles.CardItem}>
              <AutoGraphIcon />
              <Typography>
                Concentración máxima: {treatment.maximum}{" "}
                {treatment.measurement_unit}
              </Typography>
            </div>
            <div className={styles.CardItem}>
              <AutoGraphIcon />
              <Typography>
                Concentración mínima: {treatment.minimum}{" "}
                {treatment.measurement_unit}
              </Typography>
            </div>
          </TabPanel>
        ))}
        {!isLoading && (
          <Button
            color="primary"
            variant="contained"
            onClick={downloadReport}
            className={styles.SubmitButton}
          >
            Generar Reporte
          </Button>
        )}
        {isLoading && <CircularProgress></CircularProgress>}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
