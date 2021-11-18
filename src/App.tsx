import React from 'react';
import logo from './logo.svg';
import Form  from './features/form/Form';
import { Routes, Route, Link } from "react-router-dom";


import './App.css';
import { Routing } from './constant/Routing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={Routing.SELECCIONAR_PACIENTE} element={<Form/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
