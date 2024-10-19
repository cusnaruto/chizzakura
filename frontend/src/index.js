import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import UM_O_ERegister from "./pages/UM_O_ERegister";
import reportWebVitals from "./reportWebVitals";
import UM_OE_Login from "./pages/UM_OE_Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/um_o_eregister" />} />
        <Route path="/um_o_eregister" element={<UM_O_ERegister />} />
        <Route path="/um_oe_login" element={<UM_OE_Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
