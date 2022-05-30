import { Fragment, useState, useEffect } from "react";
import { useObservationsGlobalState } from "../../context/ObservationsGlobalState";
import styles from "./upload-observation-step2.module.scss";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import CreateObservation from "../create-observation/create-observation";
import { API_ROUTES } from "../../networking/api-routes";
import API from "../../networking/api-service";
import { Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";

const UploadObservationStep2 = (props: any) => {
  const navigation = useNavigate();
  const { state, setState } = useObservationsGlobalState();
  const [warning, setWarning] = useState(true);

  const [patientInfoValues, setPatientInfoValues] = useState({} as any);
  const [patientInfoColumns, setPatientInfoColumns] = useState([] as String[]);

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar paciente y modelo",
      link: Routing.UPLOAD_OBSERVATION_STEP_1,
      clickable: true,
      actual: false,
    },
    {
      name: "Cargar datos del paciente",
      link: Routing.UPLOAD_OBSERVATION_STEP_2,
      clickable: true,
      actual: true,
    },
    {
      name: "Cargar tratamiento y observaciones",
      link: Routing.UPLOAD_OBSERVATION_STEP_3,
      clickable: false,
      actual: false,
    },
  ];

  const fetchColumns = async () => {
    try {
      const response = await API.get(
        API_ROUTES.MODEL_DRUGS + state.model_id + "/"
      );
      const patient_info_columns = response.data.patient_info_columns;
      const treatment_columns = response.data.treatment_columns;
      const observation_columns = response.data.observation_columns;

      setState((prev) => ({
        ...prev,
        treatment_columns: treatment_columns,
        observation_columns: observation_columns,
        patient_info_columns: patient_info_columns,
      }));

      setPatientInfoColumns(patient_info_columns);

      const patient_info_values = {} as any;

      patient_info_columns.map((key: string) => {
        patient_info_values[key] = ".";
      });
      setPatientInfoValues(patient_info_values);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeFieldValues = (name: string, value: string) => {
    setPatientInfoValues({
      ...patientInfoValues,
      [name]: value,
    });
  };

  const updatePatientInfoValues = async () => {
    setState((prev) => ({
      ...prev,
      patient_info_values: patientInfoValues,
    }));
    navigation(Routing.UPLOAD_OBSERVATION_STEP_3);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await updatePatientInfoValues();
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        {warning && (
          <Alert
            severity="warning"
            onClose={() => {
              setWarning(false);
            }}
          >
            Advertencia! Cada campo que quede <strong>vacio</strong>, será{" "}
            <strong>autocompletado con “.”</strong> acorde al formato requerido.
          </Alert>
        )}
        <h1 className={styles.Title}>Cargar datos del paciente</h1>
        <CreateObservation
          fieldsList={patientInfoColumns}
          setValues={handleChangeFieldValues}
        />
        <div className={styles.ButonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={styles.SubmitButton}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadObservationStep2;
