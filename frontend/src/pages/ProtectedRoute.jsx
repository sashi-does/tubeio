// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwtToken');

  if (!jwtToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; // Ensure this export is present