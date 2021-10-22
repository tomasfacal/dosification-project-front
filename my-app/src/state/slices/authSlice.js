import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { loginFulfilled, logoutFulfilled, signupFulfilled } from 'services/auth';

const initialState = {
  authenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.authenticated = true;
      state.user = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(loginFulfilled, signupFulfilled),
      (state, { payload: { info, data, ...rest } }) => {
        state.authenticated = true;
        state.user = {
          ...info,
          ...data,
          ...rest,
        };
      }
    );
    builder.addMatcher(logoutFulfilled, () => initialState);
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
