import React, {Fragment, useState} from 'react';
import styles from './create-patient.module.scss';
import { TextField, Tooltip, Button, FormControl, 
         FormLabel, FormControlLabel, RadioGroup, Radio, Grid, Typography
        } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const CreatePatient = () => {
    const [datos, setData] = useState({
        name: '',
        document_number: '',
        sex: 'female',
        lastname: '',
        errorMessage: '',
    }) 

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
      const bool = [true, false];
      const random = Math.floor(Math.random() * bool.length);
      const result = bool[random]
      console.log(result);
      if (!result) {
        setData({...datos, errorMessage: 'Error al crear paciente'})
      } else {
        setData({...datos, errorMessage: ''})
        console.log('enviando datos...' + datos.name);
        alert('se van a enviar datos al back');
      }
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
                    defaultValue="female"
                    name="sex"
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Femenino" />
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Masculino" />
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
            {datos.errorMessage && (
              <Typography className={styles.error}>{datos.errorMessage}</Typography>
            )}
          </div>
        </Fragment>
    );
}
 
export default CreatePatient;
