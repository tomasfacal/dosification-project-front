import React, {Fragment, useState} from 'react';
import styles from './simulation-page.module.scss';
import { TextField, Tooltip, Button, Grid, Typography} from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';

const SimulationPage = () => {
  const [simulationInfo, setSimulationInfo] = useState<SimulationJSON>(
    { 
      model: 'Modelo 1',
      patient: 'Paciente 1',
      output: 'Output'
    }
  )
  const [cards, setCards] = useState<TreatmentJSON[]>(
    [ {
        cycle_duration: 14,
        number_of_repetitions: 13,
        quantity: 2
      },
      {
        cycle_duration: 15,
        number_of_repetitions: 11,
        quantity: 344
      },
      {
        cycle_duration: 16,
        number_of_repetitions: 51,
        quantity: 3466
      }
    ]
  )
  const deleteSimulation = (index: number) => {
    let newstate = [...cards];
    newstate.splice(index, 1);
    setCards(newstate);
  }

  const renderCard = (treatment: TreatmentJSON, index: number) => {
    return (
      <Grid key= {index} item sm={12}>
        <Card sx={{ minWidth: 275 }} className={styles.CardSimulation}>
          <CardContent>
            <Typography className={styles.Carditem}>
              Ciclo de duración: {treatment.cycle_duration}
            </Typography>
            <Typography className={styles.Carditem}>
              Número de repeticiones: {treatment.number_of_repetitions}
            </Typography>
            <Typography className={styles.Carditem}>
              Cantidad: {treatment.quantity}
            </Typography>
          </CardContent>
          <CardActions className= { styles.DeleteAction }>
            <Button size="small" className= {styles.DeleteButton} onClick={() => deleteSimulation(index)}>
              <DeleteIcon/>
              Eliminar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
  return (
    <Fragment>
      <div className= {styles.FormContainer} >
        <h1 className= {styles.Title} >¿Listo para simular?</h1>
        <div className= {styles.SimulationContainer}>
          <Typography className={styles.Carditem}>
            Modelo: {simulationInfo.model}
          </Typography>
          <Typography className={styles.Carditem}>
            Paciente: {simulationInfo.patient}
          </Typography>
          <Typography className={styles.Carditem}>
            Output: {simulationInfo.output}
          </Typography>
        </div>
        <div className= {styles.CardsContainer}>
          <Typography className={styles.Treatmentsubtitle}>
            Tratamientos:
          </Typography>
          <Grid container spacing={2}>
          { cards.map((treatment: TreatmentJSON, index: number) =>
              renderCard(treatment, index))
          }
          </Grid>
        </div>
      </div>
    </Fragment>
  );
}
 
export default SimulationPage;
