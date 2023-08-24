import axios, { AxiosError, AxiosResponse } from "axios";

import { NewProduct } from "../types/NewProduct";
import { UpdatedProduct } from "../types/UpdatedProduct";
import { Product } from "../types/Product";

const API_BASE_URL = "https://mi-eshop.azurewebsites.net/api/v1/products";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const handleAxiosError = (error: AxiosError) => {
  throw error;
};

const makeApiCall = async <T>(config: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
    return Promise.reject(error);
  }
};

export const fetchAllProductsApi = async ({ search, order, descending, pageNumber, pageSize }: { search?: string, order?: string, descending?: boolean, pageNumber: number, pageSize: number }) => {
  let url = `/?PageNumber=${pageNumber}&PageSize=${pageSize}`;
  if (search) {
    url += `&Search=${search}`;
  }
  if (order) {
    url += `&Order=${order}`;
  }
  if (descending) {
    url += `&Descending=${descending}`;
  }
  return makeApiCall<Product[]>({
    method: "GET",
    url,
  });
};

export const createNewProductApi = async (product: NewProduct) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<Product>({
    method: "POST",
    url: "/",
    headers: headers,
    data: product,
  });
};

export const updateProductApi = async (product: UpdatedProduct) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<Product>({
    method: "PATCH",
    url: `/${product.id}`,
    headers: headers,
    data: product.data,
  });
};

export const deleteProductApi = async (id: string) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return makeApiCall<{ result: boolean; id: string }>({
    method: "DELETE",
    url: `/${id}`,
    headers: headers,
  });
};

export const fetchProductByIdApi = async (id: string) => {
  return makeApiCall<Product>({
    method: "GET",
    url: `/${id}`,
  });
};

