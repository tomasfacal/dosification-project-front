import { Fragment, useState, useEffect, useContext } from "react";
import styles from "./result-simulation.module.scss";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import AuthContext from "../../context/authContext";
import SimulationGraph from "./line-chart";
import TreatmentCardResult from "./TreatmentCardResult/treatment_result";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import CircularIndeterminate from "../loading/circular_indeterminate";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";

const ResultSimulation = (props: any) => {
  const { state, setState } = useSimulationGlobalState();
  const [results, setResults] = useState<ResponseResultJSON[]>([]);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState<Boolean>(false);

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar modelo/paciente",
      link: Routing.SELECT_PATIENT_MODEL,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar covariables/output",
      link: Routing.MODEL_DRUG,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar Tratamiento",
      link: Routing.SELECT_TREATMENTS,
      clickable: true,
      actual: false,
    },
    {
      name: "Simulación",
      link: Routing.SIMULATION_PAGE,
      clickable: true,
      actual: false,
    },
    {
      name: "Resultados",
      link: Routing.RESULT_PAGE,
      clickable: false,
      actual: true,
    },
  ];

  useEffect(() => {
    const body = {
      treatments: state.treatments,
      covariates: state.covariates,
      output: state.output,
      document: state.document_number,
    };

    API.post(API_ROUTES.MODEL_DRUGS + state.model_id + "/simulate_dosis", body)
      .then((res) => {
        setResults(res.data);
      })
      .catch(function (error) {
        setError(true);
      });
  }, []);

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div>
        {results.length === 0 && !error && (
          <div className={styles.Loading}>{CircularIndeterminate()}</div>
        )}
        {results.length === 0 && error && (
          <div className={styles.FormContainer}>
            <Typography>
              Hubo un error en la simulación, pruebe cambiar los parámetros
            </Typography>
          </div>
        )}
        {results.length > 0 && (
          <div>
            <div className={styles.FormContainer}>
              <SimulationGraph results={results}></SimulationGraph>
            </div>
            <Grid container spacing={2}>
              {results.map((result: any, index: number) => (
                <TreatmentCardResult
                  cycle_duration={result.cycle_duration}
                  number_of_repetitions={result.number_of_repetitions}
                  quantity={result.quantity}
                  index={index}
                  name={"Treatment " + (index + 1)}
                ></TreatmentCardResult>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ResultSimulation;
