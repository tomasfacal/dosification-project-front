import { Fragment, useContext } from "react";
import styles from "./hero.module.scss";
import { Routing } from "../../constant/Routing";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AuthContext from "../../context/authContext";

const Hero = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <div className={styles.HeroContainer}>
        <div className={styles.Heroinner}>
          <h1 className={styles.HeroTitle}>
            Dosificación de precisión informada por modelos
          </h1>
          <h2 className={styles.HeroSubTitle}>
            Esta herramienta permite utilizar modelos farmacocinéticos poblacionales (popPK) <br/>
            en forma automatizada para optimizar tratamientos farmacológicos a nivel individual
          </h2>
          {authCtx.isLoggedIn && (
            <>
              <h2 className={styles.HeroSubTitle}>
                {" "}
                Para comenzar a utilizar esta herramienta da click en Simular
              </h2>
              <Button
                color="primary"
                variant="contained"
                className={styles.Button}
                component={Link}
                to={Routing.SIMULATION_FLOW + Routing.SELECT_PATIENT_MODEL}
              >
                SIMULAR
              </Button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
