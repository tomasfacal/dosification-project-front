import React, { Fragment, useState, useEffect } from 'react';
import styles from './obtain-model.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import CreateCovariates from '../create-covariates/create-covariates';
import ChooseOutput from '../choose-output/choose-output';


const ObtainModelDrug = (props: any) => {
    const [covariates, setCovariates] = useState([] as string[])
    const [outputs, setOutputs] = useState([] as string[])

    const fetchCovariatesOutputs = async () => {
        try {
          const response = await API.get(API_ROUTES.MODEL_DRUGS + props.model_drug+'/');
          setCovariates(response.data.variables);
          setOutputs(response.data.outputs);
        } catch (error) {
          console.log("error", error);
        }
    };
    
    useEffect(() => { 
           fetchCovariatesOutputs(); 
    }, []);
    
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
