import { apiClient } from "./apiClient";

export const signUp = async (userData) => {
  const { data } = await apiClient.post("/users/signup", userData);

  return data;
};

export const signIn = async (userData) => {
  const { data } = await apiClient.post("/users/login", userData);

  return data;
};

export const signOut = async () => {
  const { data } = await apiClient.post("/users/logout");

  return data;
};

export const getCurrent = async () => {
  const { data } = await apiClient.get("/users/current");

  return data;
};
