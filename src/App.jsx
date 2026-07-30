import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ContactSection } from "./components/ContactSection";
import { ContactDetails } from "./components/ContactDetails";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
} from "./components/pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="contacts" element={<ContactSection />} />
        <Route path="contacts:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
