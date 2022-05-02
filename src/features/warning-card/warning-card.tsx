import styles from "./warning-card.module.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography } from "@material-ui/core";
import WarningIcon from '@mui/icons-material/Warning';

interface Warning {
  warning: string;
}

const WarningCard = (props: Warning) => {
  return (
    <Grid item>
      <Card className={styles.CardWarning}>
        <CardContent>
          <WarningIcon className= {styles.warningIcon}/>
          <Typography className={styles.Carditem}>
            {props.warning}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WarningCard;
