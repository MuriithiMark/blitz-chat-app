import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./contexts/auth/AuthContextProvider.tsx";
import store from "./features/store.ts";
import ModalProvider from "./components/modals/ModalProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <ModalProvider />
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
