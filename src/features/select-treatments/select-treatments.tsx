import React, {Fragment, useState} from 'react';
import styles from './select-treatments.module.scss';
import { TextField, Tooltip, Button, FormControl, 
         FormLabel, FormControlLabel, RadioGroup, Radio, Grid, Typography
        } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

interface JSON {
  cycle_duration: number,
  number_of_repetitions: number,
  quantity: number
}

const SelectTreatments = () => {
    const [datos, setData] = useState({
        cycle_duration: 0,
        number_of_repetitions: 0,
        quantity: 0
    })

    const [cards, setCards] = useState<JSON[]>(
      []
    )
  
    const handleInputChange = (event: any) => {
      setData({
          ...datos,
          [event.target.name] : event.target.value
      })
    }

    const deleteTreatment = (index: number) => {
      const newstate = cards;
      newstate.splice(index, 1);
      setCards(newstate);
    }

    const validateFields = (cycle_duration: number, number_of_repetitions: number, quantity: number) => (
      (!!cycle_duration && !!number_of_repetitions && !!quantity) && (cycle_duration > 0 && number_of_repetitions > 0 && quantity > 0)
    );

    const handleSubmit = (event: any) => {
      event.preventDefault();
      setCards([...cards, {cycle_duration: datos.cycle_duration, number_of_repetitions: datos.number_of_repetitions, quantity: datos.quantity}]);
    }

    const renderCard = (treatment: JSON, index: number) => {
      return (
        <Grid key= {index} item xs={12} sm={4}>
          <Card sx={{ minWidth: 275 }} className={styles.CardTreatment}>
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
              <Button size="small" className= {styles.DeleteButton} onClick={() => deleteTreatment(index)}>
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
            <h1 className= {styles.Title} >Crear Tratamiento</h1>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <div className= {styles.fieldContainer}>
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      label="Ciclo de duración"
                      name= "cycle_duration"
                      error={datos.cycle_duration === 0}
                      helperText={datos.cycle_duration === 0 ? 'Ciclo de duración requerido' : ' '}
                      onChange={handleInputChange}
                    />
                    <Tooltip title="Este valor indica cada cuanto tiempo se van a aplicar las dosis" arrow placement="right" classes={{tooltip: styles.tooltip}}>
                      <HelpIcon className={styles.helpIcon}/>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className= {styles.fieldContainer}>
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      label="Número de repeticiones"
                      name= "number_of_repetitions"
                      error={datos.number_of_repetitions === 0}
                      helperText={datos.number_of_repetitions === 0 ? 'Número de repeticiones requerido' : ' '}
                      onChange={handleInputChange}
                    />
                    <Tooltip title="Este valor indica la cantidad de repeticiones que se van a aplicar" arrow placement="right" classes={{tooltip: styles.tooltip}}>
                      <HelpIcon className={styles.helpIcon}/>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className= {styles.fieldContainer}>
                    <TextField
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      label="Cantidad"
                      name= "quantity"
                      error={datos.quantity === 0}
                      helperText={datos.quantity === 0 ? 'Cantidad requerido' : ' '}
                      onChange={handleInputChange}
                    />
                    <Tooltip title="Este valor indica la cantidad de droga por dosis" arrow placement="right" classes={{tooltip: styles.tooltip}}>
                      <HelpIcon className={styles.helpIcon}/>
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                className={styles.SubmitButton}
                disabled={!validateFields(datos.cycle_duration, datos.number_of_repetitions, datos.quantity)}
              >
                <AddCircleIcon className= {styles.AddTreatmentIcon}/>
                Crear Tratamiento
            </Button>
          </div>
          <div className= {styles.CardsContainer}>
            <Grid container spacing={2}>
            { cards.map((treatment: JSON, index: number) =>
                renderCard(treatment, index))
            }
            </Grid>
          </div>
        </Fragment>
    );
}
 
export default SelectTreatments;