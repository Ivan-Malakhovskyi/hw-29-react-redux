import { auth } from "@/services/firebaseServiceUsers";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpUser = async (userData) => {
  const resp = await createUserWithEmailAndPassword(auth, userData);
  console.log(resp.user);
  return resp.user;
};
