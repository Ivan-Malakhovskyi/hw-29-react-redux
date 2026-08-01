import { apiClient } from "@/apiClient";

export const getAllUsers = async () => {
  const { data } = await apiClient.get("/users?offset=0&limit=10");

  return data;
};
