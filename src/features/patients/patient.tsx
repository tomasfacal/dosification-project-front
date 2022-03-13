import { Fragment, useState, useEffect } from "react";
import styles from "./patient.module.scss";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import { Grid, Button } from "@material-ui/core";
import InputPatient from "./input_patient";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { Routing } from "../../constant/Routing";
import { useNavigate } from "react-router-dom";
import { useObservationsGlobalState } from "../../context/ObservationsGlobalState";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";

const Patient = () => {
  const [datos, setData] = useState({
    first_name: "",
    document_number: "",
    sex: "",
    last_name: "",
  });
  const [editable, setEditable] = useState({
    first_name: false,
    document_number: false,
    sex: false,
    last_name: false,
  });

  const { document_number } = useParams();
  const navigation = useNavigate();
  const { state, setState } = useObservationsGlobalState();

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Paciente",
      link: Routing.PATIENT,
      clickable: true,
      actual: true,
    },
  ];

  useEffect(() => {
    API.get(API_ROUTES.PATIENT + document_number + "/")
      .then((res) => {
        setData({
          ...datos,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          document_number: res.data.document_number,
          sex: res.data.sex,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChangeInput = (name: string, value: string) => {
    setData({
      ...datos,
      [name]: value,
    });
  };

  const handlePencil = (name: string) => {
    let new_value = false;
    if (name === "first_name") {
      new_value = !editable.first_name;
    }
    if (name === "last_name") {
      new_value = !editable.last_name;
    }
    if (name === "document_number") {
      new_value = !editable.document_number;
    }
    if (name === "sex") {
      new_value = !editable.sex;
    }

    setEditable({
      ...editable,
      [name]: new_value,
    });
  };

  const handleSubmit = (event: any) => {
    let data_json = {
      first_name: datos.first_name,
      document_number: datos.document_number,
      sex: datos.sex,
      last_name: datos.last_name,
    };
    API.put(API_ROUTES.PATIENT + document_number + "/", data_json);

    setEditable({
      ...editable,
      first_name: false,
      last_name: false,
      document_number: false,
      sex: false,
    });
  };

  const redirectObservation = () => {
    setState((prev) => ({
      ...prev,
      document_number: parseInt(datos.document_number),
      model_id: 0,
      model_name: "",
    }));
    navigation(Routing.UPLOAD_OBSERVATION_STEP_1);
};

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        <img
          src={datos.sex === "F" ? female : male}
          alt="ilustracion paciente"
          className={styles.PatientImage}
        />
        <h1 className={styles.Title}>{datos.first_name} {datos.last_name}</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <InputPatient
              name="first_name"
              show_name="Nombre"
              editableInput={editable.first_name}
              value={datos.first_name}
              parentCallback={handleChangeInput}
              parentCallbackEditable={handlePencil}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputPatient
              name="last_name"
              show_name="Apellido"
              editableInput={editable.last_name}
              value={datos.last_name}
              parentCallback={handleChangeInput}
              parentCallbackEditable={handlePencil}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputPatient
              name="document_number"
              show_name="Cédula"
              editableInput={editable.document_number}
              value={datos.document_number}
              parentCallback={handleChangeInput}
              parentCallbackEditable={handlePencil}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputPatient
              name="sex"
              show_name="Sexo"
              value={datos.sex}
              editableInput={editable.sex}
              parentCallback={handleChangeInput}
              parentCallbackEditable={handlePencil}
            />
          </Grid>
        </Grid>
        <div className={styles.DivButton}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={styles.SubmitButton}
          >
            Guardar
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={redirectObservation}
            className={styles.SubmitButton}
          >
            Agregar observación
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Patient;
