import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Routing } from "./constant/Routing";
import CreatePatient from "./features/create-patient/create-patient";
import ErrorPage from "./features/error_pages/error_page";
import Navbar from "./features/navbar/navbar";
import ObtainModelDrug from "./features/obtain-model/obtain-model";
import Patient from "./features/patients/patient";
import PatientsPage from "./features/patients-page/patients-page";
import SelectPatientModel from "./features/select-patient-model/select-patient-model";
import SelectTreatments from "./features/select-treatments/select-treatments";
import SignIn from "./features/sign-in/sign-in";
import SignUp from "./features/sign-up/sign-up";
import SimulationPage from "./features/simulation-page/simulation-page";
import SimulationGraph from './features/result-simulation/line-chart'
import ResultSimulation from "./features/result-simulation/result-simulation";


function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path={Routing.HOME} element={<div><SimulationGraph /></div>} />
          <Route path={Routing.CREATE_PATIENT} element={<CreatePatient />} />
          <Route path={Routing.LIST_PATIENTS} element={<PatientsPage />} />
          <Route
            path={Routing.MODEL_DRUG}
            element={<ObtainModelDrug model_drug={3} />}
          />
          <Route
            path={Routing.PATIENT + `/:document_number`}
            element={<Patient />}
          />
          <Route
            path={Routing.SELECT_PATIENT_MODEL}
            element={<SelectPatientModel />}
          />
          <Route
            path={Routing.SELECT_TREATMENTS}
            element={<SelectTreatments />}
          />
          <Route path={Routing.SIGN_IN} element={<SignIn />} />
          <Route path={Routing.SIGN_UP} element={<SignUp />} />
          <Route path={Routing.SIMULATION_PAGE} element={<SimulationPage />} />
          <Route
            path="*"
            element={
              <ErrorPage
                error_code="404"
                error_text="La página no ha sido encontrada"
              />
            }
          />
          <Route path={Routing.RESULT_PAGE} element={<ResultSimulation />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
