import axios from "axios";

import { User } from "../types/User";
import { NewUser } from "../types/NewUser";
import { UpdateUser } from "../types/UpdateUser";

const API_BASE_URL = "https://mi-eshop.azurewebsites.net/api/v1/users";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const handleAxiosError = (error: any) => {
  throw error;
};

const makeApiCall = async <T>(config: any): Promise<T> => {
  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
    return Promise.reject(error);
  }
};

export const createNewUserApi = async (user: NewUser) => {
  return makeApiCall<User>({
    method: "POST",
    url: "/",
    data: user,
  });
};

export const fetchAllUsersApi = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<any[]>({
    method: "GET",
    url: "/",
    headers: headers,
  });
};

export const fetchUserByIdApi = async (id: string) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<User>({
    method: "GET",
    url: `/${id}`,
    headers: headers,
  });
};

export const updateUserApi = async (user: UpdateUser) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<User>({
    method: "PATCH",
    url: `/${user.id}`,
    headers: headers,
    data: user,
  });
};

export const deleteUserApi = async (id: string) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<User>({
    method: "DELETE",
    url: `/${id}`,
    headers: headers,
  });
};
