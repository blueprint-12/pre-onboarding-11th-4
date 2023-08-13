import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

interface CustomError {
  status: number;
  message: string;
}

interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse<CustomError>;
}

const BASE_URL = 'http://localhost:4000';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//요청 API
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err: CustomAxiosError) => {
    if (err.response) {
      const { status, data } = err.response;
      const errResponse: CustomError = {
        status,
        message: data.message,
      };
      return Promise.reject(errResponse);
    }
    return Promise.reject(err);
  },
);

//응답 API
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: CustomAxiosError) => {
    if (err.response) {
      const { status, data } = err.response;
      const errResponse: CustomError = {
        status,
        message: data.message,
      };
      return Promise.reject(errResponse);
    }
    return Promise.reject(err);
  },
);

export default api;
