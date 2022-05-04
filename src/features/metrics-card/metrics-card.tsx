import { useState} from "react";
import styles from "./metrics-card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@material-ui/core";
import metricsImage from "../../assets/images/metrics.jpg";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


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
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

const MetricsCard = (props: any) => {
  const metricsTitle = (props.metrics[0].steady_state === true) ? "Métricas de simulación en estado estacionario" : "Métricas de simulación";
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card className={styles.CardMetrics}>
      <CardContent>
        <img
            src={metricsImage}
            alt="ilustracion paciente"
            className={styles.MetricImage}
        />
        <Typography className={styles.CardTitle}>
          {metricsTitle}
        </Typography>
        <div className={styles.CardItem}>
          <AutoGraphIcon/>
          <Typography>
            TSS: {props.metrics[0].tss}
          </Typography>
        </div>
        <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
          {props.metrics.map((treatment: Metrics, index: number) => (
            <Tab label= {`Tratamiento ${index + 1}`} />
          ))}
        </Tabs>
        {props.metrics.map((treatment: Metrics, index: number) => (
          <TabPanel value={value} index={index}>
            <div className={styles.CardItem}>
              <AutoGraphIcon/>
              <Typography>
                AUC: {treatment.auc}
              </Typography>
            </div>
            <div className={styles.CardItem}>
              <AutoGraphIcon/>
              <Typography>
                Concentración máxima: {treatment.maximum}
              </Typography>
            </div>
            <div className={styles.CardItem}>
              <AutoGraphIcon/>
              <Typography>
                Concentración mínima: {treatment.minimum}
              </Typography>
            </div>
          </TabPanel>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
