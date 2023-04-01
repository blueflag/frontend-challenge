import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GlobalStyles } from "twin.macro";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { DatasContextProvider } from "./context/DatasContext";
/** @jsxImportSource @emotion/react */
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Router>
      <DatasContextProvider>
        <App />
      </DatasContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
