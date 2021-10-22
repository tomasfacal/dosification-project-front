import { AUTH_USER_KEY } from 'constants/constants';

export const setLoggedInUser = user => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

export const getLoggedInUser = () => localStorage.getItem(AUTH_USER_KEY);
