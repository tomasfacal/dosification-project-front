import { combineReducers } from 'redux';

import { api } from 'services/auth';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export default rootReducer;
