import React, {Fragment, useState, useEffect} from 'react';
import styles from './menubar.module.scss';
import { Routing } from '../../constant/Routing';
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuHomeCard from '../menu-home-card/menu-home-card';

const Menubar = () => {
  return (
      <Fragment>
        <div className={styles.CardContainer}>
          <MenuHomeCard text="Dosifica de una manera mas precisa a tus pacientes
                con esta herramienta tan potente" class="Card1"/>
          <MenuHomeCard text="Monitorear a los pacientes ahora es mucho mas facil" class="Card2"/>
          <MenuHomeCard text="Ayuda a farmaceuticos/doctores dandoles tranquilidad en esta tarea tan complicada" class="Card3"/>
        </div>
      </Fragment>
  );
}
 
export default Menubar;
