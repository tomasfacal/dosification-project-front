import React, {Fragment, useState, useEffect} from 'react';
import styles from './patients-page.module.scss';
import { Typography } from '@material-ui/core';
import CallToAction from '../call-to-action/call-to-action';
import PatientsList from '../patients-list/patients-list';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { Routing } from '../../constant/Routing';

const PatientsPage = () => {
  const breadcrumbs = [
    {
        name: 'Inicio',
        link: '/',
        clickable: true,
        actual: false,
      },
      {
        name: 'Pacientes',
        link: Routing.LIST_PATIENTS,
        clickable: false,
        actual: true,
      }
  ];
  return (
      <Fragment>
        <div>
          <Breadcrumbs values={breadcrumbs} />
        </div>
        <Typography className={styles.PageTitle}> Lista de Pacientes </Typography>
        <PatientsList/>
        <CallToAction text='En caso de querer crear un nuevo paciente: ' url='/create-patient' urlText="Click aquí"/>
      </Fragment>
  );
}
 
export default PatientsPage;
