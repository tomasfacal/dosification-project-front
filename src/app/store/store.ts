import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import treatmentReducer from '../../features/select-treatments/treatmentSlice';
import covariatesReducer from '../../features/create-covariates/covariateSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treatments: treatmentReducer,
    covariates: covariatesReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
