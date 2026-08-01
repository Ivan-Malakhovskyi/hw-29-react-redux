import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";

import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/users"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/users" component={<LoginPage />} />
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute redirectTo="/login" component={<UsersPage />} />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
