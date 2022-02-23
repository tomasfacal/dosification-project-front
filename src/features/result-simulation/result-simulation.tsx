import React, { Fragment, useState, useEffect, useContext } from "react";
import styles from "./result-simulation.module.scss";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import AuthContext from "../../context/authContext";
import SimulationGraph from "./line-chart";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";

const ResultSimulation = (props: any) => {
  const { state, setState } = useSimulationGlobalState();
  const [results, setResults] = useState<ResponseResultJSON[]>([]);
  const authCtx = useContext(AuthContext);

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
      actual: true,
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
    }
  ];

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
    });
  }, []);

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        {results.length > 0 && (
          <SimulationGraph results={results}></SimulationGraph>
        )}
      </div>
    </Fragment>
  );
};

export default ResultSimulation;
