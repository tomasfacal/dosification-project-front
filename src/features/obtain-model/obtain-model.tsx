import React, { Fragment, useState, useEffect } from 'react';
import styles from './obtain-model.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';
import { Button } from '@material-ui/core';
import { Forward } from "@mui/icons-material";
import { setCovariates } from '../create-covariates/covariateSlice';
import { useAppDispatch } from '../../app/store/hooks';


const ObtainModelDrug = (props: any) => {
    const dispatch = useAppDispatch();

    const [covariatesList, setCovariatesList] = useState([] as string[])
    const [outputsList, setOutputsList] = useState([] as string[])
    const [covariatesValues, setCovariatesValues] = useState({})
    const [outputValue, setOutputValue] = useState('')

    const fetchCovariatesOutputs = async () => {
        try {
            const response = await API.get(API_ROUTES.MODEL_DRUGS + props.model_drug + '/');
            setCovariatesList(response.data.variables);
            setOutputsList(response.data.outputs);

            let covariates_list = {} as any
            { covariatesList.map((covariate: string) => covariates_list[covariate] = '') }
            setCovariatesValues(covariates_list)


        } catch (error) {
            console.log("error", error);
        }
    };

    const handleChangeCovariateValues = ((name: string, value: string) => {
        setCovariatesValues({
            ...covariatesValues,
            [name]: value
        })
    })

    const handleChangeOutputValue = ((value: string) => {
        setOutputValue(value)
    })

    const handleNext = (event: any) => {
        dispatch(setCovariates(covariatesValues))
        
    }

    useEffect(() => {
        fetchCovariatesOutputs();
    }, []);

    return (
        <Fragment>
            <div className={styles.FormContainer} >
                <CreateCovariates covariates={covariatesList} setValues={handleChangeCovariateValues}/>
                <ChooseOutput outputs={outputsList} setValue={handleChangeOutputValue} />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleNext}
                    className={styles.SubmitButton}
                >
                    <Forward />
                    Siguiente
                </Button>
            </div>
        </Fragment>
    );
}

export default ObtainModelDrug;
