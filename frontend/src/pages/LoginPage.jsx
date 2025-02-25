import React from 'react'; 
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthPage from './AuthPage';

const LoginPage = () => {
  const jwtToken = Cookies.get('jwtToken');

  return jwtToken !== undefined ? (
    <Navigate to="/feed" replace />
  ) :
    (
      <AuthPage />
  )
  
};

export default LoginPage;
