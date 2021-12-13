import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

export interface TratmentState {
  value: TreatmentJSON[];
}

const initialState: TratmentState = {
  value: [],
}

export const treatmentSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    setTreatments: (state, action: PayloadAction<TreatmentJSON[]>) => {
      state.value = {
        ...action.payload
      };
    },
  },
});

export const { setTreatments } = treatmentSlice.actions;

export const selectTreatments = (state: RootState) => state;

export default treatmentSlice.reducer;
