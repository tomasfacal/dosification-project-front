import { Fragment, useState, useEffect } from "react";
import styles from "./obtain-model.module.scss";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import CreateCovariates from "../create-covariates/create-covariates";
import ChooseOutput from "../choose-output/choose-output";
import { Button } from "@material-ui/core";
import { Forward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import settings from "../../assets/images/settings.gif";

const ObtainModelDrug = () => {
  const { state, setState } = useSimulationGlobalState();
  const navigation = useNavigate();

  const [covariatesList, setCovariatesList] = useState([] as string[]);
  const [outputsList, setOutputsList] = useState([] as string[]);
  const [displayCovariates, setDisplayCovariates] = useState(
    state.display_covariates ? state.display_covariates : {}
  );
  const [displayOutputs, setDisplayOutputs] = useState(
    state.display_outputs ? state.display_outputs : {}
  );
  const [covariatesValues, setCovariatesValues] = useState(
    state.covariates ? state.covariates : {}
  );
  const [outputValue, setOutputValue] = useState(
    state.output ? state.output : ""
  );
  const [measurementUnit, setMeasurementUnit] = useState(
    state.measurement_unit ? state.measurement_unit : ""
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
      actual: true,
    },
    {
      name: "Seleccionar Tratamiento",
      link: Routing.SIMULATION_FLOW + Routing.SELECT_TREATMENTS,
      clickable: false,
      actual: false,
    },
    {
      name: "Simulación",
      link: Routing.SIMULATION_FLOW + Routing.SIMULATION_PAGE,
      clickable: false,
      actual: false,
    },
    {
      name: "Resultados",
      link: Routing.SIMULATION_FLOW + Routing.RESULT_PAGE,
      clickable: false,
      actual: false,
    },
  ];

  const fetchCovariatesOutputs = async () => {
    try {
      const response = await API.get(
        API_ROUTES.MODEL_DRUGS + state.model_id + "/"
      );
      const c_hash = response.data.variables;
      const o_hash = response.data.outputs;
      const c_keys = Object.keys(c_hash);
      const o_keys = Object.keys(o_hash);
      setCovariatesList(c_keys);
      setOutputsList(o_keys);
      setDisplayCovariates(c_hash);
      setDisplayOutputs(o_hash);
      setMeasurementUnit(response.data.measurement_unit);

      if (covariatesValues === {}) {
        const covariates_list = {} as any;
        {
          covariatesList.map(
            (covariate: string) => (covariates_list[covariate] = "")
          );
        }
        setCovariatesValues(covariates_list);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeCovariateValues = (name: string, value: string) => {
    setCovariatesValues({
      ...covariatesValues,
      [name]: value,
    });
  };

  const handleChangeOutputValue = (value: string) => {
    setOutputValue(value);
  };

  const handleNext = () => {
    setState((prev) => ({
      ...prev,
      covariates: covariatesValues,
      output: outputValue,
      display_covariates: displayCovariates,
      display_outputs: displayOutputs,
      measurement_unit: measurementUnit,
    }));
    navigation(Routing.SIMULATION_FLOW + Routing.SELECT_TREATMENTS);
  };

  const validateFields = (outputValue: string, covariatesValues: any) => {
    return !!outputValue && !!covariatesValues;
  };

  useEffect(() => {
    fetchCovariatesOutputs();
  }, []);

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        <img
          src={settings}
          alt="ilustracion ajustes"
          className={styles.SettingsImage}
        />
        <div>
          {!state.is_individual && (
            <CreateCovariates
              display_covariates={displayCovariates}
              covariates={covariatesList}
              setValues={handleChangeCovariateValues}
            />
          )}
          <ChooseOutput
            display_outputs={displayOutputs}
            outputs={outputsList}
            setValue={handleChangeOutputValue}
          />
        </div>
        <div className={styles.ButonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleNext}
            className={styles.SubmitButton}
            disabled={!validateFields(outputValue, covariatesValues)}
          >
            <Forward />
            Siguiente
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ObtainModelDrug;
