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

const UploadObservationStep2 = (props: any) => {
  const navigation = useNavigate();
  const { state, setState } = useObservationsGlobalState();

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
      name: "Cargar observaciones",
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
      setFiledsList(Object.values(response.data.order_csv));
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

  const updateInformation = async () => {
    const body = {
      patient_data: fieldsValues,
    };
    try {
      await API.post(
        API_ROUTES.MODEL_DRUGS +
          `${state.model_id}/patients/${state.document_number}/update_information`,
        body
      );
      navigation(Routing.HOME);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await updateInformation();
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
        <h1 className={styles.Title}>Cargar nueva observacion</h1>
        <CreateObservation
          covariates={fieldsList}
          setValues={handleChangeFieldValues}
        />
        <div className={styles.ButonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={styles.SubmitButton}
            // disabled={!validateFields(data.document_number, data.model_id)}
          >
            Cargar observación
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadObservationStep2;
