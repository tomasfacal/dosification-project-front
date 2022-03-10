import axios from "axios";
import { Routing } from "../constant/Routing";

const customAxios = axios.create({
  baseURL: `http://localhost:8000/api/`,
});

const requestHandler = (request: any) => {
  const token = window.localStorage.getItem("token");
  if (
    window.location.pathname === Routing.SIGN_IN ||
    window.location.pathname === Routing.SIGN_UP
  ) {
    return request;
  } else {
    request.headers.Authorization = "Token " + token;
    return request;
  }
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    window.location.assign(Routing.HOME);
  }

  return response;
};

const errorHandler = (error: any) => {
  if (error.response.status === 401) {
    window.location.assign(Routing.SIGN_IN);
  }

  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
