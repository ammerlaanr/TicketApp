import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { token, rol } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && rol !== requiredRole) {
    return <p>Toegang geweigerd: Onvoldoende rechten</p>
  }

  return children;
};

export default PrivateRoute;