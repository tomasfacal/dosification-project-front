import React, {Fragment, useState} from 'react';
import styles from './create-patient.module.scss';
import { TextField, Tooltip, Button, FormControl, 
         FormLabel, FormControlLabel, RadioGroup, Radio, Grid, Typography
        } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';

const CreatePatient = () => {
  const [datos, setData] = useState({
      name: '',
      document_number: '',
      sex: 'F',
      lastname: '',
  });

  const [success, setSuccess] = useState('');

  const [error, setError] = useState('');

  const handleInputChange = (event: any) => {
    setData({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const validateFields = (name: string, lastname: string, document_number: string, sex: string) => (
    (!!name && !!lastname && !!document_number && !!sex)
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(success);
    const patient = {
      first_name: datos.name,
      last_name: datos.lastname,
      document_number: datos.document_number,
      sex: datos.sex
    }
    API.post(API_ROUTES.CREATE_PATIENT, patient)
      .then(res => {
        setError('');
        console.log(`Paciente ${datos.name} creado satisfactoriamente`,res.data);
        setSuccess(`Paciente ${datos.name} creado satisfactoriamente`);
      })
      .catch(function (error) {
        setSuccess('');
        let completeError = '';
        console.log(error);
        for (var i in error.response.data) {
          completeError = completeError.concat(`${i}: ${error.response.data[i]}`);
        };
        setError(completeError);
      });
  }

  return (
    <Fragment>
      <div className= {styles.FormContainer} >
        <h1 className= {styles.Title} >Crear Paciente</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className= {styles.fieldContainer}>
                <TextField
                  label="Nombre"
                  name= "name"
                  error={datos.name === ""}
                  helperText={datos.name === "" ? 'Nombre requerido' : ' '}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className= {styles.fieldContainer}>
                <TextField
                  label="Apellido"
                  name= "lastname"
                  error={datos.lastname === ""}
                  helperText={datos.lastname === "" ? 'Apellido requerido' : ' '}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>
          </Grid>
          <div className= {styles.fieldContainer}>
          <Tooltip title="Cedula con digito verificador, sin puntos ni guiones" arrow>
            <TextField
                type="number"
                label="Cédula de identidad"
                name= "document_number"
                placeholder= "49305483"
                error={datos.document_number === ""}
                helperText={datos.document_number === "" ? 'Cedula de identidad requerida' : ' '}
                onChange={handleInputChange}
              />
          </Tooltip>
          </div>
          <div className= {styles.fieldContainer}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Género</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="F"
                name="sex"
                onChange={handleInputChange}
              >
                <FormControlLabel value="F" control={<Radio color="primary" />} label="Femenino" />
                <FormControlLabel value="M" control={<Radio color="primary" />} label="Masculino" />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={styles.SubmitButton}
            disabled={!validateFields(datos.name, datos.lastname, datos.document_number, datos.sex)}
          >
            <PersonAddIcon className= {styles.AddClientIcon}/>
            Crear Paciente
        </Button>
        {error && (
          <Typography className={styles.error}>{error}</Typography>
        )}
        {success && (
          <Typography className={styles.success}>{success}</Typography>
        )}
      </div>
    </Fragment>
  );
}
 
export default CreatePatient;
