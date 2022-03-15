import { Fragment, useState, useEffect } from "react";
import styles from "./select-patient-model.module.scss";
import { TextField, Tooltip, Button, Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import { Forward } from "@mui/icons-material";
import ChildModal from "../modal-patient/modal";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import { Routing } from "../../constant/Routing";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import patientModel from "../../assets/images/patientModel.jpg";

const SelectPatientModel = () => {
  const navigation = useNavigate();
  const { state, setState } = useSimulationGlobalState();
  const [data, setData] = useState({
    document_number: state.document_number ? state.document_number : 0,
    model_id: state.model_id ? state.model_id : 0,
    model_name: state.model_name ? state.model_name : ("" as any),
  });

  const [models, setModels] = useState([] as ModelInfo[]);

  const [open, setOpen] = useState(false);

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
      actual: true,
    },
    {
      name: "Seleccionar covariables/output",
      link: Routing.SIMULATION_FLOW + Routing.MODEL_DRUG,
      clickable: false,
      actual: false,
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchModels = async () => {
    try {
      const response = await API.get(API_ROUTES.MODEL_DRUGS);
      setModels(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleInputChange = (event: any) => {
    if (event.target.name === "model_id") {
      let model = models.find(
        (model: ModelInfo) => model.id === event.target.value
      );
      setData({
        ...data,
        [event.target.name]: event.target.value,
        model_name: model?.name,
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const validateFields = (document_number: number, model_id: number) =>
    !!document_number && !!model_id;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    API.get(API_ROUTES.PATIENT + data.document_number + "/")
      .then(() => {
        setState((prev) => ({
          ...prev,
          document_number: data.document_number,
          model_id: data.model_id,
          model_name: data.model_name,
        }));
        navigation(Routing.SIMULATION_FLOW + Routing.MODEL_DRUG);
      })
      .catch(function (error) {
        console.log("error", error);
        handleOpen();
      });
  };

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        <img
          src={patientModel}
          alt="ilustracion paciente"
          className={styles.PatientModelImage}
        />
        <div className={styles.fieldContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Tooltip
                title="Cedula con digito verificador, sin puntos ni guiones"
                arrow
              >
                <TextField
                  fullWidth
                  required
                  label="Cédula de identidad"
                  name="document_number"
                  variant="outlined"
                  placeholder="Ingrese la cedula"
                  type="number"
                  value={data.document_number}
                  error={!validateFields(data.document_number, data.model_id)}
                  onChange={handleInputChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="model-select-label">Modelo</InputLabel>
                  <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={data.model_id}
                    label="Model"
                    name="model_id"
                    onChange={handleInputChange}
                  >
                    {models.map((model: ModelInfo) => (
                      <MenuItem key={model.id} value={model.id}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className={styles.ButonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  className={styles.SubmitButton}
                  disabled={
                    !validateFields(data.document_number, data.model_id)
                  }
                >
                  <Forward />
                  Siguiente
                </Button>
              </div>
              <ChildModal
                open={open}
                onClose={handleClose}
                text="La cedula que ingreso no se corresponde con ningun paciente
            almacenado en el sistema."
              ></ChildModal>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default SelectPatientModel;
