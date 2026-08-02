import { Route, Routes } from "react-router";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Layout } from "./components/Layout";
import { useAuthUser } from "./components/hooks/useAuthUser";
import { Spinner } from "./components/shared/Spinner";
import { fetchRefreshUer } from "./redux/auth/authOperations";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

const HomePage = lazy(() => import("./components/pages/HomePage"));
const SignInPage = lazy(() => import("./components/pages/SignInPage"));
const SignUpPage = lazy(() => import("./components/pages/SignUpPage"));
const ContactsPage = lazy(() => import("./components/pages/ContactsPage"));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage"));

export const App = () => {
  const { isRefresh } = useAuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefreshUer());
  }, [dispatch]);

  return (
    <>
      {isRefresh ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="signin"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  navigateTo="/contacts"
                />
              }
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  navigateTo="/contacts"
                />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute
                  navigateTo="/signin"
                  component={<ContactsPage />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
