import React, { Fragment, useState, useEffect, useContext } from "react";
import styles from "./result-simulation.module.scss";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import AuthContext from "../../context/authContext";
import SimulationGraph from "./line-chart";
import CircularIndeterminate from "../loading/circular_indeterminate"
import Typography from '@mui/material/Typography';

const ResultSimulation = (props: any) => {
  const { state, setState } = useSimulationGlobalState();
  const [results, setResults] = useState<ResponseResultJSON[]>([]);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<Boolean>(false)

  useEffect(() => {
    const body = {
      treatments: state.treatments,
      covariates: state.covariates,
      output: state.output,
      document: state.document_number,
    };
    API.defaults.headers.common["Authorization"] = "Token " + authCtx.token;

    API.post(
      API_ROUTES.MODEL_DRUGS + state.model_id + "/simulate_dosis",
      body
    ).then((res) => {
      setResults(res.data);
    })
    .catch(function (error) {
      setError(true);
    });
  }, []);

  return (
    <Fragment>
       {results.length === 0 && !error && ( 
        <div className={styles.Loading}>
           {CircularIndeterminate()}
        </div>)
        }
        {results.length === 0 && error && ( 
          <div className={styles.FormContainer}>
            <Typography>Hubo un error en la simulación, pruebe cambiar los parámetros</Typography>
          </div>)
        }
        {results.length > 0 && (
           <div className={styles.FormContainer}>
            <SimulationGraph results={results}></SimulationGraph>
          </div>
        )}
    </Fragment>
  );
};

export default ResultSimulation;
