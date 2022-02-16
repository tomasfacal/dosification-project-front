import React, { Fragment, useState, useEffect, useContext } from 'react';
import styles from './result-simulation.module.scss';
import API from '../../networking/api-service';
import { API_ROUTES } from '../../networking/api-routes';
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import AuthContext from '../../app/store/authContext'
import SimulationGraph from './line-chart'



const ResultSimulation = (props: any) => {
    const { state, setState } = useSimulationGlobalState();
    const [ results, setResults] = useState<ResponseResultJSON[]>(
        []
    )
    const authCtx = useContext(AuthContext);
    

    useEffect(() => {
        const body = {
            "treatments": [{
                "cycle_duration":12,
                "number_of_repetitions":10,
                "amount": 200000
            },
            {
                "cycle_duration":13,
                "number_of_repetitions":15,
                "amount": 200000
            }],
            "covariates": {"CLCr": 10},
            "output":"Cc",
            "document": "48108474"
          }
          API.defaults.headers.common['Authorization'] =  "Token " + authCtx.token;
          
          API.post(API_ROUTES.MODEL_DRUGS +'3/simulate_dosis', body)
          .then(res => {
            setResults(res.data)
        })
    }, []);

    return (
        <Fragment>
            <div className={styles.FormContainer} >
                {results.length>0 && <SimulationGraph results={results}></SimulationGraph>}
            </div>
        </Fragment>
    );
}

export default ResultSimulation;
