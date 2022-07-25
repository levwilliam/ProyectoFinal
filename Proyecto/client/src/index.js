import React from "react";
import ReactDOM from "react-dom";  // Libreria react dom version antigua
import App from "./App";
import { ContextProvider } from "./context/Context";


// rerendirzamos el redact dom llamando al App
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
