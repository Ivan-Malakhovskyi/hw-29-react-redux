import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Contacts } from "./components/Contacts";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { useAuthUser } from "./components/hooks/useAuthUser";
import { Spinner } from "./components/shared/Spinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRefreshUer } from "./redux/auth/authOperations";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

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
                <PrivateRoute navigateTo="/signin" component={<Contacts />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
