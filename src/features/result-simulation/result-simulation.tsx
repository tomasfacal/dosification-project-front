import { Fragment, useState, useEffect } from "react";
import styles from "./result-simulation.module.scss";
import API from "../../networking/api-service";
import { Link } from "react-router-dom";
import { API_ROUTES } from "../../networking/api-routes";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import SimulationGraph from "./line-chart";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import CircularIndeterminate from "../loading/circular_indeterminate";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";
import MetricsCard from "../metrics-card/metrics-card";
import WarningCard from "../warning-card/warning-card";
import TreatmentCard from "../treatment-card/treatment-card";

const ResultSimulation = (props: any) => {
  const { state, setState } = useSimulationGlobalState();
  const [results, setResults] = useState<ResponseResultJSON[]>([]);
  const [error, setError] = useState<Boolean>(false);

  const setCardsFromContext = () => {
    if (state.treatments) return state.treatments;
    else return [] as TreatmentJSON[];
  };

  const [treatments] = useState<TreatmentJSON[]>(
    setCardsFromContext()
  );

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar modelo/paciente",
      link: Routing.SIMULATION_FLOW + Routing.SELECT_PATIENT_MODEL,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar covariables/output",
      link: Routing.SIMULATION_FLOW + Routing.MODEL_DRUG,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar Tratamiento",
      link: Routing.SIMULATION_FLOW + Routing.SELECT_TREATMENTS,
      clickable: true,
      actual: false,
    },
    {
      name: "Simulación",
      link: Routing.SIMULATION_FLOW + Routing.SIMULATION_PAGE,
      clickable: true,
      actual: false,
    },
    {
      name: "Resultados",
      link: Routing.SIMULATION_FLOW + Routing.RESULT_PAGE,
      clickable: false,
      actual: true,
    },
  ];

  const postSimulate = async () => {
    const body = {
      treatments: state.treatments,
      covariates: state.covariates,
      output: state.output,
      document: state.document_number,
    };

    try {
      const res = await API.post(
        API_ROUTES.MODEL_DRUGS + state.model_id + "/simulate_dosis",
        body
      );
      setResults(res.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    postSimulate();
  }, []);

  const parseNumber = (x: any) => (x > 9999 ? Math.round(x) : x.toPrecision(4));

  const metrics = () => {
    let result: Metrics[] = [];
    results.map((dato: ResponseResultJSON) =>
      result.push({
        steady_state: true,
        auc: parseNumber(dato.auc),
        maximum: parseNumber(dato.maximum),
        minimum: parseNumber(dato.minimum),
        tss: parseNumber(dato.tss),
        measurement_unit: state.measurement_unit,
      })
    );
    return result;
  };

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <h1 className={styles.Title}>
        Simulación con parámetros{" "}
        {state.is_individual ? "individuales" : "poblacionales"}
      </h1>
      <h2 className={styles.SubTitle}>
        Paciente:{" "}
        <Link
          to={`/patient/${state.document_number}`}
          className="btn btn-primary"
        >
          {state.document_number}
        </Link>
      </h2>
      <div className={styles.PageContainer}>
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
          <div className={styles.results}>
            <div id="chart" className={styles.simulationResults}>
              <div className={styles.FormContainer}>
                <SimulationGraph
                  results={results}
                  document_number={state.document_number}
                  output={
                    state.display_outputs[state.output || ""] || state.output
                  }
                  measurement_unit={state.measurement_unit}
                ></SimulationGraph>
              </div>
              <Grid className={styles.TreatmentContainer} container spacing={2}>
                {treatments.map((treatment: TreatmentJSON, index: number) => (
                  <TreatmentCard
                    treatment={treatment}
                    index={index}
                    name={"Tratamiento " + (index + 1)}
                  ></TreatmentCard>
                ))}
              </Grid>
            </div>
            <div id="metrics" className={styles.metricsResults}>
              <MetricsCard
                metrics={metrics()}
                document_number={state.document_number}
              ></MetricsCard>
              <WarningCard warning="Finglix es una herramienta de ayuda. El control de resultados brindados y la dosificación están a cargo del usuario." />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ResultSimulation;
