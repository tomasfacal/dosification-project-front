import React, {Fragment, useState} from 'react';
import styles from './create-patient.module.scss';
import { TextField, Tooltip, Button, FormControl, 
         FormLabel, FormControlLabel, RadioGroup, Radio
        } from '@material-ui/core';

const CreatePatient = () => {
    const [datos, setData] = useState({
        name: '',
        document_number: '',
        sex: 'female',
    })

    const handleInputChange = (event: any) => {
        setData({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event: any) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.name)
        alert('se van a enviar maquinas')
    }

    return (
        <Fragment>
          <h1 className= {styles.Title} >Crear Paciente</h1>
            <div className= {styles.fieldContainer}>
              <TextField
                label="Nombre"
                name= "name"
                onChange={handleInputChange}
              />
            </div>
            <div className= {styles.fieldContainer}>
            <Tooltip title="Cedula con digito verificador, sin puntos ni guiones" arrow>
              <TextField
                  type="number"
                  label="Cédula de identidad"
                  name= "document_number"
                  placeholder= "49305483"
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
                  <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                  <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={sendData}
            >
              Crear Paciente
            </Button>
        </Fragment>
    );
}
 
export default CreatePatient;
