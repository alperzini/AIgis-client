import { Navigate, Outlet } from "react-router-dom";
import { isAuthed } from "../../utils/auth";

function ProtectedRoute() {
  return isAuthed() ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;