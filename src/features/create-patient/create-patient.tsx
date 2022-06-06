import { Fragment, useState } from "react";
import styles from "./create-patient.module.scss";
import {
  TextField,
  Tooltip,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Typography,
} from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import Error from "../error/error";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { Routing } from "../../constant/Routing";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import { useNavigate } from "react-router-dom";

const CreatePatient = () => {
  const navigation = useNavigate();
  const [datos, setData] = useState({
    name: "",
    document_number: "",
    sex: "F",
    lastname: "",
  });

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Crear Paciente",
      link: Routing.CREATE_PATIENT,
      clickable: true,
      actual: true,
    },
  ];

  const handleInputChange = (event: any) => {
    setData({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = (
    name: string,
    lastname: string,
    document_number: string,
    sex: string
  ) => !!name && !!lastname && !!document_number && !!sex;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(success);
    const patient = {
      first_name: datos.name,
      last_name: datos.lastname,
      document_number: datos.document_number,
      sex: datos.sex,
    };
    try {
      const res = await API.post(API_ROUTES.CREATE_PATIENT, patient);
      setError("");
      console.log(`Paciente ${datos.name} creado satisfactoriamente`, res.data);
      setSuccess(`Paciente ${datos.name} creado satisfactoriamente`);
      setTimeout(() => {
        navigation(Routing.HOME);
      }, 2000);
    } catch (error: any) {
      setSuccess("");
      let completeError = "";
      console.log(error);
      for (var i in error.response.data) {
        completeError = completeError.concat(`${i}: ${error.response.data[i]}`);
      }
      setError(completeError);
    }
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className={styles.fieldContainer}>
              <TextField
                label="Nombre"
                name="name"
                error={datos.name === ""}
                helperText={datos.name === "" ? "Nombre requerido" : " "}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={styles.fieldContainer}>
              <TextField
                label="Apellido"
                name="lastname"
                error={datos.lastname === ""}
                helperText={datos.lastname === "" ? "Apellido requerido" : " "}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
        </Grid>
        <div className={styles.fieldContainer}>
          <Tooltip
            title="Cedula con digito verificador, sin puntos ni guiones"
            arrow
          >
            <TextField
              type="number"
              label="Cédula de identidad"
              name="document_number"
              placeholder="49305483"
              error={datos.document_number === ""}
              helperText={
                datos.document_number === ""
                  ? "Cedula de identidad requerida"
                  : " "
              }
              onChange={handleInputChange}
            />
          </Tooltip>
        </div>
        <div className={styles.fieldContainer}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sexo</FormLabel>
            <RadioGroup
              aria-label="sex"
              defaultValue="F"
              name="sex"
              onChange={handleInputChange}
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
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          className={styles.SubmitButton}
          disabled={
            !validateFields(
              datos.name,
              datos.lastname,
              datos.document_number,
              datos.sex
            )
          }
        >
          <PersonAddIcon className={styles.AddClientIcon} />
          Crear Paciente
        </Button>
        {error && <Error error={error} />}
        {success && (
          <Typography className={styles.success}>{success}</Typography>
        )}
      </div>
    </Fragment>
  );
};

export default CreatePatient;
