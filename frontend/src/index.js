import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import MM_C_Menu from './pages/MM_C_Menu';
import OM_C_Cart from './pages/OM_C_Cart';
import CI_C_RateItem from './pages/CI_C_RateItem';
import OM_C_Checkout from './pages/OM_C_Checkout';
import UM_C_Profile from "./pages/UM_C_Profile";
import UM_C_Home from './pages/UM_C_Home';
import UM_C_Login from "./pages/UM_C_Login";
import UM_C_Register from "./pages/UM_C_Register";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/login" element={<UM_C_Login />} />
        <Route path="/register" element={<UM_C_Register />} />
        <Route path="/home" element={<UM_C_Home />} />
        <Route path="/menu" element={<MM_C_Menu />} />
        <Route path="/cart" element={<OM_C_Cart />} />
        <Route path="/profile" element={<UM_C_Profile />} />
        <Route path="/rateFood" element={<CI_C_RateItem />} />
        <Route path="/checkout" element={<OM_C_Checkout />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
