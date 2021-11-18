import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route, Link } from "react-router-dom";


import './App.css';
import { Routing } from './constant/Routing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route path={Routing.PIROTTO} element={<Counter name="Pirotto"/>} />
          <Route path={Routing.TOMAS} element={<Counter name="Tomas"/>} />
          <Route path={Routing.DROCCO} element={<Counter name="Drocco"/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
