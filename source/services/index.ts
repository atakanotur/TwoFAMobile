import axios, {AxiosInstance} from 'axios';
import {
  UserForLogin,
  UserForRegister,
  VerifyUser,
  ValidateUser,
} from '../types';
import {useAppSelector} from '../hooks';

const baseURL = 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getRequest = async (endpoint: string, token?: String) => {
  if (token && token.length > 0) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return await axiosInstance
    .get(endpoint)
    .then(response => {
      console.log(`getRequest: ${endpoint}`, response);
      return response;
    })
    .catch(error => {
      console.log(`getRequestError: ${endpoint}`, error);
      return null;
    });
};

const postRequest = async (endpoint: string, data: any, token?: String) => {
  if (token && token.length > 0) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
  return await axiosInstance
    .post(endpoint, data)
    .then(response => {
      console.log(`postRequest: ${endpoint}`, response.data);
      return response.data;
    })
    .catch(error => {
      console.log(`postRequestError: ${endpoint}`, error);
      return null;
    });
};

//Auth
export const login = async (userForLogin: UserForLogin) => {
  const endpoint = `${baseURL}/users/auth`;
  return await postRequest(endpoint, userForLogin);
};

export const register = async (userForRegister: UserForRegister) => {
  const endpoint = `${baseURL}/users/add`;
  return await postRequest(endpoint, userForRegister);
};

export const generateOTP = async (userId: String, token: String) => {
  const endpoint = `${baseURL}/users/generateOTP`;
  return await postRequest(
    endpoint,
    {
      user_id: userId,
    },
    token,
  );
};

export const verify = async (verifyUser: VerifyUser) => {
  const endpoint = `${baseURL}/users/verify`;
  return await postRequest(endpoint, verifyUser);
};

export const validate = async (validateUser: ValidateUser, token: String) => {
  const endpoint = `${baseURL}/users/validate`;
  return await postRequest(endpoint, validateUser, token);
};

export const disableOTP = async (userId: String, token: String) => {
  const endpoint = `${baseURL}/users/disableOTP`;
  return await postRequest(endpoint, {user_id: userId}, token);
};

