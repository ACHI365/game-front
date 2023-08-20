import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/styles/styles.css";
import MainProvider from "./context/MainContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <MainProvider>
    <App />
  </MainProvider>
);
