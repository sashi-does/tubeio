// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwtToken');

  // If no token, redirect to login
  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children
  return children;
};

export default ProtectedRoute; // Ensure this export is present