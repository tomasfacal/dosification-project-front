import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Routing } from "./constant/Routing";
import CreatePatient from "./features/create-patient/create-patient";
import ErrorPage from "./features/error_pages/error_page";
import Navbar from "./features/navbar/navbar";
import Footer from "./features/footer/footer";
import ObtainModelDrug from "./features/obtain-model/obtain-model";
import Patient from "./features/patients/patient";
import PatientsPage from "./features/patients-page/patients-page";
import SelectPatientModel from "./features/select-patient-model/select-patient-model";
import SelectTreatments from "./features/select-treatments/select-treatments";
import SignIn from "./features/sign-in/sign-in";
import SignUp from "./features/sign-up/sign-up";
import SimulationPage from "./features/simulation-page/simulation-page";
import ResultSimulation from "./features/result-simulation/result-simulation";
import Home from "./features/home/home";
import { PermissionsRoute } from "./features/private-routes/PermissionsRoute";
import UploadObservationStep1 from "./features/upload-observation-step1/upload-observation-step1";
import UploadObservationStep2 from "./features/upload-observation-step2/upload-observation-step2";
import EditUserInfo from "./features/edit-user-info/edit-user-info";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path={Routing.HOME} element={<Home />} />
          <Route path={Routing.SIGN_IN} element={<SignIn />} />
          <Route path={Routing.SIGN_UP} element={<SignUp />} />
          <Route
            path={Routing.CREATE_PATIENT}
            element={
              <PermissionsRoute component={CreatePatient} genericPage={false} />
            }
          />
          <Route path={Routing.MODEL_DRUG} element={<ObtainModelDrug />} />
          <Route
            path={Routing.LIST_PATIENTS}
            element={
              <PermissionsRoute component={PatientsPage} genericPage={false} />
            }
          />
          <Route
            path={Routing.UPLOAD_OBSERVATION_STEP_1}
            element={<UploadObservationStep1 />}
          />
          <Route
            path={Routing.UPLOAD_OBSERVATION_STEP_2}
            element={<UploadObservationStep2 />}
          />
          <Route
            path={Routing.PATIENT + `/:document_number`}
            element={
              <PermissionsRoute component={Patient} genericPage={false} />
            }
          />
          <Route
            path={Routing.EDIT_USER_INFO}
            element={
              <PermissionsRoute component={EditUserInfo} genericPage={true} />
            }
          />
          <Route path={Routing.SIMULATION_FLOW}>
            <Route
              path={Routing.SELECT_PATIENT_MODEL}
              element={
                <PermissionsRoute
                  component={SelectPatientModel}
                  genericPage={true}
                />
              }
            />
            <Route
              path={Routing.MODEL_DRUG}
              element={
                <PermissionsRoute
                  component={ObtainModelDrug}
                  genericPage={true}
                />
              }
            />
            <Route
              path={Routing.SELECT_TREATMENTS}
              element={
                <PermissionsRoute
                  component={SelectTreatments}
                  genericPage={true}
                />
              }
            />
            <Route
              path={Routing.SIMULATION_PAGE}
              element={
                <PermissionsRoute
                  component={SimulationPage}
                  genericPage={true}
                />
              }
            />
            <Route
              path={Routing.RESULT_PAGE}
              element={
                <PermissionsRoute
                  component={ResultSimulation}
                  genericPage={true}
                />
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <ErrorPage
                error_code="404"
                error_text="La página no ha sido encontrada"
              />
            }
          />
        </Routes>
      </header>
      <Footer />
    </div>
  );
}

export default App;
