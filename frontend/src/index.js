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
import UmOERegister from "./pages/UM_O_ERegister";
import UmOELogin from "./pages/UM_OE_Login";
import MmOEditMenu from "./pages/MM_O_EditMenu";
import UmOProfile from "./pages/UM_O_Profile";
import TmOTable from "./pages/TM_O_Table";
import TmOTableEdit from "./pages/TM_O_TableEdit";
import UmOEditEInfo from "./pages/UM_O_EditEInfo";
import DmODiscount from "./pages/DM_O_Discount";
import BrOReport from "./pages/BR_O_Report";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<UM_C_Login />} />
        <Route path="/register" element={<UM_C_Register />} />
        <Route path="/home" element={<UM_C_Home />} />
        <Route path="/menu" element={<MM_C_Menu />} />
        <Route path="/cart" element={<OM_C_Cart />} />
        <Route path="/profile" element={<UM_C_Profile />} />
        <Route path="/rateFood" element={<CI_C_RateItem />} />
        <Route path="/checkout" element={<OM_C_Checkout />} />
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/admin/um_o_eregister" element={<UmOERegister />} />
        <Route path="/admin/um_oe_login" element={<UmOELogin />} />
        <Route path="/admin/mm_o_editmenu" element={<MmOEditMenu />} />
        <Route path="/admin/um_o_profile" element={<UmOProfile />} />
        <Route path="/admin/tm_o_table" element={<TmOTable />} />
        <Route path="/admin/tm_o_tableedit" element={<TmOTableEdit />} />
        <Route path="/admin/um_o_editeinfo" element={<UmOEditEInfo />} />
        <Route path="/admin/dm_o_discount" element={<DmODiscount />} />
        <Route path="/admin/br_o_report" element={<BrOReport />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();