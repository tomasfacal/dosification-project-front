import styles from "./treatment_result.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography } from "@material-ui/core";

type Props = {
  cycle_duration: number,
  measurement_unit: string | undefined,
  quantity: number,
  index: number,
  name:string,
}

const TreatmentCardResult = (props: Props) => {
  return (
    <Grid key={props.index} item>
      <Card sx={{ minWidth: 275 }} className={styles.CardTreatment}>
        <CardContent>
          <Typography className={styles.CardTitle} component="div">
            {props.name}
          </Typography>
          <Typography className={styles.Carditem}>
            Ciclo de duración: {props.cycle_duration} hrs
          </Typography>
          <Typography className={styles.Carditem}>
            Cantidad: {props.quantity} {props.measurement_unit}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TreatmentCardResult;
