import { Fragment, useEffect } from "react";
import styles from "./home.module.scss";
import Hero from "../hero/hero";
import Menubar from "../menubar/menubar";
import PersonCard from "../person-card/person-card";
import pirottoPhoto from "../../assets/images/pirotto.png";
import facalPhoto from "../../assets/images/facal.png";
import droccoPhoto from "../../assets/images/drocco.png";
import { Routing } from "../../constant/Routing";
import patientImage from "../../assets/images/patients.jpg";
import simulationImage from "../../assets/images/simulation.png";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import FeatureCard from "../feature-card/feature-card";
import { useSimulationGlobalState } from "../../context/SimulationGlobalState";
import { useObservationsGlobalState } from "../../context/ObservationsGlobalState";
import TermsAndConditions from "../terms-and-conditions/terms-and-conditions"

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isDoctor = authCtx.role === "doctor";
  const { state: simulation_state, setState: setSimulationState } =
    useSimulationGlobalState();
  const { state: observationState, setState: setObservationState } =
    useObservationsGlobalState();

  useEffect(() => {
    setSimulationState({});
    setObservationState({});
  }, []);

  return (
    <Fragment>
      <Hero />
      <Menubar />
      {isDoctor && authCtx.isLoggedIn && (
        <div className={styles.CardsFeaturesContainer}>
          <FeatureCard
            title="Simulación"
            subtitle="Finglix provee la simulación de dosis personificada."
            image={simulationImage}
            buttons={[
              {
                buttonText: "Simular dosificación",
                buttonLink:
                  Routing.SIMULATION_FLOW + Routing.SELECT_PATIENT_MODEL,
                buttonStyle: "contained",
              },
            ]}
          />
          <FeatureCard
            title="Gestión de Pacientes"
            subtitle="Finglix provee la gestión de pacientes de una manera sencilla."
            image={patientImage}
            buttons={[
              {
                buttonText: "Agregar nueva observación",
                buttonLink: Routing.UPLOAD_OBSERVATION_STEP_1,
                buttonStyle: "contained",
              },
              {
                buttonText: "Registrar paciente",
                buttonLink: Routing.CREATE_PATIENT,
                buttonStyle: "contained",
              },
              {
                buttonText: "Ver los pacientes del sistema",
                buttonLink: Routing.LIST_PATIENTS,
                buttonStyle: "text",
              },
            ]}
          />
        </div>
      )}

      <TermsAndConditions/>
      <div className={styles.TeamContainer}>
        <div className={styles.HomeSectionTitle}>Equipo de desarrollo</div>
        <div className={styles.CardContainer}>
          <PersonCard name="Agustina Drocco" image={droccoPhoto} />
          <PersonCard name="Tomás Facal" image={facalPhoto} />
          <PersonCard name="Agustín Pirotto" image={pirottoPhoto} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
