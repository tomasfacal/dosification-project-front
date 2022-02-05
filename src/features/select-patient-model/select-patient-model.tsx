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
import { useAppDispatch } from "../../app/store/hooks";
import { setPatientModel } from "./selectPatientModelSlice";
import { Routing } from '../../constant/Routing';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

const SelectPatientModel = () => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    document_number: 0,
    model: "",
  });

  const [models, setModels] = useState([] as ModelInfo[]);

  const [open, setOpen] = useState(false);

  const breadcrumbs = [
    {
        name: 'Inicio',
        link: Routing.HOME,
        clickable: true,
        actual: false,
      },
      {
        name: 'Seleccionar modelo/paciente',
        link: Routing.SELECT_PATIENT_MODEL,
        clickable: false,
        actual: true,
      },
      {
        name: 'Seleccionar covariables/output',
        link: Routing.MODEL_DRUG,
        clickable: false,
        actual: false,
      },
      {
        name: 'Seleccionar Tratamiento',
        link: Routing.SELECT_TREATMENTS,
        clickable: false,
        actual: false,
      },
      {
        name: 'Simulación',
        link: Routing.SIMULATION_PAGE,
        clickable: false,
        actual: false,
      }
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
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = (document_number: number, model: string) =>
    !!document_number && !!model;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    API.get(API_ROUTES.PATIENT + data.document_number + "/")
      .then(() => {
        dispatch(setPatientModel(data));
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
        <h1 className={styles.Title}>Seleccionar Paciente y Modelo</h1>
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
                  error={!validateFields(data.document_number, data.model)}
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
                    value={data.model}
                    label="Model"
                    name="model"
                    onChange={handleInputChange}
                  >
                    {models.map((model: ModelInfo) => (
                      <MenuItem value={model.name}>{model.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                className={styles.SubmitButton}
                disabled={!validateFields(data.document_number, data.model)}
              >
                <Forward className={styles.Forward} />
                Siguiente
              </Button>
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
