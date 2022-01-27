import React, { Fragment, useState, useEffect } from 'react';
import styles from './obtain-model.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';
import { Button } from '@material-ui/core';
import { Forward } from "@mui/icons-material";
import { setOutputCovariates } from './outputCovariateSlice';
import { useAppDispatch } from '../../app/store/hooks';
import { Link } from 'react-router-dom'
import { Routing } from '../../constant/Routing';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';


const ObtainModelDrug = (props: any) => {
    const dispatch = useAppDispatch();

    const [covariatesList, setCovariatesList] = useState([] as string[])
    const [outputsList, setOutputsList] = useState([] as string[])
    const [covariatesValues, setCovariatesValues] = useState({} as any)
    const [outputValue, setOutputValue] = useState('')

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
            name: 'ModelDrug',
            link: Routing.MODEL_DRUG,
            clickable: false,
            actual: true,
          },
          {
            name: 'Seleccionar Tratamiento',
            link: Routing.SELECT_TREATMENTS,
            clickable: false,
            actual: false,
          },
          {
            name: 'Simulación',
            link: Routing.SIMULATION_PAGE,
            clickable: false,
            actual: false,
          }
        ];

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
        let covariates_output = covariatesValues
        covariates_output['output'] = outputValue
        dispatch(setOutputCovariates(covariates_output))
        
    }

    useEffect(() => {
        fetchCovariatesOutputs();
    }, []);

    return (
        <Fragment>
            <div>
                <Breadcrumbs values={breadcrumbs} />
            </div>
            <div className={styles.FormContainer} >
                <CreateCovariates covariates={covariatesList} setValues={handleChangeCovariateValues}/>
                <ChooseOutput outputs={outputsList} setValue={handleChangeOutputValue} />
                <Link to={Routing.SELECT_TREATMENTS} style={{ textDecoration: 'none' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleNext}
                        className={styles.SubmitButton}
                    >
                        <Forward />
                        Siguiente
                    </Button>
                </Link>
            </div>
        </Fragment>
    );
}

export default ObtainModelDrug;
