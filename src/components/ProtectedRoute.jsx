import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;