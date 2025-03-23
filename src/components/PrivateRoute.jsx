import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { NAVBAR } from '../routes/routes';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? children : <Navigate to= {NAVBAR.LOGIN} />;
};

export default PrivateRoute;