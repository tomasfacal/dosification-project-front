import React, { Fragment, useState, useEffect } from 'react';
import styles from './patient.module.scss'
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import { Grid, Button } from '@material-ui/core';
import InputPatient from './input_patient';
import useForceUpdate from 'use-force-update';

const Patient = (props: any) => {
    const [datos, setData] = useState({
        first_name: '',
        document_number: '',
        sex: '',
        last_name: ''

    })
    const [editable, setEditable] = useState({
        first_name: false,
        document_number: false,
        sex: false,
        last_name: false
    })

    useEffect(() => {
        API.get(API_ROUTES.PATIENT + props.patient_id + '/')
            .then(res => {
                setData({
                    ...datos,
                    'first_name': res.data.first_name,
                    'last_name': res.data.last_name,
                    'document_number': res.data.document_number,
                    'sex': res.data.sex,
                })
            })
    }, [])

    const handleChangeInput = (name: string, value: string) => {
        setData({
            ...datos,
            [name]: value
        })
    }

    const handleSubmit = (event: any) => {
        let data_json = {
            'first_name': datos.first_name,
            'document_number': datos.document_number,
            'sex': datos.sex,
            'last_name': datos.last_name,
        }
        API.put(API_ROUTES.PATIENT + props.patient_id + '/', data_json)
    }

    return (
        <Fragment>
            <div className={styles.FormContainer} >
                <h1 className={styles.Title} >Paciente</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <InputPatient name='first_name' show_name='Nombre' value={datos.first_name} parentCallback={handleChangeInput} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputPatient name='last_name' show_name='Apellido' value={datos.last_name} parentCallback={handleChangeInput} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputPatient name='document_number' show_name='Cédula' value={datos.document_number} parentCallback={handleChangeInput} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputPatient name='sex' show_name='Sexo' value={datos.sex} parentCallback={handleChangeInput} />
                    </Grid>
                </Grid>
                <div className={styles.DivButton}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        className={styles.SubmitButton}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

export default Patient;
