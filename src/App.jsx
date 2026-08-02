import { Route, Routes } from "react-router";
import { useState } from "react";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";

import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import UsersPage from "./pages/Users";
import styles from "./components/Modal/Modal.module.css";
import { WithoutPortal } from "./components/Modal/WithoutPortal";
import { WithPortal } from "./components/Modal/WithPortal";

export const App = () => {
  const [isOpenWith, setIsOpenWith] = useState(false);
  const [isOpenWithout, setIsOpenWithout] = useState(false);

  const handleToggleWithout = () => {
    setIsOpenWithout(!isOpenWithout);
  };

  const handleToggleWith = () => {
    setIsOpenWith(!isOpenWith);
  };

  return (
    <>
      <div className={styles["kill-container"]}>
        Open Without
        <button type="button" onClick={handleToggleWithout}>
          Open
        </button>
        <WithoutPortal
          handleToggle={handleToggleWithout}
          isOpen={isOpenWithout}
        />
      </div>

      <div className={styles["kill-container"]}>
        <button type="button" onClick={handleToggleWith}>
          Open
        </button>

        <WithPortal handleToggle={handleToggleWith} isOpen={isOpenWith} />
      </div>

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
