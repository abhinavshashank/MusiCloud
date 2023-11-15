import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? (
    
    element
  ) : (
    
    <Navigate to="/" />
  );
};

export default PrivateRoute;
