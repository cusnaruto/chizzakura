import { Navigate } from "react-router-dom";
import { useTable } from "../../contexts/TableContext";

const C_ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  // console.log("token from protected route", token);
  const { tableNumber } = useTable();
  if (!tableNumber) {
    return <Navigate to="/table-not-found" replace />;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default C_ProtectedRoute;
