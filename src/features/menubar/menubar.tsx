import React, {Fragment, useState, useEffect} from 'react';
import styles from './menubar.module.scss';
import { Routing } from '../../constant/Routing';
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Menubar = () => {
  return (
      <Fragment>
        <div className={styles.CardContainer}>
          <div className={styles.Card1}>
            <LocalHospitalIcon className={styles.CardIcon}/>
            <div className={styles.CardTextContainer}>
              <Typography className={styles.CardText}>
                Dosifica de una manera mas precisa a tus pacientes
                con esta herramienta tan potente
              </Typography>
            </div>
          </div>
          <div className={styles.Card2}>
            <LocalHospitalIcon className={styles.CardIcon}/>
            <div className={styles.CardTextContainer}>
              <Typography className={styles.CardText}>
                Dosifica de una manera mas precisa a tus pacientes
                con esta herramienta tan potente
              </Typography>
            </div>
          </div>
          <div className={styles.Card3}>
            <LocalHospitalIcon className={styles.CardIcon}/>
            <div className={styles.CardTextContainer}>
              <Typography className={styles.CardText}>
                Dosifica de una manera mas precisa a tus pacientes
                con esta herramienta tan potente
              </Typography>
            </div>
          </div>
        </div>
      </Fragment>
  );
}
 
export default Menubar;
