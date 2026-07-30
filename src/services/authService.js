import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/services/firebaseServiceUsers";

export const signUpUser = async (userData) => {
  const { email, password } = userData;
  const resp = await createUserWithEmailAndPassword(auth, email, password);

  const user = resp.user;
  await updateProfile(user, {
    displayName: userData.name,
  });

  return user;
};

export const signInUser = async (userData) => {
  const { email, password } = userData;
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const signOutUser = async () => await signOut(auth);

// export const getCurrent = (cb) => onAuthStateChanged(auth, cb);
