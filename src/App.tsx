import React from 'react';
import logo from './logo.svg';
import Form  from './features/form/Form';
import { Routes, Route, Link } from "react-router-dom";


import './App.scss';
import { Routing } from './constant/Routing';
import CreatePatient from './features/create-patient/create-patient';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={Routing.SELECCIONAR_PACIENTE} element={<Form/>} />
          <Route path={Routing.CREATE_PATIENT} element={<CreatePatient/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
