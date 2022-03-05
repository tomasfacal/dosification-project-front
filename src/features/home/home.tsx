import { Fragment } from "react";
import styles from "./home.module.scss";
import Hero from "../hero/hero";
import Menubar from "../menubar/menubar";
import { Link } from "react-router-dom";
import PersonCard from "../person-card/person-card";
import pirottoPhoto from "../../assets/images/pirotto.png";
import facalPhoto from "../../assets/images/facal.png";
import droccoPhoto from "../../assets/images/drocco.png";
import { Routing } from "../../constant/Routing";
import { Button } from "@material-ui/core";
import patientImage from "../../assets/images/patients.jpg";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isDoctor = authCtx.role === "doctor";
  return (
    <Fragment>
      <Hero />
      <Menubar />
      {isDoctor && authCtx.isLoggedIn && (
        <div className={styles.PatientsContainer}>
          <div className={styles.HomeSectionTitle}>Gestión de Pacientes</div>
          <div className={styles.PatientsInfo}>
            <h2>
              {" "}
              Finglix provee la gestión de pacientes de una manera sencilla.
            </h2>
            <div className={styles.ImageContainer}>
              <img
                src={patientImage}
                alt="ilustracion paciente"
                className={styles.PatientImage}
              />
              <div className={styles.ButtonsContainer}>
                <Button
                  color="primary"
                  variant="text"
                  component={Link}
                  to={Routing.LIST_PATIENTS}
                >
                  Ver los pacientes del sistema
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={styles.CreatePatientButton}
                  component={Link}
                  to={Routing.CREATE_PATIENT}
                >
                  Registrar paciente
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
