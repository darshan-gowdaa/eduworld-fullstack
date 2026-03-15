import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, role, allowedRoles, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;
