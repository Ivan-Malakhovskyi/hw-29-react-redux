import { apiClient } from "./apiClient";

export const setToken = (store) => {
  apiClient.interceptors.request.use((config) => {
    console.log(config);
    const accessToken = store.getState().auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
};

export const signUp = async (userData) => {
  const { data } = await apiClient.post("/users/signup", userData);

  return data;
};

export const signIn = async (userData) => {
  const { data } = await apiClient.post("/users/login", userData);

  return data;
};

export const signOut = async (userData) => {
  const { data } = await apiClient.post("/users/logout", userData);

  return data;
};

export const getCurrent = async () => {
  const { data } = await apiClient.get("/users/current");

  return data;
};
