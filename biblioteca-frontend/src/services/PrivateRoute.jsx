import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PrivateRouteAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin'); // Suponiendo que isAdmin está almacenado en el localStorage

  // Verificar si hay token y si el usuario es administrador
  return token && isAdmin === 'true' ? children : <Navigate to="/login" />;
};

export { PrivateRoute, PrivateRouteAdmin };