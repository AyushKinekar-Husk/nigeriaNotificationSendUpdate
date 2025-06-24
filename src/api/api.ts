import axios, { InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import apiCodes from './apiCode';
import storageUtils from '../utils/storageUtils';
import { store } from '../store';
import { ROUTES } from '../route/RouteConstant';

const api = axios.create({
  baseURL: 'https://bijlee-customer-service-qa-fpgaa8euawb9daa2.centralindia-01.azurewebsites.net/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Get dynamic userId and token from Redux and storage
const getHeaderConfig = async (): Promise<Record<string, string | number>> => {
  const state = store.getState();
  const userId = state.user.userDetails?.id ?? 0; // fallback if undefined
  const token = storageUtils.getData('auth-token') ?? '';

  return {
    'userId': userId,
    'husk-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc2NTQzMiIsImlhdCI6MTcxMzI4ODAwMCwiZXhwIjoxNzQ0ODI0MDAwfQ.dQ7N3uKlQvbL6RckZP_pn6z1Go1L6SoBkSBwZj9Ck9k',
    'countryCode': 'In',
  };
};

// 🔁 Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const defaultConfigs = await getHeaderConfig();
    const requestHeader = config.headers ?? {};

    config.headers = {
      ...defaultConfigs,
      ...requestHeader,
    } as any;

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    toast.error('Failed to send request.');
    return Promise.reject(error);
  }
);

// 🔁 Response Interceptor (same as before)
api.interceptors.response.use(
  (response) => {
    if (response.status === apiCodes.SUCCESS && response.data?.Data) {
      response.data.Data = response.data.Data;
    } else if (response.status === apiCodes.SUCCESS && response.data?.data) {
      response.data.Data = response.data.data;
    }

    return response.data;
  },
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'An error occurred';

    if (error.code === apiCodes.REQUEST_TIME_OUT) {
      toast.error('Server timeout. Please try again.');
    } else if (status === apiCodes.UNAUTHORIZE_REQUEST) {
       window.location.replace(ROUTES.FORBIDDEN);
    }else if (status === apiCodes.FORBIDDEN) {
      window.location.replace(ROUTES.FORBIDDEN);
    }
     else if (status === apiCodes.RESOURCE_NOT_FOUND) {
      toast.error('Requested resource not found (404).');
    } else if (status === apiCodes.INTERNAL_SERVER_ERROR) {
      toast.error('Internal server error (500).');
    } else {
      toast.error(message);
    }

    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default api;
