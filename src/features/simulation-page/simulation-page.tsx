import React, {Fragment, useState} from 'react';
import styles from './simulation-page.module.scss';
import { Button, Grid, Typography} from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { Routing } from '../../constant/Routing';

const SimulationPage = () => {
  const [simulationInfo, setSimulationInfo] = useState<SimulationJSON>(
    { 
      model: 'Ciclosporina',
      patient: '49305483',
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

  const breadcrumbs = [
    {
        name: 'Inicio',
        link: '/',
        clickable: true,
        actual: false,
      },
      {
        name: 'Seleccionar modelo/paciente',
        link: Routing.SELECCIONAR_PACIENTE,
        clickable: true,
        actual: false,
      },
      {
        name: 'Seleccionar covariables/output',
        link: Routing.MODEL_DRUG,
        clickable: true,
        actual: false,
      },
      {
        name: 'Seleccionar Tratamiento',
        link: Routing.SELECT_TREATMENTS,
        clickable: true,
        actual: false,
      },
      {
        name: 'Simulación',
        link: Routing.SIMULATION_PAGE,
        clickable: false,
        actual: true,
      }
    ];

  const deleteSimulation = (index: number) => {
    let newstate = [...cards];
    newstate.splice(index, 1);
    setCards(newstate);
  }

  const renderCard = (treatment: TreatmentJSON, index: number) => {
    return (
      <Grid key= {index} item>
        <Card className={styles.CardSimulation}>
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
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className= {styles.FormContainer} >
        <h1 className= {styles.Title} >¿Listo para simular?</h1>
        <div className= {styles.SimulationContainer}>
          <Typography className={styles.Carditem}>
            <MedicationIcon/>
            Modelo: {simulationInfo.model}
          </Typography>
          <Typography className={styles.Carditem}>
          <PersonIcon/>
            Paciente: {simulationInfo.patient}
          </Typography>
          <Typography className={styles.Carditem}>
            <AnalyticsIcon/>
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
        <div className= {styles.SimulateButtonContainer}>
          <Button
            color="primary"
            variant="contained"
            className={styles.SubmitButton}
            disabled={cards.length === 0}
          >
            <EqualizerIcon className= {styles.AddTreatmentIcon}/>
            Simular
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
 
export default SimulationPage;
