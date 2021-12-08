import React from 'react';
import logo from './logo.svg';
import Form  from './features/form/Form';
import { Routes, Route, Link } from "react-router-dom";
import './App.scss';
import { Routing } from './constant/Routing';
import CreatePatient from './features/create-patient/create-patient';
import SelectTreatments from './features/select-treatments/select-treatments';
<<<<<<< HEAD
import { Counter } from './features/counter/Counter';
import Navbar from './features/navbar/navbar';
=======
>>>>>>> wip

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path={Routing.SELECCIONAR_PACIENTE} element={<Form/>} />
          <Route path={Routing.CREATE_PATIENT} element={<CreatePatient/>} />
          <Route path={Routing.SELECT_TREATMENTS} element={<SelectTreatments/>} />
<<<<<<< HEAD
          <Route path={Routing.COUNTER} element={<Counter name="Pirotto"/>} />
=======
>>>>>>> wip
        </Routes>
      </header>
    </div>
  );
}

export default App;
