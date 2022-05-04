import styles from "./treatment-card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid, Typography } from "@material-ui/core";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";

interface Treatment {
  treatment: TreatmentJSON;
  index: number;
  delete_treatment: (index: number) => void;
}

const TreatmentCard = (props: Treatment) => {
  return (
    <Grid key={props.index} item>
      <Card className={styles.CardTreatment}>
        <CardContent>
          <Typography className={styles.Carditem}>
            Ciclo de duración: {props.treatment.cycle_duration}
          </Typography>
          <Typography className={styles.Carditem}>
            Cantidad: {props.treatment.quantity}
          </Typography>
        </CardContent>
        <CardActions className={styles.DeleteAction}>
          <Button
            size="small"
            className={styles.DeleteButton}
            onClick={() => props.delete_treatment(props.index)}
          >
            <DeleteIcon />
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TreatmentCard;
