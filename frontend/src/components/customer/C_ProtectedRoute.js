import { Navigate } from "react-router-dom";

const C_ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("token from protected route", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default C_ProtectedRoute;
