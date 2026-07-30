import { Route, Routes } from "react-router";
import { User } from "./components/User";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { SignIn } from "./components/pages/SignIn";
import { SignUp } from "./components/pages/SignUp";
import { NotFound } from "./components/pages/NotFound";
import { UserDetails } from "./components/UserDetails";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseServiceUsers";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/auth/authSlice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, displayName } = user;
        dispatch(getCurrentUser({ email, name: displayName }));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="users" element={<User />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
