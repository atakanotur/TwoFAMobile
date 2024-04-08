import axios, {AxiosInstance} from 'axios';
import {
  LoginWithTwoFA,
  User,
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

const getRequest = async (endpoint: string) => {
  const token = useAppSelector(state => state.auth.token);
  if (token)
    axiosInstance.defaults.headers.common['Authorization'] =
      'Bearer ' + useAppSelector(state => state.auth.token);

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

const postRequest = async (endpoint: string, data: any) => {
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

export const generateOTP = async (userId: String) => {
  const endpoint = `${baseURL}/users/generateOTP`;
  return await postRequest(endpoint, {user_id: userId});
};

export const verify = async (verifyUser: VerifyUser) => {
  const endpoint = `${baseURL}/users/verify`;
  return await postRequest(endpoint, verifyUser);
};

export const validate = async (validateUser: ValidateUser) => {
  const endpoint = `${baseURL}/users/validate`;
  return await postRequest(endpoint, validateUser);
};

export const disableOTP = async (userId: String) => {
  const endpoint = `${baseURL}/users/disableOTP`;
  return await postRequest(endpoint, {user_id: userId});
};

//Users
export const getUser = async (user: User) => {
  const endpoint = `${baseURL}/user`;
  return await postRequest(endpoint, user);
};

//Roles
export const getRoles = async () => {
  const endpoint = `${baseURL}/roles`;
  return await getRequest(endpoint);
};
