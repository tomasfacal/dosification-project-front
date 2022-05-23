import { Fragment, useState } from "react";
import styles from "./select-treatments.module.scss";
import {
  TextField,
  Tooltip,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import { Forward } from "@mui/icons-material";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { Routing } from "../../constant/Routing";
import { useNavigate } from "react-router-dom";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import TreatmentCard from "../treatment-card/treatment-card";
import treatment from "../../assets/images/treatment.png";

const SelectTreatments = () => {
  const navigation = useNavigate();
  const { state, setState } = useSimulationGlobalState();

  const [datos, setData] = useState({
    cycle_duration: 0,
    quantity: 0,
  });

  const [errors, setErrors] = useState({
    cycle_duration: false,
    quantity: false,
  });

  const setCardsFromContext = () => {
    if (state.treatments) return state.treatments;
    else return [] as TreatmentJSON[];
  };

  const [cards, setCards] = useState<TreatmentJSON[]>(setCardsFromContext());

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
      actual: false,
    },
    {
      name: "Seleccionar Tratamiento",
      link: Routing.SIMULATION_FLOW + Routing.SELECT_TREATMENTS,
      clickable: true,
      actual: true,
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

  const handleInputChange = (event: any) => {
    if (event.target.value === "") {
      setErrors({
        ...errors,
        [event.target.name]: true,
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: false,
      });
    }
    setData({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const deleteTreatment = (index: number) => {
    let newstate = [...cards];
    newstate.splice(index, 1);
    setCards(newstate);
  };

  const validateFields = (
    cycle_duration: number,
    quantity: number
  ) =>
    !!cycle_duration &&
    !!quantity &&
    cycle_duration > 0 &&
    quantity > 0 &&
    cards.length < 3;

  const createTreatment = (event: any) => {
    event.preventDefault();
    setCards([
      ...cards,
      {
        cycle_duration: datos.cycle_duration,
        quantity: datos.quantity,
      },
    ]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setState((prev) => ({
      ...prev,
      treatments: cards,
    }));
    navigation(Routing.SIMULATION_FLOW + Routing.SIMULATION_PAGE);
  };

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        <img
          src={treatment}
          alt="ilustracion treatment"
          className={styles.TreatmentImage}
        />
        <h1 className={styles.Title}>Crear Tratamiento</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <div className={styles.fieldContainer}>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                label="Ciclo de duración (hrs)"
                name="cycle_duration"
                error={errors.cycle_duration}
                helperText={errors.cycle_duration ? "Campo requerido" : " "}
                onChange={handleInputChange}
              />
              <Tooltip
                title="Este valor indica cada cuanto tiempo se van a aplicar las dosis"
                arrow
                placement="right"
                classes={{ tooltip: styles.tooltip }}
              >
                <HelpIcon className={styles.helpIcon} />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className={styles.fieldContainer}>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                label={`Cantidad (${state.measurement_unit})`}
                name="quantity"
                error={errors.quantity}
                helperText={errors.quantity ? "Campo requerido" : " "}
                onChange={handleInputChange}
              />
              <Tooltip
                title="Este valor indica la cantidad de droga por dosis"
                arrow
                placement="right"
                classes={{ tooltip: styles.tooltip }}
              >
                <HelpIcon className={styles.helpIcon} />
              </Tooltip>
            </div>
          </Grid>
        </Grid>
        <div className={styles.ButtonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={createTreatment}
            className={styles.CreateTreatmentButton}
            disabled={
              !validateFields(
                datos.cycle_duration,
                datos.quantity
              )
            }
          >
            <AddCircleIcon className={styles.AddTreatmentIcon} />
            <div className={styles.TextButton}>Crear Tratamiento</div>
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={styles.SubmitButton}
            disabled={cards.length === 0}
          >
            <Forward className={styles.AddTreatmentIcon} />
            <div className={styles.TextButton}>Siguiente</div>
          </Button>
        </div>
        <Typography className={styles.warningTreatments}>
          * Máximo 3 tratamientos
        </Typography>
      </div>
      <Grid container className={styles.CardsContainer}>
        {cards.map((treatment: TreatmentJSON, index: number) => (
          <TreatmentCard
            treatment={treatment}
            index={index}
            delete_treatment={deleteTreatment}
            measurementUnit={state.measurement_unit}
          />
        ))}
      </Grid>
    </Fragment>
  );
};

export default SelectTreatments;
