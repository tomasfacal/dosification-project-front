import React, {Fragment, useState, useEffect} from 'react';
import styles from './hero.module.scss';
import { Routing } from '../../constant/Routing';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Hero = () => {
  return (
      <Fragment>
        <div className={styles.HeroContainer}>
          <div className={styles.Heroinner}>
            <h1 className={styles.HeroTitle}>Sitio para dosificación de fármacos</h1>
            <h2 className={styles.HeroSubTitle}>Utiliza esta herramienta para dosificar de manera mas precisa a tus pacientes</h2>
            <Button
              color="primary"
              variant="contained"
              className={styles.Button}
              component={Link}
              to={Routing.SELECT_PATIENT_MODEL}
            >
              SIMULAR
            </Button>
            </div>
        </div>
      </Fragment>
  );
}
 
export default Hero;
