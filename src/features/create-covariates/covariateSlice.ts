import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

export interface CovariateState {
    value: {}
}

const initialState: CovariateState = {
    value: {}
}

export const CovariateSlice = createSlice({
    name: 'covariates',
    initialState,
    reducers: {
        setCovariates: (state, action: PayloadAction<{}>) => {
            state.value = {
                ...action.payload
            };
        },
    },
});

export const { setCovariates } = CovariateSlice.actions;

export default CovariateSlice.reducer;
