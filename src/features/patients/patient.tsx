import React, { Fragment, useState, useEffect } from 'react';
import styles from './obtain-model.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';
import { TextField, Grid } from '@material-ui/core';


const Patient = (props: any) => {
    const [datos, setData] = useState({
        first_name: '',
        document_number: '',
        sex: 'female',
        last_name: '',
    })

    useEffect(() => {
        API.get(API_ROUTES.PATIENT + props.patient_id + '/')
            .then(res => {
                setData({
                    ...datos,
                    'first_name': res.data.first_name,
                    'last_name': res.data.first_name,
                    'document_number': res.data.document_number,
                    'sex': res.data.sex,
                })
            })
    }, [])

    const handleInputChange = (event: any) => {
        setData({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Fragment>
            <div className={styles.FormContainer} >
                <div className={styles.FormContainer} >
                    <h1 className={styles.Title} >Covariables</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <div className={styles.fieldContainer}>
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    error={datos.first_name === ""}
                                    helperText={datos.first_name === "" ? 'Nombre requerido' : ' '}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={styles.fieldContainer}>
                                <TextField
                                    label="Apellido"
                                    name="lastname"
                                    error={datos.last_name === ""}
                                    helperText={datos.last_name === "" ? 'Apellido requerido' : ' '}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
}

export default Patient;
