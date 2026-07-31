import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { BrowserRouter } from "react-router";
import { persistor, store } from "./redux/store.js";
import { Spinner } from "./components/shared/Spinner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
