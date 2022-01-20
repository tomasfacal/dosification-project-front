import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";

export interface SelectPatientModelState {
  document_number: string;
  model: string;
}

const initialState: SelectPatientModelState = {
  document_number: "",
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
