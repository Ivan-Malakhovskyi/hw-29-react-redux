import axios from "axios";

axios.defaults.baseURL = "https://6a4e600de785c9ef536cbd48.mockapi.io";

export const getAllUsers = async () => {
  const { data } = await axios.get("/users");

  return data;
};

export const createUser = async (userData) => {
  const { data } = await axios.post("/users", userData);

  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axios.delete(`/users/${id}`);

  return data;
};
