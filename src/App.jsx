import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Contacts } from "./components/Contacts";
import { HomePage } from "./components/pages/HomePage";
import { SignInPage } from "./components/pages/SignInPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
