import { apiClient } from "./apiClient";

export const getAllContacts = async () => {
  const { data } = await apiClient.get("/contacts");

  return data;
};

export const createContact = async (userData) => {
  const { data } = await apiClient.post("/contacts", userData);

  return data;
};

export const deleteContactById = async (id) => {
  const { data } = await apiClient.delete(`/contacts/${id}`);

  return data;
};
