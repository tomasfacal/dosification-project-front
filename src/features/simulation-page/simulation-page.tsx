import React, {Fragment, useState} from 'react';
import styles from './simulation-page.module.scss';
import { TextField, Tooltip, Button, Grid, Typography} from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';

const SimulationPage = () => {
  const [cards, setCards] = useState<SimulationJSON[]>(
    [{ model: 'Modelo 1',
      patient: 'Paciente 1',
      output: 'Output',
      treatment: {
        cycle_duration: 14,
        number_of_repetitions: 13,
        quantity: 2
      }
    },
    { model: 'Modelo 1',
    patient: 'Paciente 1',
    output: 'Output',
    treatment: {
      cycle_duration: 15,
      number_of_repetitions: 11,
      quantity: 344
    }
  }]
  )
  const deleteSimulation = (index: number) => {
    let newstate = [...cards];
    newstate.splice(index, 1);
    setCards(newstate);
  }

  const renderCard = (simulation: SimulationJSON, index: number) => {
    return (
      <Grid key= {index} item sm={12}>
        <Card sx={{ minWidth: 275 }} className={styles.CardSimulation}>
          <CardContent>
            <Typography className={styles.Carditem}>
              Ciclo de duración: {simulation.treatment.cycle_duration}
            </Typography>
            <Typography className={styles.Carditem}>
              Número de repeticiones: {simulation.treatment.number_of_repetitions}
            </Typography>
            <Typography className={styles.Carditem}>
              Cantidad: {simulation.treatment.quantity}
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
        <h1>Hola</h1>
        <div className= {styles.CardsContainer}>
            <Grid container spacing={2}>
            { cards.map((simulation: SimulationJSON, index: number) =>
                renderCard(simulation, index))
            }
            </Grid>
          </div>
      </Fragment>
  );
}
 
export default SimulationPage;
