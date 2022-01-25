import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

export interface OutputCovariateState {
    value: {}
}

const initialState: OutputCovariateState = {
    value: {}
}

export const OutputCovariateSlice = createSlice({
    name: 'covariates',
    initialState,
    reducers: {
        setOutputCovariates: (state, action: PayloadAction<{}>) => {
            state.value = {
                ...action.payload
            };
        },
    },
});

export const { setOutputCovariates } = OutputCovariateSlice.actions;

export default OutputCovariateSlice.reducer;
