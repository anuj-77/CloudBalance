import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = useSelector((state) => state.user.role);

  return allowedRoles.includes(role)
    ? <Outlet />
    : <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;
