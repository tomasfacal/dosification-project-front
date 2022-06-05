import { useState, useEffect } from "react";
import { useObservationsGlobalState } from "../../context/ObservationsGlobalState";
import styles from "./upload-observation-step3.module.scss";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../networking/api-routes";
import API from "../../networking/api-service";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const UploadObservationStep3 = () => {
  const navigation = useNavigate();
  const { state } = useObservationsGlobalState();
  const theme = createTheme();

  const [ObservationColumns, setObservationColumns] = useState([] as string[]);
  const [TreatmentColumns, setTreatmentColumns] = useState([] as string[]);
  const [TreatmentValues, setTreatmentValues] = useState({} as any);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tableState, setTableState] = useState({
    data: [] as any,
    editIdx: -1,
  });

  const [warning, setWarning] = useState(true);

  // Se queda con todas las filas menos
  const handleRemove = (i: number) => {
    setTableState((prev) => ({
      ...prev,
      data: prev.data.filter((_row: any, j: number) => j !== i),
    }));
  };

  const startEditing = (i: number) => {
    setTableState((prev) => ({
      ...prev,
      editIdx: i,
    }));
  };

  const stopEditing = () => {
    setTableState((prev) => ({
      ...prev,
      editIdx: -1,
    }));
  };

  const handleChange = (e: any, name: string, i: number) => {
    const { value } = e.target;
    setTableState((prev) => ({
      ...prev,
      data: prev.data.map((row: any, j: number) =>
        j === i ? { ...row, [name]: value } : row
      ),
    }));
  };

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
      actual: false,
    },
    {
      name: "Cargar tratamiento y observaciones",
      link: Routing.UPLOAD_OBSERVATION_STEP_3,
      clickable: true,
      actual: true,
    },
  ];

  const fetchObservationFields = async () => {
    const treatment_columns = state.treatment_columns;
    const observation_columns = state.observation_columns;
    setTreatmentColumns(treatment_columns || []);
    setObservationColumns(observation_columns || []);
  };

  useEffect(() => {
    fetchObservationFields();
  }, []);

  const formFields = () => {
    const hash = {} as any;
    ObservationColumns.forEach((element: any) => (hash[element] = ""));
    return hash;
  };

  const headers = () => {
    const array = [] as any;
    ObservationColumns.forEach((element: any) =>
      array.push({
        name: element,
        prop: element,
      })
    );
    return array;
  };

  const sendInformation = async () => {
    try {
      const body = {
        patient_info_values: state.patient_info_values,
        treatment_values: TreatmentValues,
        observation_values: tableState.data,
      };
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

  const onSubmitTreatment = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  };

  const onChange = (event: any) => {
    setTreatmentValues({
      ...TreatmentValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setOpen(false);
    await sendInformation();
  };

  const submitText = disabled ? "Editar" : "Listo";

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
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
      <h1 className={styles.Title}>Cargar tratamiento utilizado</h1>
      <form className={styles.Form}>
        {Object.values(TreatmentColumns).map((field: string) => (
          <TextField
            name={field}
            label={field}
            onChange={onChange}
            className={styles.Field}
            disabled={disabled}
          />
        ))}
        <div className={styles.ButonContainer}>
          <Button
            onClick={onSubmitTreatment}
            color="primary"
            variant="contained"
          >
            {submitText}
          </Button>
        </div>
      </form>
      <h1 className={styles.Title}>Cargar observaciones</h1>
      <FormComponent
        onSubmit={(submission: any) =>
          setTableState((prev) => ({
            ...prev,
            data: [...prev.data, submission],
          }))
        }
        formsFields={formFields()}
      />
      <TableComponent
        handleRemove={handleRemove}
        startEditing={startEditing}
        editIdx={tableState.editIdx}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={tableState.data}
        header={headers()}
      />
      <div className={styles.ButonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          className={styles.SubmitButton}
        >
          Guardar
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {
              "Estas seguro que quiere finalizar el proceso de cargar una observación?"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Una vez guardado los datos, se registrará la observación para el
              paciente y no tendrá la posibilidad de volver a editarla.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit} autoFocus variant="contained">
              Guardar y Finalizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default UploadObservationStep3;
