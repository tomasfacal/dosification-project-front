import React from 'react';
import logo from './logo.svg';
import Form  from './features/form/Form';
import { Routes, Route } from "react-router-dom";
import './App.scss';
import { Routing } from './constant/Routing';
import CreatePatient from './features/create-patient/create-patient';
import SelectTreatments from './features/select-treatments/select-treatments';
import PatientsPage from './features/patients-page/patients-page';
import { Counter } from './features/counter/Counter';
import Navbar from './features/navbar/navbar';
import ObtainModelDrug from './features/obtain-model/obtain-model'
import Patient from './features/patients/patient'
import  SignIn from './features/sign-in/sign-in'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path={Routing.SELECCIONAR_PACIENTE} element={<Form/>} />
          <Route path={Routing.CREATE_PATIENT} element={<CreatePatient/>} />
          <Route path={Routing.SELECT_TREATMENTS} element={<SelectTreatments/>} />
          <Route path={Routing.LIST_PATIENTS} element={<PatientsPage/>} />
          <Route path={Routing.SIGN_IN} element={<SignIn/>} />
          <Route path={Routing.COUNTER} element={<Counter name="Pirotto"/>} />
          {/* vamos a tener que cambiar esto */}
          <Route path={Routing.PATIENT + `/:document_number`} element={<Patient/>} />
          <Route path={Routing.MODEL_DRUG} element={<ObtainModelDrug model_drug={3}/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
