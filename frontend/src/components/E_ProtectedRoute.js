import { Navigate } from "react-router-dom";
import { jwtDecode }from "jwt-decode";

const E_ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = jwtDecode(token);
  if (!allowedRoles.includes(decoded.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default E_ProtectedRoute;