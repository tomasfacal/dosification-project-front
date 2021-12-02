import React, { Fragment, useState, useEffect } from 'react';
import styles from './input_patient.module.scss'
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';
import { TextField, Grid } from '@material-ui/core';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InputAdornment from '@mui/material/InputAdornment';
import { isPropertySignature } from 'typescript';

const InputPatient = (props: any) => {
    const [editable, setEditable] = useState( false )


    const handleClickPencil = (event: any) => {
        setEditable(true)
    }

    const handleChange = (event: any) => {
        props.parentCallback(event.target.name, event.target.value);
    }

    
    return (
        <div className={styles.ContainterInput}>
            {editable && 
            <TextField
                fullWidth
                id={"input-with-icon-textfield"}
                label= {props.show_name}
                value={props.value}
                name= {props.name}
                error={props.name === ""}
                helperText={props.name === "" ? props.name+ 'requerido' : ' '}
                variant="standard"
                onChange={handleChange}
                />
            }
            {!editable && 
            <TextField
                fullWidth
                id="input-with-icon-textfield"
                label={props.show_name}
                value={props.value}
                disabled
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <BorderColorIcon onClick={handleClickPencil}/>
                    </InputAdornment>
                ),
                }}
                variant="standard"
            />}
        </div> 
    );
}
        

export default InputPatient;
