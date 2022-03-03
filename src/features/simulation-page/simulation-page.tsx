import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./simulation-page.module.scss";
import { Button, Grid, Typography } from "@material-ui/core";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { Routing } from "../../constant/Routing";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import TreatmentCard from "../treatment-card/treatment-card";

const SimulationPage = () => {
  const { state, setState } = useSimulationGlobalState();
  const navigation = useNavigate();
  const [cards, setCards] = useState<TreatmentJSON[]>(state.treatments || []);

  const breadcrumbs = [
    {
      name: "Inicio",
      link: Routing.HOME,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar modelo/paciente",
      link: Routing.SELECT_PATIENT_MODEL,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar covariables/output",
      link: Routing.MODEL_DRUG,
      clickable: true,
      actual: false,
    },
    {
      name: "Seleccionar Tratamiento",
      link: Routing.SELECT_TREATMENTS,
      clickable: true,
      actual: false,
    },
    {
      name: "Simulación",
      link: Routing.SIMULATION_PAGE,
      clickable: false,
      actual: true,
    },
    {
      name: "Resultados",
      link: Routing.RESULT_PAGE,
      clickable: false,
      actual: false,
    },
  ];

  const deleteSimulation = (index: number) => {
    let newstate = [...cards];
    newstate.splice(index, 1);
    setCards(newstate);
  };

  const handleSimulate = (event: any) => {
    console.log(state);
    navigation(Routing.RESULT_PAGE);
  };

  return (
    <Fragment>
      <div>
        <Breadcrumbs values={breadcrumbs} />
      </div>
      <div className={styles.FormContainer}>
        <h1 className={styles.Title}>¿Listo para simular?</h1>
        <div className={styles.SimulationContainer}>
          <Typography className={styles.Carditem}>
            <MedicationIcon />
            Modelo: {state.model_name}
          </Typography>
          <Typography className={styles.Carditem}>
            <PersonIcon />
            Paciente: {state.document_number}
          </Typography>
          <Typography className={styles.Carditem}>
            <AnalyticsIcon />
            Output: {state.output}
          </Typography>
        </div>
        <div className={styles.CardsContainer}>
          <Typography className={styles.Treatmentsubtitle}>
            Tratamientos:
          </Typography>
          <Grid container spacing={2}>
            {cards.map((treatment: TreatmentJSON, index: number) => (
              <TreatmentCard
                treatment={treatment}
                index={index}
                delete_treatment={deleteSimulation}
              />
            ))}
          </Grid>
        </div>
        <div className={styles.SimulateButtonContainer}>
          <Button
            color="primary"
            variant="contained"
            className={styles.SubmitButton}
            disabled={cards.length === 0}
            onClick={handleSimulate}
          >
            <EqualizerIcon className={styles.AddTreatmentIcon} />
            Simular
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default SimulationPage;
