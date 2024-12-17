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
import { socket, userId } from "./services/socket";

import MM_C_Menu from "./pages/customer/MM_C_Menu";
import OM_C_Cart from "./pages/customer/OM_C_Cart";
import CI_C_RateItem from "./pages/customer/CI_C_RateItem";
import CI_C_Chat from "./pages/customer/CI_C_Chat";
import OM_C_Checkout from "./pages/customer/OM_C_Checkout";
import UM_C_Profile from "./pages/customer/UM_C_Profile";
import UM_C_Home from "./pages/customer/UM_C_Home";
import UM_C_Login from "./pages/customer/UM_C_Login";
import UM_C_Register from "./pages/customer/UM_C_Register";
import CI_C_ItemDetail from "./pages/customer/CI_C_ItemDetail";

import UmOERegister from "./pages/owner/UM_O_ERegister";
import UmOELogin from "./pages/UM_OE_Login";

import MM_E_EditMenu from "./pages/employee/MM_E_EditMenu";
import CI_E_Chat from "./pages/employee/CI_E_Chat";

import MmOEditMenu from "./pages/owner/MM_O_EditMenu";
import UmOProfile from "./pages/owner/UM_O_Profile";
import TmOTable from "./pages/owner/TM_O_Table";
import TmOTableEdit from "./pages/owner/TM_O_TableEdit";
import UmOUserManagement from "./pages/owner/UM_O_UserManagement";
import DmODiscount from "./pages/owner/DM_O_Discount";
import BrOReport from "./pages/owner/BR_O_Report";

import reportWebVitals from "./reportWebVitals";

import TmETable from "./pages/employee/TM_E_Table";
import UmEConfirmOrder from "./pages/employee/UM_E_ConfirmOrder";
import OmEListOrder from "./pages/employee/OM_E_ListOrder";
import C_ProtectedRoute from "./components/customer/C_ProtectedRoute";
import E_ProtectedRoute from "./components/E_ProtectedRoute";
import { CartProvider } from "./contexts/CartContext";
import { TableProvider } from "./contexts/TableContext";

import { message } from "antd";
import NotFound_C_Alert from "./pages/customer/NotFound_C_Alert";

const root = ReactDOM.createRoot(document.getElementById("root"));

const handleReceiveMessage = (data) => {
  if (data.receiver_id === userId && data.sender_id === 2) {
    console.log("Received message! data:", data);
    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: data.message,
        icon: "/path/to/icon.png", // Replace with your icon path
      });
      message.info(`your phone linging`);
    }
  }
};

socket.on("receive_message", handleReceiveMessage);

root.render(
  <React.StrictMode>
    <TableProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/table-not-found" element={<NotFound_C_Alert />} />
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

            <Route
              path="/admin/um_o_eregister"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <UmOERegister />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/um_oe_login"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <UmOELogin />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/mm_o_editmenu"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <MmOEditMenu />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/um_o_profile"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <UmOProfile />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/tm_o_table"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <TmOTable />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/tm_o_tableedit"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <TmOTableEdit />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/um_o_usermanagement"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <UmOUserManagement />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/dm_o_discount"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <DmODiscount />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/admin/br_o_report"
              element={
                <E_ProtectedRoute allowedRoles={["owner"]}>
                  <BrOReport />
                </E_ProtectedRoute>
              }
            />

            <Route
              path="/employee/menu"
              element={
                <E_ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <MM_E_EditMenu />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/employee/chat"
              element={
                <E_ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <CI_E_Chat />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/employee/table"
              element={
                <E_ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <TmETable />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/employee/confirmorder/:orderId"
              element={
                <E_ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <UmEConfirmOrder />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/employee/listorder"
              element={
                <E_ProtectedRoute allowedRoles={["employee", "admin"]}>
                  <OmEListOrder />
                </E_ProtectedRoute>
              }
            />
            <Route
              path="/employee/confirmorder/:orderId"
              element={<UmEConfirmOrder />}
            />
            <Route path="/employee/listorder" element={<OmEListOrder />} />

            <Route path="/app" element={<App />} />

            <Route
              path="/menu/item/:itemId"
              element={
                <C_ProtectedRoute>
                  <CI_C_ItemDetail />
                </C_ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </TableProvider>
  </React.StrictMode>
);

reportWebVitals();
