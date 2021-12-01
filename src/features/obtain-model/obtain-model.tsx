import React, { Fragment, useState, useEffect } from 'react';
import styles from './obtain-model.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';


const ObtainModelDrug = (props: any) => {
    const [covariates, setCovariates] = useState([] as string[])
    const [outputs, setOutputs] = useState([] as string[])

    useEffect(() => {
        API.get(API_ROUTES.MODEL_DRUGS + props.model_drug+'/')
        .then(res => {
            setCovariates(res.data.variables);
            setOutputs(res.data.outputs);
        })
    }, [])

    return (
        <Fragment>
            <div className={styles.FormContainer} >
                <CreateCovariates covariates={covariates}/>
                <ChooseOutput outputs={outputs} />
            </div>
        </Fragment>
    );
}
 
export default ObtainModelDrug;
