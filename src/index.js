import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./integration/context/appProviderContext";

ReactDOM.render(
  <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    placement="bottom-center"
  >
    <AppProvider>
      <App />
    </AppProvider>
  </ToastProvider>,

  document.getElementById("root")
);

reportWebVitals();
