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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Error from "../error/error";

const Patient = () => {
  const [datos, setData] = useState({
    first_name: "",
    document_number: "",
    sex: "",
    last_name: "",
  });
  const [editable, setEditable] = useState({
    first_name: false,
    last_name: false,
  });

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

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
      link: Routing.PATIENT + "/" + document_number,
      clickable: true,
      actual: true,
    },
  ];

  const getPatient = async () => {
    try {
      const res = await API.get(API_ROUTES.PATIENT + document_number + "/");
      setData({
        ...datos,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        document_number: res.data.document_number,
        sex: res.data.sex,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatient();
  }, []);

  const handleChangeInput = (name: string, value: string) => {
    setData({
      ...datos,
      [name]: value,
    });
  };

  const handleRadioButtonChange = (event: any) => {
    setData({
      ...datos,
      [event.target.name]: event.target.value,
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

    setEditable({
      ...editable,
      [name]: new_value,
    });
  };

  const handleSubmit = async (event: any) => {
    let data_json = {
      first_name: datos.first_name,
      document_number: datos.document_number,
      sex: datos.sex,
      last_name: datos.last_name,
    };
    try {
      await API.put(
        API_ROUTES.PATIENT + document_number + "/",
        data_json
      );
      setError("");
      setSuccess(
        `Paciente ${datos.first_name} ${datos.last_name} actualizado satisfactoriamente`
      );
    } catch (error: any) {
      setSuccess("");
      let completeError = "";
      console.log(error);
      for (var i in error.response.data) {
        completeError = completeError.concat(`${i}: ${error.response.data[i]}`);
      }
      setError(completeError);
    }

    setEditable({
      ...editable,
      first_name: false,
      last_name: false,
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
        <h1 className={styles.Title}>
          {datos.first_name} {datos.last_name}
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <InputPatient
              name="document_number"
              show_name="Cédula"
              permanentDisabled={true}
              value={datos.document_number}
              parentCallback={handleChangeInput}
              parentCallbackEditable={handlePencil}
            />
          </Grid>
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
            <FormControl component="fieldset">
              <FormLabel component="legend">Género</FormLabel>
              <RadioGroup
                aria-label="gender"
                value={datos.sex}
                name="sex"
                onChange={handleRadioButtonChange}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio color="primary" />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="M"
                  control={<Radio color="primary" />}
                  label="Masculino"
                />
              </RadioGroup>
            </FormControl>
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
          {error && <Error error={error} />}
          {success && (
            <Typography className={styles.success}>{success}</Typography>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Patient;
