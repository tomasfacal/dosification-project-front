import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "./context/authContext";
import { SimulationGlobalStateProvider } from "./context/SimulationGlobalState";
import { ObservationsGlobalStateProvider } from "./context/ObservationsGlobalState";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <CookiesProvider>
          <SimulationGlobalStateProvider>
            <ObservationsGlobalStateProvider>
              <App />
            </ObservationsGlobalStateProvider>
          </SimulationGlobalStateProvider>
        </CookiesProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
