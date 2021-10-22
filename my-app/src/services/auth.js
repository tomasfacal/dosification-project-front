import { createApi } from '@reduxjs/toolkit/query/react';

import endpoints from 'constants/endpoints';
import { baseQueryWithReauth } from 'utils/customQueries';

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    signup: builder.mutation({
      query: user => ({
        url: endpoints.SIGN_UP,
        method: 'POST',
        body: { user },
      }),
    }),
    login: builder.mutation({
      query: user => ({
        url: endpoints.SIGN_IN,
        method: 'POST',
        body: { user },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: endpoints.SIGN_OUT,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  endpoints: {
    signup: { matchFulfilled: signupFulfilled },
    login: { matchFulfilled: loginFulfilled },
    logout: { matchFulfilled: logoutFulfilled },
  },
} = api;

export const selectAuth = state => state.auth;
