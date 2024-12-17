import { Navigate } from "react-router-dom";
import { useTable } from "../../contexts/TableContext";

const C_ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const { state } = useTable(); // Lấy state từ context
  const { tableNumber } = state; // Truy cập tableNumber từ state

  // Kiểm tra tableNumber
  if (!tableNumber) {
    return <Navigate to="/table-not-found" replace />;
  }

  // Kiểm tra authToken
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default C_ProtectedRoute;
