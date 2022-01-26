import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import treatmentReducer from "../../features/select-treatments/treatmentSlice";
import outputCovariatesReducer from "../../features/obtain-model/outputCovariateSlice";
import selectPatientModelReducer from "../../features/select-patient-model/selectPatientModelSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treatments: treatmentReducer,
    outputCovariates: outputCovariatesReducer,
    patientModel: selectPatientModelReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
