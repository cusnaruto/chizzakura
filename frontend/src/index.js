import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
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