import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles/index.css";
import App from "./App";

import MM_C_Menu from "./pages/customer/MM_C_Menu";
import OM_C_Cart from "./pages/customer/OM_C_Cart";
import CI_C_RateItem from "./pages/customer/CI_C_RateItem";
import CI_C_Chat from "./pages/customer/CI_C_Chat";
import OM_C_Checkout from "./pages/customer/OM_C_Checkout";
import UM_C_Profile from "./pages/customer/UM_C_Profile";
import UM_C_Home from "./pages/customer/UM_C_Home";
import UM_C_Login from "./pages/customer/UM_C_Login";
import UM_C_Register from "./pages/customer/UM_C_Register";

import UmOERegister from "./pages/owner/UM_O_ERegister";
import UmOELogin from "./pages/UM_OE_Login";

import MM_E_EditMenu from "./pages/employee/MM_E_EditMenu";
import CI_E_Chat from "./pages/employee/CI_E_Chat";

import MmOEditMenu from "./pages/owner/MM_O_EditMenu";
import UmOProfile from "./pages/owner/UM_O_Profile";
import TmOTable from "./pages/owner/TM_O_Table";
import TmOTableEdit from "./pages/owner/TM_O_TableEdit";
import UmOEditEInfo from "./pages/owner/UM_O_EditEInfo";
import DmODiscount from "./pages/owner/DM_O_Discount";
import BrOReport from "./pages/owner/BR_O_Report";

import reportWebVitals from "./reportWebVitals";

import TmETable from "./pages/employee/TM_E_Table";
import MmEEditMenu from "./pages/employee/MM_E_EditMenu";
import UmEConfirmOrder from "./pages/employee/UM_E_ConfirmOrder";
import OmEListOrder from "./pages/employee/OM_E_ListOrder";
import C_ProtectedRoute from "./components/customer/C_ProtectedRoute";

import { CartProvider } from "./contexts/CartContext";
import { TableProvider } from "./contexts/TableContext";
import TableCheck from "./TableCheck";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TableProvider>
      <CartProvider>
        <Router>
          <TableCheck>
            <Routes>
              <Route path="/login" element={<UM_C_Login />} />
              <Route path="/register" element={<UM_C_Register />} />

              <Route
                path="/home"
                element={
                  <C_ProtectedRoute>
                    <UM_C_Home />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <C_ProtectedRoute>
                    <MM_C_Menu />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <C_ProtectedRoute>
                    <OM_C_Cart />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <C_ProtectedRoute>
                    <UM_C_Profile />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/rateFood"
                element={
                  <C_ProtectedRoute>
                    <CI_C_RateItem />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <C_ProtectedRoute>
                    <OM_C_Checkout />
                  </C_ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <C_ProtectedRoute>
                    <CI_C_Chat />
                  </C_ProtectedRoute>
                }
              />

              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="/admin/um_o_eregister" element={<UmOERegister />} />
              <Route path="/admin/um_oe_login" element={<UmOELogin />} />
              <Route path="/admin/mm_o_editmenu" element={<MmOEditMenu />} />
              <Route path="/admin/um_o_profile" element={<UmOProfile />} />
              <Route path="/admin/tm_o_table" element={<TmOTable />} />
              <Route path="/admin/tm_o_tableedit" element={<TmOTableEdit />} />
              <Route path="/admin/um_o_editeinfo" element={<UmOEditEInfo />} />
              <Route path="/admin/dm_o_discount" element={<DmODiscount />} />
              <Route path="/admin/br_o_report" element={<BrOReport />} />

              <Route path="/employee/menu" element={<MM_E_EditMenu />} />
              <Route path="/employee/chat" element={<CI_E_Chat />} />
              <Route path="/employee/table" element={<TmETable />} />
              <Route
                path="/employee/confirmorder/:orderId"
                element={<UmEConfirmOrder />}
              />
              <Route path="/employee/listorder" element={<OmEListOrder />} />

              <Route path="/app" element={<App />} />
            </Routes>
          </TableCheck>
        </Router>
      </CartProvider>
    </TableProvider>
  </React.StrictMode>
);

reportWebVitals();
