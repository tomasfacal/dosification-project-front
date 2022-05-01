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

  const [fieldsList, setFiledsList] = useState([] as string[]);
  const [fieldsValues, setFieldsValues] = useState({} as any);

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
      name: "Cargar Columnas Fijas",
      link: Routing.UPLOAD_OBSERVATION_STEP_2,
      clickable: true,
      actual: true,
    },
  ];

  const fetchObservationFields = async () => {
    try {
      const response = await API.get(
        API_ROUTES.MODEL_DRUGS + state.model_id + "/"
      );
      const field_list = response.data.fixed_columns;
      delete field_list["OCC"];
      setFiledsList(field_list);
      field_list.map((key: string) => {
        fieldsValues[key] = ".";
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeFieldValues = (name: string, value: string) => {
    setFieldsValues({
      ...fieldsValues,
      [name]: value,
    });
  };

  const updateFixedColumnsValues = async () => {
    Object.keys(fieldsValues).forEach((key) => {
      if (fieldsValues[key] === "") fieldsValues[key] = ".";
    });
    setState((prev) => ({
      ...prev,
      fixed_columns: fieldsValues,
    }));
    navigation(Routing.UPLOAD_OBSERVATION_STEP_3);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await updateFixedColumnsValues();
  };

  useEffect(() => {
    fetchObservationFields();
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
        <h1 className={styles.Title}>Cargar columnas fijas</h1>
        <CreateObservation
          fieldsList={fieldsList}
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
