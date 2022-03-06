import axios from 'axios';


const customAxios = axios.create({
    baseURL: `http://localhost:8000/api/`,
});

const requestHandler = ((request:any) => {
    const token = window.localStorage.getItem('token')
    if (window.location.pathname === '/sign-in' || window.location.pathname === '/sign-up') {
      return request;
    } else {
      request.headers.Authorization = "Token " + token;
      return request;
    }
});

const responseHandler = ((response:any) => {
    if (response.status === 401) {
      window.location.assign("/")
    }

    return response;
});

const errorHandler = ((error:any) => {
    return Promise.reject(error);
});


customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


export default customAxios;
