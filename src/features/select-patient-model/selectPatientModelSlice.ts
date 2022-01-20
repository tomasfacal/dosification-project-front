import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectPatientModelState {
  document_number: number;
  model: string;
}

const initialState: SelectPatientModelState = {
  document_number: 0,
  model: "",
};

export const SelectPatientModelSlice = createSlice({
  name: "patient-model",
  initialState,
  reducers: {
    setPatientModel: (
      state,
      action: PayloadAction<SelectPatientModelState>
    ) => {
      state.document_number = action.payload.document_number;
      state.model = action.payload.model;
    },
  },
});

export const { setPatientModel } = SelectPatientModelSlice.actions;

export default SelectPatientModelSlice.reducer;
